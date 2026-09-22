import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const emptyAlert = { title: '', content: '' };
const fieldClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 dark:border-[#1e3568] dark:bg-[#101e40] dark:text-white';
const dateLabel = (date) => date
  ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))
  : 'Not published';

function AlertModal({ alert, onClose, onSave }) {
  const [form, setForm] = useState(() => alert
    ? { title: alert.title, content: alert.content }
    : emptyAlert);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const payload = { title: form.title.trim(), content: form.content.trim() };
    if (!payload.title || !payload.content) {
      setError('Enter both a title and message content.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(alert?.id, payload);
      onClose();
    } catch (requestError) {
      setError(requestError.message || 'Could not save this alert.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-xs sm:items-center sm:p-4" role="presentation">
      <section className="max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1e3568] dark:bg-[#0c1733] sm:rounded-2xl" role="dialog" aria-modal="true" aria-labelledby="alert-modal-title">
        <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-[#1e3568]/60 sm:px-6">
          <div>
            <h2 id="alert-modal-title" className="m-0 text-lg font-bold text-slate-900 dark:text-white">{alert ? 'Edit alert' : 'Create alert'}</h2>
            <p className="mb-0 mt-1 text-xs text-slate-500 dark:text-slate-400">Save the message, then publish it when it is ready for users.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-[#132248]"><i className="fa-solid fa-xmark" /></button>
        </header>
        <form onSubmit={submit} className="space-y-5 p-4 sm:p-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Title
            <input autoFocus maxLength="255" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className={`${fieldClass} normal-case tracking-normal`} placeholder="Scheduled maintenance" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Message content
            <textarea rows="8" maxLength="10000" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} className={`${fieldClass} resize-y normal-case tracking-normal`} placeholder="Tell users what is happening and what they need to know." />
          </label>
          {error ? <p className="m-0 text-sm font-semibold text-red-600" role="alert">{error}</p> : null}
          <footer className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-[#1e3568]/60 sm:flex sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-[#1e3568] dark:text-slate-300">Cancel</button>
            <button disabled={saving} type="submit" className="rounded-xl bg-[#012475] px-5 py-2 text-xs font-bold text-white disabled:opacity-60 dark:bg-[#4b9efe] dark:text-[#070d1e]">{saving ? 'Saving…' : 'Save alert'}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default function AlertsManagement() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(undefined);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.admin.alerts();
      setAlerts(response.alerts || []);
    } catch (requestError) {
      setError(requestError.message || 'Could not load alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    api.admin.alerts()
      .then((response) => {
        if (active) setAlerts(response.alerts || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Could not load alerts.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const save = async (id, data) => {
    if (id) await api.admin.updateAlert(id, data);
    else await api.admin.createAlert(data);
    await load();
  };

  const togglePublication = async (alert) => {
    setActiveId(alert.id);
    setError('');
    try {
      await api.admin.publishAlert(alert.id, !alert.isPublished);
      await load();
    } catch (requestError) {
      setError(requestError.message || 'Could not update publication status.');
    } finally {
      setActiveId(null);
    }
  };

  const remove = async (alert) => {
    if (!window.confirm(`Delete “${alert.title}”? This cannot be undone.`)) return;
    setActiveId(alert.id);
    setError('');
    try {
      await api.admin.deleteAlert(alert.id);
      await load();
    } catch (requestError) {
      setError(requestError.message || 'Could not delete this alert.');
    } finally {
      setActiveId(null);
    }
  };

  const visibleAlerts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return alerts;
    return alerts.filter((alert) => `${alert.title} ${alert.content}`.toLowerCase().includes(normalizedQuery));
  }, [alerts, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Alerts</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Send short, timely announcements directly to application users.</p>
        </div>
        <button type="button" onClick={() => setEditing(null)} className="w-full rounded-xl bg-[#012475] px-4 py-2.5 text-sm font-bold text-white shadow-sm dark:bg-[#4b9efe] dark:text-[#070d1e] sm:w-auto"><i className="fa-solid fa-plus mr-2" />New alert</button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-md">
          <span className="sr-only">Search alerts</span>
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search alerts…" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-sm outline-none focus:border-[#4b9efe] dark:border-[#1e3568] dark:bg-[#0c1733] dark:text-white" />
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">{alerts.length} total alerts</span>
      </div>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</div> : null}
      {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500 dark:border-[#1e3568] dark:bg-[#0c1733]">Loading alerts…</div> : null}
      {!loading && !visibleAlerts.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-[#1e3568] dark:bg-[#0c1733]">
          <i className="fa-regular fa-bell mb-3 text-3xl text-slate-300 dark:text-slate-600" />
          <h2 className="m-0 text-base font-bold text-slate-800 dark:text-slate-200">No alerts found</h2>
          <p className="mb-0 mt-1 text-xs text-slate-400">Create an alert or adjust your search.</p>
        </div>
      ) : null}
      {!loading && visibleAlerts.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {visibleAlerts.map((alert) => (
            <article key={alert.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#1e3568] dark:bg-[#0c1733] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="m-0 wrap-break-word text-base font-bold text-slate-900 dark:text-white">{alert.title}</h2>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${alert.isPublished ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{alert.isPublished ? 'Published' : 'Draft'}</span>
                  </div>
                  <p className="mb-0 mt-1 text-xs text-slate-400">{alert.isPublished ? `Published ${dateLabel(alert.publishedAt)}` : `Updated ${dateLabel(alert.updatedAt)}`}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-[#012475] dark:bg-[#132248] dark:text-[#4b9efe]"><i className="fa-solid fa-bell" /></span>
              </div>
              <p className="mb-0 mt-4 flex-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600 dark:text-slate-300">{alert.content}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-[#1e3568]/60">
                <button type="button" onClick={() => setEditing(alert)} disabled={activeId === alert.id} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-50 dark:border-[#1e3568] dark:text-slate-200"><i className="fa-solid fa-pen mr-1.5" />Edit</button>
                <button type="button" onClick={() => togglePublication(alert)} disabled={activeId === alert.id} className="rounded-lg bg-[#eaf2ff] px-3 py-2 text-xs font-bold text-[#012475] disabled:opacity-50 dark:bg-[#132248] dark:text-[#4b9efe]"><i className={`fa-solid ${alert.isPublished ? 'fa-eye-slash' : 'fa-paper-plane'} mr-1.5`} />{alert.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button type="button" onClick={() => remove(alert)} disabled={activeId === alert.id} className="rounded-lg px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-50 hover:bg-red-50 dark:hover:bg-red-950/30"><i className="fa-solid fa-trash mr-1.5" />Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {editing !== undefined ? <AlertModal key={editing?.id || 'new'} alert={editing} onClose={() => setEditing(undefined)} onSave={save} /> : null}
    </div>
  );
}
