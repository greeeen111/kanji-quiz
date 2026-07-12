# Kanji Quiz Advance

Web quiz kanji N5/N4 — 150 soal, 3 mode:

- **Belajar Dulu (Flashcard)** — kartu kanji + bacaan + arti, per level, bisa dibolak-balik.
- **Kuis Bertahap** — Level 1 → 2 → 3, makin susah. Harus lulus (≥70%) satu level untuk buka level berikutnya.
- **Mode Kecepatan** — tiap soal dikasih waktu 12 detik, makin cepat jawab benar makin besar skornya, ada combo streak.

Tidak butuh server, database, atau login. Semua jalan di browser (HTML/CSS/JS biasa).

## Struktur file

```
index.html        halaman utama
css/style.css      semua styling
js/data.js         bank soal (150 soal, kanji + bacaan + arti + level + topik)
js/app.js          logika aplikasi (routing antar layar, skor, timer, dst.)
```

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub (public), misalnya `kanji-quiz`.
2. Upload 4 file/folder di atas (`index.html`, `css/`, `js/`) ke repo itu — bisa lewat **Add file → Upload files** di web GitHub, tidak perlu command line.
3. Buka tab **Settings → Pages** di repo tersebut.
4. Di bagian **Build and deployment**, pilih source **Deploy from a branch**, branch `main`, folder `/ (root)`. Klik **Save**.
5. Tunggu 1–2 menit, link situsnya muncul di bagian atas halaman itu — bentuknya kira-kira
   `https://<username-github-lu>.github.io/kanji-quiz/`.
6. Link itu yang disebar ke murid. Bisa dibuka langsung dari HP, tidak perlu install apa-apa.

Setiap kali file di-upload ulang/di-edit di GitHub, situsnya otomatis update dalam 1-2 menit.

## Menambah paket kosakata baru (misalnya MNN1 / MNN2)

Buka `js/data.js`, tambahkan objek baru ke array `QUESTION_BANK` dengan format yang sama:

```js
{ level:1, type:"reading", topic:"Nama Topik", prompt:"漢字", meaning:"Arti Indonesia", correct:"かんじ", distractors:["a","b","c"] },
```

Keterangan field:
- `level` — `1` (dasar), `2` (menengah), atau `3` (lanjutan). Menentukan soal itu muncul di level mana pada Kuis Bertahap.
- `type` — `"reading"` (kanji → bacaan, bisa dipakai di flashcard), `"describe"` (deskripsi Indonesia → pilih kanji), atau `"odd"` (cari kata yang beda sendiri).
- `topic` — label pengelompokan, muncul di flashcard dan di atas kartu soal.
- `meaning` — wajib diisi kalau `type` nya `"reading"`, supaya muncul di flashcard.
- `correct` / `distractors` — jawaban benar dan 3 pengecoh.

Tidak perlu ubah apa pun di `app.js` — soal baru otomatis ikut ke-shuffle dan masuk ke pool level yang sesuai.

## Catatan

- Skor dan progres level **tidak disimpan** ke mana pun — reset tiap kali halaman di-reload. Ini disengaja supaya aman dipakai bareng-bareng tanpa akun.
- Kalau nanti mau tambah leaderboard bareng murid-murid, itu perlu backend/database terpisah (misalnya Firebase) karena GitHub Pages murni situs statis — tinggal bilang kalau butuh diarahkan ke situ.
