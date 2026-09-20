import { useEffect, useState } from 'react';
import { api } from '../services/api';

const languages = [
  { id: 'en', label: 'English', shortLabel: 'EN', suffix: '' },
  { id: 'km', label: 'Khmer', shortLabel: 'ខ្មែរ', suffix: 'Km' },
];
const localizedFieldNames = [
  'title',
  'category',
  'shortDescription',
  'content',
  'warningSigns',
  'preventionTips',
  'indicators',
];
const emptyTopic = {
  title: '', titleKm: '', slug: '', category: '', categoryKm: '',
  shortDescription: '', shortDescriptionKm: '', content: '', contentKm: '',
  warningSigns: [], warningSignsKm: [], preventionTips: [], preventionTipsKm: [],
  indicators: [], indicatorsKm: [], relatedTopicIds: [], imageUrl: '', icon: '',
  isPublished: false,
};
const toLines = (items) => (Array.isArray(items) ? items : []).join('\n');
const toList = (value) => (Array.isArray(value) ? value : value.split('\n'))
  .map((item) => item.trim())
  .filter(Boolean);
const dateLabel = (date) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(date));
const localizedKey = (field, language) => `${field}${language.suffix}`;

function TopicModal({ allTopics, topic, onClose, onSave }) {
  const [form, setForm] = useState(() => topic
    ? { ...emptyTopic, ...topic, relatedTopicIds: topic.relatedTopics?.map((item) => item.id) || [] }
    : emptyTopic);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 dark:border-[#1e3568] dark:bg-[#101e40] dark:text-white';
  const languageComplete = (language) => localizedFieldNames.every((field) => {
    const value = form[localizedKey(field, language)];
    return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
  });

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      slug: form.slug.trim(),
      imageUrl: form.imageUrl?.trim() || null,
      icon: form.icon?.trim() || null,
    };
    for (const language of languages) {
      for (const field of ['title', 'category', 'shortDescription', 'content']) {
        const key = localizedKey(field, language);
        payload[key] = form[key].trim();
      }
      for (const field of ['warningSigns', 'preventionTips', 'indicators']) {
        const key = localizedKey(field, language);
        payload[key] = toList(form[key]);
      }
    }

    const incompleteLanguage = languages.find((language) => !languageComplete(language));
    if (!payload.slug || incompleteLanguage) {
      if (incompleteLanguage) setActiveLanguage(incompleteLanguage.id);
      setError(incompleteLanguage
        ? `Complete all ${incompleteLanguage.label} fields and provide at least one item in each guidance list.`
        : 'Enter a slug for this safety topic.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave(topic?.id, payload);
      onClose();
    } catch (requestError) {
      setError(requestError.message || 'Could not save this knowledge item.');
    } finally {
      setSaving(false);
    }
  };

  const language = languages.find((item) => item.id === activeLanguage) || languages[0];
  const field = (name) => localizedKey(name, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-xs sm:p-4">
      <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1e3568] dark:bg-[#0c1733]">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-[#1e3568]/60 sm:px-6">
          <div className="min-w-0">
            <h2 className="m-0 text-lg font-bold text-slate-900 dark:text-white">
              {topic ? 'Edit safety knowledge' : 'Create safety knowledge'}
            </h2>
            <p className="mb-0 mt-1 text-xs text-slate-500 dark:text-slate-400">
              English and Khmer content are both required before this item can be saved.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-[#1e3568] dark:bg-[#101e40]" role="tablist" aria-label="Knowledge language">
              {languages.map((item) => {
                const complete = languageComplete(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={activeLanguage === item.id}
                    onClick={() => { setActiveLanguage(item.id); setError(''); }}
                    className={`flex min-h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition ${activeLanguage === item.id ? 'bg-[#012475] text-white shadow-sm dark:bg-[#4b9efe] dark:text-[#070d1e]' : 'text-slate-600 hover:text-[#012475] dark:text-slate-300 dark:hover:text-white'}`}
                  >
                    <span>{item.shortLabel}</span>
                    {complete ? <i className="fa-solid fa-circle-check text-[10px] text-emerald-500" aria-label="Complete" /> : null}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-[#132248]">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5 overflow-y-auto p-4 sm:p-6">
          <section aria-labelledby={`${language.id}-content-heading`}>
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf2ff] text-xs font-black text-[#012475] dark:bg-[#132248] dark:text-[#4b9efe]">
                {language.shortLabel}
              </span>
              <div>
                <h3 id={`${language.id}-content-heading`} className="m-0 text-sm font-bold text-slate-900 dark:text-white">{language.label} content</h3>
                <p className="m-0 text-xs text-slate-500 dark:text-slate-400">Shown when the member uses {language.label}.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Title
                <input value={form[field('title')]} onChange={(event) => update(field('title'), event.target.value)} className={`${fieldClass} mt-1.5 normal-case tracking-normal`} />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category
                <input value={form[field('category')]} onChange={(event) => update(field('category'), event.target.value)} placeholder={language.id === 'km' ? 'ការបន្លំ' : 'Phishing'} className={`${fieldClass} mt-1.5 normal-case tracking-normal`} />
              </label>
            </div>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Short description
              <textarea rows="2" value={form[field('shortDescription')]} onChange={(event) => update(field('shortDescription'), event.target.value)} className={`${fieldClass} mt-1.5 resize-y normal-case tracking-normal`} />
            </label>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Full content and examples
              <textarea rows="6" value={form[field('content')]} onChange={(event) => update(field('content'), event.target.value)} className={`${fieldClass} mt-1.5 resize-y normal-case tracking-normal`} />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                ['warningSigns', 'Warning signs'],
                ['preventionTips', 'Prevention tips'],
                ['indicators', 'Indicators / examples'],
              ].map(([key, label]) => (
                <label key={key} className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {label}
                  <textarea
                    rows="5"
                    value={Array.isArray(form[field(key)]) ? toLines(form[field(key)]) : form[field(key)]}
                    onChange={(event) => update(field(key), event.target.value)}
                    placeholder="One item per line"
                    className={`${fieldClass} mt-1.5 resize-y normal-case tracking-normal`}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-[#1e3568] dark:bg-[#101e40]/60">
            <h3 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">Shared settings</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Slug
                <input value={form.slug} onChange={(event) => update('slug', event.target.value)} placeholder="phishing-fake-links" className={`${fieldClass} mt-1.5 normal-case tracking-normal`} />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Icon <span className="normal-case tracking-normal">(optional)</span>
                <input value={form.icon || ''} onChange={(event) => update('icon', event.target.value)} placeholder="shield" className={`${fieldClass} mt-1.5 normal-case tracking-normal`} />
              </label>
            </div>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Image URL <span className="normal-case tracking-normal">(optional)</span>
              <input type="url" value={form.imageUrl || ''} onChange={(event) => update('imageUrl', event.target.value)} className={`${fieldClass} mt-1.5 normal-case tracking-normal`} />
            </label>
          </section>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Related topics</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {allTopics.filter((item) => item.id !== topic?.id).map((item) => (
                <label key={item.id} className="flex items-start gap-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-700 dark:border-[#1e3568] dark:text-slate-200">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={form.relatedTopicIds.includes(item.id)}
                    onChange={(event) => update('relatedTopicIds', event.target.checked
                      ? [...form.relatedTopicIds, item.id]
                      : form.relatedTopicIds.filter((id) => id !== item.id))}
                  />
                  <span><strong className="block">{item.title}</strong><small className="text-slate-500 dark:text-slate-400">{item.titleKm}</small></span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <input type="checkbox" checked={form.isPublished} onChange={(event) => update('isPublished', event.target.checked)} />
            Publish this bilingual item
          </label>
          {error ? <p className="m-0 text-sm font-semibold text-red-600" role="alert">{error}</p> : null}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-[#1e3568]/60">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-[#1e3568] dark:text-slate-300">Cancel</button>
            <button disabled={saving} type="submit" className="rounded-xl bg-[#012475] px-5 py-2 text-xs font-bold text-white disabled:opacity-60 dark:bg-[#10b981]">
              {saving ? 'Saving…' : 'Save bilingual knowledge'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SafetyKnowledge() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    api.admin.safetyKnowledge()
      .then((response) => { if (active) setTopics(response.knowledge || []); })
      .catch((requestError) => { if (active) setError(requestError.message || 'Could not load Community Safety knowledge.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.admin.safetyKnowledge();
      setTopics(response.knowledge || []);
    } catch (requestError) {
      setError(requestError.message || 'Could not load Community Safety knowledge.');
    } finally {
      setLoading(false);
    }
  };
  const save = async (id, data) => {
    if (id) await api.admin.updateSafetyKnowledge(id, data);
    else await api.admin.createSafetyKnowledge(data);
    await load();
  };
  const togglePublication = async (topic) => {
    try {
      await api.admin.publishSafetyKnowledge(topic.id, !topic.isPublished);
      await load();
    } catch (requestError) {
      setError(requestError.message || 'Could not update publication status.');
    }
  };
  const remove = async (topic) => {
    if (!window.confirm(`Delete “${topic.title}”?`)) return;
    try {
      await api.admin.deleteSafetyKnowledge(topic.id);
      await load();
    } catch (requestError) {
      setError(requestError.message || 'Could not delete this knowledge item.');
    }
  };
  const normalizedQuery = query.toLocaleLowerCase();
  const visible = topics.filter((topic) => [topic.title, topic.titleKm, topic.category, topic.categoryKm, topic.slug]
    .filter(Boolean)
    .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Community Safety</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create and manage bilingual safety knowledge for community members.</p>
        </div>
        <button type="button" onClick={() => setEditing(null)} className="rounded-xl bg-[#012475] px-4 py-2.5 text-sm font-bold text-white shadow-sm dark:bg-[#4b9efe] dark:text-[#070d1e]">
          <i className="fa-solid fa-plus mr-2" />New knowledge
        </button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search English or Khmer knowledge…" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#4b9efe] dark:border-[#1e3568] dark:bg-[#0c1733] dark:text-white sm:max-w-md" />
        <span className="text-xs text-slate-500 dark:text-slate-400">{topics.length} bilingual items</span>
      </div>
      {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500 dark:border-[#1e3568] dark:bg-[#0c1733]">Loading Community Safety knowledge…</div> : null}
      {!loading && error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}
      {!loading && !error && !visible.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-[#1e3568] dark:bg-[#0c1733]">
          <i className="fa-solid fa-shield-halved mb-3 text-3xl text-slate-300 dark:text-slate-600" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">No knowledge items found</h2>
          <p className="mt-1 text-xs text-slate-400">Create a topic or adjust your search.</p>
        </div>
      ) : null}
      {!loading && !error && visible.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((topic) => (
            <article key={topic.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#1e3568] dark:bg-[#0c1733]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="m-0 text-base font-bold text-slate-900 dark:text-white">{topic.title}</h2>
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-[#012475] dark:bg-[#132248] dark:text-[#4b9efe]">EN + ខ្មែរ</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${topic.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{topic.isPublished ? 'Published' : 'Draft'}</span>
                  </div>
                  <p className="mb-0 mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{topic.titleKm}</p>
                  <p className="mb-0 mt-1 text-xs font-semibold text-[#4b9efe]">{topic.category} · {topic.categoryKm}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{dateLabel(topic.updatedAt)}</span>
              </div>
              <p className="mb-0 mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">{topic.shortDescription}</p>
              <div className="mt-auto pt-4">
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-[#1e3568]/60">
                  <button type="button" onClick={() => setEditing(topic)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 dark:border-[#1e3568] dark:text-slate-200">Edit</button>
                  <button type="button" onClick={() => togglePublication(topic)} className="rounded-lg bg-[#eaf2ff] px-3 py-2 text-xs font-bold text-[#012475] dark:bg-[#132248] dark:text-[#4b9efe]">{topic.isPublished ? 'Unpublish' : 'Publish'}</button>
                  <button type="button" onClick={() => remove(topic)} className="rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
      {editing !== undefined ? <TopicModal key={editing?.id || 'new'} allTopics={topics} topic={editing} onClose={() => setEditing(undefined)} onSave={save} /> : null}
    </div>
  );
}
