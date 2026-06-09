/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from './questions';

const NAMES = ['Andi', 'Siti', 'Budi', 'Rian', 'Lina', 'Edo', 'Rara', 'Beni', 'Santi', 'Deni', 'Tono', 'Tini', 'Joko', 'Dewi', 'Ahmad', 'Adit', 'Nisa', 'Roni', 'Novi', 'Fajar', 'Zaki', 'Putri', 'Sari', 'Bayu', 'Gilang', 'Rendra', 'Bella', 'Indah', 'Agung', 'Maya'];
const LOCS = ['kebun belakang', 'halaman sekolah', 'belakang rumah', 'taman bermain', 'ruang kelas 4', 'lapangan olahraga', 'teras depan', 'ruang tamu', 'kantin sekolah', 'perpustakaan', 'laboratorium', 'sungai dekat desa', 'sawah hijau', 'dapur rumah', 'kebun binatang'];

function format(text: string, idx: number, val1: string | number = '', val2: string | number = ''): string {
  const name = NAMES[idx % NAMES.length];
  const loc = LOCS[(idx * 7) % LOCS.length];
  return text
    .replace(/\[NAME\]/g, name)
    .replace(/\[LOC\]/g, loc)
    .replace(/\[VAL1\]/g, String(val1))
    .replace(/\[VAL2\]/g, String(val2))
    .replace(/\[IDX\]/g, String(idx));
}

