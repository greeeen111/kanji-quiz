/* =========================================================================
   QUESTION BANK — Kanji Quiz Advance
   Setiap soal punya:
   - level    : 1 (dasar) | 2 (menengah) | 3 (lanjutan)  -> dipakai utk mode bertahap
   - type     : 'reading'  = kanji -> pilih bacaan hiragana
                'describe' = deskripsi Indonesia -> pilih kanji yang tepat
                'odd'      = cari kata yang TIDAK sekategori
   - topic    : dipakai buat pengelompokan flashcard
   - prompt   : untuk type 'reading', ini kanji-nya. untuk 'describe'/'odd', ini teks soalnya.
   - meaning  : arti bahasa Indonesia (dipakai di flashcard, hanya utk type 'reading')
   - correct  : jawaban benar
   - distractors : 3 pilihan pengecoh

   Menambah paket baru (mis. MNN1 / MNN2) tinggal push object baru ke array
   QUESTION_BANK dengan format yang sama, lalu set level & topic yang sesuai.
   ========================================================================= */

const QUESTION_BANK = [

  // ---------------- LEVEL 1 — Paket Dasar (bacaan kanji) ----------------
  { level:1, type:"reading", topic:"Keluarga", prompt:"家族", meaning:"Keluarga", correct:"かぞく", distractors:["かいぎ","きゅうりょう","しごと"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"兄", meaning:"Kakak laki-laki (sendiri)", correct:"あに", distractors:["あね","おとうと","いもうと"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"姉", meaning:"Kakak perempuan (sendiri)", correct:"あね", distractors:["あに","むすめ","むすこ"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"弟", meaning:"Adik laki-laki (sendiri)", correct:"おとうと", distractors:["いもうと","むすこ","むすめ"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"妹", meaning:"Adik perempuan (sendiri)", correct:"いもうと", distractors:["おとうと","あね","あに"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"両親", meaning:"Kedua orang tua", correct:"りょうしん", distractors:["ちちおや","ははおや","かぞく"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"父親", meaning:"Ayah", correct:"ちちおや", distractors:["ははおや","りょうしん","おっと"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"母親", meaning:"Ibu", correct:"ははおや", distractors:["ちちおや","つま","りょうしん"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"夫", meaning:"Suami", correct:"おっと", distractors:["つま","むすこ","むすめ"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"妻", meaning:"Istri", correct:"つま", distractors:["おっと","まご","あね"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"息子", meaning:"Anak laki-laki (sendiri)", correct:"むすこ", distractors:["むすめ","まご","あに"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"娘", meaning:"Anak perempuan (sendiri)", correct:"むすめ", distractors:["むすこ","いもうと","あね"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"孫", meaning:"Cucu", correct:"まご", distractors:["むすこ","むすめ","おっと"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"男性", meaning:"Laki-laki", correct:"だんせい", distractors:["じょせい","かぞく","りょうしん"] },
  { level:1, type:"reading", topic:"Keluarga", prompt:"女性", meaning:"Perempuan", correct:"じょせい", distractors:["だんせい","あね","いもうと"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"体", meaning:"Tubuh/badan", correct:"からだ", distractors:["あたま","かお","かみ"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"頭", meaning:"Kepala", correct:"あたま", distractors:["からだ","くび","むね"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"顔", meaning:"Wajah", correct:"かお", distractors:["かみ","はな","くび"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"髪", meaning:"Rambut", correct:"かみ", distractors:["かお","ゆび","うで"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"鼻", meaning:"Hidung", correct:"はな", distractors:["くび","むね","ゆび"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"首", meaning:"Leher", correct:"くび", distractors:["はな","うで","あたま"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"腕", meaning:"Lengan", correct:"うで", distractors:["ゆび","むね","くび"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"指", meaning:"Jari/jemari", correct:"ゆび", distractors:["うで","はな","かみ"] },
  { level:1, type:"reading", topic:"Tubuh", prompt:"胸", meaning:"Dada", correct:"むね", distractors:["くび","あたま","からだ"] },
  { level:1, type:"reading", topic:"Kerja", prompt:"仕事", meaning:"Pekerjaan", correct:"しごと", distractors:["きゅうりょう","かいぎ","こうつう"] },
  { level:1, type:"reading", topic:"Kerja", prompt:"給料", meaning:"Gaji", correct:"きゅうりょう", distractors:["しごと","かいぎ","どうろ"] },
  { level:1, type:"reading", topic:"Kerja", prompt:"会議", meaning:"Rapat", correct:"かいぎ", distractors:["しごと","きゅうりょう","こうつう"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"食べ物", meaning:"Makanan", correct:"たべもの", distractors:["のみもの","やさい","にく"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"飲み物", meaning:"Minuman", correct:"のみもの", distractors:["たべもの","にく","やさい"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"野菜", meaning:"Sayur", correct:"やさい", distractors:["にく","たべもの","のみもの"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"肉", meaning:"Daging", correct:"にく", distractors:["やさい","ぎゅうにく","ぶたにく"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"牛肉", meaning:"Daging sapi", correct:"ぎゅうにく", distractors:["ぶたにく","とりにく","にく"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"豚肉", meaning:"Daging babi", correct:"ぶたにく", distractors:["ぎゅうにく","とりにく","にく"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"鶏肉", meaning:"Daging ayam", correct:"とりにく", distractors:["ぎゅうにく","ぶたにく","にく"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"朝食", meaning:"Makan pagi", correct:"ちょうしょく", distractors:["ちゅうしょく","ゆうしょく","たべもの"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"昼食", meaning:"Makan siang", correct:"ちゅうしょく", distractors:["ちょうしょく","ゆうしょく","のみもの"] },
  { level:1, type:"reading", topic:"Makanan", prompt:"夕食", meaning:"Makan malam", correct:"ゆうしょく", distractors:["ちょうしょく","ちゅうしょく","やさい"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"自転車", meaning:"Sepeda", correct:"じてんしゃ", distractors:["じどうしゃ","ひこうき","ふね"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"自動車", meaning:"Mobil", correct:"じどうしゃ", distractors:["じてんしゃ","ふね","ひこうき"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"飛行機", meaning:"Pesawat terbang", correct:"ひこうき", distractors:["じどうしゃ","じてんしゃ","ふね"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"船", meaning:"Kapal laut", correct:"ふね", distractors:["ひこうき","じてんしゃ","どうろ"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"道路", meaning:"Jalan raya", correct:"どうろ", distractors:["こうつう","ふね","じどうしゃ"] },
  { level:1, type:"reading", topic:"Transportasi", prompt:"交通", meaning:"Transportasi/lalu lintas", correct:"こうつう", distractors:["どうろ","しごと","かいぎ"] },
  { level:1, type:"reading", topic:"Warna", prompt:"色", meaning:"Warna", correct:"いろ", distractors:["あおいろ","あかいろ","くろいろ"] },
  { level:1, type:"reading", topic:"Warna", prompt:"青色", meaning:"Biru", correct:"あおいろ", distractors:["あかいろ","くろいろ","しろいろ"] },
  { level:1, type:"reading", topic:"Warna", prompt:"赤色", meaning:"Merah", correct:"あかいろ", distractors:["あおいろ","しろいろ","くろいろ"] },
  { level:1, type:"reading", topic:"Warna", prompt:"黒色", meaning:"Hitam", correct:"くろいろ", distractors:["しろいろ","あおいろ","あかいろ"] },
  { level:1, type:"reading", topic:"Warna", prompt:"白色", meaning:"Putih", correct:"しろいろ", distractors:["くろいろ","あかいろ","いろ"] },
  { level:1, type:"reading", topic:"Kesehatan", prompt:"病気", meaning:"Penyakit", correct:"びょうき", distractors:["かぜ","ねつ","せき"] },
  { level:1, type:"reading", topic:"Kesehatan", prompt:"風邪", meaning:"Masuk angin/flu", correct:"かぜ", distractors:["びょうき","ねつ","せき"] },

  // ---------------- LEVEL 2 — Paket Tambahan (bacaan kanji, lebih variatif) ----------------
  { level:2, type:"reading", topic:"Keluarga", prompt:"親", meaning:"Orang tua", correct:"おや", distractors:["りょうしん","かぞく","まご"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"お兄さん", meaning:"Kakak laki-laki (orang lain)", correct:"おにいさん", distractors:["あに","おねえさん","あね"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"お姉さん", meaning:"Kakak perempuan (orang lain)", correct:"おねえさん", distractors:["あね","おにいさん","あに"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"ご主人", meaning:"Suami (orang lain)", correct:"ごしゅじん", distractors:["おっと","つま","おくさん"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"奥さん", meaning:"Istri (orang lain)", correct:"おくさん", distractors:["つま","ごしゅじん","おっと"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"伯父", meaning:"Om/paman", correct:"おじ", distractors:["おば","まご","りょうしん"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"伯母", meaning:"Tante/bibi", correct:"おば", distractors:["おじ","まご","りょうしん"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"先輩", meaning:"Senior", correct:"せんぱい", distractors:["こうはい","どうりょう","しゃちょう"] },
  { level:2, type:"reading", topic:"Keluarga", prompt:"後輩", meaning:"Junior", correct:"こうはい", distractors:["せんぱい","どうりょう","しゃちょう"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"髭", meaning:"Kumis", correct:"ひげ", distractors:["のど","かみ","はな"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"喉", meaning:"Tenggorokan", correct:"のど", distractors:["ひげ","くび","むね"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"お腹", meaning:"Perut", correct:"おなか", distractors:["こし","せなか","むね"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"腰", meaning:"Pinggang", correct:"こし", distractors:["おなか","せなか","ほね"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"お尻", meaning:"Pantat", correct:"おしり", distractors:["せなか","こし","ほね"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"背中", meaning:"Punggung", correct:"せなか", distractors:["こし","おしり","ほね"] },
  { level:2, type:"reading", topic:"Tubuh", prompt:"骨", meaning:"Tulang", correct:"ほね", distractors:["せなか","こし","からだ"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"社長", meaning:"Bos/kepala perusahaan", correct:"しゃちょう", distractors:["ぶちょう","かちょう","てんいん"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"店員", meaning:"Pelayan/karyawan toko", correct:"てんいん", distractors:["しゃちょう","けいさつ","かしゅ"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"警察", meaning:"Polisi/kepolisian", correct:"けいさつ", distractors:["てんいん","はいしゃ","しゃちょう"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"歌手", meaning:"Penyanyi", correct:"かしゅ", distractors:["うんてんしゅ","てんいん","どうりょう"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"運転手", meaning:"Supir", correct:"うんてんしゅ", distractors:["かしゅ","てんいん","どうりょう"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"同僚", meaning:"Rekan kerja", correct:"どうりょう", distractors:["せんぱい","こうはい","しゃちょう"] },
  { level:2, type:"reading", topic:"Profesi", prompt:"歯医者", meaning:"Dokter gigi", correct:"はいしゃ", distractors:["けいさつ","てんいん","しゃちょう"] },
  { level:2, type:"reading", topic:"Kerja", prompt:"面接", meaning:"Interview", correct:"めんせつ", distractors:["りれきしょ","しゅっちょう","かいぎ"] },
  { level:2, type:"reading", topic:"Kerja", prompt:"履歴書", meaning:"CV", correct:"りれきしょ", distractors:["めんせつ","しょるい","きゅうりょう"] },
  { level:2, type:"reading", topic:"Kerja", prompt:"出張", meaning:"Perjalanan dinas", correct:"しゅっちょう", distractors:["かいぎ","めんせつ","きゅうりょう"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"料理", meaning:"Masakan", correct:"りょうり", distractors:["やさい","たべもの","にく"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"玉ねぎ", meaning:"Bawang bombay", correct:"たまねぎ", distractors:["にんじん","なす","やさい"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"人参", meaning:"Wortel", correct:"にんじん", distractors:["たまねぎ","なす","やさい"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"茄子", meaning:"Terong", correct:"なす", distractors:["たまねぎ","にんじん","やさい"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"米", meaning:"Beras", correct:"こめ", distractors:["にく","やさい","たべもの"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"お酒", meaning:"Sake/minuman keras", correct:"おさけ", distractors:["おちゃ","おゆ","のみもの"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"お茶", meaning:"Teh", correct:"おちゃ", distractors:["おさけ","おゆ","のみもの"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"お湯", meaning:"Air panas", correct:"おゆ", distractors:["おちゃ","おさけ","のみもの"] },
  { level:2, type:"reading", topic:"Dapur", prompt:"洋食", meaning:"Makanan Barat", correct:"ようしょく", distractors:["りょうり","たべもの","やさい"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"乗り物", meaning:"Kendaraan", correct:"のりもの", distractors:["どうろ","こうつう","じどうしゃ"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"救急車", meaning:"Ambulans", correct:"きゅうきゅうしゃ", distractors:["しょうぼうしゃ","じどうしゃ","じてんしゃ"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"消防車", meaning:"Mobil damkar", correct:"しょうぼうしゃ", distractors:["きゅうきゅうしゃ","じどうしゃ","じてんしゃ"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"新幹線", meaning:"Shinkansen", correct:"しんかんせん", distractors:["ちかてつ","どうろ","こうつう"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"信号", meaning:"Lampu lalu lintas", correct:"しんごう", distractors:["どうろ","こうつう","のりもの"] },
  { level:2, type:"reading", topic:"Transportasi", prompt:"地下鉄", meaning:"Kereta bawah tanah", correct:"ちかてつ", distractors:["しんかんせん","どうろ","こうつう"] },
  { level:2, type:"reading", topic:"Pakaian", prompt:"服", meaning:"Pakaian", correct:"ふく", distractors:["ようふく","わふく","きもの"] },
  { level:2, type:"reading", topic:"Pakaian", prompt:"洋服", meaning:"Pakaian ala Barat", correct:"ようふく", distractors:["わふく","きもの","ふく"] },
  { level:2, type:"reading", topic:"Pakaian", prompt:"着物", meaning:"Kimono", correct:"きもの", distractors:["ふく","ようふく","わふく"] },
  { level:2, type:"reading", topic:"Pakaian", prompt:"下着", meaning:"Pakaian dalam", correct:"したぎ", distractors:["くつした","てぶくろ","ぼうし"] },
  { level:2, type:"reading", topic:"Pakaian", prompt:"靴下", meaning:"Kaos kaki", correct:"くつした", distractors:["したぎ","てぶくろ","ぼうし"] },
  { level:2, type:"reading", topic:"Arah & Dunia", prompt:"南", meaning:"Selatan", correct:"みなみ", distractors:["きた","ひがし","にし"] },
  { level:2, type:"reading", topic:"Arah & Dunia", prompt:"東", meaning:"Timur", correct:"ひがし", distractors:["きた","みなみ","にし"] },
  { level:2, type:"reading", topic:"Arah & Dunia", prompt:"西", meaning:"Barat", correct:"にし", distractors:["きた","みなみ","ひがし"] },
  { level:2, type:"reading", topic:"Arah & Dunia", prompt:"世界", meaning:"Dunia", correct:"せかい", distractors:["くに","にほん","ちゅうごく"] },

  // ---------------- LEVEL 2 — Paket Kreatif bagian A (bacaan kanji, tema hobi & alam) ----------------
  { level:2, type:"reading", topic:"Hobi", prompt:"趣味", meaning:"Hobi", correct:"しゅみ", distractors:["しごと","かいぎ","きゅうりょう"] },
  { level:2, type:"reading", topic:"Hobi", prompt:"写真", meaning:"Foto", correct:"しゃしん", distractors:["えいが","おんがく","りょこう"] },
  { level:2, type:"reading", topic:"Hobi", prompt:"映画", meaning:"Film", correct:"えいが", distractors:["しゃしん","おんがく","まんが"] },
  { level:2, type:"reading", topic:"Hobi", prompt:"旅行", meaning:"Jalan-jalan/tamasya", correct:"りょこう", distractors:["しゅみ","えいが","かいもの"] },
  { level:2, type:"reading", topic:"Hobi", prompt:"音楽", meaning:"Musik", correct:"おんがく", distractors:["うた","えいが","しゃしん"] },
  { level:2, type:"reading", topic:"Hobi", prompt:"買い物", meaning:"Belanja", correct:"かいもの", distractors:["りょこう","しゅみ","しごと"] },
  { level:2, type:"reading", topic:"Alam", prompt:"光", meaning:"Cahaya", correct:"ひかり", distractors:["おと","かぜ","くも"] },
  { level:2, type:"reading", topic:"Alam", prompt:"音", meaning:"Suara", correct:"おと", distractors:["ひかり","かぜ","くも"] },
  { level:2, type:"reading", topic:"Alam", prompt:"太陽", meaning:"Matahari", correct:"たいよう", distractors:["くも","かぜ","うみ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"雲", meaning:"Awan", correct:"くも", distractors:["たいよう","かぜ","うみ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"天気", meaning:"Cuaca", correct:"てんき", distractors:["きせつ","てんきよほう","つゆ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"天気予報", meaning:"Ramalan cuaca", correct:"てんきよほう", distractors:["てんき","きせつ","つゆ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"季節", meaning:"Musim", correct:"きせつ", distractors:["てんき","つゆ","けしき"] },
  { level:2, type:"reading", topic:"Alam", prompt:"梅雨", meaning:"Musim hujan", correct:"つゆ", distractors:["きせつ","てんき","くも"] },
  { level:2, type:"reading", topic:"Alam", prompt:"景色", meaning:"Pemandangan", correct:"けしき", distractors:["くうき","もり","はやし"] },
  { level:2, type:"reading", topic:"Alam", prompt:"空気", meaning:"Udara", correct:"くうき", distractors:["けしき","かぜ","ひかり"] },
  { level:2, type:"reading", topic:"Alam", prompt:"湖", meaning:"Danau", correct:"みずうみ", distractors:["うみ","いけ","もり"] },
  { level:2, type:"reading", topic:"Alam", prompt:"海", meaning:"Laut", correct:"うみ", distractors:["みずうみ","いけ","はやし"] },
  { level:2, type:"reading", topic:"Alam", prompt:"森", meaning:"Hutan rimba", correct:"もり", distractors:["はやし","いけ","うみ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"林", meaning:"Hutan", correct:"はやし", distractors:["もり","いけ","うみ"] },
  { level:2, type:"reading", topic:"Alam", prompt:"池", meaning:"Kolam", correct:"いけ", distractors:["みずうみ","うみ","もり"] },
  { level:2, type:"reading", topic:"Hewan", prompt:"動物", meaning:"Binatang", correct:"どうぶつ", distractors:["いぬ","ねこ","とり"] },
  { level:2, type:"reading", topic:"Hewan", prompt:"子犬", meaning:"Anak anjing", correct:"こいぬ", distractors:["こねこ","ことり","いぬ"] },
  { level:2, type:"reading", topic:"Hewan", prompt:"子猫", meaning:"Anak kucing", correct:"こねこ", distractors:["こいぬ","ことり","ねこ"] },
  { level:2, type:"reading", topic:"Hewan", prompt:"小鳥", meaning:"Burung kecil", correct:"ことり", distractors:["こいぬ","こねこ","とり"] },

  // ---------------- LEVEL 3 — Paket Kreatif bagian B (deskripsi -> kanji) ----------------
  { level:3, type:"describe", topic:"Acara", prompt:"Acara tradisional melihat bunga sakura di musim semi", correct:"花見", distractors:["お祭り","花火大会","運動会"] },
  { level:3, type:"describe", topic:"Acara", prompt:"Acara olahraga tahunan di sekolah", correct:"運動会", distractors:["展覧会","結婚式","お祭り"] },
  { level:3, type:"describe", topic:"Acara", prompt:"Upacara pernikahan", correct:"結婚式", distractors:["展覧会","花見","お祭り"] },
  { level:3, type:"describe", topic:"Acara", prompt:"Acara kembang api di malam hari", correct:"花火大会", distractors:["花見","お祭り","展覧会"] },
  { level:3, type:"describe", topic:"Acara", prompt:"Pameran karya seni atau lukisan", correct:"展覧会", distractors:["コンサート","お祭り","結婚式"] },
  { level:3, type:"describe", topic:"Arah", prompt:"Arah mata angin yang berlawanan dengan Selatan (南)", correct:"北", distractors:["東","西","南東"] },
  { level:3, type:"describe", topic:"Arah", prompt:"Arah di antara Utara dan Timur", correct:"北東", distractors:["北西","南東","南西"] },
  { level:3, type:"describe", topic:"Arah", prompt:"Arah di antara Selatan dan Barat", correct:"南西", distractors:["北西","南東","北東"] },
  { level:3, type:"describe", topic:"Warna", prompt:"Warna seperti kulit kayu, mirip warna kopi", correct:"茶色", distractors:["黄色","銀色","黒色"] },
  { level:3, type:"describe", topic:"Warna", prompt:"Warna cerah seperti matahari atau pisang", correct:"黄色", distractors:["茶色","銀色","青色"] },
  { level:3, type:"describe", topic:"Warna", prompt:"Warna logam yang berkilau, seperti uang koin", correct:"銀色", distractors:["茶色","黄色","白色"] },
  { level:3, type:"describe", topic:"Aksesoris", prompt:"Benda yang dipakai di jari sebagai simbol pernikahan", correct:"指輪", distractors:["手袋","帽子","眼鏡"] },
  { level:3, type:"describe", topic:"Aksesoris", prompt:"Benda yang dipakai di tangan agar tidak kedinginan", correct:"手袋", distractors:["指輪","眼鏡","帽子"] },
  { level:3, type:"describe", topic:"Aksesoris", prompt:"Benda yang dipakai di kepala untuk gaya atau melindungi dari matahari", correct:"帽子", distractors:["手袋","指輪","眼鏡"] },
  { level:3, type:"describe", topic:"Aksesoris", prompt:"Benda yang membantu orang melihat lebih jelas", correct:"眼鏡", distractors:["帽子","指輪","手袋"] },

  // ---------------- LEVEL 3 — Paket Kreatif bagian C (cari yang beda sendiri) ----------------
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori arah mata angin?", correct:"道路", distractors:["北","南","東"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori hewan?", correct:"天気", distractors:["犬","猫","鳥"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori acara/festival?", correct:"天気予報", distractors:["花見","お祭り","結婚式"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori warna?", correct:"季節", distractors:["黄色","茶色","銀色"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori alam (nature)?", correct:"写真", distractors:["海","森","湖"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori pakaian/aksesoris?", correct:"音楽", distractors:["帽子","手袋","指輪"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori hobi/hiburan?", correct:"道路", distractors:["映画","音楽","写真"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori nama negara?", correct:"天気", distractors:["日本","韓国","中国"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori alat transportasi?", correct:"写真", distractors:["自転車","飛行機","船"] },
  { level:3, type:"odd", topic:"Kategori", prompt:"Manakah yang BUKAN termasuk kategori cuaca/alam?", correct:"結婚式", distractors:["天気","雲","太陽"] },
];

// id unik per soal
QUESTION_BANK.forEach((q, i) => { q.id = "q" + i; });

const LEVELS = [
  { num:1, name:"Level 1 — Dasar",    desc:"Kosakata keluarga, tubuh, makanan, transportasi & warna dasar.", passScore:0.7 },
  { num:2, name:"Level 2 — Menengah", desc:"Kosakata profesi, dapur, pakaian, alam, hobi & hewan.",          passScore:0.7 },
  { num:3, name:"Level 3 — Lanjutan", desc:"Tebak kanji dari deskripsi & mencari kata yang tidak sekategori.", passScore:0.7 },
];

function getQuestionsByLevel(level) {
  return QUESTION_BANK.filter(q => q.level === level);
}
function getFlashcardableByLevel(level) {
  return QUESTION_BANK.filter(q => q.level === level && q.type === "reading");
}
