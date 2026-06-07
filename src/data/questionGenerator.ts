/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, MatchingPair } from './questions';

// Simple deterministic pseudo-random generator based on index to ensure stable questions
function getDeterministicInt(seed: number, max: number): number {
  return Math.abs(Math.sin(seed) * 10000) % max | 0;
}

export function generateQuestionsForSubject(subjectId: string, startIndex: number, count: number): Question[] {
  const generated: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qIndex = startIndex + i;
    const seed = qIndex * 7 + (subjectId.charCodeAt(0) || 0) * 31;
    
    // Vary types cyclically: 0 -> menjodohkan, 1 -> isian, 2 -> uraian, 3 & 4 -> pilihan_ganda
    const typeMod = qIndex % 5;
    let type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian' = 'pilihan_ganda';
    if (typeMod === 0) {
      type = 'menjodohkan';
    } else if (typeMod === 1) {
      type = 'isian';
    } else if (typeMod === 2) {
      type = 'uraian';
    }

    const id = `${subjectId}_gen_${qIndex}`;

    // Delegate generation based on subjectId
    let question: Question;
    switch (subjectId) {
      case 'ipas':
        question = generateIpasQuestion(id, qIndex, type, seed);
        break;
      case 'matematika':
        question = generateMatematikaQuestion(id, qIndex, type, seed);
        break;
      case 'bahasa_indonesia':
        question = generateBahasaIndonesiaQuestion(id, qIndex, type, seed);
        break;
      case 'pancasila':
        question = generatePancasilaQuestion(id, qIndex, type, seed);
        break;
      case 'bahasa_inggris':
        question = generateBahasaInggrisQuestion(id, qIndex, type, seed);
        break;
      case 'pai':
        question = generatePaiQuestion(id, qIndex, type, seed);
        break;
      case 'bahasa_arab':
        question = generateBahasaArabQuestion(id, qIndex, type, seed);
        break;
      default:
        // Fallback to random IPAS
        question = generateIpasQuestion(id, qIndex, 'pilihan_ganda', seed);
    }

    generated.push(question);
  }

  return generated;
}

// ============================================================================
// SUBJECT SPECIFIC GENERATORS
// ============================================================================