function shuffleDeterministic<T>(array: T[], seed: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.abs(seed * (i + 7) + 13) % (i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export function generateQuestionsForSubject(subjectId: string, startIndex: number, count: number): Question[] {
  const generated: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qIndex = startIndex + i;
    
    // Convert to multiple-choice (pilihan_ganda) only
    let type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian' = 'pilihan_ganda';

    const id = `${subjectId}_gen_${qIndex}`;
    let question: Question;

    switch (subjectId) {
      case 'ipas':
        question = generateIpas(id, qIndex, type);
        break;
      case 'matematika':
        question = generateMatematika(id, qIndex, type);
        break;
      case 'bahasa_indonesia':
        question = generateBahasaIndonesia(id, qIndex, type);
        break;
      case 'pancasila':
        question = generatePancasila(id, qIndex, type);
        break;
      case 'bahasa_inggris':
        question = generateBahasaInggris(id, qIndex, type);
        break;
      case 'pai':
        question = generatePai(id, qIndex, type);
        break;
      case 'bahasa_arab':
        question = generateBahasaArab(id, qIndex, type);
        break;
      default:
        question = generateIpas(id, qIndex, 'pilihan_ganda');
    }

    generated.push(question);
  }

  return generated;
}

// 1. IPAS GENERATOR (Sains & Sosial)
function generateIpas(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Pahlawan Lingkungan (Zat, Energi & Ekosistem)';
  if (type === 'pilihan_ganda') {
    const theme = idx % 4;
    if (theme === 0) {
      // Wujud Zat
      const items = [
        ['es batu lilin', 'mencair meleleh kaku', 'padat', 'cair', 'Mencair'],
        ['cokelat batangan', 'pecah meleleh hangat', 'padat', 'cair', 'Mencair'],
        ['mentega gurih', 'meleleh bergoyang kuning', 'padat', 'cair', 'Mencair'],
        ['air tawar murni', 'membeku jadi balok es', 'cair', 'padat', 'Membeku'],
        ['adonan puding manis', 'memadat gurih mengeras', 'cair', 'padat', 'Membeku'],
        ['air panci bergolak', 'menguap jadi asap tipis', 'cair', 'gas', 'Menguap'],
        ['alkohol kesehatan', 'menyusut menguap kering', 'cair', 'gas', 'Menguap'],
        ['kapur barus bundar', 'mengecil menyublim habis', 'padat', 'gas', 'Menyublim'],
        ['uap air teh panas', 'mengembun menempel air', 'gas', 'cair', 'Mengembun']
      ];
      const [name, action, from, to, conc] = items[idx % items.length];
      const q = `Di [LOC], [NAME] membiarkan ${name} hingga ${action}. Perubahan wujud dari ${from} ke ${to} ini disebut...`;
      const opts = shuffleDeterministic([conc, 'Mencair', 'Membeku', 'Menguap', 'Menyublim', 'Mengembun'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4), idx);
      if (opts.indexOf(conc) === -1) opts[0] = conc;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'ipas', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(conc), explanation: `Perubahan dari ${from} ke ${to} adalah ${conc}.` };
    } else if (theme === 1) {
      // Gaya & Energi
      const items = [
        ['bola sepak yang ditendang melambat di lapangan', 'Gaya Gesek', 'gaya hambat sentuhan dua benda'],
        ['paku besi ditarik ujung magnet perak', 'Gaya Magnet', 'tarikan logam feromagnetik'],
        ['penggaris digosok rambut menarik serpihan kertas', 'Gaya Listrik Statis', 'keberadaan muatan elektrostatik'],
        ['karet ketapel ditarik dilesatkan melempar kerikil', 'Gaya Pegas', 'gaya lentur karet elastis'],
        ['buah kelapa tua meluncur jatuh ke bawah', 'Gaya Gravitasi', 'tarikan pusat bumi'],
        ['sendok teh ditaruh di air kopi mendidih', 'Konduksi', 'rambatan panas tanpa partikel bergerak'],
        ['air sup berputar mendidih di panci', 'Konveksi', 'rambatan panas dengan zat mengalir'],
        ['nyala api unggun menghangatkan tubuh', 'Radiasi', 'pancaran kalor langsung tanpa medium']
      ];
      const [desc, conc, exp] = items[idx % items.length];
      const q = `Di [LOC], [NAME] melihat peristiwa: ${desc}. Konsep yang sedang bekerja di sini adalah...`;
      const opts = shuffleDeterministic([conc, 'Gaya Gesek', 'Gaya Magnet', 'Gaya Pegas', 'Gaya Gravitasi', 'Konduksi', 'Konveksi', 'Radiasi'], idx).slice(0, 4);
      if (opts.indexOf(conc) === -1) opts[0] = conc;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'ipas', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(conc), explanation: `Peristiwa ini bekerja memanfaatkan ${conc} (${exp}).` };
    } else if (theme === 2) {
      // Ekosistem
      const ecos = [
        ['sawah', 'padi', 'belalang', 'katak', 'ular'],
        ['kebun', 'pohon mangga', 'ulat daun', 'burung pipit', 'burung elang'],
        ['hutan', 'semak liar', 'kelinci', 'rubah', 'serigala']
      ];
      const [loc, p, c1, c2, c3] = ecos[idx % ecos.length];
      const roles = [
        [p, 'Produsen', 'menghasilkan makanan sendiri via fotosintesis'],
        [c1, 'Konsumen Tingkat I (Herbivora)', 'memakan produsen langsung'],
        [c2, 'Konsumen Tingkat II (Karnivora)', 'memakan konsumen tingkat I'],
        [c3, 'Konsumen Tingkat III / Puncak', 'karnivora puncak rantai pangan']
      ];
      const [organ, role, desc] = roles[(idx * 3) % roles.length];
      const q = `Dalam rantai makanan ekosistem ${loc} yang diamati [NAME] di [LOC]: ${p} -> ${c1} -> ${c2} -> ${c3}. Di sini, organisme **${organ}** bertindak sebagai...`;
      const opts = ['Produsen', 'Konsumen Tingkat I (Herbivora)', 'Konsumen Tingkat II (Karnivora)', 'Konsumen Tingkat III / Puncak'];
      return { id, subjectId: 'ipas', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(role), explanation: `${organ} adalah ${role} karena ${desc}.` };
    } else {
      // 3R
      const acts = [
        ['membawa tumblr minum pribadi ke sekolah', 'Reduce', 'mengurangi timbulan sampah plastik sekali pakai'],
        ['menggunakan tas belanja kain tenun saat jajan', 'Reduce', 'membatasi penggunaan tas keresek plastik'],
        ['mengubah kaleng susu bekas menjadi wadah pensil', 'Reuse', 'memfungsikan kembali barang sisa layak pakai'],
        ['menyimpan botol kaca sirup untuk pot tanaman soka', 'Reuse', 'menggunakan wadah berulang kali tanpa meleburnya'],
        ['menumpuk kertas bungkus bekas jadi bubur kertas hias', 'Recycle', 'mendaur ulang kertas bekas jadi produk baru'],
        ['mengolah kulit buah ranum menjadi pupuk kompos', 'Recycle', 'mengolah bahan organik menjadi penyubur tanah']
      ];
      const [act, conc, exp] = acts[idx % acts.length];
      const q = `Di [LOC], [NAME] rajin ${act}. Tindakan pelestarian lingkungan 3R ini digolongkan sebagai...`;
      const opts = ['Reduce', 'Reuse', 'Recycle', 'Replace'];
      return { id, subjectId: 'ipas', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(conc), explanation: `Urgensi tindakan ini tergolong "${conc}", yaitu ${exp}.` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['Perubahan wujud zat padat langsung berubah ke fase gas (kapur barus [NAME] habis di lemari), disebut...', ['menyublim']],
      ['Perubahan wujud zat gas menjadi cair (embun pagi di dekat [LOC]), disebut...', ['mengembun']],
      ['Benda yang menghantarkan panas sangat baik seperti tembaga atau besi di [LOC], disebut...', ['konduktor']],
      ['Benda penahan aliran panas seperti kayu gagang panci di [LOC], disebut...', ['isolator']],
      ['Rantai makanan dimulai oleh tumbuhan berklorofil selaku...', ['produsen']],
      ['Aksi membawa botol minum sendiri di [LOC] termasuk langkah 3R...', ['reduce']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'ipas', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Jawab dengan satu kata huruf kecil saja...' };
  } else if (type === 'menjodohkan') {
    const list = [
      [{ left: 'Konduksi', right: 'Sendok logam tersengat kuah sup panas' }, { left: 'Konveksi', right: 'Sirkulasi air memutar saat dididihkan' }, { left: 'Radiasi', right: 'Pancaran api unggun menghangatkan badan' }],
      [{ left: 'Membeku', right: 'Air menjadi balok es di kulkas freezer' }, { left: 'Mencair', right: 'Margarin meleleh hangat di wajan' }, { left: 'Menguap', right: 'Air menyusut mendidih jadi uap kompor' }]
    ];
    return { id, subjectId: 'ipas', type: 'menjodohkan', topic, questionText: format('Pasangkan konsep sains berikut dengan contoh yang paling tepat! (Seri: [IDX])', idx), pairs: list[idx % list.length] };
  } else {
    const list = [
      ['Uraikan 3 pilar gerakan peduli limbah 3R dan berikan contoh nyata masing-masing!', '1. Reduce (Mengurangi): Membawa botol tumblr pribadi.\n2. Reuse (Menggunakan kembali): Memakai kaleng susu bekas sebagai wadah pensil.\n3. Recycle (Mendaur ulang): Mengolah limbah sampah dapur kering dijadikan pupuk kompos.', ['reduce', 'reuse', 'recycle', 'contoh']],
      ['Jelaskan bagaimana proses rantai makanan berjalan di ekosistem sawah dan peran padinya!', 'Rantai makanan berupa aliran energi: Padi (Produsen) dimakan Belalang (Konsumen I), dimakan Katak (Konsumen II), dimakan Ular (Konsumen III), dan dibusukkan Jamur (Pengurai). Padi krusial karena menghasilkan energi utama fotosintesis.', ['padi', 'produsen', 'belalang', 'katak', 'ular']]
    ];
    const [q, ans, keys] = list[idx % list.length];
    return { id, subjectId: 'ipas', type: 'uraian', topic, questionText: format(q as string, idx), sampleAnswer: ans as string, keywords: keys as string[] };
  }
}

// 2. MATEMATIKA GENERATOR (Bangun Datar, Piktogram & Diagram Batang)
function generateMatematika(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Bangun Datar, Piktogram & Diagram';
  const side = (idx * 3 % 13) + 4; // 4 to 16 cm
  const p = (idx * 5 % 11) + 10;   // 10 to 20 cm
  const l = (idx * 7 % 7) + 3;     // 3 to 9 cm
  
  if (type === 'pilihan_ganda') {
    const cycle = idx % 5;
    if (cycle === 0) {
      const k = 4 * side;
      const opts = shuffleDeterministic([`${k} cm`, `${side * side} cm`, `${2 * side} cm`, `${k + 8} cm`], idx);
      return { id, subjectId: 'matematika', type: 'pilihan_ganda', topic, questionText: format(`[NAME] memiliki ubin persegi di [LOC] dengan sisi [VAL1] cm. Berapakah keliling ubin tersebut?`, idx, side), options: opts, correctAnswer: opts.indexOf(`${k} cm`), explanation: `Keliling persegi = Sisi × 4 = ${side} × 4 = ${k} cm.` };
    } else if (cycle === 1) {
      const area = p * l;
      const opts = shuffleDeterministic([`${area} cm²`, `${2 * (p + l)} cm²`, `${p + l} cm²`, `${area + 15} cm²`], idx);
      return { id, subjectId: 'matematika', type: 'pilihan_ganda', topic, questionText: format(`Meja belajar [NAME] di [LOC] berbentuk persegi panjang dengan panjang [VAL1] cm dan lebar [VAL2] cm. Luas meja adalah...`, idx, p, l), options: opts, correctAnswer: opts.indexOf(`${area} cm²`), explanation: `Luas persegi panjang = Panjang × Lebar = ${p} × ${l} = ${area} cm².` };
    } else if (cycle === 2) {
      const k = 2 * (p + l);
      const opts = shuffleDeterministic([`${k} cm`, `${p * l} cm`, `${p + l} cm`, `${k - 6} cm`], idx);
      return { id, subjectId: 'matematika', type: 'pilihan_ganda', topic, questionText: format(`Bingkai foto di [LOC] memiliki panjang [VAL1] cm dan lebar [VAL2] cm. Keliling bingkai milik [NAME] adalah...`, idx, p, l), options: opts, correctAnswer: opts.indexOf(`${k} cm`), explanation: `Keliling = 2 × (Panjang + Lebar) = 2 × (${p} + ${l}) = ${k} cm.` };
    } else if (cycle === 3) {
      const angle = (idx * 13 % 145) + 15;
      const actAngle = angle === 90 ? 95 : angle;
      const isLancip = actAngle < 90;
      const correct = isLancip ? 'Sudut Lancip' : 'Sudut Tumpul';
      const opts = shuffleDeterministic(['Sudut Lancip', 'Sudut Tumpul', 'Sudut Siku-siku', 'Sudut Refleks'], idx);
      return { id, subjectId: 'matematika', type: 'pilihan_ganda', topic, questionText: format(`Menggunakan busur derajat di [LOC], [NAME] mengukur sudut dahan kayu sebesar [VAL1] derajat. Sudut ini termasuk...`, idx, actAngle), options: opts, correctAnswer: opts.indexOf(correct), explanation: `Sudut ${actAngle}° adalah ${correct} (Lancip < 90°, Tumpul > 90° s.d. 180°).` };
    } else {
      const scale = [5, 10, 20][idx % 3];
      const count = (idx * 2 % 6) + 3;
      const total = count * scale;
      const fruit = ['apel', 'mangga', 'semangka'][idx % 3];
      const opts = shuffleDeterministic([`${total} kg`, `${count} kg`, `${total - scale} kg`, `${total + scale} kg`], idx);
      return { id, subjectId: 'matematika', type: 'pilihan_ganda', topic, questionText: format(`Pada piktogram di [LOC], 1 icon buah melambangkan [VAL1] kg ${fruit} terjual. Jika dagangan [NAME] digambarkan dengan ${count} icon, berat buah asli terjual adalah...`, idx, scale), options: opts, correctAnswer: opts.indexOf(`${total} kg`), explanation: `Total berat = ${count} × ${scale} = ${total} kg.` };
    }
  } else if (type === 'isian') {
    const cycle = idx % 3;
    if (cycle === 0) {
      return { id, subjectId: 'matematika', type: 'isian', topic, questionText: format(`Hiasan catur persegi milik [NAME] memiliki sisi [VAL1] cm. Keliling hiasan di [LOC] tersebut adalah ... cm.`, idx, side), correctAnswers: [String(4 * side)], placeholder: 'Tulis angkanya saja...' };
    } else if (cycle === 1) {
      return { id, subjectId: 'matematika', type: 'isian', topic, questionText: format(`Origami persegi miliki [NAME] bersisi [VAL1] cm. Luas origami di [LOC] ini adalah ... cm².`, idx, side), correctAnswers: [String(side * side)], placeholder: 'Tulis angkanya saja...' };
    } else {
      const isLancip = idx % 2 === 0;
      const val = isLancip ? 55 : 125;
      return { id, subjectId: 'matematika', type: 'isian', topic, questionText: format(`Sudut siku lemari di [LOC] terukur sebesar [VAL1] derajat. Jenis sudut ini kaku diklasifikasikan sebagai sudut...`, idx, val), correctAnswers: [isLancip ? 'lancip' : 'tumpul'], placeholder: 'Tulis jenis sudutnya (lancip / tumpul)...' };
    }
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'Luas Persegi', right: 'Sisi × Sisi' },
      { left: 'Keliling Persegi', right: 'Sisi × 4' },
      { left: 'Sudut Lancip', right: 'Sudut kurang dari 90 derajat' }
    ];
    return { id, subjectId: 'matematika', type: 'menjodohkan', topic, questionText: format(`Pasangkan konsep matematika di [LOC] berikut dengan rumus/arti yang cocok! (Seri: [IDX])`, idx), pairs };
  } else {
    const area = p * l;
    const k = 2 * (p + l);
    return { id, subjectId: 'matematika', type: 'uraian', topic, questionText: format(`Sebuah meja lipat di [LOC] bersisi panjang [VAL1] cm dan lebar [VAL2] cm. Hitunglah keliling dan luas area meja punya [NAME] tersebut secara detail!`, idx, p, l), sampleAnswer: `Langkah pengerjaan:\n1. Keliling = 2 × (p + l) = 2 × (${p} + ${l}) = ${k} cm.\n2. Luas = p × l = ${p} × ${l} = ${area} cm².`, keywords: [String(area), String(k), 'keliling', 'luas', 'meja'] };
  }
}

