import { useTranslation } from 'react-i18next'

export const WalkFilters = ({ value = 'all', onChange }) => {
  const { t } = useTranslation()
  const filters = [
    { id: 'all', label: t('filters.all') },
    { id: 'old-city', label: t('filters.oldCity') },
    { id: 'architecture', label: t('filters.architecture') },
    { id: 'history', label: t('filters.history') },
    { id: 'colonial', label: t('filters.colonial') },
  ]
  return <div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filter heritage walks">
    {filters.map(filter => <button key={filter.id} type="button" onClick={() => onChange(filter.id)} aria-pressed={value === filter.id} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${value === filter.id ? 'border-terracotta bg-terracotta text-white shadow-md shadow-terracotta/15' : 'border-brown/15 bg-white text-brown/70 hover:border-terracotta/50 hover:text-terracotta'}`}>{filter.label}</button>)}
  </div>
}