// 1. IPAS GENERATOR
function generateIpasQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Ekosistem Hutan', 'Gaya dan Gerak', 'Wujud Zat', 'Energi Alternatif', 
    'Siklus Air', 'Pelestarian Lingkungan', 'Rantai Makanan', 'Fotosintesis', 
    'Gaya Magnet', 'Konsep 3R', 'Sumber Daya Alam', 'Pancaindera'
  ];
  const topic = topics[idx % topics.length];

  if (type === 'pilihan_ganda') {
    const mcqs = [
      {
        q: 'Manakah kegiatan di bawah ini yang paling membantu melestarikan ekosistem hutan kita?',
        opts: ['Membakar rumput kering liar', 'Melakukan tebang pilih dan reboisasi', 'Membuka lahan sawah baru luas', 'Mengeringkan aliran rawa air'],
        ans: 1,
        exp: 'Tebang pilih dan reboisasi (penghijauan hutan kembali) sangat penting untuk menjaga ekosistem kayu, flora, dan fauna tetap lestari.'
      },
      {
        q: 'Gaya gravitasi bumi akan menarik semua benda jatuh bebas menuju ke...',
        opts: ['Atas awan', 'Pusat inti bumi di bawah', 'Arah matahari terbit', 'Samping barat laut'],
        ans: 1,
        exp: 'Gaya gravitasi merupakan gaya tarik bumi yang menarik segala benda bermassa ke arah pusat bumi.'
      },
      {
        q: 'Benda yang dapat ditarik oleh magnet secara sangat kuat disebut benda...',
        opts: ['Isolator', 'Feromagnetik', 'Termoplastik', 'Paramagnetik'],
        ans: 1,
        exp: 'Feromagnetik adalah klasifikasi benda (seperti besi atau baja) yang memiliki kerentanan magnetik sangat tinggi dan ditarik sangat kuat oleh magnet.'
      },
      {
        q: 'Urutan siklus air setelah terjadi penguapan air laut (evaporasi) yang membentuk awan tebal karena mendingin di langit disebut...',
        opts: ['Presipitasi', 'Transpirasi', 'Kondensasi', 'Infiltrasi'],
        ans: 2,
        exp: 'Kondensasi adalah proses perubahan uap air menjadi titik-titik air es di udara dingin sehingga membentuk gumpalan awan mendung.'
      },
      {
        q: 'Tumbuhan hijau berproduksi sebagai produsen utama karena mampu melakukan fotosintesis yang menghasilkan oksigen dan...',
        opts: ['Karbon dioksida', 'Glukosa (zat gula makanan)', 'Garam mineral laut', 'Gas nitrogen cair'],
        ans: 1,
        exp: 'Fotosintesis mengolah air dan CO2 dibantu sinar matahari dan zat hijau daun menghasilkan oksigen segar (O2) dan glukosa (karbohidrat makanan).'
      }
    ];
    const mcq = mcqs[idx % mcqs.length];
    return {
      id,
      subjectId: 'ipas',
      type: 'pilihan_ganda',
      topic,
      questionText: `${mcq.q} (IPAS Quiz ${idx})`,
      options: mcq.opts,
      correctAnswer: mcq.ans,
      explanation: mcq.exp
    };
  } else if (type === 'isian') {
    const items = [
      { q: 'Perubahan wujud zat dari padat langsung menjadi gas tanpa mencair terlebih dahulu dinamakan...', ans: ['menyublim', 'sublimasi'] },
      { q: 'Energi alternatif dari matahari ditangkap secara elektrik menggunakan sel...', ans: ['surya', 'solar cell', 'solar sel'] },
      { q: 'Proses meresapnya air hujan masuk ke dalam celah-celah tanah hutan disebut...', ans: ['infiltrasi', 'penyerapan air'] }
    ];
    const item = items[idx % items.length];
    return {
      id,
      subjectId: 'ipas',
      type: 'isian',
      topic,
      questionText: `${item.q} (Soal Isian No. ${idx})`,
      correctAnswers: item.ans,
      placeholder: 'Isi jawaban singkat di sini...'
    };
  } else if (type === 'menjodohkan') {
    const pairs = [
      [
        { left: 'Batu Bara', right: 'Energi Fosil Non-Alternatif' },
        { left: 'Sinar Mentari', right: 'Energi Kelestarian Surya' },
        { left: 'Generator Kincir', right: 'Energi Aliran Udara Angin' }
      ],
      [
        { left: 'Mencair', right: 'Es Batu menjadi Air hangat' },
        { left: 'Membeku', right: 'Air cair ditaruh di freezer kulkas' },
        { left: 'Menguap', right: 'Air mendidih mengeluarkan asap uap' }
      ]
    ];
    return {
      id,
      subjectId: 'ipas',
      type: 'menjodohkan',
      topic,
      questionText: `Jodohkan konsep perubahan zat / energi di bawah ini dengan contoh deskripsinya yang paling akurat! (Pasangan ke-${idx})`,
      pairs: pairs[idx % pairs.length]
    };
  } else {
    // uraian
    const essays = [
      {
        q: 'Sebutkan apa saja tiga jenis wujud zat di alam semesta kita, serta berikan contoh untuk masing-masing wujud tersebut!',
        ans: 'Tiga wujud zat di alam yaitu:\n1. Zat Padat: contohnya batu, kayu, dan besi.\n2. Zat Cair: contohnya air bersih, minyak kelapa, dan kecap.\n3. Zat Gas: contohnya uap air, polusi asap pembakaran, udara oksigen dalam balon.',
        keys: ['padat', 'cair', 'gas', 'batu', 'air', 'udara', 'oksigen']
      },
      {
        q: 'Jelaskan mengapa energi alternatif kincir angin dan panel surya jauh lebih baik bagi kelangsungan ekosistem dibandingkan bahan bakar batu bara!',
        ans: 'Kincir angin dan panel surya tidak menghasilkan gas emisi karbon dioksida yang merusak atmosfer, dapat diperbarui terus menerus tanpa habis, serta ramah lingkungan. Sebaliknya, pembakaran batu bara merusak kualitas udara, menghasilkan limbah abu berbahaya, dan penambangannya merusak tanah hutan konservasi.',
        keys: ['karbon', 'ramah lingkungan', 'oksigen', 'batu bara', 'sumber', 'udara']
      }
    ];
    const essay = essays[idx % essays.length];
    return {
      id,
      subjectId: 'ipas',
      type: 'uraian',
      topic,
      questionText: `${essay.q} (Uraian Bebas - ${idx})`,
      sampleAnswer: essay.ans,
      keywords: essay.keys
    };
  }
}