// 3. BAHASA INDONESIA GENERATOR (Hidup Sehat, Watak Tokoh, Fakta & Opini, Tanda Baca)
function generateBahasaIndonesia(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Hidup Sehat (Ejaan, Fakta & Opini, Watak)';
  if (type === 'pilihan_ganda') {
    const cycle = idx % 4;
    if (cycle === 0) {
      // Watak Tokoh
      const wataks = [
        ['selalu tersenyum ramah dan mengulurkan bantuan menolong kucing terluka', 'Ramah dan suka menolong', 'perilaku ikhlas senyum menolong sesama'],
        ['selalu memamerkan dompet saku mainannya dan enggan bekerjasama saat piket kelas', 'Sombong dan tidak peduli', 'perilaku sombong memamerkan barang dan malas'],
        ['rajin belajar membaca buku dan teratur bangun pagi membersihkan kamar', 'Disiplin dan rajin', 'pembiasaan baik bangun pagi mandiri belajar']
      ];
      const [desc, watak, exp] = wataks[idx % wataks.length];
      const q = `Bacalah penggalan drama berikut!\n"Dalam cerita yang dibaca [NAME] di [LOC], diceritakan Rian ${desc}."\nWatak kepribadian tokoh Rian adalah...`;
      const opts = shuffleDeterministic(['Ramah dan suka menolong', 'Sombong dan tidak peduli', 'Disiplin dan rajin', 'Goyah dan pemarah'], idx);
      if (opts.indexOf(watak) === -1) opts[0] = watak;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_indonesia', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(watak), explanation: `Urgensi perangai tokoh sesuai KBBI adalah ${watak} (${exp}).` };
    } else if (cycle === 1) {
      // Fakta vs Opini
      const facts = ['Negara Indonesia merdeka pada 17 Agustus 1945.', 'Kota Bandung merupakan ibu kota Provinsi Jawa Barat.', 'Matahari terbit dari ufuk timur dan terbenam di barat.'];
      const opinions = ['Pelajaran menggambar bebas adalah pelajaran terseru.', 'Sayur sup masakan bibik kantin terasa sangat enak sekali.', 'Warna ungu cerah adalah warna terindah di dunia.'];
      const isPickFact = idx % 2 === 0;
      const correct = isPickFact ? facts[idx % facts.length] : opinions[idx % opinions.length];
      const wrong = isPickFact ? opinions[idx % opinions.length] : facts[idx % facts.length];
      const opts = shuffleDeterministic([correct, wrong, 'Menurut saya kucing adalah hewan paling jahat.', 'Membaca buku komik kartun sangat menguras otak.'], idx);
      const q = isPickFact 
        ? `Di [LOC], [NAME] berdiskusi. Manakah kalimat pilihan di bawah yang tergolong sebagai kalimat **FAKTA** objektif?`
        : `Di [LOC], [NAME] membaca laporan. Manakah di bawah yang merupakan kalimat **OPINI** subjektif?`;
      return { id, subjectId: 'bahasa_indonesia', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(correct), explanation: isPickFact ? `Fakta bersifat objektif universal: "${correct}".` : `Opini bersifat subjektif personal: "${correct}".` };
    } else if (cycle === 2) {
      // Majas
      const majas = [
        ['Pena milik [NAME] menari-nari riang di kertas putih.', 'Majas Personifikasi', 'seolah pena mati berbuat bertingkah hidup layaknya manusia'],
        ['Angin malam memeluk erat tubuh [NAME] di kebun sekolah.', 'Majas Personifikasi', 'seolah angin mati memeluk layaknya pelukan manusia'],
        ['Budi dikenal selaku bintang kelas berkat kecerdasannya.', 'Majas Metafora', 'ungkapan kiasan bintang kelas berarti juara kelas'],
        ['Kabar kenaikan harga cabai meroket setinggi langit biru.', 'Majas Hiperbola', 'ungkapan hiperbolis berlebih-lebihan menceritakan harga']
      ];
      const [text, typeMajas, exp] = majas[idx % majas.length];
      const q = `Cermati kalimat berikut!\n"[VAL1]"\nKalimat tersebut mengandung gaya bahasa...`;
      const opts = ['Majas Personifikasi', 'Majas Metafora', 'Majas Hiperbola', 'Majas Asosiasi'];
      return { id, subjectId: 'bahasa_indonesia', type: 'pilihan_ganda', topic, questionText: format(q, idx, text), options: opts, correctAnswer: opts.indexOf(typeMajas), explanation: `Kalimat ini mengandung ${typeMajas} (${exp}).` };
    } else {
      // Sinonim Antonim
      const words = [
        ['hemat', 'boros', 'irit', 'Siti gemar menghemat uang kas di [LOC].'],
        ['rajin', 'pemalas', 'giat', 'Budi dikenal belajar rajin membaca di perpustakaan.']
      ];
      const [word, ant, syn, sentence] = words[idx % words.length];
      const isAskingAnt = idx % 2 === 0;
      const q = isAskingAnt 
        ? `Berdasarkan kalimat berikut:\n"${sentence}"\nLawan kata (antonim) dari kata miring **${word}** adalah...`
        : `Berdasarkan kalimat berikut:\n"${sentence}"\nPersamaan kata (sinonim) dari kata miring **${word}** adalah...`;
      const correct = isAskingAnt ? ant : syn;
      const opts = shuffleDeterministic([correct, 'bodoh', 'lambat', 'sedih', 'kotor'], idx).slice(0, 4);
      if (opts.indexOf(correct) === -1) opts[0] = correct;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_indonesia', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(correct), explanation: isAskingAnt ? `Antonim dari "${word}" adalah "${correct}".` : `Sinonim dari "${word}" adalah "${correct}".` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['Lawan kata (antonim) dari kata hemat adalah...', ['boros']],
      ['Sinonim (persamaan kosa kata) dari kata rajin adalah...', ['giat', 'tekun']],
      ['Latar tempat cerita Rian berlatar di taman rimbun. Kata "taman" menunjuk latar...', ['tempat']],
      ['Untuk mengakhiri penulisan kalimat tanya yang benar, dibubuhi tanda...', ['tanya', 'tanda tanya']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'bahasa_indonesia', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Tulis satu kata huruf kecil saja...' };
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'Fakta', right: 'Kenyataan objektif dibuktikan mutlak' },
      { left: 'Opini', right: 'Penilaian rasa subjektif selera' },
      { left: 'Protagonis', right: 'Tokoh berwatak budiman mulia' }
    ];
    return { id, subjectId: 'bahasa_indonesia', type: 'menjodohkan', topic, questionText: format(`Pasangkan padanan bahasa Indonesia dengan pasangannya yang tepat! (No: [IDX])`, idx), pairs };
  } else {
    return { id, subjectId: 'bahasa_indonesia', type: 'uraian', topic, questionText: format(`Jelaskan perbedaan mendasar antara kalimat fakta dan kalimat opini, serta berikan masing-masing sebuah contoh bertopik hidup sehat!`, idx), sampleAnswer: `Perbedaan:\n1. Fakta: Kenyataan objektif terbukti benar universal. Contoh: Kita butuh minum air putih agar tidak dehidrasi.\n2. Opini: Pandangan subjektif rasa selera pribadi. Contoh: Masakan sop buatan ibu adalah makanan paling lezat.`, keywords: ['fakta', 'opini', 'contoh', 'perbedaan', 'sehat'] };
  }
}

