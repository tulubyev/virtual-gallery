import { fitInside } from '../../frontend/src/lib/gallery/fit';
import { textureSource, LEVEL_PX } from '../../frontend/src/lib/gallery/imageUrls';

describe('fitInside', () => {
  it('сохраняет пропорции', () => {
    expect(fitInside(2, 2)).toEqual({ w: 2, h: 1 });
    expect(fitInside(0.5, 2)).toEqual({ w: 1, h: 2 });
    expect(fitInside(1, 2)).toEqual({ w: 2, h: 2 });
  });
  it('некорректная пропорция → квадрат', () => {
    for (const a of [0, -1, NaN, Infinity]) expect(fitInside(a, 3)).toEqual({ w: 3, h: 3 });
  });
});

describe('textureSource', () => {
  const S3 = 'https://bucket.s3.example.net';

  it('локальные загрузки идут через миниатюры нужного размера', () => {
    expect(textureSource('/uploads/artwork-1.jpg', 'thumb')).toEqual({ url: '/media/t/256/u/artwork-1.jpg', clientMaxSize: null });
    expect(textureSource('/uploads/artwork-1.jpg', 'detail').url).toBe('/media/t/1024/u/artwork-1.jpg');
    expect(textureSource('/uploads/artwork-1.jpg', 'zoom').url).toBe('/media/t/2048/u/artwork-1.jpg');
  });

  it('с CDN адреса ведут на домен CDN', () => {
    const media = { cdnBaseUrl: 'https://cdn.virtgal.ru', s3PublicBase: S3 };
    expect(textureSource('/uploads/a.jpg', 'thumb', media).url).toBe('https://cdn.virtgal.ru/media/t/256/u/a.jpg');
    expect(textureSource(`${S3}/artworks/art-1.jpg`, 'detail', media).url).toBe('https://cdn.virtgal.ru/media/t/1024/s/artworks/art-1.jpg');
  });

  it('объекты нашего S3 берутся уменьшенными, без CDN — с этого же сервера', () => {
    const media = { cdnBaseUrl: '', s3PublicBase: S3 };
    expect(textureSource(`${S3}/artworks/art-1.jpg?x=1`, 'thumb', media)).toEqual({ url: '/media/t/256/s/artworks/art-1.jpg', clientMaxSize: null });
    expect(textureSource(`${S3}/textures/t.png`, 'zoom', media).url).toBe('/media/t/2048/s/textures/t.png');
  });

  it('чужие адреса и другие каталоги бакета остаются как есть и уменьшаются на клиенте', () => {
    const media = { cdnBaseUrl: '', s3PublicBase: S3 };
    for (const u of ['https://cdn.example/x.jpg', `${S3}/private/secret.jpg`, `${S3}/artworks/../private/x.jpg`, `${S3}/artworks/a%2Fb.jpg`]) {
      expect(textureSource(u, 'detail', media)).toEqual({ url: u, clientMaxSize: LEVEL_PX.detail });
    }
  });

  it('подозрительные локальные пути не превращаются в миниатюры', () => {
    for (const u of ['/uploads/../secret.jpg', '/uploads/a/b.jpg', '/uploads/.env']) {
      expect(textureSource(u, 'thumb').url).toBe(u);
    }
  });
});