// 2. MATEMATIKA GENERATOR
function generateMatematikaQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Keliling Bangun Datar', 'Luas Bangun Datar', 'Sudut Lancip Tumpul', 
    'Piktogram Hasil Panen', 'Diagram Batang Koperasi', 'Sifat Persegi Panjang', 
    'Segitiga Sama Kaki', 'Operasi Data', 'Sumbu Simetri'
  ];
  const topic = topics[idx % topics.length];

  // Helper variables to make questions solver-friendly and customized per idx
  const numA = (idx * 3 + 5) % 12 + 4; // 4 to 15
  const numB = (idx * 2 + 3) % 8 + 3;  // 3 to 10
  
  if (type === 'pilihan_ganda') {
    const qType = idx % 5;
    if (qType === 0) {
      // Keliling Persegi
      const keliling = numA * 4;
      return {
        id,
        subjectId: 'matematika',
        type: 'pilihan_ganda',
        topic: 'Keliling Bangun Datar',
        questionText: `Sebuah ubin lantai berbentuk persegi presisi dengan ukuran panjang sisi tepat ${numA} cm. Berapakah keliling dari ubin lantai sekolah tersebut?`,
        options: [
          `${keliling - 4} cm`,
          `${keliling} cm`,
          `${keliling + 6} cm`,
          `${numA * numA} cm`
        ],
        correctAnswer: 1,
        explanation: `Keliling persegi = Sisi × 4 = ${numA} cm × 4 = ${keliling} cm.`
      };
    } else if (qType === 1) {
      // Luas Persegi Panjang
      const luas = numA * numB;
      return {
        id,
        subjectId: 'matematika',
        type: 'pilihan_ganda',
        topic: 'Luas Bangun Datar',
        questionText: `Pak Budi membeli pekarangan berbentuk persegi panjang dengan ukuran panjang ${numA} meter dan lebar ${numB} meter. Tentukanlah luas pekarangan Pak Budi!`,
        options: [
          `${luas + 10} m²`,
          `${2 * (numA + numB)} m²`,
          `${luas} m²`,
          `${luas - 5} m²`
        ],
        correctAnswer: 2,
        explanation: `Luas persegi panjang = Panjang × Lebar = ${numA} m × ${numB} m = ${luas} m².`
      };
    } else if (qType === 2) {
      // Sudut lancip/tumpul
      const besarSudut = ((idx * 15) % 95) + 35; // 35 to 125
      const isLancip = besarSudut < 90;
      return {
        id,
        subjectId: 'matematika',
        type: 'pilihan_ganda',
        topic: 'Sudut',
        questionText: `Sebuah sudut diukur menggunakan busur derajat sekolah dan menunjukkan angka tepat sebesar ${besarSudut} derajat. Berdasarkan ukurannya, sudut tersebut berjenis sudut...`,
        options: [
          'Sudut Lancip',
          'Sudut Siku-siku',
          'Sudut Tumpul',
          'Sudut Refleks'
        ],
        correctAnswer: isLancip ? 0 : (besarSudut === 90 ? 1 : 2),
        explanation: `Sudut di bawah 90 derajat dinamakan sudut lancip, tepat 90 derajat dinamakan siku-siku, sedangkan di atas 90 derajat hingga di bawah 180 derajat dinamakan sudut tumpul.`
      };
    } else {
      // Piktogram
      const perGambar = ((idx * 5) % 15) + 5; // 5, 10, 15 etc.
      const totalSapi = numB;
      const totalKuantitas = perGambar * totalSapi;
      return {
        id,
        subjectId: 'matematika',
        type: 'pilihan_ganda',
        topic: 'Piktogram',
        questionText: `Pada piktogram peternakan Desa Makmur: tiap 1 icon kepala sapi mewakili ${perGambar} ekor sapi asli. Jika peternakan Pak Hasan digambarkan dengan ${totalSapi} buah icon sapi, berapakah jumlah sapi asli milik Pak Hasan?`,
        options: [
          `${totalKuantitas - 10} ekor`,
          `${totalKuantitas + 20} ekor`,
          `${totalSapi} ekor`,
          `${totalKuantitas} ekor`
        ],
        correctAnswer: 3,
        explanation: `Sapi asli = Jumlah icon × representasi per icon = ${totalSapi} × ${perGambar} = ${totalKuantitas} ekor.`
      };
    }
  } else if (type === 'isian') {
    const keliling = numB * 4;
    return {
      id,
      subjectId: 'matematika',
      type: 'isian',
      topic: 'Keliling Bangun Datar',
      questionText: `Sebuah bingkai lukisan berbentuk persegi memiliki ukuran panjang sisi sebesar ${numB} cm. Keliling bingkai lukisan tersebut adalah ... cm.`,
      correctAnswers: [`${keliling}`],
      placeholder: 'Ketik angkanya saja...'
    };
  } else if (type === 'menjodohkan') {
    const s1 = numA;
    return {
      id,
      subjectId: 'matematika',
      type: 'menjodohkan',
      topic: 'Keliling & Luas',
      questionText: `Jodohkan rumus-rumus di bawah ini dengan nama bangun datar atau operasi besaran matematika yang sesuai! (Sesi ${idx})`,
      pairs: [
        { left: 'Rumus Sisi × Sisi', right: `Sama dengan Luas Persegi` },
        { left: 'Rumus Sisi × 4', right: `Sama dengan Keliling Persegi` },
        { left: 'Sudut Lancip', right: 'Sudut berukuran kurang dari 90 derajat' }
      ]
    };
  } else {
    // uraian
    const p = numA + 3;
    const l = numB;
    const kel = 2 * (p + l);
    const lu = p * l;
    return {
      id,
      subjectId: 'matematika',
      type: 'uraian',
      topic: 'Keliling & Luas Kombinasi',
      questionText: `Sebuah kertas karton berukuran persegi panjang memiliki panjang ${p} cm dan lebar diukur sepanjang ${l} cm. Hitunglah keliling dan luas seluruh bidang karton tersebut secara rinci dengan menyertakan caranya!`,
      sampleAnswer: `Cara Penyelesaian:\n1. Keliling = 2 × (Panjang + Lebar) = 2 × (${p} + ${l}) = 2 × ${p + l} = ${kel} cm.\n2. Luas = Panjang × Lebar = ${p} × ${l} = ${lu} cm².`,
      keywords: [`${kel}`, `${lu}`, 'keliling', 'luas', 'cm']
    };
  }
}

