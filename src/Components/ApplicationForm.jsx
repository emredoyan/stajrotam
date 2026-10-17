function ApplicationForm({ onAdd }) {
  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Yeni Başvuru
      </h2>

      <form
        className="mt-6 grid gap-5 sm:grid-cols-2"
onSubmit={(event) => {
  event.preventDefault()

  const form = event.currentTarget
  const formData = new FormData(form)

  const company = formData.get('company').trim()
  const position = formData.get('position').trim()

  if (!company || !position) {
    alert('Lütfen şirket adı ve pozisyonu doldur.')
    return
  }

  onAdd({
    id: crypto.randomUUID(),
    company,
    position,
    date: formData.get('date'),
    status: formData.get('status'),
  })

  form.reset()
}}      >
        <div>
          <label htmlFor="company" className="font-medium text-slate-700">
            Şirket adı
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Örn. TEI"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="position" className="font-medium text-slate-700">
            Pozisyon
          </label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="Örn. Aday Mühendis"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="date" className="font-medium text-slate-700">
            Başvuru tarihi
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="status" className="font-medium text-slate-700">
            Başvuru durumu
          </label>
          <select id="status" name="status" className={inputClass}>
            <option value="Başvuru Yapıldı">Başvuru Yapıldı</option>
            <option value="Değerlendirmede">Değerlendirmede</option>
            <option value="Mülakat">Mülakat</option>
            <option value="Kabul Edildi">Kabul Edildi</option>
            <option value="Olumsuz">Olumsuz</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:col-span-2"
        >
          Başvuru Ekle
        </button>
      </form>
    </section>
  )
}

export default ApplicationForm