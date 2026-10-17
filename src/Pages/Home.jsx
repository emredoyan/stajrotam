import { useEffect, useState } from 'react'
import ApplicationForm from '../Components/ApplicationForm'

function Home() {

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('stajrotam-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)

    try {
      localStorage.setItem(
        'stajrotam-theme',
        darkMode ? 'dark' : 'light'
      )
    } catch {
      console.warn('Tema tercihi kaydedilemedi.')
    }
  }, [darkMode])

    const [searchTerm, setSearchTerm] = useState('')
  const [applications, setApplications] = useState(() => {
  try {
    const savedApplications = localStorage.getItem('stajrotam-applications')
    const parsedApplications = savedApplications
      ? JSON.parse(savedApplications)
      : []

    return Array.isArray(parsedApplications) ? parsedApplications : []
  } catch {
    return []
  }
})

useEffect(() => {
  try {
    localStorage.setItem(
      'stajrotam-applications',
      JSON.stringify(applications)
    )
  } catch {
    alert('Başvurular tarayıcıya kaydedilemedi. Tarayıcı depolama ayarlarını kontrol et.')
  }
}, [applications])

  function addApplication(newApplication) {
    setApplications((previous) => [newApplication, ...previous])
  }
function deleteApplication(id) {
  const confirmed = window.confirm(
    'Bu başvuruyu silmek istediğine emin misin?'
  )

  if (!confirmed) return

  setApplications((previous) =>
    previous.filter((application) => application.id !== id)
  )
}
    function updateApplicationStatus(id, newStatus) {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id
          ? { ...application, status: newStatus }
          : application
      )
    )
  }
    const statistics = [
    {
      title: 'Toplam Başvuru',
      count: applications.length,
      color: 'text-blue-600',
    },
    {
      title: 'Değerlendirmede',
      count: applications.filter(
        (application) => application.status === 'Değerlendirmede'
      ).length,
      color: 'text-amber-600',
    },
    {
      title: 'Mülakat',
      count: applications.filter(
        (application) => application.status === 'Mülakat'
      ).length,
      color: 'text-purple-600',
    },
    {
      title: 'Kabul Edildi',
      count: applications.filter(
        (application) => application.status === 'Kabul Edildi'
      ).length,
      color: 'text-emerald-600',
    },
  ]
    const filteredApplications = applications.filter((application) => {
    const search = searchTerm.trim().toLocaleLowerCase('tr-TR')

    return (
      application.company.toLocaleLowerCase('tr-TR').includes(search) ||
      application.position.toLocaleLowerCase('tr-TR').includes(search)
    )
  })
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <div className="mb-6 flex justify-end">
  <button
    type="button"
    onClick={() => setDarkMode((previous) => !previous)}
    aria-pressed={darkMode}
    aria-label="Koyu tema"
    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
  >
    {darkMode ? '☀️ Aydınlık Tema' : '🌙 Koyu Tema'}
  </button>
</div>
          <p className="mb-2 text-sm font-semibold tracking-widest text-blue-600">
            İŞ VE STAJ BAŞVURU TAKİBİ
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            StajRotam
          </h1>

          <p className="mt-3 text-slate-600">
            Başvurularını düzenle, süreçlerini takip et ve
            kariyerindeki bir sonraki adımı planla.
          </p>
        </header>

        <section
  aria-label="Başvuru istatistikleri"
  className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
>
  {statistics.map((statistic) => (
    <div
      key={statistic.title}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <p className="text-sm font-medium text-slate-500">
        {statistic.title}
      </p>

      <p className={`mt-3 text-3xl font-bold ${statistic.color}`}>
        {statistic.count}
      </p>
    </div>
  ))}
</section>
        <ApplicationForm onAdd={addApplication} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Başvurularım
            </h2>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {applications.length} başvuru
            </span>
          </div>
<div className="mt-6">
  <label
    htmlFor="application-search"
    className="block text-sm font-medium text-slate-700"
  >
    Başvurularda ara
  </label>

  <input
    id="application-search"
    type="search"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Şirket veya pozisyon yaz..."
    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
  />
</div>
          {filteredApplications.length === 0 ? (
            <p className="mt-5 text-slate-500">
  {applications.length === 0
    ? 'Henüz başvuru eklemedin. Yukarıdaki formdan ilk başvurunu oluşturabilirsin.'
    : 'Aramana uygun başvuru bulunamadı.'}
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {filteredApplications.map((application) => (
                <li
                  key={application.id}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {application.company}
                  </h3>

                  <p className="mt-1 text-slate-600">
                    {application.position}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    Başvuru tarihi:{' '}
                    {application.date.split('-').reverse().join('.')}
                  </p>

                                <div className="mt-4">
  <label
    htmlFor={`status-${application.id}`}
    className="block text-sm font-medium text-slate-700"
  >
    Başvuru durumu
  </label>

  <select
    id={`status-${application.id}`}
    value={application.status}
    onChange={(event) =>
      updateApplicationStatus(application.id, event.target.value)
    }
    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
  >
    <option value="Başvuru Yapıldı">Başvuru Yapıldı</option>
    <option value="Değerlendirmede">Değerlendirmede</option>
    <option value="Mülakat">Mülakat</option>
    <option value="Kabul Edildi">Kabul Edildi</option>
    <option value="Olumsuz">Olumsuz</option>
  </select>
</div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => deleteApplication(application.id)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home