// 3. BAHASA INDONESIA GENERATOR
function generateBahasaIndonesiaQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Lawan Kata', 'Persamaan Kata', 'Watak Tokoh', 'Fakta dan Opini', 
    'Tanda Baca', 'Majas Metafora', 'Kosakata Kunci', 'Analisis Puisi', 'Gagasan Utama'
  ];
  const topic = topics[idx % topics.length];

  const pairsWord = [
    { word: 'rajin', antonym: 'malas', synonym: 'giat' },
    { word: 'hemat', antonym: 'boros', synonym: 'irit' },
    { word: 'cepat', antonym: 'lambat', synonym: 'lekas' },
    { word: 'tinggi', antonym: 'rendah', synonym: 'jangkung' },
    { word: 'pemberani', antonym: 'penakut', synonym: 'ksatria' }
  ];
  const itemWord = pairsWord[idx % pairsWord.length];

  if (type === 'pilihan_ganda') {
    const qType = idx % 3;
    if (qType === 0) {
      return {
        id,
        subjectId: 'bahasa_indonesia',
        type: 'pilihan_ganda',
        topic: 'Lawan Kata',
        questionText: `Tono sangat suka menyisihkan sisa uang sakunya di celengan plastik sedangkan adiknya sangat suka jajan mainan mahal setiap hari. Sifat Tono adalah antonim (lawan kata) dari sifat adiknya yang...`,
        options: [
          'Pemalas',
          'Sombong',
          'Kikir',
          'Boros'
        ],
        correctAnswer: 3,
        explanation: 'Lawan kata dari Tono yang rajin menabung (hemat) adalah adiknya yang suka menghabiskan uang secara tidak bijaksana (boros).'
      };
    } else if (qType === 1) {
      return {
        id,
        subjectId: 'bahasa_indonesia',
        type: 'pilihan_ganda',
        topic: 'Fakta dan Opini',
        questionText: 'Manakah kalimat di bawah ini yang tergolong sebagai kalimat OPINI (pendapat pribadi)?',
        options: [
          'Bandung adalah ibu kota Provinsi Jawa Barat di Indonesia.',
          'Pelajaran Matematika adalah pelajaran paling menakutkan bagi semua anak SD.',
          'Indonesia memproklamasikan kemerdekaan pada tanggal 17 Agustus 1945.',
          'Gajah adalah mamalia darat terbesar yang masih hidup saat ini.'
        ],
        correctAnswer: 1,
        explanation: 'Kalimat no 2 adalah opini/pendapat pribadi, sebab tidak semua murid SD takut dengan pelajaran Matematika (sebagian sangat menyukainya).'
      };
    } else {
      return {
        id,
        subjectId: 'bahasa_indonesia',
        type: 'pilihan_ganda',
        topic: 'Majas Personifikasi',
        questionText: 'Gaya bahasa atau majas yang memberikan sifat kemanusiaan pada benda mati seperti pada kalimat "Angin malam bisikkan pesan damai ke telingaku" dinamakan majas...',
        options: [
          'Majas Hiperbola',
          'Majas Metafora',
          'Majas Personifikasi',
          'Majas Asosiasi'
        ],
        correctAnswer: 2,
        explanation: 'Majas personifikasi adalah gaya bahasa yang membuat benda mati seolah-olah bernyawa dan berperilaku layaknya manusia (misal: angin membisiki pesan).'
      };
    }
  } else if (type === 'isian') {
    return {
      id,
      subjectId: 'bahasa_indonesia',
      type: 'isian',
      topic: 'Ejaan Tanda Baca',
      questionText: `Untuk mengakhiri sebuah kalimat tanya yang menanyakan tentang kabar atau lokasi, kita wajib memberikan tanda baca ... (tulis secara textual nama tandanya)`,
      correctAnswers: ['tanya', 'tanda tanya'],
      placeholder: 'Contoh: tanda seru (ketik jawabanmu)...'
    };
  } else if (type === 'menjodohkan') {
    return {
      id,
      subjectId: 'bahasa_indonesia',
      type: 'menjodohkan',
      topic: 'Lawan Kata',
      questionText: `Jodohkan kata-kata berikut dengan lawan katanya (antonym) yang paling sesuai! (Kuis ${idx})`,
      pairs: [
        { left: 'Kata Rajin', right: 'Lawan katanya adalah Malas' },
        { left: 'Kata Pemberani', right: 'Lawan katanya adalah Penakut' },
        { left: 'Kata Pintar', right: 'Lawan katanya adalah Bodoh' }
      ]
    };
  } else {
    // uraian
    return {
      id,
      subjectId: 'bahasa_indonesia',
      type: 'uraian',
      topic: 'Analisis Paragraf',
      questionText: `Tuliskan perbedaan mendasar antara kalimat FAKTA dengan kalimat OPINI, serta berikan masing-masing satu kalimat contoh buatanmu sendiri!`,
      sampleAnswer: 'Perbedaan:\n1. Fakta adalah kalimat yang menyatakan kenyataan objektif, terbukti kebenarannya secara ilmiah atau sejarah.\nContoh: Presiden pertama Indonesia adalah Ir. Soekarno.\n2. Opini adalah kalimat yang berisi pendapat, tanggapan, gagasan, atau keyakinan subjektif seseorang yang belum tentu disetujui semua orang.\nContoh: Bakso buatan Ibu saya adalah bakso terenak di dunia.',
      keywords: ['fakta', 'opini', 'perbedaan', 'contoh', 'kenyataan', 'pendapat']
    };
  }
}

