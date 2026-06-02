# Patient App

PANATES Poliklinik Hasta Takip Sistemi — Abisena/Panates case study.

## Hakkında

Editöryel tasarımlı tek-sayfa poliklinik hasta takip arayüzü. API'den hasta listesini çeker, yeni hasta ekleme/düzenleme/silme işlemlerini lokal state üzerinde yönetir. TR/EN dil desteği vardır.

## Özellikler

- Hasta listesi (50 kayıt) — gerçek API'den
- Arama, departman filtresi, 5'li sıralama
- Yeni hasta ekleme + düzenleme + silme (lokal)
- Form validasyonu (react-hook-form)
- TR / EN dil değişimi (i18next)
- Editorial tipografi (Cormorant Garamond + Inter Tight + JetBrains Mono)
- Sticky tablo başlığı
- Tarih validasyonu (doğum tarihi hard kural, randevu soft uyarı)
- KPI dashboard (Toplam, Bekleyen, Acil, Ort. Skor)

## Stack

| Katman | Teknoloji |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| i18n | i18next + react-i18next |
| Form | react-hook-form |
| HTTP | fetch (native) |

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # prod build (dist/)
npm run preview      # prod build'i serve et
```

Node 18+ gerekli.

## Yapı

```
src/
├── components/     12 component (PatientDashboard ana)
├── hooks/          usePatients (fetch + CRUD)
├── i18n/           tr.json + en.json
├── types/          PatientRecord ve enum'lar
├── constants/      seed (fallback) + catalog (renkler, sıralar)
└── utils/          date, patient (uid, emptyPatient)
```

## Notlar

- **GET API:** `https://v0-json-api-three.vercel.app/api/data`
- **CRUD:** Lokal state — PDF gereği "ekleme/düzenleme/silme local state üzerinde"
- **Refresh sonrası:** Eklenen/değiştirilen kayıtlar kaybolur
- **API erişilemezse:** Fallback olarak `src/constants/seed.ts` (7 kayıt) gösterilir

Detaylı case study referansı: [abisena-case-study.pdf](../abisena-case-study.pdf)
