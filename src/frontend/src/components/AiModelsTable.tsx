import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cpu, RefreshCw, History, RotateCcw, Save } from 'lucide-react';
import {
  type Mode, type Snapshot, type CatalogModel, type TaskRow, type HistoryItem,
  loadAiModels, saveAiModel, resetAiModel, refreshAiCatalog, loadAiModelsHistory,
  rub, monthlyCost, parseVolume, unsuitableReason, modelsForTask, previewWarnings, planTotal, priceNote,
  LABEL_TEXT, DASH,
} from '../lib/aiModels';

const CUSTOM = '__custom__';
const MODE_LABELS: Record<Mode, string> = { global: 'Обычный режим', 'ru-only': 'Только серверы в РФ' };

const selectClass = 'w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

const tierText = { economy: 'экономная', balanced: 'сбалансированная', top: 'топовая' } as const;

const LabelBadges: React.FC<{ model: CatalogModel; task: string }> = ({ model, task }) => (
  <>
    {(model.labels[task] ?? []).map(l => (
      <Badge key={l} variant={l === 'best' ? 'default' : 'secondary'} className="ml-1 text-[10px]">{LABEL_TEXT[l]}</Badge>
    ))}
  </>
);

const AiModelsTable: React.FC = () => {
  const [mode, setMode] = useState<Mode>('global');
  const [modeTouched, setModeTouched] = useState(false);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pending, setPending] = useState<Record<string, string>>({});   // выбрано, но не сохранено
  const [custom, setCustom] = useState<Record<string, string>>({});     // ввод «другой модели»
  const [volumes, setVolumes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, { warnings: string[]; error?: string }>>({});
  const [cmpTask, setCmpTask] = useState('vision_front');
  const [onlyFit, setOnlyFit] = useState(true);
  const [history, setHistory] = useState<HistoryItem[] | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const apply = useCallback((next: Snapshot) => {
    setSnap(next);
    setVolumes(v => {
      const filled = { ...v };
      for (const t of next.tasks) if (filled[t.task] === undefined) filled[t.task] = String(t.default_volume);
      return filled;
    });
  }, []);

  const load = useCallback(async (m: Mode) => {
    setLoading(true);
    try {
      apply(await loadAiModels(m));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  }, [apply]);

  useEffect(() => { setPending({}); setCustom({}); setNotes({}); load(mode); }, [mode, load]);

  // Если ядро работает в режиме «только РФ», сразу показываем действующий режим
  useEffect(() => {
    if (snap && !modeTouched && snap.llm_mode !== mode) setMode(snap.llm_mode);
  }, [snap, modeTouched, mode]);

  const byId = useMemo(() => new Map((snap?.catalog ?? []).map(m => [m.id, m])), [snap]);

  const selected = (row: TaskRow): string => {
    const choice = pending[row.task];
    if (choice === undefined) return row.current_model;
    return choice === CUSTOM ? (custom[row.task] ?? '').trim() : choice;
  };

  const plans = (snap?.tasks ?? []).map(row => ({ task: row.task, model: selected(row), volume: parseVolume(volumes[row.task] ?? '') }));
  const total = snap ? planTotal(plans, snap.catalog) : { total: 0, unknown: 0 };
  const saved = snap ? planTotal((snap.tasks).map(row => ({ task: row.task, model: row.current_model, volume: parseVolume(volumes[row.task] ?? '') })), snap.catalog) : { total: 0, unknown: 0 };
  const dirty = (snap?.tasks ?? []).some(r => pending[r.task] !== undefined && selected(r) !== r.current_model);

  const save = async (row: TaskRow) => {
    const model = selected(row);
    if (!model || model === row.current_model) return;
    setBusy(row.task);
    try {
      const next = await saveAiModel(row.task, model, mode);
      apply(next);
      setNotes(n => ({ ...n, [row.task]: { warnings: next.warnings ?? [] } }));
      setPending(p => { const { [row.task]: _drop, ...rest } = p; return rest; });
      setCustom(c => { const { [row.task]: _drop, ...rest } = c; return rest; });
    } catch (e) {
      setNotes(n => ({ ...n, [row.task]: { warnings: [], error: e instanceof Error ? e.message : 'Ошибка' } }));
    } finally { setBusy(null); }
  };

  const reset = async (row: TaskRow) => {
    if (!window.confirm(`Вернуть для задачи «${row.title}» модель по умолчанию (${row.default_model})?`)) return;
    setBusy(row.task);
    try {
      apply(await resetAiModel(row.task, mode));
      setNotes(n => ({ ...n, [row.task]: { warnings: [] } }));
      setPending(p => { const { [row.task]: _drop, ...rest } = p; return rest; });
    } catch (e) {
      setNotes(n => ({ ...n, [row.task]: { warnings: [], error: e instanceof Error ? e.message : 'Ошибка' } }));
    } finally { setBusy(null); }
  };

  const refresh = async () => {
    setLoading(true);
    try { apply(await refreshAiCatalog(mode)); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : 'Ошибка'); }
    finally { setLoading(false); }
  };

  const toggleHistory = async () => {
    const open = !historyOpen;
    setHistoryOpen(open);
    if (open) {
      try { setHistory((await loadAiModelsHistory()).items); } catch { setHistory([]); }
    }
  };

  const taskTitle = (id: string) => snap?.tasks.find(t => t.task === id)?.title ?? id;
  const cmpRow = snap?.tasks.find(t => t.task === cmpTask);
  const cmpModels = snap && cmpRow
    ? modelsForTask(snap.catalog, cmpTask).filter(m => !onlyFit || !unsuitableReason(m, cmpRow))
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><Cpu className="h-5 w-5" />Модели ИИ по задачам</CardTitle>
              <CardDescription>
                Для каждой задачи выберите модель из каталога routerai.ru. Выбор применяется ядром без перезапуска (на всех экземплярах — в течение 30 секунд).
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={refresh} disabled={loading}><RefreshCw className="h-3.5 w-3.5 mr-1" />Обновить цены</Button>
              <Button variant="outline" size="sm" onClick={toggleHistory}><History className="h-3.5 w-3.5 mr-1" />Журнал</Button>
            </div>
          </div>
          <div className="flex gap-2 pt-2" role="tablist" aria-label="Режим отправки данных">
            {(Object.keys(MODE_LABELS) as Mode[]).map(m => (
              <Button key={m} size="sm" role="tab" aria-selected={mode === m} variant={mode === m ? 'default' : 'outline'}
                onClick={() => { setModeTouched(true); setMode(m); }}>{MODE_LABELS[m]}</Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm" role="alert">{error}</div>}

          {snap && snap.llm_mode !== mode && (
            <div className="p-3 rounded-lg bg-amber-50 text-amber-800 text-sm">
              Сейчас ядро работает в режиме «{MODE_LABELS[snap.llm_mode]}» (переменная LLM_MODE): выбор для режима «{MODE_LABELS[mode]}» сохраняется, но пока не применяется.
            </div>
          )}
          {mode === 'ru-only' && (
            <div className="p-3 rounded-lg bg-blue-50 text-blue-800 text-sm">
              В этом режиме запросы идут только на серверы в РФ (без запасных провайдеров) — для приватных коллекций и данных с персональными сведениями.
              Допустимы лишь российские модели; картинки принимают Qwen 3.6 и DeepSeek V4.1 на Яндексе.
            </div>
          )}

          {snap && (
            <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
              <p>
                Рекомендации — наши гипотезы по отчёту подбора моделей, а не результат замеров на ваших работах: окончательный выбор делается прогоном
                <code className="mx-1">tools/model_bakeoff.py</code>на 30–50 размеченных работах.
              </p>
              <p>
                Цены: {snap.catalog_meta.price_source === 'live'
                  ? `живой каталог routerai.ru (обновлён ${snap.catalog_meta.updated_at ? new Date(snap.catalog_meta.updated_at * 1000).toLocaleString('ru-RU') : '—'})`
                  : `снимок от ${snap.catalog_meta.snapshot_date} (каталог сейчас недоступен)`}.
                Каталожная цена — минимум по провайдерам; у провайдера со строгой JSON-схемой она может быть выше. Расход токенов на единицу — допущение без «мышления» модели (с ним в 2–3 раза больше).
                {snap.provider_only ? ` Провайдер закреплён: ${snap.provider_only}.` : ' Провайдер не закреплён (LLM_PROVIDER_ONLY пуст).'}
                {snap.background_tier === 'flex' ? ' Фоновые задачи идут в режиме flex (примерно вдвое дешевле у Google и OpenAI).' : ''}
              </p>
            </div>
          )}

          {!snap && loading && <p className="text-sm text-muted-foreground">Загрузка…</p>}

          {snap && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Задача</TableHead>
                    <TableHead className="min-w-[280px]">Модель</TableHead>
                    <TableHead className="text-right">Цена за ед.</TableHead>
                    <TableHead className="w-[110px]">Объём в месяц</TableHead>
                    <TableHead className="text-right">В месяц</TableHead>
                    <TableHead className="min-w-[150px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {snap.tasks.map(row => {
                    const value = selected(row);
                    const choiceInList = byId.has(value);
                    const selectValue = pending[row.task] === CUSTOM ? CUSTOM : (value || row.current_model);
                    const model = byId.get(value);
                    const unit = model?.cost[row.task] ?? null;
                    const changed = pending[row.task] !== undefined && value !== row.current_model && value !== '';
                    const note = notes[row.task];
                    const warnings = changed ? previewWarnings(model, row.task) : [];
                    const options = modelsForTask(snap.catalog, row.task);
                    return (
                      <React.Fragment key={row.task}>
                        <TableRow className={changed ? 'bg-amber-50/60' : undefined}>
                          <TableCell className="align-top">
                            <div className="font-medium">{row.title}</div>
                            <div className="text-xs text-muted-foreground">{row.description}</div>
                            <div className="text-xs text-muted-foreground mt-1">единица — {row.unit}</div>
                          </TableCell>
                          <TableCell className="align-top">
                            <select aria-label={`Модель для задачи «${row.title}»`} className={selectClass} value={selectValue}
                              onChange={e => setPending(p => ({ ...p, [row.task]: e.target.value }))}>
                              {!byId.has(row.current_model) && <option value={row.current_model}>{row.current_model} (вне списка)</option>}
                              {options.map(m => {
                                const reason = unsuitableReason(m, row);
                                const tag = (m.labels[row.task] ?? []).map(l => LABEL_TEXT[l]).join(', ');
                                return (
                                  <option key={m.id} value={m.id} disabled={!!reason}>
                                    {m.label} — {rub(m.cost[row.task])}{tag ? ` · ${tag}` : ''}{reason ? ` (${reason})` : ''}
                                  </option>
                                );
                              })}
                              {mode === 'global' && <option value={CUSTOM}>Другая модель из каталога…</option>}
                            </select>
                            {pending[row.task] === CUSTOM && (
                              <Input className="mt-2" placeholder="например, vendor/model-name" aria-label="Идентификатор модели"
                                value={custom[row.task] ?? ''} onChange={e => setCustom(c => ({ ...c, [row.task]: e.target.value }))} />
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              {row.source === 'admin'
                                ? <>Выбрано администратором{row.updated_by ? ` (${row.updated_by})` : ''}{row.updated_at ? `, ${new Date(row.updated_at).toLocaleString('ru-RU')}` : ''}</>
                                : <>По умолчанию из окружения</>}
                              {row.source === 'admin' && <> · по умолчанию: {row.default_model}</>}
                            </div>
                            {model && !changed && model.note && <div className="text-xs text-muted-foreground mt-1">{model.note}</div>}
                            {pending[row.task] !== CUSTOM && value && !choiceInList && !changed && (
                              <div className="text-xs text-amber-700 mt-1">Модели нет в нашем списке: цена и риски не оценивались.</div>
                            )}
                          </TableCell>
                          <TableCell className="align-top text-right whitespace-nowrap">
                            {rub(unit)}
                            {model && priceNote(model) && <div className="text-[10px] text-muted-foreground">{priceNote(model)}</div>}
                          </TableCell>
                          <TableCell className="align-top">
                            <Input inputMode="numeric" aria-label={`Объём в месяц для задачи «${row.title}»`} value={volumes[row.task] ?? ''}
                              onChange={e => setVolumes(v => ({ ...v, [row.task]: e.target.value }))} />
                          </TableCell>
                          <TableCell className="align-top text-right whitespace-nowrap font-medium">
                            {rub(monthlyCost(unit, parseVolume(volumes[row.task] ?? '')))}
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex flex-col gap-1.5">
                              <Button size="sm" disabled={!changed || busy === row.task} onClick={() => save(row)}>
                                <Save className="h-3.5 w-3.5 mr-1" />{busy === row.task ? 'Сохранение…' : 'Сохранить'}
                              </Button>
                              <Button size="sm" variant="outline" disabled={row.source !== 'admin' || busy === row.task} onClick={() => reset(row)}>
                                <RotateCcw className="h-3.5 w-3.5 mr-1" />По умолчанию
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {(warnings.length > 0 || (note && (note.error || note.warnings.length > 0))) && (
                          <TableRow>
                            <TableCell colSpan={6} className="py-2">
                              {note?.error && <p className="text-sm text-red-700" role="alert">{note.error}</p>}
                              {[...warnings, ...(note?.warnings ?? [])].map((w, i) => (
                                <p key={i} className="text-sm text-amber-800">⚠ {w}</p>
                              ))}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {snap && (
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-t pt-3 text-sm">
              <span className="text-muted-foreground">
                Оценка расходов в месяц по объёмам выше{total.unknown > 0 ? ` (без ${total.unknown} задач с неизвестной ценой)` : ''}:
              </span>
              <span>
                <b className="text-lg">{rub(total.total)}</b>
                {dirty && <span className="text-muted-foreground ml-2">сейчас {rub(saved.total)}</span>}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {snap && (
        <Card>
          <CardHeader>
            <CardTitle>Сравнение моделей</CardTitle>
            <CardDescription>Цена и возможности кандидатов; «Выбрать» подставляет модель в таблицу выше — после этого нажмите «Сохранить».</CardDescription>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <label className="text-sm flex items-center gap-2">Задача
                <select className={selectClass + ' w-auto'} value={cmpTask} onChange={e => setCmpTask(e.target.value)}>
                  {snap.tasks.map(t => <option key={t.task} value={t.task}>{t.title}</option>)}
                </select>
              </label>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={onlyFit} onChange={e => setOnlyFit(e.target.checked)} />Только подходящие
              </label>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Модель</TableHead>
                  <TableHead className="text-right">Вход / выход, ₽ за млн</TableHead>
                  <TableHead className="text-right">За {cmpRow?.unit ?? 'единицу'}</TableHead>
                  <TableHead>Картинки</TableHead>
                  <TableHead>Строгая схема</TableHead>
                  <TableHead>РФ</TableHead>
                  <TableHead className="text-right">Контекст</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {cmpModels.map(m => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="font-medium">{m.label}<LabelBadges model={m} task={cmpTask} /></div>
                      <div className="text-xs text-muted-foreground">{m.id} · {m.vendor} · {tierText[m.tier]}{m.flex ? ' · есть flex' : ''}</div>
                      {previewWarnings(m, cmpTask).map((w, i) => <div key={i} className="text-xs text-amber-800">⚠ {w}</div>)}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {m.price_in === null ? DASH : `${m.price_in.toLocaleString('ru-RU')} / ${m.price_out?.toLocaleString('ru-RU')}`}
                      {priceNote(m) && <div className="text-[10px] text-muted-foreground">{priceNote(m)}</div>}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap font-medium">{rub(m.cost[cmpTask])}</TableCell>
                    <TableCell>{m.vision ? 'да' : 'нет'}</TableCell>
                    <TableCell>{m.json_schema ? 'да' : 'нет'}</TableCell>
                    <TableCell>{m.ru_hosted ? 'да' : '—'}</TableCell>
                    <TableCell className="text-right">{m.context ? Math.round(m.context / 1000).toLocaleString('ru-RU') + ' тыс.' : DASH}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" disabled={!cmpRow || !!unsuitableReason(m, cmpRow)}
                        onClick={() => setPending(p => ({ ...p, [cmpTask]: m.id }))}>Выбрать</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {cmpModels.length === 0 && (
                  <TableRow><TableCell colSpan={8} className="text-sm text-muted-foreground">Подходящих моделей нет</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {historyOpen && (
        <Card>
          <CardHeader><CardTitle>Журнал изменений</CardTitle></CardHeader>
          <CardContent>
            {history === null && <p className="text-sm text-muted-foreground">Загрузка…</p>}
            {history && history.length === 0 && <p className="text-sm text-muted-foreground">Изменений пока не было</p>}
            {history && history.map((h, i) => (
              <div key={i} className="text-sm py-2 border-b last:border-0">
                <span className="text-muted-foreground">{new Date(h.changed_at).toLocaleString('ru-RU')}</span> · {h.actor ?? 'неизвестно'} · {taskTitle(h.task)} ({MODE_LABELS[h.mode]}):{' '}
                {h.old_model ?? 'по умолчанию'} → <b>{h.new_model ?? 'по умолчанию'}</b>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiModelsTable;