// 4. PENDIDIKAN PANCASILA GENERATOR
function generatePancasilaQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Sila-sila Pancasila', 'Gotong Royong', 'Hak dan Kewajiban', 
    'Rumah Adat Indonesia', 'Pakaian Adat Kebaya', 'Norma Masyarakat', 
    'Keberagaman Suku', 'Kerja Keras Pancasila'
  ];
  const topic = topics[idx % topics.length];

  if (type === 'pilihan_ganda') {
    const qType = idx % 4;
    if (qType === 0) {
      return {
        id,
        subjectId: 'pancasila',
        type: 'pilihan_ganda',
        topic: 'Lambang Sila Pancasila',
        questionText: `Lambang Sila Ketiga dari Pancasila, yang melambangkan kerindangan perlindungan dan persatuan seluruh bangsa Indonesia, adalah...`,
        options: [
          'Kepala Banteng',
          'Pohon Beringin',
          'Padi dan Kapas',
          'Bintang Emas'
        ],
        correctAnswer: 1,
        explanation: 'Pohon Beringin dinamai sebagai perlambangan Sila ke-3, yang berbunyi "Persatuan Indonesia".'
      };
    } else if (qType === 1) {
      return {
        id,
        subjectId: 'pancasila',
        type: 'pilihan_ganda',
        topic: 'Hak dan Kewajiban',
        questionText: 'Manakah tindakan di bawah ini yang dikategorikan sebagai KEWAJIBAN utama seorang siswa di kelas?',
        options: [
          'Mendapat uang jajan saku mingguan',
          'Mendengarkan penjelasan guru dengan tekun dan tertib',
          'Memakai fasilitas taman bermain sekolah sesuka hati',
          'Menerima buku laporan hasil belajar (rapor)'
        ],
        correctAnswer: 1,
        explanation: 'Mendengarkan penjelasan guru, mengikuti upacara, dan mengerjakan piket adalah kewajiban siswa di sekolah, sedangkan fasilitas dan hasil rapor adalah hak.'
      };
    } else if (qType === 2) {
      return {
        id,
        subjectId: 'pancasila',
        type: 'pilihan_ganda',
        topic: 'Gotong Royong',
        questionText: 'Manakah kegiatan gotong royong yang biasa dilakukan di lingkungan tempat tinggal masyarakat sekitar rumah?',
        options: [
          'Mengerjakan soal ujian ulangan harian bersama teman sebangku',
          'Membersihkan selokan desa bersama dalam kerja bakti',
          'Berdiam diri di kamar mendengarkan musik',
          'Membuat kerajinan tangan individu di rumah'
        ],
        correctAnswer: 1,
        explanation: 'Kerja bakti membersihkan lingkungan, memperbaiki jembatan, dan siskamling ronda malam adalah contoh nyata gotong royong masyarakat.'
      };
    } else {
      return {
        id,
        subjectId: 'pancasila',
        type: 'pilihan_ganda',
        topic: 'Sila-sila Pancasila',
        questionText: 'Melakukan musyawarah mufakat di lingkungan keluarga untuk menentukan tujuan liburan akhir tahun merupakan pencerminan Sila ke-...',
        options: [
          'Dua (2)',
          'Tiga (3)',
          'Empat (4)',
          'Lima (5)'
        ],
        correctAnswer: 2,
        explanation: 'Musyawarah, menghargai pendapat orang lain saat mengambil keputusan bersama merupakan pengamalan Sila ke-4 Pencasila.'
      };
    }
  } else if (type === 'isian') {
    return {
      id,
      subjectId: 'pancasila',
      type: 'isian',
      topic: 'Semboyan Negara',
      questionText: `Semboyan nasional negara Republik Indonesia yang memiliki makna berbeda-beda tetapi tetap satu jua adalah Bhinneka Tunggal ...`,
      correctAnswers: ['ika'],
      placeholder: 'Ketik satu kata penyambungnya...'
    };
  } else if (type === 'menjodohkan') {
    return {
      id,
      subjectId: 'pancasila',
      type: 'menjodohkan',
      topic: 'Rumah Adat',
      questionText: `Pasangkan nama rumah adat terkenal berikut ini dengan provinsi asalnya secara tepat! (Seri ${idx})`,
      pairs: [
        { left: 'Rumus Joglo', right: 'Rumah adat khas Provinsi Jawa Tengah' },
        { left: 'Rumah Gadang', right: 'Rumah adat khas Provinsi Sumatera Barat' },
        { left: 'Rumah Honai', right: 'Rumah adat khas daerah Papua asli' }
      ]
    };
  } else {
    // uraian
    return {
      id,
      subjectId: 'pancasila',
      type: 'uraian',
      topic: 'Pengamalan Pancasila',
      questionText: `Sebutkan bunyi sila kedua dari Pancasila, sebutkan lambang sila tersebut, dan berikan dua contoh pengamalannya di kehidupan sehari-hari sekolah!`,
      sampleAnswer: '1. Bunyi Sila Ke-2: "Kemanusiaan yang adil dan beradab".\n2. Lambang: Rantai emas.\n3. Contoh Pengamalan:\n- Menolong teman kelas yang terjatuh di halaman sekolah.\n- Berbagi bekal makanan dengan teman tanpa membeda-bedakan latar belakang agama/suku.',
      keywords: ['beradab', 'kemanusiaan', 'rantai', 'menolong', 'teman', 'jatuh', 'adil']
    };
  }
}

