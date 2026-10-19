"""
Невидимая водяная метка в частотной области, переживающая JPEG.

Почему не младшие биты (LSB): сохранение в JPEG перераспределяет значения пикселей, и LSB-метка
превращается в шум (на практике совпадает ~50 % бит, то есть угадывание).

Как устроено здесь:
* яркость (Y) делится на блоки 8×8, к каждому применяется ДКП (как в JPEG);
* бит кодируется знаком разности двух среднечастотных коэффициентов C[3,2] − C[2,3]:
  «1» — разность не меньше +STRENGTH, «0» — не больше −STRENGTH (запас по модулю переживает
  квантование JPEG);
* полезная нагрузка — 128-битный хеш + 16 бит CRC; каждый бит повторяется во множестве блоков,
  блоки выбираются псевдослучайной перестановкой, при чтении голосование суммой разностей;
* если CRC не сошёлся, метки нет (или она разрушена) — возвращается None.

Что метка переживает: пересохранение в JPEG (проверено до качества 70), небольшой шум.
Что не переживает: изменение размера и обрезка (позиции блоков сдвигаются), сильные фильтры.
Это отметка происхождения, а не защита от целенаправленного удаления.
"""

import binascii
from typing import Optional

import numpy as np
from PIL import Image

BLOCK = 8
STRENGTH = 14.0          # запас разности коэффициентов (шкала ортонормированного ДКП, значения 0..255)
PAYLOAD_BYTES = 16       # 128-битный хеш (32 hex-символа)
CRC_BYTES = 2
TOTAL_BITS = (PAYLOAD_BYTES + CRC_BYTES) * 8
MIN_REPEATS = 4          # минимум повторов каждого бита для надёжного голосования
_PERMUTATION_SEED = 20251019  # не секрет: метка подтверждает происхождение, а не скрывает его

_POS_A = (3, 2)
_POS_B = (2, 3)


def _dct_matrix() -> np.ndarray:
    n = BLOCK
    matrix = np.zeros((n, n))
    for k in range(n):
        for i in range(n):
            matrix[k, i] = np.sqrt((1 if k else 0.5) * 2.0 / n) * np.cos(np.pi * (2 * i + 1) * k / (2 * n))
    return matrix


_D = _dct_matrix()


def _bits_from_hex(hex_hash: str) -> np.ndarray:
    payload = bytes.fromhex(hex_hash)
    if len(payload) != PAYLOAD_BYTES:
        raise ValueError("Хеш метки должен быть 32 hex-символа (128 бит)")
    crc = binascii.crc_hqx(payload, 0).to_bytes(CRC_BYTES, "big")
    return np.unpackbits(np.frombuffer(payload + crc, dtype=np.uint8))


def _blocks_view(plane: np.ndarray):
    height, width = plane.shape
    rows, cols = height // BLOCK, width // BLOCK
    cropped = plane[:rows * BLOCK, :cols * BLOCK]
    blocks = cropped.reshape(rows, BLOCK, cols, BLOCK).transpose(0, 2, 1, 3)
    return blocks, rows, cols


def capacity_ok(width: int, height: int) -> bool:
    """Хватает ли блоков, чтобы каждый бит повторился не меньше MIN_REPEATS раз."""
    return (height // BLOCK) * (width // BLOCK) >= TOTAL_BITS * MIN_REPEATS


def _order(count: int) -> np.ndarray:
    return np.random.RandomState(_PERMUTATION_SEED).permutation(count)


def embed(image: Image.Image, hex_hash: str) -> Image.Image:
    """Вернуть копию изображения с меткой. Бросает ValueError, если изображение слишком мало."""
    rgb = image.convert("RGB")
    if not capacity_ok(*rgb.size):
        raise ValueError("Изображение слишком мало для метки")
    bits = _bits_from_hex(hex_hash)

    ycbcr = np.asarray(rgb.convert("YCbCr"), dtype=np.float64)
    luma = ycbcr[:, :, 0]
    blocks, rows, cols = _blocks_view(luma)
    coeffs = _D @ blocks @ _D.T                      # (rows, cols, 8, 8)
    flat = coeffs.reshape(rows * cols, BLOCK, BLOCK)

    order = _order(rows * cols)
    for position, block_index in enumerate(order):
        bit = bits[position % TOTAL_BITS]
        a, b = _POS_A, _POS_B
        diff = flat[block_index][a] - flat[block_index][b]
        target = STRENGTH if bit else -STRENGTH
        if (bit and diff < target) or (not bit and diff > target):
            shift = (target - diff) / 2.0
            flat[block_index][a] += shift
            flat[block_index][b] -= shift

    restored = (_D.T @ flat.reshape(rows, cols, BLOCK, BLOCK) @ _D)   # обратное ДКП
    restored = restored.transpose(0, 2, 1, 3).reshape(rows * BLOCK, cols * BLOCK)
    luma_out = luma.copy()
    luma_out[:rows * BLOCK, :cols * BLOCK] = restored
    ycbcr[:, :, 0] = np.clip(np.rint(luma_out), 0, 255)
    return Image.fromarray(ycbcr.astype(np.uint8), "YCbCr").convert("RGB")


def extract(image: Image.Image) -> Optional[str]:
    """Прочитать хеш из метки или None, если метки нет / CRC не сошёлся."""
    rgb = image.convert("RGB")
    if not capacity_ok(*rgb.size):
        return None
    luma = np.asarray(rgb.convert("YCbCr"), dtype=np.float64)[:, :, 0]
    blocks, rows, cols = _blocks_view(luma)
    coeffs = (_D @ blocks @ _D.T).reshape(rows * cols, BLOCK, BLOCK)

    order = _order(rows * cols)
    diffs = coeffs[order, _POS_A[0], _POS_A[1]] - coeffs[order, _POS_B[0], _POS_B[1]]
    diffs = np.clip(diffs, -2 * STRENGTH, 2 * STRENGTH)            # выбросы не должны перевешивать голосование
    sums = np.zeros(TOTAL_BITS)
    np.add.at(sums, np.arange(len(diffs)) % TOTAL_BITS, diffs)
    data = np.packbits((sums > 0).astype(np.uint8)).tobytes()
    payload, crc = data[:PAYLOAD_BYTES], data[PAYLOAD_BYTES:]
    if binascii.crc_hqx(payload, 0).to_bytes(CRC_BYTES, "big") != crc:
        return None
    return payload.hex()