// 4. PENDIDIKAN PANCASILA GENERATOR (Persatuan & Kesatuan, Budaya Gotong Royong)
function generatePancasila(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Pancasila, Persatuan & Gotong Royong';
  if (type === 'pilihan_ganda') {
    const cycle = idx % 4;
    if (cycle === 0) {
      // Sila & Lambang
      const silas = [
        ['Sila Pertama (1)', 'rukun beribadah merayakan hari besar beragama lain di [LOC]', 'Bintang Emas'],
        ['Sila Kedua (2)', 'membagi bekal kue secara adil menjenguk teman kelas demam', 'Rantai Emas'],
        ['Sila Ketiga (3)', 'memakai kaos bermotif batik nusantara buatan dalam negeri', 'Pohon Beringin'],
        ['Sila Keempat (4)', 'ikut bermusyawarah kelompok menentukan ketua mading kelas', 'Kepala Banteng'],
        ['Sila Kelima (5)', 'tidak bersikap boros uang saku, rajin jatah saku ditabung', 'Padi dan Kapas']
      ];
      const [silaNum, act, icon] = silas[idx % silas.length];
      const q = `Sikap mulia [NAME] yang menerapkan perilakuan: ${act}. Kegiatan ini mencerminkan pengamalan Pancasila yaitu...`;
      const correct = `${silaNum} - Lambang ${icon}`;
      const opts = shuffleDeterministic([correct, 'Sila Pertama (1) - Lambang Bintang Emas', 'Sila Kedua (2) - Lambang Rantai Emas', 'Sila Ketiga (3) - Lambang Pohon Beringin', 'Sila Kelima (5) - Lambang Padi dan Kapas'], idx).slice(0, 4);
      if (opts.indexOf(correct) === -1) opts[0] = correct;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'pancasila', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(correct), explanation: `Aksi terpuji ini mencerminkan amanat sila ${silaNum} berlambangkan ${icon}.` };
    } else if (cycle === 1) {
      // Hak vs Kewajiban
      const scenarios = [
        ['menerima materi pelajaran yang bermakna dan asyik dari ibu guru', 'Hak siswa di sekolah'],
        ['ikut membersihkan halaman depan dengan menyapu piket terjadwal', 'Kewajiban murid di area sekolah'],
        ['memeroleh curahan asupan buah segar dan kasih sayang rukun ayah ibu', 'Hak anak di lingkungan rumah'],
        ['merapikan kembali selimut lipat kasur bantal sehabis bangun tidur', 'Kewajiban anak di lingkungan rumah']
      ];
      const [act, typeHakKew] = scenarios[idx % scenarios.length];
      const q = `Ketika sedang di [LOC], [NAME] melakukan pembiasaan: ${act}. Tindakan ini merupakan perwujudan dari...`;
      const opts = ['Hak siswa di sekolah', 'Kewajiban murid di area sekolah', 'Hak anak di lingkungan rumah', 'Kewajiban anak di lingkungan rumah'];
      return { id, subjectId: 'pancasila', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(typeHakKew), explanation: `Melakukan aktivitas membersihkan atau menerima materi adalah wujud dari ${typeHakKew}.` };
    } else if (cycle === 2) {
      // Gotong Royong
      const benefits = [
        ['mengeruk lumpur penyumbat selokan komplek tinggal', 'Gotong Royong', 'aliran got bersih terhindar nyamuk DBD'],
        ['mengecat papan pengumuman mading sekolah yang pudar', 'Kerja Bakti', 'informasi mading terbaca indah ceria'],
        ['gotong royong mencabuti duri tajam semak taman bermain', 'Persatuan', 'anak balita aman berlarian bebas cedera']
      ];
      const [job, word, benefit] = benefits[idx % benefits.length];
      const q = `Sekelompok warga di [LOC] dibantu [NAME] rukun bergotong-royong ${job}. Manfaat mendasar dari aksi kerja nyata ini adalah...`;
      const correct = `Pekerjaan cepat tuntas and ${benefit}`;
      const opts = shuffleDeterministic([correct, 'Menimbulkan perselisihan unjuk kasta materi warga', 'Bisa meminta imbalan gaji harian berlipat ganda', 'Mudah mengadakan pesta makan foya foya'], idx);
      return { id, subjectId: 'pancasila', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(correct), explanation: `Urgensi gotong royong memupuk kerukunan rukun, melandasi pekerjaan lekas tuntas dan ${benefit}.` };
    } else {
      // Keberagaman Suku
      const cultures = [
        ['Rumah adat Honai berkepala rumbia jerami bundar', 'Papua'],
        ['Seni Tari Saman bermusik pukulan dada sejajar', 'Aceh'],
        ['Seni Tari Kecak bersyahdu suara keliling lingkar api', 'Bali'],
        ['Rumah adat Gadang berujung runcing atap tanduk kerbau', 'Sumatera Barat'],
        ['Alat musik Sasando petik dawai anyaman daun melingkar', 'NTT']
      ];
      const [item, origin] = cultures[idx % cultures.length];
      const q = `Saat mendatangi stan budaya nusantara di [LOC], [NAME] melihat karya adat berupa: **${item}**. Karya luhur ini berasal dari daerah asli...`;
      const opts = shuffleDeterministic([origin, 'Jawa Barat', 'Kalimantan Timur', 'Maluku', 'Sulawesi Utara'], idx).slice(0, 4);
      if (opts.indexOf(origin) === -1) opts[0] = origin;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'pancasila', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(origin), explanation: `Warisan etnis "${item}" merupakan identitas kebudayaan daerah ${origin}.` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['Sila kesatu burung Garuda Pancasila dilambangkan berbentuk perisai bergambar...', ['bintang']],
      ['Semboyan kerukunan pemersatu bangsa tercengkeram kaki garuda berbunyi Bhinneka Tunggal...', ['ika']],
      ['Membantu mencuci piring nampan makan sendiri sehabis sarapan adalah contoh... anak di rumah.', ['kewajiban']],
      ['Rumah adat Honai jerami melingkar kokoh berasal dari pulau...', ['papua']],
      ['Kerjasama rukun mengurusi saluran selokan warga tanpa mengharapkan upah harian disebut...', ['gotong royong', 'kerja bakti']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'pancasila', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Jawab singkat satu kata huruf kecil...' };
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'Sila Ke-1', right: 'Simbol Bintang Emas Gemerlap rukun ibadah' },
      { left: 'Sila Ke-3', right: 'Simbol Pohon Beringin teduh cinta tanah air' },
      { left: 'Kewajiban Siswa', right: 'Menyelesaikan piket menyapu lantai kelas tertib' }
    ];
    return { id, subjectId: 'pancasila', type: 'menjodohkan', topic, questionText: format(`Harap pasangkan butir Pancasila atau tata krama berikut dengan keterangannya! (Kuis: [IDX])`, idx), pairs };
  } else {
    return { id, subjectId: 'pancasila', type: 'uraian', topic, questionText: format(`Mengapa kebiasaan gotong-royong sangat penting dipertahankan di lingkungan tempat tinggal masyarakat rukun? Berikan dua manfaatnya!`, idx), sampleAnswer: `Sebab gotong royong mencerminkan pengamalan sila Persatuan Indonesia gotong royong.\nManfaat nyata:\n1. Meringankan pekerjaan yang berat (seperti pengerukan lumpur got lekas tuntas).\n2. Mempererat tali kerukunan silaturahmi mengobati salah ham paham antar tetangga.`, keywords: ['gotong royong', 'persatuan', 'berat', 'ringan', 'rukun', 'tetangga'] };
  }
}