// 5. BAHASA INGGRIS GENERATOR
function generateBahasaInggrisQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Weather Vocabularies', 'Classroom Gear', 'Animal Names', 'Preposition of Place',
    'Daily Activities', 'Simple Adjectives', 'School Subjects', 'Clothing Items'
  ];
  const topic = topics[idx % topics.length];

  if (type === 'pilihan_ganda') {
    const qType = idx % 4;
    if (qType === 0) {
      return {
        id,
        subjectId: 'bahasa_inggris',
        type: 'pilihan_ganda',
        topic: 'Weather Vocabulary',
        questionText: `It is very hot today. The sun is shining brightly and the sky is blue. What is the weather like today?`,
        options: [
          'It is rainy',
          'It is snowy',
          'It is sunny',
          'It is cloudy'
        ],
        correctAnswer: 2,
        explanation: 'When the sun is shining brightly and the climate is hot, it is a "sunny" day.'
      };
    } else if (qType === 1) {
      return {
        id,
        subjectId: 'bahasa_inggris',
        type: 'pilihan_ganda',
        topic: 'Clothing Weather',
        questionText: 'If it starts to pour water heavily from the grey clouds (rainy day), we should carry an...',
        options: [
          'Umbrella',
          'Sunglasses',
          'T-shirt',
          'Swimsuit'
        ],
        correctAnswer: 0,
        explanation: 'We use an "umbrella" (payung) during a rainy day to avoid getting wet.'
      };
    } else if (qType === 2) {
      return {
        id,
        subjectId: 'bahasa_inggris',
        type: 'pilihan_ganda',
        topic: 'Animals Vocabulary',
        questionText: 'Which animal has a very long neck to reach high leaves in the tall trees?',
        options: [
          'Monkey',
          'Elephant',
          'Giraffe',
          'Crocodile'
        ],
        correctAnswer: 2,
        explanation: 'A "giraffe" (jerapah) is known for its signature long neck and brown spots.'
      };
    } else {
      return {
        id,
        subjectId: 'bahasa_inggris',
        type: 'pilihan_ganda',
        topic: 'Preposition of Place',
        questionText: 'We sit on top of this object to study in the classroom. What is it?',
        options: [
          'A table',
          'A blackboard',
          'A chair',
          'A book'
        ],
        correctAnswer: 2,
        explanation: 'We sit on chairs (kursi) and write on top of desks or tables.'
      };
    }
  } else if (type === 'isian') {
    return {
      id,
      subjectId: 'bahasa_inggris',
      type: 'isian',
      topic: 'Simple Translate',
      questionText: `Translate the color phrase "Apel Merah" into English... (Lowercase only)`,
      correctAnswers: ['red apple'],
      placeholder: 'Type in English...'
    };
  } else if (type === 'menjodohkan') {
    return {
      id,
      subjectId: 'bahasa_inggris',
      type: 'menjodohkan',
      topic: 'Vocabs Matching',
      questionText: `Match the English animal names with their correct Indonesian translations! (Level ${idx})`,
      pairs: [
        { left: 'The Elephant', right: 'Gajah besar belalai' },
        { left: 'The Lion', right: 'Singa raja rimba' },
        { left: 'The Rabbit', right: 'Kelinci lompat wortel' }
      ]
    };
  } else {
    // uraian
    return {
      id,
      subjectId: 'bahasa_inggris',
      type: 'uraian',
      topic: 'Sentences Making',
      questionText: `Translate these three simple Indonesian sentences into correct English: "Hari ini hujan", "Saya punya pensil", dan "Kucing adalah seekor hewan"!`,
      sampleAnswer: 'Translations:\n1. "Hari ini hujan" -> It is rainy today. / It is raining today.\n2. "Saya punya pensil" -> I have a pencil.\n3. "Kucing adalah seekor hewan" -> A cat is an animal. / Cat is an animal.',
      keywords: ['rainy', 'raining', 'today', 'pencil', 'cat', 'animal']
    };
  }
}

