import { useState } from 'react';

export const UserCaseEditor = ({ reportId, value, onSave, compact = false }) => {
  const [draft, setDraft] = useState(value || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const save = async () => {
    const nextValue = draft.trim();
    if (nextValue.length < 10) {
      setError('The user case must contain at least 10 characters.');
      return;
    }

    setSaving(true);
    setError('');
    const updated = await onSave(reportId, nextValue);
    setSaving(false);
    if (updated) {
      setDraft(nextValue);
      setEditing(false);
    }
    else setError('The user case could not be saved. Please try again.');
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
          User&apos;s case
        </h4>
        {!editing ? (
          <button
            type="button"
            onClick={() => { setDraft(value || ''); setEditing(true); setError(''); }}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#012475] hover:bg-slate-100 dark:text-[#8fc6ff] dark:hover:bg-[#132248]"
          >
            <i className="fa-solid fa-pen" />
            Edit
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="grid gap-2">
          <textarea
            value={draft}
            onChange={(event) => { setDraft(event.target.value); setError(''); }}
            rows={compact ? 3 : 5}
            maxLength={5000}
            disabled={saving}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm leading-relaxed text-slate-800 outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 dark:border-[#2b477f] dark:bg-[#091228] dark:text-slate-100"
          />
          {error ? <p className="m-0 text-xs font-semibold text-red-600 dark:text-red-400">{error}</p> : null}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => { setDraft(value || ''); setEditing(false); setError(''); }}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-[#1e3568] dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving || draft.trim() === (value || '').trim()}
              onClick={save}
              className="rounded-lg bg-[#012475] px-3 py-1.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#4b9efe] dark:text-[#070d1e]"
            >
              {saving ? 'Saving…' : 'Save case'}
            </button>
          </div>
        </div>
      ) : (
        <p className="m-0 whitespace-pre-wrap rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700 dark:border-[#1e3568]/80 dark:bg-[#101e40] dark:text-slate-200">
          {value || 'No user case was provided.'}
        </p>
      )}
    </section>
  );
};

export default UserCaseEditor;