// 5. BAHASA INGGRIS GENERATOR (Rainy Day and Sunny Day, Weather, Gears, & Activities)
function generateBahasaInggris(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Rainy and Sunny Day (English Weather)';
  if (type === 'pilihan_ganda') {
    const cycle = idx % 4;
    if (cycle === 0) {
      // Weather activity gear
      const items = [
        ['sun is shining hot and bright', 'sunglasses and beach cap', 'swimming in pool', 'Sunny'],
        ['heavy water droplets are pouring from dark clouds', 'an umbrella and raincoat', 'watching cartoons inside house', 'Rainy'],
        ['wind is blowing very hard and rustling dry leaves', 'a windbreaker jacket', 'flying paper kite high', 'Windy'],
        ['thick white puffy clouds cover the sun completely', 'a comfortable sweater', 'having sweet picnic at park', 'Cloudy']
      ];
      const [desc, gear, act, correct] = items[idx % items.length];
      const q = `Read the trivia scenario!\n"Today in [LOC], [NAME] observes that the ${desc}. They wear ${gear} and can enjoy ${act}."\nWhat is the current weather?`;
      const opts = ['Sunny', 'Rainy', 'Windy', 'Cloudy'];
      return { id, subjectId: 'bahasa_inggris', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(correct), explanation: `The physical signs such as "${desc}" specify a "${correct}" day.` };
    } else if (cycle === 1) {
      // Prepositions
      const preps = [
        ['pencil case', 'top of study desk', 'on', 'di atas'],
        ['school bag', 'wooden chair under desk', 'under', 'di bawah'],
        ['English book', 'zipped pocket of bag', 'in', 'di dalam'],
        ['marker eraser', 'blackboard ledge', 'behind', 'di belakang']
      ];
      const [obj, ref, prep, trans] = preps[idx % preps.length];
      const q = `"Inside [LOC], [NAME] puts the ${obj} **${prep}** the ${ref}."\nIn Indonesian positional terms, what does the word **"${prep}"** mean?`;
      const opts = shuffleDeterministic(['di atas', 'di bawah', 'di dalam', 'di belakang', 'di samping/sebelah'], idx).slice(0, 4);
      if (opts.indexOf(trans) === -1) opts[0] = trans;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_inggris', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(trans), explanation: `The English preposition "${prep}" translates to "${trans}".` };
    } else if (cycle === 2) {
      // Animals
      const animals = [
        ['has an extremely long patterned neck to eat high leaves', 'Giraffe (Jerapah)'],
        ['is a giant grey mammal with flat ears and a nose trunk', 'Elephant (Gajah)'],
        ['is the majestic king of safari decorated with thick furry mane', 'Lion (Singa)'],
        ['is fluffy with long ears that hops around and loves carrots', 'Rabbit (Kelinci)'],
        ['shares playful actions swinging on branches and eating bananas', 'Monkey (Monyet)']
      ];
      const [info, correct] = animals[idx % animals.length];
      const q = `"Near [LOC], [NAME] takes a photo of a creature that ${info}."\nIdentify the correct animal name:`;
      const opts = shuffleDeterministic(['Giraffe (Jerapah)', 'Elephant (Gajah)', 'Lion (Singa)', 'Rabbit (Kelinci)', 'Monkey (Monyet)'], idx).slice(0,4);
      if (opts.indexOf(correct) === -1) opts[0] = correct;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_inggris', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(correct), explanation: `The description points directly to "${correct}".` };
    } else {
      // Opposite words
      const words = [
        ['hot', 'cold', 'sunny park vs ice slushy'],
        ['big', 'small', 'elephant versus a tiny red ant'],
        ['happy', 'sad', 'winning games vs dropping ice cream']
      ];
      const [word, op, example] = words[idx % words.length];
      const q = `"What is the antonym (opposite word) of the word **"${word}"** as used in most stories?"`;
      const opts = shuffleDeterministic([op, 'dry', 'short', 'fast', 'dark'], idx).slice(0, 4);
      if (opts.indexOf(op) === -1) opts[0] = op;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_inggris', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(op), explanation: `Adjective opposite: "${word}" opposes "${op}".` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['What is the opposite English word of "hot" in lowercase?', ['cold']],
      ['Translate the Indonesian fruit term "Apel Merah" into English in lowercase...', ['red apple']],
      ['What animal has a long nose trunk and huge fan ears in lowercase?', ['elephant']],
      ['We bring notebooks and pencils to school inside a school...', ['bag', 'schoolbag']],
      ['What animal is fluffy, has long ears, and hops around in lowercase?', ['rabbit']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'bahasa_inggris', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Write your answer in English lowercase...' };
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'Sunny Day', right: 'Wearing sunglasses and swimming pool fun' },
      { left: 'Rainy Day', right: 'Holding umbrellas and protecting clothes dry' },
      { left: 'Under desk', right: 'Beneath the wooden surface near study books' }
    ];
    return { id, subjectId: 'bahasa_inggris', type: 'menjodohkan', topic, questionText: format(`Match English position/weather terms with their closest descriptions! (No: [IDX])`, idx), pairs };
  } else {
    return { id, subjectId: 'bahasa_inggris', type: 'uraian', topic, questionText: format(`Describe what gear and clothing you should prepare for on a Rainy Day compared to a hot Sunny Day in English!`, idx), sampleAnswer: `On a mud Rainy Day, I should wear a raincoat or hold an umbrella, carry rubber boots, and typically stay cozy indoors. On a hot Sunny Day, I wear light T-shirts, wear sunglasses for eye protection, and enjoy swimming, riding bikes, or playing soccer in the park.`, keywords: ['rainy', 'sunny', 'umbrella', 'raincoat', 'swim', 'outdoor'] };
  }
}