// 6. PAI GENERATOR
function generatePaiQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Asmaul Husna', 'Adab Islam', 'Kisah Para Nabi', 'Surat Al-Maun',
    'Rukun Iman', 'Rukun Islam', 'Zakat & Haji', 'Wudhu Sempurna'
  ];
  const topic = topics[idx % topics.length];

  if (type === 'pilihan_ganda') {
    const qType = idx % 4;
    if (qType === 0) {
      return {
        id,
        subjectId: 'pai',
        type: 'pilihan_ganda',
        topic: 'Asmaul Husna',
        questionText: `Asmaul Husna "Ar-Rahim" memiliki arti yang luhur yaitu Allah Yang Maha...`,
        options: [
          'Maha Pengasih',
          'Maha Penyayang',
          'Maha Merajai',
          'Maha Suci'
        ],
        correctAnswer: 1,
        explanation: 'Ar-Rahman berarti Maha Pengasih kepada semua makhluk. Ar-Rahim berarti Maha Penyayang bagi orang-orang mukmin.'
      };
    } else if (qType === 1) {
      return {
        id,
        subjectId: 'pai',
        type: 'pilihan_ganda',
        topic: 'Adab Mengucapkan Salam',
        questionText: 'Bila bertemu sesama Muslim di jalan, hukum asal memulai mengucapkan salam adalah sunnah muakkadah, sedangkan hukum bagi yang menjawab salam tersebut adalah...',
        options: [
          'Makruh',
          'Mubah bebas',
          'Wajib (Fardhu)',
          'Sunnah'
        ],
        correctAnswer: 2,
        explanation: 'Hukum memulai salam adalah sunnah, namun menjawab ucapan salam dari saudara Muslim adalah wajib hukumnya.'
      };
    } else if (qType === 2) {
      return {
        id,
        subjectId: 'pai',
        type: 'pilihan_ganda',
        topic: 'Adab Sifat Munafik',
        questionText: 'Berdasarkan sabda Nabi Muhammad SAW, tanda orang munafik ada tiga perkara. Salah satunya jika dipercaya dia...',
        options: [
          'Dusta berbohong',
          'Ingkar janji',
          'Khianat membocorkan',
          'Marah-marah'
        ],
        correctAnswer: 2,
        explanation: 'Hadis nabi: "Ayatul munafiqi salatsun: idza haddatsa kadzaba, wa idza wa\'ada akhlafa, wa idza\'-tumina khana" (Jika berkata dusta, jika berjanji ingkar, jika dipercaya khianat).'
      };
    } else {
      return {
        id,
        subjectId: 'pai',
        type: 'pilihan_ganda',
        topic: 'Rukun Iman',
        questionText: 'Mempercayai bahwa hari kiamat/akhir zaman pasti akan terjadi menghancurkan seluruh jagat raya adalah rukun iman ke-...',
        options: [
          'Tiga (3)',
          'Empat (4)',
          'Lima (5)',
          'Enam (6)'
        ],
        correctAnswer: 2,
        explanation: 'Rukun iman ke-5 adalah beriman kepada Hari Akhir (Kiamat).'
      };
    }
  } else if (type === 'isian') {
    return {
      id,
      subjectId: 'pai',
      type: 'isian',
      topic: 'Kisah Nabi Nuh',
      questionText: `Nabi yang diperintahkan oleh Allah membuat sebuah bahtera (kapal besar) untuk menghindari banjir dahsyat yang menyapu kaum ingkar adalah Nabi ... AS.`,
      correctAnswers: ['nuh'],
      placeholder: 'Ketik nama nabinya saja...'
    };
  } else if (type === 'menjodohkan') {
    return {
      id,
      subjectId: 'pai',
      type: 'menjodohkan',
      topic: 'Rukun Islam & Iman',
      questionText: `Pasangkan nomor/angka rukun Islam berikut dengan ibadahnya yang sesuai! (Sesi Ke-${idx})`,
      pairs: [
        { left: 'Rukun Islam Ke-1', right: 'Mengucapkan Dua Kalimat Syahadat' },
        { left: 'Rukun Islam Ke-2', right: 'Mendirikan Shalat Fardhu Lima Waktu' },
        { left: 'Rukun Islam Ke-3', right: 'Membayar Zakat bila mampu' }
      ]
    };
  } else {
    // uraian
    return {
      id,
      subjectId: 'pai',
      type: 'uraian',
      topic: 'Akhlak Terpuji',
      questionText: `Sebutkan tiga cara berbakti (birrul walidain) kepada kedua orang tua kita selagi mereka masih hidup sehat!`,
      sampleAnswer: 'Tiga cara berbakti kepada orang tua yaitu:\n1. Berbicara dengan lemah lembut dan sopan tanpa membentak.\n2. Patuh dan taat melaksanakan perintah kebaikan mereka.\n3. Membantu pekerjaan rumah secara ikhlas serta mendoakan kebaikan keselamatan mereka setiap selesai shalat fardhu.',
      keywords: ['patuh', 'lemah lembut', 'membantu', 'ibu', 'bapak', 'mendoakan', 'sopan']
    };
  }
}

// 7. BAHASA ARAB GENERATOR
function generateBahasaArabQuestion(id: string, idx: number, type: 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian', seed: number): Question {
  const topics = [
    'Nama Binatang (Hayawanat)', 'Nama Pelajaran (Daras)', 'Angka 1 s.d. 10', 'Benda di Kelas',
    'Anggota Tubuh', 'Warna Alwan', 'Kosakata Anggota Keluarga'
  ];
  const topic = topics[idx % topics.length];

  if (type === 'pilihan_ganda') {
    const qType = idx % 4;
    if (qType === 0) {
      return {
        id,
        subjectId: 'bahasa_arab',
        type: 'pilihan_ganda',
        topic: 'Asma Hayawan',
        questionText: `Hewan bertubuh besar dengan belalai panjang dan telinga lebar yang memiliki lafaz bahasa arab "فِيْلٌ" (Fiilun) adalah...`,
        options: [
          'Kucing imut',
          'Unta padang pasir',
          'Singa galak',
          'Gajah besar'
        ],
        correctAnswer: 3,
        explanation: 'Al-Filu / Fiilun (فيل) dalam bahasa Indonesia berarti gajah (sebagaimana kisahnya di Surah Al-Fil).'
      };
    } else if (qType === 1) {
      return {
        id,
        subjectId: 'bahasa_arab',
        type: 'pilihan_ganda',
        topic: 'Asmaud Daras',
        questionText: 'Pelajaran berhitung angka yang di dalam kamus bahasa arab disebut "عِلْمُ الْحِسَابِ" (Ilmul Hisabi) adalah...',
        options: [
          'Pelajaran Sejarah',
          'Pelajaran Seni Budaya',
          'Pelajaran Matematika',
          'Pelajaran Fikih Agama'
        ],
        correctAnswer: 2,
        explanation: 'Darsul Hisab (الحساب) mengacu pada ilmu berhitung atau pelajaran Matematika.'
      };
    } else if (qType === 2) {
      return {
        id,
        subjectId: 'bahasa_arab',
        type: 'pilihan_ganda',
        topic: 'Asyaul Fasli',
        questionText: 'Siswa menulis kalimat latihan di papan tulis menggunakan kapur atau spidol. Lafal arab "قَلَمٌ" (Qalamun) berarti...',
        options: [
          'Kursi kayu',
          'Pena/Spidol/Pensil tulis',
          'Penghapus tulis',
          'Buku tulis tebal'
        ],
        correctAnswer: 1,
        explanation: 'Qalamun (قلم) berarti pena, alat tulis yang digunakan untuk mencatat pelajaran.'
      };
    } else {
      return {
        id,
        subjectId: 'bahasa_arab',
        type: 'pilihan_ganda',
        topic: 'Warna-warna',
        questionText: 'Warna bendera suci Indonesia merah-putih. Bahasa arab dari warna merah cerah, yaitu...',
        options: [
          'Abyadh',
          'Ahmar',
          'Azraq',
          'Aswad'
        ],
        correctAnswer: 1,
        explanation: 'Ahmar (أحمر) bermakna merah, sedangkan Abyadh bermakna putih.'
      };
    }
  } else if (type === 'isian') {
    return {
      id,
      subjectId: 'bahasa_arab',
      type: 'isian',
      topic: 'Angka Arab',
      questionText: `Angka arab "وَاحِدٌ" (Wahidun) memiliki padanan angka numerik dalam matematika yaitu angka ... (ketik dalam bentuk angka saja)`,
      correctAnswers: ['1', 'satu'],
      placeholder: 'Ketik angkanya...'
    };
  } else if (type === 'menjodohkan') {
    return {
      id,
      subjectId: 'bahasa_arab',
      type: 'menjodohkan',
      topic: 'A\'dhaul Jism',
      questionText: `Jodohkan istilah arab anggota tubuh berikut ini dengan terjemahannya yang benar! (Seri ${idx})`,
      pairs: [
        { left: 'أَنْفٌ (Anfun)', right: 'Organ Hidung penciuman' },
        { left: 'عَيْنٌ (Ainun)', right: 'Organ Mata penglihatan' },
        { left: 'رَأْسٌ (Ra\'sun)', right: 'Anggota Kepala rambut' }
      ]
    };
  } else {
    // uraian
    return {
      id,
      subjectId: 'bahasa_arab',
      type: 'uraian',
      topic: 'Vocabs Translate',
      questionText: `Terjemahkan istilah-istilah di ruang kelas berikut dari bahasa Indonesia ke dalam kata bahasa Arab latin atau arab asli: "Meja", "Kursi", dan "Buku"!`,
      sampleAnswer: 'Terjemahan kata:\n1. "Meja" -> Maktabun (مَكْتَبٌ)\n2. "Kursi" -> Kursiyyun (كُرْسِيٌّ)\n3. "Buku" -> Kitabun (كِتَابٌ)',
      keywords: ['maktab', 'kursi', 'kitab', 'مكتب', 'كرسي', 'كتاب']
    };
  }
}