// 6. PAI GENERATOR (Agama Islam: Adab Salam, Tolong-Menolong QS. Al-Maidah: 2, Munafik)
function generatePai(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'PAI (Adab Salam, Tolong-Menolong, Munafik)';
  if (type === 'pilihan_ganda') {
    const cycle = idx % 4;
    if (cycle === 0) {
      // QS Al Maidah 2
      const forbids = [
        ['bekerjasama saling mengajari jawaban waktu ujian tertib di [LOC]', 'Dosa dan permusuhan', true],
        ['tolong-menolong membongkar jemuran mangga kebun tetangga tanpa izin', 'Dosa dan permusuhan', true],
        ['membantu membagikan koin jajan diringankan membeli obat kawan sakit', 'Kebajikan dan takwa', false],
        ['menolong nenek merapikan barang runtuh terbawa banjir deras', 'Kebajikan dan takwa', false]
      ];
      const [act, rule, isForbidden] = forbids[idx % forbids.length];
      const q = isForbidden 
        ? `Tindakan buruk berkongkalikong yaitu: ${act}. Kegiatan ini haram karena melanggar QS. Al-Maidah Ayat 2 mufakat dilarang dalam hal...`
        : `Tindakan terpuji: ${act}. Bentuk tolong-menolong luhur ini sangat dinilai mulia oleh QS. Al-Maidah Ayat 2 yaitu dalam...`;
      const opts = ['Kebajikan dan takwa', 'Dosa dan permusuhan', 'Menimbun kasta dunia', 'Kekayaan duniawi'];
      return { id, subjectId: 'pai', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(rule as string), explanation: `QS. Al-Maidah ayat 2 melancarkan titah tolong-menolong dalam hal kebajikan silih takwa, dan mematikan aksi dosa permusuhan.` };
    } else if (cycle === 1) {
      // Adab Salam
      const qTypes = [
        ['Siti menyapa teman sehobi memulai mengucap salam "Assalamu\'alaikum" di [LOC]. Hukum memulai salam adalah...', 'Sunnah Muakkad (sangat dianjurkan)'],
        ['Budi mendengar [NAME] melafalkan ucapan salam di depan kelas. Hukum menjawab salam tersebut adalah...', 'Fardhu/Wajib (bagi yang mendengar)']
      ];
      const [text, ans] = qTypes[idx % qTypes.length];
      const opts = ['Sunnah Muakkad (sangat dianjurkan)', 'Fardhu/Wajib (bagi yang mendengar)', 'Mubah saja', 'Makruh dibenci'];
      return { id, subjectId: 'pai', type: 'pilihan_ganda', topic, questionText: format(text, idx), options: opts, correctAnswer: opts.indexOf(ans), explanation: `Memulai mengucap salam bernilai sunnah muakkad, sedangkan menjawab doa kawan tersebut hukumnya wajib.` };
    } else if (cycle === 2) {
      // Munafik
      const traits = [
        ['gemar menceritakan kepalsuan bohong agar dielu-elukan', 'Berkata bohong / Dusta (Kadzaba)'],
        ['menyanggupi janji membawakan cat pewarna mading besok pagi tapi melupakannya sengaja', 'Ingkar Janji (Akhlafa)'],
        ['dipercaya memegang uang iuran piket tapi dipakai diam-diam buat pribadi', 'Khianat bila Dipercaya (Khana)']
      ];
      const [desc, correct] = traits[idx % traits.length];
      const q = `Nabi bersabda bahwa ciri kaum nifaq/munafik itu ada tiga. Tindakan seseorang di [LOC] yang ${desc} melambangkan ciri...`;
      const opts = ['Berkata bohong / Dusta (Kadzaba)', 'Ingkar Janji (Akhlafa)', 'Khianat bila Dipercaya (Khana)', 'Suka bertengkar riya memecah'];
      return { id, subjectId: 'pai', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(correct), explanation: `Hadis menceritakan tanda munafik: dusta, ingkar, khianat. Perilaku ini mewakili "${correct}".` };
    } else {
      // Ar Rahman Rahim
      const asmaul = [
        ['Ar-Rahman', 'Maha Pengasih bagi seluruh makhluk hidup di dunia tanpa terkecuali'],
        ['Ar-Rahim', 'Maha Penyayang khusus bagi hamba-hambaNya yang beriman taat di akhirat']
      ];
      const [name, trans] = asmaul[idx % asmaul.length];
      const q = `Bidang tauhid aqidah mempelajari asma Allah, khususnya: **${name}**. Sifat mulia agung ini artinya Allah Maha...`;
      const opts = [
        'Maha Pengasih bagi seluruh makhluk hidup di dunia tanpa terkecuali',
        'Maha Penyayang khusus bagi hamba-hambaNya yang beriman taat di akhirat',
        'Maha Berkuasa menciptakan lautan jagad semesata raya',
        'Maha Mengoreksi segala kelenggangan dosa makhluk'
      ];
      return { id, subjectId: 'pai', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: opts, correctAnswer: opts.indexOf(trans), explanation: `${name} bertafsir luhur asali: ${trans}` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['Lawan perilaku jujur bercakap adil (tidak munafik) adalah berkata...', ['dusta', 'bohong']],
      ['Asmaul Husna "Ar-Rahim" mengakar arti agung bahwa Allah Maha...', ['penyayang']],
      ['Hukum memulai salam keselamatan saat bertemu guru di koridor [LOC] adalah...', ['sunnah']],
      ['Hukum membalas salam tatkala telinga mendengar titian assalamualaikum kawan di [LOC] adalah...', ['wajib', 'fardhu']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'pai', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Ketik satu kata huruf kecil saja...' };
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'Tolong Menolong Baik', right: 'Membantu tetangga terjangkit pohon tumbang di jalan' },
      { left: 'Dilarang Saling Bantu', right: 'Saling menyontek ketika ulangan kelas dilarang' },
      { left: 'Ciri Munafik', right: 'Bila berbicara hobi berdusta menyembunyikan kenyataan' }
    ];
    return { id, subjectId: 'pai', type: 'menjodohkan', topic, questionText: format(`Harap pasangkan prinsip adab Islami berikut dengan contoh riil nyata! (No: [IDX])`, idx), pairs };
  } else {
    return { id, subjectId: 'pai', type: 'uraian', topic, questionText: format(`Sebutkan 3 macam tanda-tanda kemunafikan (nifaq) berdasarkan sabda mulia hadis Nabi SAW!`, idx), sampleAnswer: `Sesuai hadis Bukhari Muslim, tanda orang munafik ada tiga:\n1. Apabila berbicara, ia gemar berdusta (bohong).\n2. Apabila berjanji, ia mengingkari janjinya.\n3. Apabila dipercayai amanah, ia justru khianat menyalahgunakan kepercayaan.`, keywords: ['dusta', 'bohong', 'ingkar', 'janji', 'khianat', 'amanah', 'munafik'] };
  }
}

// 7. BAHASA ARAB GENERATOR (Nama Pelajaran & Nama Binatang)
function generateBahasaArab(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian'): Question {
  const topic = 'Bahasa Arab (Asmaud Daras & Hayawanat)';
  if (type === 'pilihan_ganda') {
    const cycle = idx % 4;
    if (cycle === 0) {
      // Pelajaran
      const lessons = [
        ['Matematika', 'دَرْسُ الْحِسَابِ (Darsul Hisab)', 'Al-Hisab berarti matematika ilmu hitung'],
        ['Bahasa Arab', 'دَرْسُ اللُّغَةِ الْعَرَبِيَّةِ (Darsul Lughatul Arabiyyah)', 'Bahasa Arab adalah bahasa pemahaman rukun Qur\'an'],
        ['Bahasa Inggris', 'دَرْسُ اللُّغَةِ الْإِنْجِلِيْزِيَّةِ (Darsul Lughatul Injiliziyyah)', 'Bahasa Inggris adalah studi global komunikasi barat']
      ];
      const [ind, ar, exp] = lessons[idx % lessons.length];
      const q = `Hari ini [NAME] dijadwal memelajari bidang studi: **${ind}** di [LOC]. Kitab tertulis Arab judul materi tersebut adalah...`;
      const opts = shuffleDeterministic([ar, 'دَرْسُ الْحِسَابِ (Darsul Hisab)', 'دَرْسُ اللُّغَةِ الْعَرَبِيَّةِ (Darsul Lughatul Arabiyyah)', 'دَرْسُ اللُّغَةِ الْإِنْجِلِيْزِيَّةِ (Darsul Lughatul Injiliziyyah)', 'دَرْسُ الْعَقِيْدَةِ (Darsul Aqidah)'].filter((v, i, a) => a.indexOf(v) === i), idx).slice(0, 4);
      if (opts.indexOf(ar) === -1) opts[0] = ar;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_arab', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(ar), explanation: `Bidang "${ind}" tertulis Arab yaitu ${ar} (${exp}).` };
    } else if (cycle === 1) {
      // Binatang
      const animals = [
        ['gajah berkuping besar belalai panjang', 'فِيْلٌ (Fiilun)', 'Fiilun beralih makna gajah'],
        ['singa taring liar gagah raja hutan', 'أَسَدٌ (Asadun)', 'Asadun menterjemahkan hewan singa buas'],
        ['kucing berbulu manis suka mengeong', 'قِطٌّ (Qittun)', 'Qittun bermakna hewan kucing'],
        ['unta kuat punuk penyimpan air gurun', 'جَمَلٌ (Jamalun)', 'Jamalun menterjemahkan unta']
      ];
      const [desc, ar, exp] = animals[idx % animals.length];
      const q = `Saat bertamasya rukun melihat lukisan hewan ${desc} di [LOC], [NAME] memelajari bahasa Arabnya dari kamus, yaitu...`;
      const opts = shuffleDeterministic([ar, 'فِيْلٌ (Fiilun)', 'أَسَدٌ (Asadun)', 'قِطٌّ (Qittun)', 'جَمَلٌ (Jamalun)', 'غَنَمٌ (Ghanamun)'].filter((v, i, a) => a.indexOf(v) === i), idx).slice(0, 4);
      if (opts.indexOf(ar) === -1) opts[0] = ar;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_arab', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(ar), explanation: `Hewan "${desc}" dalam bahasa Arab disebut ${ar}.` };
    } else if (cycle === 2) {
      // Benda Kelas
      const items = [
        ['pena tulis tinta runcing', 'قَلَمٌ (Qalamun)'],
        ['meja kayu laci beralas datar', 'مَكْتَبٌ (Maktabun)'],
        ['kursi sandaran sandar kayu murni', 'كُرْسِيٌّ (Kursiyyun)'],
        ['buku kertas lembaran jilid tebal', 'كِتَابٌ (Kitabun)']
      ];
      const [desc, ar] = items[idx % items.length];
      const q = `Di dalam loker meja di [LOC], [NAME] meletakkan perkakas: ${desc}. Apa kosakata Arab dari benda tersebut?`;
      const opts = shuffleDeterministic([ar, 'قَلَمٌ (Qalamun)', 'مَكْتَبٌ (Maktabun)', 'كُرْسِيٌّ (Kursiyyun)', 'كِتَابٌ (Kitabun)', 'حَقِيْبَةٌ (Haqiibatun)'].filter((v, i, a) => a.indexOf(v) === i), idx).slice(0, 4);
      if (opts.indexOf(ar) === -1) opts[0] = ar;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_arab', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(ar), explanation: `Benda "${desc}" sewajarnya tertulis Arab sebagai ${ar}.` };
    } else {
      // Organ Tubuh / Warna
      const parts = [
        ['mata melihat membaca', 'عَيْنٌ (Ainun)', 'Ainun bermakna mata'],
        ['hidung membau penciuman', 'أَنْفٌ (Anfun)', 'Anfun bermakna hidung'],
        ['tangan memegang pinsil cat', 'يَدٌ (Yadun)', 'Yadun bermakna tangan'],
        ['kepala beralas rambut hitam', 'رَأْسٌ (Rasun)', 'Rasun bermakna kepala']
      ];
      const [desc, ar, exp] = parts[idx % parts.length];
      const q = `Sambil menunjuk ke organ badannya: **${desc}**, [NAME] mengucapkan hafalan kosakata Arab rukun di [LOC], yaitu...`;
      const opts = shuffleDeterministic([ar, 'عَيْنٌ (Ainun)', 'أَنْفٌ (Anfun)', 'يَدٌ (Yadun)', 'رَأْسٌ (Rasun)', 'رِجْلٌ (Rijlun)'].filter((v, i, a) => a.indexOf(v) === i), idx).slice(0, 4);
      if (opts.indexOf(ar) === -1) opts[0] = ar;
      const finalOpts = shuffleDeterministic(opts, idx);
      return { id, subjectId: 'bahasa_arab', type: 'pilihan_ganda', topic, questionText: format(q, idx), options: finalOpts, correctAnswer: finalOpts.indexOf(ar), explanation: `Organ "${desc}" bahasa Arab aslinya: ${ar} (${exp}).` };
    }
  } else if (type === 'isian') {
    const questions = [
      ['Bilangan hitung numerik Arab latin untuk melambangkan angka kesatu (1) adalah...', ['wahid', 'wahidun']],
      ['Bilangan hitung numerik Arab latin untuk melambangkan angka kedua (2) adalah...', ['itsnan', 'itsnani']],
      ['Lafal Arab murni latin dari perkakas beralas datar "Meja" belajar sekolah adalah...', ['maktab', 'maktabun']],
      ['Lafal Arab murni latin dari perkakas bersandaran kaku tempat siswa "Kursi" duduk di [LOC] adalah...', ['kursi', 'kursiyyun']],
      ['Hewan mengeong lucu peliharaan "Kucing" berbulu halus di [LOC] kamus Arab bersuara kata...', ['qit', 'qittun']]
    ];
    const [q, ans] = questions[idx % questions.length];
    return { id, subjectId: 'bahasa_arab', type: 'isian', topic, questionText: format(q as string, idx), correctAnswers: ans as string[], placeholder: 'Lafalkan tulis latin arab huruf kecil saja...' };
  } else if (type === 'menjodohkan') {
    const pairs = [
      { left: 'فِيْلٌ (Fiilun)', right: 'Gajah kuping besar berbelalai panjang' },
      { left: 'أَسَدٌ (Asadun)', right: 'Singa taring tajam penguasa hutan rimba' },
      { left: 'قَلَمٌ (Qalamun)', right: 'Pena runcing isi tinta goresan tulis' }
    ];
    return { id, subjectId: 'bahasa_arab', type: 'menjodohkan', topic, questionText: format(`Harap jodohkan muatan latin kosa kata bahasa Arab berikut dengan artinya yang adil! (No: [IDX])`, idx), pairs };
  } else {
    return { id, subjectId: 'bahasa_arab', type: 'uraian', topic, questionText: format(`Sebutkan tiga nama benda perkakas sekolah di dalam kelas (Adawatun Madrasiyyah) menggunakan lafal Arab latin beserta arti kegunaannya secara patut!`, idx), sampleAnswer: `Tiga perkakas kelas:\n1. Qalamun (قَلَمٌ): Artinya pena/pulpen, gunanya untuk mencatat huruf di buku tulis.\n2. Maktabun (مَكْتَبٌ): Artinya meja, gunanya untuk beralas menulis menyandarkan buku.\n3. Kursiyyun (كُرْسِيٌّ): Artinya kursi, gunanya untuk mendudukan jasad siswa secara rukun tertib.`, keywords: ['qalam', 'maktab', 'kursi', 'pena', 'meja', 'kursi', 'tulis'] };
  }
}
