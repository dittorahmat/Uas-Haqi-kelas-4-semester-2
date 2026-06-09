/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateQuestionsForSubject } from './questionGenerator';

export type QuestionType = 'pilihan_ganda' | 'isian' | 'menjodohkan' | 'uraian';

export interface SubjectInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface BaseQuestion {
  id: string;
  subjectId: string;
  type: QuestionType;
  questionText: string;
  explanation?: string;
  topic?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'pilihan_ganda';
  options: string[];
  correctAnswer: number; // index of the correct option
}

export interface FillInQuestion extends BaseQuestion {
  type: 'isian';
  correctAnswers: string[]; // acceptable plain text answers (lowercase for validation)
  placeholder?: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'menjodohkan';
  pairs: MatchingPair[];
}

export interface EssayQuestion extends BaseQuestion {
  type: 'uraian';
  sampleAnswer: string;
  keywords: string[]; // key terms to look for to suggest correct or check coverage
}

export type Question = MultipleChoiceQuestion | FillInQuestion | MatchingQuestion | EssayQuestion;

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'ipas',
    name: 'IPAS (Sains & Sosial)',
    icon: 'Leaf',
    color: 'emerald',
    description: 'Bab 8: Menjadi Pahlawan di Lingkunganku (Zat, Energi Alternatif, 3R, & Ekosistem)'
  },
  {
    id: 'matematika',
    name: 'Matematika',
    icon: 'Calculator',
    color: 'blue',
    description: 'Bab 6: Bangun Datar & Bab 7: Piktogram dan Diagram Batang'
  },
  {
    id: 'bahasa_indonesia',
    name: 'Bahasa Indonesia',
    icon: 'BookOpen',
    color: 'amber',
    description: 'Bab 8: Hidup Sehat (Watak Tokoh, Fakta & Opini, Analisis Cerpen)'
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    icon: 'Shield',
    color: 'red',
    description: 'Bab 4: Persatuan & Kesatuan, Budaya Gotong Royong'
  },
  {
    id: 'bahasa_inggris',
    name: 'Bahasa Inggris',
    icon: 'Globe',
    color: 'cyan',
    description: 'Unit 8: Rainy Day and Sunny Day (Weather vocabularies, gears, & activities)'
  },
  {
    id: 'pai',
    name: 'PAI (Agama Islam)',
    icon: 'Heart',
    color: 'indigo',
    description: 'Bab 8: Adab Salam, Perintah Tolong-Menolong (Al-Maidah: 2), & Menghindari Sifat Munafik'
  },
  {
    id: 'bahasa_arab',
    name: 'Bahasa Arab',
    icon: 'Languages',
    color: 'purple',
    description: 'Bab 1: Nama-nama Pelajaran & Bab 2: Nama-nama Binatang'
  }
];

const STATIC_QUESTION_POOL: Question[] = [
  // ==========================================
  // IPAS (23 Questions)
  // ==========================================
  {
    id: 'ipas_1',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Deforestasi',
    questionText: 'Apa istilah untuk kegiatan penebangan hutan secara liar dan tidak terkontrol?',
    options: [
      'Reboisasi',
      'Deforestasi',
      'Gotong royong',
      'Urbanisasi'
    ],
    correctAnswer: 1,
    explanation: 'Deforestasi merupakan istilah ilmiah untuk kegiatan penebangan hutan atau penggundulan hutan secara liar.'
  },
  {
    id: 'ipas_2',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Dampak Pembakaran',
    questionText: 'Membakar sampah plastik di halaman rumah merupakan tindakan yang berbahaya karena dapat menghasilkan...',
    options: [
      'Gas oksigen yang segar',
      'Gas nitrogen murni',
      'Gas beracun yang membahayakan kesehatan manusia dan lingkungan',
      'Uap air yang menyuburkan tanaman sekitar'
    ],
    correctAnswer: 2,
    explanation: 'Pembakaran sampah plastik menghasilkan bahan kimia beracun seperti dioksin yang sangat berbahaya bagi sistem pernapasan dan lingkungan.'
  },
  {
    id: 'ipas_3',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Gas Rumah Kaca',
    questionText: 'Gas rumah kaca utama yang banyak dihasilkan dari aktivitas manusia dan memerangkap panas di atmosfer bumi adalah...',
    options: [
      'Oksigen (O₂)',
      'Karbon dioksida (CO₂)',
      'Hidrogen (H₂)',
      'Helium (He)'
    ],
    correctAnswer: 1,
    explanation: 'Karbon Dioksida (CO₂) adalah gas rumah kaca utama yang dilepaskan melalui pembakaran bahan bakar fosil dan mengakibatkan pemanasan global.'
  },
  {
    id: 'ipas_4',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Penyebab Banjir',
    questionText: 'Saluran air atau selokan di lingkungan padat penduduk sering kali tersumbat. Hal ini menjadi penyebab utama terjadinya...',
    options: [
      'Tanah longsor',
      'Banjir',
      'Gempa bumi',
      'Kekeringan'
    ],
    correctAnswer: 1,
    explanation: 'Sampah yang menyumbat saluran air mencegah air hujan mengalir dengan lancar, sehingga air meluap dan memicu banjir lokal.'
  },
  {
    id: 'ipas_5',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Energi Alternatif',
    questionText: 'Energi alternatif yang berasal dari pancaran sinar matahari dinamakan energi...',
    options: [
      'Angin',
      'Surya',
      'Geotermal (panas bumi)',
      'Biomassa'
    ],
    correctAnswer: 1,
    explanation: 'Sinar matahari ditangkap menggunakan panel surya untuk dijadikan energi listrik, yang kita sebut dengan energi surya.'
  },
  {
    id: 'ipas_6',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Dampak Pemanasan Global',
    questionText: 'Pemanasan global memicu pencairan es di kutub utara dan selatan. Dampak langsung dari peristiwa ini bagi planet bumi adalah...',
    options: [
      'Permukaan air laut meningkat (naik)',
      'Suhu laut mendingin drastis',
      'Daratan bertambah sangat luas',
      'Tekanan udara menurun konstan'
    ],
    correctAnswer: 0,
    explanation: 'Mencairnya es di kutub menambah volume air laut, menyebabkan permukaan air laut meningkat dan mengancam daerah pesisir.'
  },
  {
    id: 'ipas_7',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Reboisasi',
    questionText: 'Kegiatan menanam kembali pohon-pohon di hutan yang gundul atau rusak disebut dengan...',
    options: [
      'Irigasi',
      'Reboisasi',
      'Sistem tumpang sari',
      'Erosi'
    ],
    correctAnswer: 1,
    explanation: 'Reboisasi adalah upaya penghijauan kembali hutan yang gundul agar ekosistem hutan dapat pulih kembali.'
  },
  {
    id: 'ipas_8',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Kendaraan Umum',
    questionText: 'Mengapa beralih menggunakan kendaraan umum dibanding kendaraan pribadi dapat membantu kelestarian lingkungan?',
    options: [
      'Karena kendaraan umum selalu ber-AC dingin',
      'Dapat mengurangi jumlah kendaraan pribadi di jalan raya, mengurangi kemacetan, dan menekan polusi udara',
      'Dapat membuat waktu perjalanan menjadi jauh bertambah lama',
      'Kendaraan umum tidak menggunakan bahan bakar fosil sama sekali'
    ],
    correctAnswer: 1,
    explanation: 'Dengan menggunakan bus atau kereta, jumlah mobil pribadi yang beroperasi berkurang, sehingga konsumsi bahan bakar total dan polusi udara ikut berkurang.'
  },
  {
    id: 'ipas_9',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Limbah Berbahaya',
    questionText: 'Limbah logam berat yang dibuang ke aliran sungai tanpa diolah terlebih dahulu sangat berbahaya karena...',
    options: [
      'Membuat air sungai menjadi berwarna bening jernih',
      'Dapat menyuburkan ekosistem tumbuhan air dengan cepat',
      'Sangat beracun bagi kelangsungan hidup biota air dan kesehatan manusia yang mengonsumsinya',
      'Meningkatkan kadar gas oksigen alami di dalam air'
    ],
    correctAnswer: 2,
    explanation: 'Logam berat (seperti merkuri atau timbal) bersifat racun akumulatif yang merusak sel-sel makhluk hidup dan merusak rantai makanan.'
  },
  {
    id: 'ipas_10',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Pahlawan Lingkungan',
    questionText: 'Seseorang yang secara aktif dan berani melakukan tindakan nyata demi merawat, mengampanyekan, serta melestarikan kebersihan alam sekitar disebut...',
    options: [
      'Pahlawan Devisa',
      'Pahlawan Lingkungan',
      'Pahlawan Revolusi',
      'Pahlawan Kemanusiaan'
    ],
    correctAnswer: 1,
    explanation: 'Pahlawan lingkungan adalah sebutan bagi orang-orang yang berdedikasi menjaga kelestarian alam dan lingkungan hidup.'
  },
  {
    id: 'ipas_11',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Hemat Energi',
    questionText: 'Tindakan sederhana di rumah yang mencerminkan sikap hemat energi adalah...',
    options: [
      'Menyalakan lampu kamar terus-menerus sepanjang hari',
      'Membiarkan televisi tetap menyala meskipun tidak ada yang menonton',
      'Mematikan lampu dan alat elektronik saat sedang tidak digunakan',
      'Membuka pintu kulkas lebar-lebar dalam waktu lama'
    ],
    correctAnswer: 2,
    explanation: 'Mematikan lampu dan perangkat listrik yang tidak dipakai adalah aksi nyata menghemat beban pemakaian energi listrik harian.'
  },
  {
    id: 'ipas_12',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Jejak Karbon',
    questionText: 'Apa yang dimaksud dengan "Jejak Karbon" (Carbon Footprint)?',
    options: [
      'Bekas telapak kaki hitam di tanah akibat menginjak arang',
      'Ukuran total jumlah gas rumah kaca (CO₂) yang dihasilkan dari aktivitas manusia sehari-hari',
      'Sisa pembakaran kayu hutan di areal perkebunan',
      'Jumlah batu bara yang digunakan di pabrik industri'
    ],
    correctAnswer: 1,
    explanation: 'Jejak karbon adalah indikator kuantitas emisi gas karbon dioksida yang dilepaskan ke atmosfer dari aktivitas perjalanan, penggunaan listrik, dll.'
  },
  {
    id: 'ipas_13',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Penebangan Liar & Banjir',
    questionText: 'Penebangan hutan secara liar dapat memicu timbulnya bencana banjir karena...',
    options: [
      'Akar pohon yang biasanya menahan dan menyerap air hujan hilang, sehingga air langsung mengalir deras di permukaan tanah',
      'Batang kayu yang roboh menghalangi datangnya awan hujan',
      'Hutan yang gundul memicu badai angin topan bertiup kencang',
      'Suhu lingkungan yang sejuk memicu pengembunan air'
    ],
    correctAnswer: 0,
    explanation: 'Pohon berfungsi menyerap air lewat akar. Jika hutan gundul, air hujan tidak terserap maksimal oleh tanah melainkan langsung hanyut mengalir.'
  },
  {
    id: 'ipas_14',
    subjectId: 'ipas',
    type: 'isian',
    topic: 'Sampah Organik vs Anorganik',
    questionText: 'Sampah yang berasal dari sisa makhluk hidup (seperti dedaunan kering, kulit buah, dan sisa makanan) dan sangat mudah terurai secara alami disebut sampah ...',
    correctAnswers: ['organik'],
    placeholder: 'Ketik satu kata saja...'
  },
  {
    id: 'ipas_15',
    subjectId: 'ipas',
    type: 'isian',
    topic: 'Sampah Organik vs Anorganik',
    questionText: 'Plastik, botol kaca, kaleng, dan bahan kimia sintetis adalah contoh jenis sampah yang sulit diurai bakteri dalam tanah, yang disebut sampah ...',
    correctAnswers: ['anorganik', 'non organik', 'non-organik'],
    placeholder: 'Ketik jenis sampahnya...'
  },
  {
    id: 'ipas_16',
    subjectId: 'ipas',
    type: 'isian',
    topic: 'Pipa Resapan',
    questionText: 'Kegiatan menanam tanaman di sekitar halaman rumah untuk menambah daerah teduh dan menyerap CO₂ disebut ...',
    correctAnswers: ['penghijauan', 'reboisasi', 'cocok tanam', 'berkebun'],
    placeholder: 'Ketik aktivitasnya...'
  },
  {
    id: 'ipas_17',
    subjectId: 'ipas',
    type: 'menjodohkan',
    topic: 'Konsep 3R',
    questionText: 'Jodohkanlah pilar aktivitas pengelolaan sampah 3R berikut dengan contoh pelaksanaannya yang tepat!',
    pairs: [
      { left: 'Reduce (Mengurangi)', right: 'Membawa tas kain sendiri saat belanja guna menghindari kantong plastik' },
      { left: 'Reuse (Menggunakan Kembali)', right: 'Memanfaatkan kembali botol plastik air mineral kosong menjadi pot bunga' },
      { left: 'Recycle (Daur Ulang)', right: 'Mengolah daun-daun gugur kering menjadi pupuk kompos organik' }
    ]
  },
  {
    id: 'ipas_18',
    subjectId: 'ipas',
    type: 'menjodohkan',
    topic: 'Jenis Sampah',
    questionText: 'Jodohkan jenis barang di bawah ini dengan kategori tempat sampah yang cocok!',
    pairs: [
      { left: 'Kulit pisang & sisa sayuran', right: 'Tempat Sampah Organik' },
      { left: 'Kantong kresek & sedotan plastik', right: 'Tempat Sampah Anorganik' },
      { left: 'Baterai bekas & bohlam rusak', right: 'Tempat Sampah B3 (Berbahaya)' }
    ]
  },
  {
    id: 'ipas_19',
    subjectId: 'ipas',
    type: 'menjodohkan',
    topic: 'Energi dan Sumbernya',
    questionText: 'Pasangkan jenis energi alternatif berikut dengan sumber asalnya!',
    pairs: [
      { left: 'Energi Panas Bumi', right: 'Uap panas di dalam perut bumi (Geotermal)' },
      { left: 'Energi Angin', right: 'Hembusan udara bebas yang memutar kincir' },
      { left: 'Energi Surya', right: 'Pancaran sinar matahari yang ditangkap sel surya' },
      { left: 'Energi Biomassa', right: 'Bahan biologis dari sisa kotoran ternak atau limbah kayu' }
    ]
  },
  {
    id: 'ipas_20',
    subjectId: 'ipas',
    type: 'uraian',
    topic: 'Aksi Pahlawan Lingkungan',
    questionText: 'Sebutkan 3 (tiga) tindakan konkret yang dapat kamu teladani dan lakukan di rumah sebagai bagian dari aksi pahlawan lingkungan!',
    sampleAnswer: '1. Memilah sampah organik dan anorganik sebelum dibuang.\n2. Menghemat penggunaan air bersih dan mematikan peralatan listrik yang tidak terpakai.\n3. Melakukan penghijauan secara mandiri dengan menanam tumbuhan hijau di dalam pot di sekitar pekarangan rumah.',
    keywords: ['memilah', 'sampah', 'hemat', 'listrik', 'air', 'menanam', 'tanaman', 'penghijauan']
  },
  {
    id: 'ipas_21',
    subjectId: 'ipas',
    type: 'uraian',
    topic: 'Limbah Berbahaya',
    questionText: 'Jelaskan mengapa pembuangan limbah sisa pabrik atau sampah rumah tangga ke aliran sungai dapat merusak rantai makanan ekosistem air!',
    sampleAnswer: 'Limbah sisa pabrik yang mengandung logam berat atau racun akan terserap oleh fitoplankton dan tumbuhan air. Selanjutnya, tumbuhan beracun tersebut dimakan oleh ikan kecil, dan ikan kecil dimakan ikan besar. Akumulasi racun di setiap tingkatan akan membunuh hewan air tersebut secara perlahan, mengurangi populasi mereka, dan meracuni rantai makanan secara keseluruhan termasuk manusia yang memancing ikan tersebut.',
    keywords: ['racun', 'ikan', 'rantai makanan', 'logam berat', 'ekosistem', 'mati', 'air']
  },
  {
    id: 'ipas_22',
    subjectId: 'ipas',
    type: 'pilihan_ganda',
    topic: 'Aksi Pahlawan Lingkungan',
    questionText: 'Memilah sampah berdasarkan jenisnya sebelum disalurkan ke truk pengangkut merupakan aksi penyelamatan bumi karena...',
    options: [
      'Menghalangi tukang sampah bekerja mencari nafkah',
      'Memudahkan pemilahan bahan sampah anorganik yang bernilai daur ulang tinggi dan kompos organik',
      'Membuat pekarangan rumah menjadi penuh bau sampah',
      'Meningkatkan konsumsi pemakaian plastik hitam baru'
    ],
    correctAnswer: 1,
    explanation: 'Memilah sampah sejak dari sumbernya sangat meringankan beban Tempat Pemrosesan Akhir (TPA) dan mempercepat daur ulang.'
  },

  // ==========================================
  // MATEMATIKA (22 Questions)
  // ==========================================
  {
    id: 'mtk_1',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Bangun datar segi empat yang mempunyai keliling dengan rumus K = 4 × sisi dan keempat sudutnya siku-siku sama besar adalah...',
    options: [
      'Segitiga sama sisi',
      'Persegi',
      'Jajaran genjang',
      'Trapesium'
    ],
    correctAnswer: 1,
    explanation: 'Persegi dicirikan dengan empat sisi yang memiliki panjang yang sama kuat dan sudut siku-siku (90 derajat) di keempat sudutnya.'
  },
  {
    id: 'mtk_2',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Bangun datar yang memiliki karakteristik sepasang sisi sejajar tetapi tidak sama panjang adalah...',
    options: [
      'Persegi panjang',
      'Belah ketupat',
      'Trapesium',
      'Lingkaran'
    ],
    correctAnswer: 2,
    explanation: 'Trapesium memiliki satu pasang sisi berhadapan yang sejajar, namun panjang kedua sisi sejajar tersebut berbeda.'
  },
  {
    id: 'mtk_3',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Sudut-sudut berhadapan sama besar, memiliki dua jajar sisi sejajar berhadapan panjang sama, dan bukan persegi maupun persegi panjang karena sudutnya tidak siku-siku. Bangun ini disebut...',
    options: [
      'Layang-layang',
      'Trapesium sama kaki',
      'Jajaran genjang',
      'Segitiga siku-siku'
    ],
    correctAnswer: 2,
    explanation: 'Jajaran genjang adalah bangun datar segiempat dengan sisi-sisi berhadapan sejajar dan sama panjang, serta sudut-sudut sejajar sama besar.'
  },
  {
    id: 'mtk_4',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Diagram Batang',
    questionText: 'Diberikan data nilai harian Matematika siswa Kelas 4: Nilai 70 diperoleh 5 orang, Nilai 80 diperoleh 12 orang, Nilai 90 diperoleh 8 orang, dan Nilai 100 diperoleh 3 orang. Berapa banyak siswa kelas 4 seluruhnya?',
    options: [
      '20 siswa',
      '28 siswa',
      '25 siswa',
      '30 siswa'
    ],
    correctAnswer: 1,
    explanation: 'Jumlah siswa keseluruhan = 5 + 12 + 8 + 3 = 28 siswa.'
  },
  {
    id: 'mtk_5',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Diagram Gambar',
    questionText: 'Dalam suatu piktogram (diagram gambar) penjualan roti di koperasi sekolah: lambang sebuah [Roti Besar] mewakili penjualan 10 helai roti, dan [Roti Kecil] mewakili penjualan 5 helai roti. Jika penjualan hari Senin digambarkan dengan 3 [Roti Besar] dan 1 [Roti Kecil], berapakah total roti yang terjual pada hari Senin tersebut?',
    options: [
      '15 helai roti',
      '35 helai roti',
      '30 helai roti',
      '45 helai roti'
    ],
    correctAnswer: 1,
    explanation: 'Nilai Senin = (3 × 10) + (1 × 5) = 30 + 5 = 35 roti.'
  },
  {
    id: 'mtk_6',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Diagram Batang',
    questionText: 'Perhatikan data jumlah buku di perpustakaan sekolah: Buku Cerita bergambar = 120 buku, Buku Sains = 85 buku, Novel Anak = 60 buku, Kamus Bahasa = 15 buku. Selisih jumlah koleksi Buku Sains dengan Novel Anak di perpustakaan adalah...',
    options: [
      '25 buku',
      '35 buku',
      '60 buku',
      '145 buku'
    ],
    correctAnswer: 0,
    explanation: 'Selisih = Buku Sains - Novel Anak = 85 - 60 = 25 buku.'
  },
  {
    id: 'mtk_7',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Bangun datar yang memiliki sisi berjumlah 3, dengan salah satu sudutnya bernilai tepat 90 derajat dinamakan...',
    options: [
      'Segitiga sama kaki',
      'Segitiga sama sisi',
      'Segitiga siku-siku',
      'Segitiga sembarang'
    ],
    correctAnswer: 2,
    explanation: 'Segitiga siku-siku memiliki satu sudut siku-siku berukuran tepat 90°.'
  },
  {
    id: 'mtk_8',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Berikut merupakan karakteristik dari bangun datar Belah Ketupat, KECUALI...',
    options: [
      'Semua sisinya sama panjang',
      'Sudut yang berhadapan sama besar',
      'Diagonal-diagonalnya saling tegak lurus membentuk sudut siku-siku',
      'Semua keempat sudutnya bernilai pasti 90 derajat'
    ],
    correctAnswer: 3,
    explanation: 'Belah ketupat tidak harus memiliki keempat sudut sebesar 90 derajat (jika semua sudutnya 90 derajat, bangun itu menjadi persegi).'
  },
  {
    id: 'mtk_9',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Diagram Batang',
    questionText: 'Dari diagram batang hobi olahraga siswa kelas 4 diperoleh data: Futsal digemari oleh 15 anak, Bulu Tangkis oleh 10 anak, Renang oleh 8 anak, dan Basket oleh 12 anak. Olahraga yang paling sedikit digemari oleh siswa adalah...',
    options: [
      'Futsal',
      'Basket',
      'Renang',
      'Bulu Tangkis'
    ],
    correctAnswer: 2,
    explanation: 'Berdasarkan data, Renang memiliki anak penggemar paling sedikit yakni hanya 8 anak.'
  },
  {
    id: 'mtk_10',
    subjectId: 'matematika',
    type: 'isian',
    topic: 'Bangun Datar',
    questionText: 'Bangun datar lingkaran hanya memiliki satu sisi melengkung dan memiliki sumbu simetri berjumlah ...',
    correctAnswers: ['tak terhingga', 'tak terbatas', 'infinite', 'banyak sekali'],
    placeholder: 'Sebutkan jumlah sumbu simetri...'
  },
  {
    id: 'mtk_11',
    subjectId: 'matematika',
    type: 'isian',
    topic: 'Bangun Datar',
    questionText: 'Sebuah bangun datar memiliki dua diagonal yang saling tegak lurus tetapi panjang sisinya tidak semuanya sama, melainkan hanya sepanjang sepasang sisi berdekatan (membentuk layangan). Bangun datar tersebut dinamakan ...',
    correctAnswers: ['layang-layang', 'layang layang'],
    placeholder: 'Nama bangun datarnya...'
  },
  {
    id: 'mtk_12',
    subjectId: 'matematika',
    type: 'isian',
    topic: 'Diagram Batang',
    questionText: 'Jika pada tabel data berat badan siswa kelas 4 tertulis: berat badan 32 kg sebanyak 4 anak, berat badan 34 kg sebanyak 7 anak, dan berat badan 36 kg sebanyak 3 anak. Jumlah frekuensi anak yang memiliki berat badan lebih dari 32 kg adalah ... anak.',
    correctAnswers: ['10'],
    placeholder: 'Ketik angka jawaban...'
  },
  {
    id: 'mtk_13',
    subjectId: 'matematika',
    type: 'menjodohkan',
    topic: 'Mengidentifikasi Bangun Datar',
    questionText: 'Jodohkanlah karakteristik geometri berikut dengan jenis bangun datarnya yang tepat!',
    pairs: [
      { left: 'Memiliki 3 sisi sama panjang', right: 'Segitiga sama sisi' },
      { left: 'Memiliki 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku', right: 'Persegi panjang' },
      { left: 'Memiliki 4 sisi sama panjang dengan diagonal tegak lurus', right: 'Belah ketupat' },
      { left: 'Memiliki tepat satu pasang sisi sejajar', right: 'Trapesium' }
    ]
  },
  {
    id: 'mtk_14',
    subjectId: 'matematika',
    type: 'menjodohkan',
    topic: 'Membaca Data',
    questionText: 'Pasangkan jenis penyajian data berikut dengan definisi penampilannya!',
    pairs: [
      { left: 'Piktogram', right: 'Menggunakan simbol atau gambar unik untuk mewakili kuantitas data' },
      { left: 'Diagram Batang', right: 'Menggunakan persegi panjang tegak atau datar dengan tinggi sesuai nilai' },
      { left: 'Tabel Frekuensi', right: 'Menggunakan baris dan kolom berisi angka-angka hitungan mentah' }
    ]
  },
  {
    id: 'mtk_15',
    subjectId: 'matematika',
    type: 'uraian',
    topic: 'Membaca Data',
    questionText: 'Koperasi sekolah mencatat hasil penjualan alat tulis selama sepekan sebagai berikut: Pensil terjual 35 buah, Penghapus terjual 20 buah, Penggaris terjual 15 buah, Buku Tulis terjual 50 buah. Buatlah analisis sederhana mengenai barang apa yang paling laris terjual, barang apa yang paling sedikit dibeli siswa, serta berapa jumlah seluruh penjualan alat tulis tersebut!',
    sampleAnswer: '1. Barang yang paling laris terjual adalah Buku Tulis sebanyak 50 buah.\n2. Barang yang paling sedikit terjual adalah Penggaris sebanyak 15 buah.\n3. Jumlah seluruh alat tulis yang terjual di koperasi sekolah tersebut adalah: 35 + 20 + 15 + 50 = 120 buah.',
    keywords: ['buku tulis', 'laris', 'penggaris', 'paling sedikit', '120']
  },
  {
    id: 'mtk_16',
    subjectId: 'matematika',
    type: 'uraian',
    topic: 'Bangun Datar',
    questionText: 'Sebuah persegi memiliki keliling sepanjang 36 cm. Tentukanlah panjang sisi persegi tersebut dan hitunglah luas dari persegi tersebut!',
    sampleAnswer: '1. Panjang sisi persegi = Keliling : 4 = 36 cm : 4 = 9 cm.\n2. Luas persegi tersebut = Keliling Sisi × Sisi = 9 cm × 9 cm = 81 cm².',
    keywords: ['9', 'sisi', '81', 'luas', 'cm']
  },
  {
    id: 'mtk_17',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Berapakah jumlah sudut dalam yang dimiliki oleh semua bangun datar segitiga?',
    options: [
      '180 derajat',
      '90 derajat',
      '360 derajat',
      '270 derajat'
    ],
    correctAnswer: 0,
    explanation: 'Jumlah besar ketiga sudut dalam segitiga apa saja selalu tepat total 180°.'
  },
  {
    id: 'mtk_18',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Diagram Batang',
    questionText: 'Dalam sebuah diagram batang penjualan sayur mayur di pasar harian: Sawi Hijau terjual 42 kg, Bayam terjual 30 kg, Kangkung terjual 25 kg. Berapakah selisih kuantitas Sawi Hijau dan Kangkung yang terjual?',
    options: [
      '12 kg',
      '17 kg',
      '15 kg',
      '5 kg'
    ],
    correctAnswer: 1,
    explanation: 'Selisih = Penjualan Sawi Hijau - Kangkung = 42 kg - 25 kg = 17 kg.'
  },
  {
    id: 'mtk_19',
    subjectId: 'matematika',
    type: 'isian',
    topic: 'Bangun Datar',
    questionText: 'Bangun datar segiempat yang memiliki dua pasang sisi sejajar sama panjang serta memiliki empat buah sudut yang semuanya siku-siku (90 derajat) tetapi sisi berdekatannya berbeda panjang disebut ...',
    correctAnswers: ['persegi panjang'],
    placeholder: 'Nama bangun datarnya...'
  },
  {
    id: 'mtk_20',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Sebuah bangun datar memiliki sifat: bersisi empat sama panjang, sudut yang berhadapan sama besar tetapi tidak siku-siku, diagonalnya memotong tegak lurus sama panjang keduabelah bagian. Bangun ini adalah...',
    options: [
      'Persegi',
      'Belah Ketupat',
      'Layang-layang',
      'Jajaran Genjang'
    ],
    correctAnswer: 1,
    explanation: 'Sifat keempat sisinya yang sama panjang dikombinasikan dengan diagonal yang memotong tegak lurus tanpa sudut siku-siku di pojok adalah karakteristik utama Belah Ketupat.'
  },
  {
    id: 'mtk_21',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Piktogram',
    questionText: 'Pada diagram piktogram hasil panen buah kelengkeng milik Pak Tono: tiap gambar [Satu Keranjang] mewakili 20 kg buah kelengkeng. Jika hasil seluruh panen digambarkan dengan 6 buah gambar [Satu Keranjang], maka total kelengkeng hasil panen Pak Tono yaitu...',
    options: [
      '60 kg',
      '120 kg',
      '80 kg',
      '160 kg'
    ],
    correctAnswer: 1,
    explanation: 'Kuantitas total = 6 Gambar × 20 kg/gambar = 120 kg.'
  },
  {
    id: 'mtk_22',
    subjectId: 'matematika',
    type: 'pilihan_ganda',
    topic: 'Bangun Datar',
    questionText: 'Sebuah segitiga sama kaki memiliki panjang alas 10 cm dan keliling sepanjang 26 cm. Berapakah panjang masing-masing dari kedua kaki segitiga tersebut?',
    options: [
      '8 cm',
      '10 cm',
      '16 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'Keliling = alas + kaki + kaki => 26 = 10 + 2 × (panjang kaki) => 16 = 2 × (panjang kaki) => panjang kaki = 8 cm.'
  },

  // ==========================================
  // BAHASA INDONESIA (22 Questions)
  // ==========================================
  {
    id: 'bi_1',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Menentukan Watak Tokoh',
    questionText: 'Dalam sebuah cerpen, Bayu selalu menyisihkan sebagian uang saku hariannya untuk membantu temannya yang kesusahan dan memberi makan kucing liar di jalanan. Karakter atau watak tokoh Bayu tersebut adalah...',
    options: [
      'Kikir dan pemarah',
      'Penolong dan penyayang',
      'Pendiam dan penakut',
      'Sombong dan suka dipuji'
    ],
    correctAnswer: 1,
    explanation: 'Menyisihkan uang untuk membantu teman mencerminkan watak penolong, sedangkan memberi makanan kucing liar mencerminkan watak penyayang.'
  },
  {
    id: 'bi_2',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Membandingkan Watak Tokoh',
    questionText: '"Andi bangun tepat waktu setiap pagi dan segera menyiapkan seluruh perlengkapan sekolahnya secara mandiri. Sebaliknya, adiknya, Doni, sering bermalas-malasan dan harus dibangunkan berulang kali oleh Ibu hingga hampir terlambat." Perbandingan watak kedua tokoh di atas yang benar adalah...',
    options: [
      'Andi penakut sedangkan Doni pemberani',
      'Andi rajin sedangkan Doni pemalas',
      'Andi sombong sedangkan Doni rendah hati',
      'Andi pelit sedangkan Doni dermawan'
    ],
    correctAnswer: 1,
    explanation: 'Andi mandiri dan sigap bersiap (rajin) berkebalikan dengan Doni yang bermalas-malasan (pemalas).'
  },
  {
    id: 'bi_3',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Membedakan Fakta dan Opini',
    questionText: 'Manakah di bawah ini kalimat yang merupakan suatu FAKTA (dapat dibuktikan kebenarannya)?',
    options: [
      'Matahari terbit di sebelah timur dan tenggelam di sebelah barat.',
      'Susu rasa strawberi adalah varian susu paling lezat di seluruh dunia.',
      'Ruang kelas empat terlihat sangat megah dan paling nyaman ditempati belajar.',
      'Ujian Matematika hari ini mungkin akan terasa sangat sukar sekali bagi semua murid.'
    ],
    correctAnswer: 0,
    explanation: 'Arah terbit beralaskan astronomis dan selalu terbukti benar secara objektif (Fakta). Kalimat lainnya mengandung subjektivitas (Opini).'
  },
  {
    id: 'bi_4',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Membedakan Fakta dan Opini',
    questionText: 'Manakah kalimat berikut yang tergolong sebagai kalimat OPINI (pendapat pribadi)?',
    options: [
      'Haqi School berlokasi di wilayah Indonesia.',
      'Menurut saya, buah apel jauh lebih enak dan segar dibanding buah manggis.',
      'Kucing adalah salah satu mamalia pemakan daging berkaki empat.',
      'Air mendidih pada suhu 100 derajat Celsius di bawah tekanan standar.'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat "Menurut saya..." mengekspresikan selera subyektif perseorangan yang belum tentu disetujui semua orang (Opini).'
  },
  {
    id: 'bi_5',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Menentukan Tujuan Kegiatan',
    questionText: '"Sebelum berolahraga lari mengelilingi lapangan sekolah, Pak Guru Penjasorkes memerintahkan seluruh siswa kelas 4 untuk melakukan gerakan peregangan otot dan pemanasan selama 10 menit." Tujuan kegiatan pemanasan tersebut dilakukan adalah...',
    options: [
      'Agar tubuh siswa langsung merasa lelah saat berolahraga utama',
      'Menghindari terjadinya cidera otot pada tubuh saat berolahraga',
      'Agar pakaian olahraga para siswa cepat menjadi kotor',
      'Mempercepat berakhirnya jam pelajaran olahraga di pagi itu'
    ],
    correctAnswer: 1,
    explanation: 'Peregangan serta pemanasan mempersiapkan sendi dan otot menerima gerakan yang lebih dinamis untuk menghindarkan kram/cedera.'
  },
  {
    id: 'bi_6',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Latar Cerita',
    questionText: '"Kicau burung bersahutan menyambut sinar matahari pagi yang menembus celah-celah daun beringin di tengah Alun-alun Kota." Penggalan cerita pendek di atas memperlihatkan latar waktu dan latar tempat berupa...',
    options: [
      'Malam hari, di dalam kamar tidur',
      'Pagi hari, di tengah Alun-alun Kota',
      'Sore hari, di pinggiran pantai',
      'Siang hari, di pekarangan kelas sekolah'
    ],
    correctAnswer: 1,
    explanation: 'Kata "sinar matahari pagi" (latar waktu) dan "tengah Alun-alun Kota" (latar tempat) sangat eksplisit menunjukkan latar.'
  },
  {
    id: 'bi_7',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Menarik Kesimpulan',
    questionText: '"Siska jarang sekali menggosok gigi sebelum tidur malam. Ia juga sangat gemar memakan makanan manis seperti permen dan cokelat tanpa berkumur setelahnya. Akibatnya, kini gigi pertamanya berlubang dan ia menangis kesakitan." Kesimpulan yang tepat dari cerita pendek Siska adalah...',
    options: [
      'Gigi Siska berlubang karena ia malas menggosok gigi dan sering makan manis',
      'Cokelat adalah makanan yang dilarang untuk anak-anak',
      'Ibu Siska melarang Siska untuk mandi di pagi hari',
      'Siska menangis karena giginya copot sendiri saat tertidur'
    ],
    correctAnswer: 0,
    explanation: 'Kesimpulan cerpen merangkum sebab utama (jarang gosok gigi, makan manis) menimbulkan akibat (gigi berlubang dan sakit).'
  },
  {
    id: 'bi_8',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Menentukan Masalah Tokoh',
    questionText: '"Rina kebingungan mencermati tumpukan buku di atas mejanya. Buku Tugas Bahasa Indonesia miliknya ternyata tertinggal di atas meja belajar rumahnya karena semalam ia terburu-buru tidur." Masalah utama yang dihadapi tokoh Rina dalam fabel/teks di atas adalah...',
    options: [
      'Rina lupa mengerjakan tugas Bahasa Indonesia',
      'Buku Tugas Bahasa Indonesia milik Rina tertinggal di rumah',
      'Rina dimarahi oleh gurunya karena terlambat',
      'Rina mengantuk sepanjang pelajaran berlangsung'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat "Buku Tugas Bahasa Indonesia miliknya ternyata tertinggal..." merinci konflik masalah utama tokoh.'
  },
  {
    id: 'bi_9',
    subjectId: 'bahasa_indonesia',
    type: 'isian',
    topic: 'Membedakan Fakta dan Opini',
    questionText: 'Pernyataan kalimat yang berisi tentang dugaan, tanggapan, atau pendapat subyektif dari seseorang yang kebenarannya tidak mutlak dinamakan kalimat ...',
    correctAnswers: ['opini'],
    placeholder: 'Ketik satu kata...'
  },
  {
    id: 'bi_10',
    subjectId: 'bahasa_indonesia',
    type: 'isian',
    topic: 'Memahami Isi Cerita',
    questionText: 'Latar yang merujuk pada letak atau posisi geografis di mana terjadinya rentetan kejadian dalam sebuah cerita pendek dinamakan latar ...',
    correctAnswers: ['tempat', 'lokasi'],
    placeholder: 'Latar apa...'
  },
  {
    id: 'bi_11',
    subjectId: 'bahasa_indonesia',
    type: 'isian',
    topic: 'Watak Tokoh',
    questionText: 'Sifat atau karakter moral yang dimiliki oleh seorang tokoh di dalam rangkaian cerita pendek sering disebut dengan istilah ... tokoh.',
    correctAnswers: ['watak', 'karakter', 'perwatakan', 'sifat'],
    placeholder: 'Ketik istilahnya...'
  },
  {
    id: 'bi_12',
    subjectId: 'bahasa_indonesia',
    type: 'menjodohkan',
    topic: 'Unsur Intrinsik Cerita',
    questionText: 'Pasangkanlah unsur intrinsik cerita berikut dengan perincian definisinya yang paling tepat!',
    pairs: [
      { left: 'Tokoh Utama', right: 'Pemeran yang menjadi pusat cerita dan paling banyak muncul' },
      { left: 'Latar Waktu', right: 'Saat-saat terjadinya peristiwa (pagi, sore, esok hari, pukul 08:00)' },
      { left: 'Latar Tempat', right: 'Tempat fisik terjadinya kejadian cerita (sekolah, rumah, sungai)' },
      { left: 'Amanat', right: 'Pesan kebaikan moral yang ingin disampaikan penulis kepada pembaca' }
    ]
  },
  {
    id: 'bi_13',
    subjectId: 'bahasa_indonesia',
    type: 'menjodohkan',
    topic: 'Fakta vs Opini',
    questionText: 'Jodohkanlah contoh kalimat di bawah ini dengan klasifikasinya yang tepat!',
    pairs: [
      { left: 'Ibu kota Negara Republik Indonesia saat ini adalah Jakarta.', right: 'Kalimat Fakta' },
      { left: 'Kucing angora peliharaan milik Dina terlihat sangat imut bercahaya.', right: 'Kalimat Opini' },
      { left: 'Rapat kerja bakti warga desa dilaksanakan setiap hari Minggu pagi.', right: 'Kalimat Fakta' },
      { left: 'Gunung berapi tersebut mungkin saja akan meletus esok lusa.', right: 'Kalimat Opini' }
    ]
  },
  {
    id: 'bi_14',
    subjectId: 'bahasa_indonesia',
    type: 'uraian',
    topic: 'Analisis Cerita',
    questionText: 'Bacalah cerita singkat berikut:\n"Farel merasa badannya mulai tidak nyaman sejak pulang sekolah. Kepalanya pening dan tenggorokannya gatal karena siang harinya ia membeli es sirop berwarna mencolok di pinggir jalan yang kurang bersih. Ibu segera menyarankan Farel meminum air putih hangat dan beristirahat tanpa memainkan gawai setibanya di rumah."\nTentukan: a) Mengapa Farel jatuh sakit? b) Apa saran solusi yang diberikan Ibu kepada Farel?',
    sampleAnswer: 'a) Farel jatuh sakit kepala pening dan tenggorokan gatal karena sembarangan jajan es sirop berwarna mencolok di pinggir jalan yang kebersihannya kurang terjaga.\nb) Solusi dari Ibu adalah meminta Farel meminum air putih hangat dan beristirahat yang cukup di rumah tanpa menggunakan gawai (handphone).',
    keywords: ['es sirop', 'pinggir jalan', 'air putih hangat', 'istirahat', 'gawai']
  },
  {
    id: 'bi_15',
    subjectId: 'bahasa_indonesia',
    type: 'uraian',
    topic: 'Fakta vs Opini',
    questionText: 'Tuliskanlah masing-masing 1 (satu) contoh kalimat fakta tentang tubuh manusia dan 1 (satu) contoh kalimat opini tentang makanan sehat di sekitar kita!',
    sampleAnswer: '1. Kalimat Fakta: Jantung manusia berfungsi memompa darah ke seluruh tubuh.\n2. Kalimat Opini: Sayur bayam adalah olahan sayur yang jauh lebih nikmat daripada sayur sup kubis.',
    keywords: ['fakta', 'opini', 'tumbuh', 'makanan']
  },
  {
    id: 'bi_16',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Watak Tokoh',
    questionText: 'Sifat buruk tokoh dalam cerita yang suka memaksakan kehendak dan tidak mau mendengarkan saran teman sejawatnya disebut...',
    options: [
      'Keras kepala',
      'Dermawan',
      'Rendah hati',
      'Pemberani'
    ],
    correctAnswer: 0,
    explanation: 'Orang yang tidak mengindahkan masukan pihak lain serta mementingkan ego sendiri berwatak egois atau keras kepala.'
  },
  {
    id: 'bi_17',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Perbandingan Dua Teks',
    questionText: 'Teks A: "Ari gemar menyikat gigi teratur setelah sarapan pagi dan malam hari." Teks B: "Budi mengabaikan saran Ibu, ia tidur pulas begitu saja tanpa membasuh muka dan menyikat giginya." Perbedaan perilaku tokoh Ari dan Budi adalah...',
    options: [
      'Ari menyembunyikan pasta gigi sedangkan Budi rajin membelinya',
      'Ari sangat menjaga kebersihan gigi sedangkan Budi sebaliknya tidak merawat diri',
      'Ari takut pada dokter gigi sedangkan Budi berani berkonsultasi',
      'Ari suka makan cokelat manis sedangkan Budi benci makanan manis'
    ],
    correctAnswer: 1,
    explanation: 'Sikap Ari (menjaga kesehatan dengan sikat gigi) bertolak belakang dengan Budi (malas merawat giginya).'
  },
  {
    id: 'bi_18',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Memahami Isi Cerita',
    questionText: 'Bagian akhir dari alur sebuah cerita pendek yang berisi tentang selesainya konflik dan penyelesaian masalah tokoh dinamakan...',
    options: [
      'Orientasi (pengenalan)',
      'Resolusi (penyelesaian)',
      'Komplikasi (puncak masalah)',
      'Klimaks (ketegangan)'
    ],
    correctAnswer: 1,
    explanation: 'Resolusi adalah tahapan akhir di mana konflik cerita mendapatkan penyelesaian dan keadaan kembali tenang.'
  },
  {
    id: 'bi_19',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Sebab Akibat Cerita',
    questionText: '"Doni mengantuk sepanjang jam pelajaran IPA di kelas. Ternyata, semalam Doni begadang menonton pertandingan sepak bola di TV hingga jam 01.00 dini hari." Mengapa Doni merasa mengantuk di kelas?',
    options: [
      'Karena pelajaran IPA sangat membosankan mendikte',
      'Sebab Doni menonton TV hingga larut malam sehingga kekurangan jam tidur malam',
      'Karena Doni belum dipanggil sarapan oleh gurunya',
      'Karena Doni kelelahan berlari mengitari sekolah di pagi buta'
    ],
    correctAnswer: 1,
    explanation: 'Kurang tidur akibat menonton bola larut malam (sebab) berakibat mata sayu mengantuk esok paginya (akibat).'
  },
  {
    id: 'bi_20',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Menarik Kesimpulan',
    questionText: 'Menarik kesimpulan dari sebuah teks bacaan artinya kita...',
    options: [
      'Menulis ulang seluruh paragraf dari awal hingga akhir tanpa ada kata tertinggal',
      'Mengambil inti sari gagasan utama atau kesimpulan akhir berdasarkan fakta-fakta yang diuraikan dalam teks',
      'Mencari kesalahan ketik huruf kapital yang ada di dalam teks bacaan',
      'Mengganti nama-nama tokoh utama dengan nama teman sekelas kita sendiri'
    ],
    correctAnswer: 1,
    explanation: 'Kesimpulan adalah intisari akhir yang dirangkum logis dari keseluruhan informasi di dalam teks.'
  },
  {
    id: 'bi_21',
    subjectId: 'bahasa_indonesia',
    type: 'isian',
    topic: 'Judul Cerita',
    questionText: 'Bagian identitas pengenal teks yang biasanya diletakkan paling atas tengah guna mewakili seluruh inti cerita pendek disebut ...',
    correctAnswers: ['judul'],
    placeholder: 'Ketik satu kata...'
  },
  {
    id: 'bi_22',
    subjectId: 'bahasa_indonesia',
    type: 'pilihan_ganda',
    topic: 'Sikap Sehat',
    questionText: 'Mengapa memotong kuku secara rutin seminggu sekali berhubungan dengan hidup sehat?',
    options: [
      'Agar kuku terlihat panjang menakutkan',
      'Menghindari kuman dan kotoran bersarang di selipan kuku yang ikut tertelan saat kita makan menggunakan tangan',
      'Supaya kuku tidak bisa mengorek barang perlengkapan tulis',
      'Supaya kita bisa cepat pulang sekolah tanpa diperiksa'
    ],
    correctAnswer: 1,
    explanation: 'Kuku panjang beresiko menyimpan telur cacing atau kuman penyakit yang berbahaya bagi saluran pencernaan saat makan.'
  },

  // ==========================================
  // PENDIDIKAN PANCASILA (22 Questions)
  // ==========================================
  {
    id: 'pancasila_1',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Definisi Gotong Royong',
    questionText: 'Kegiatan bekerja sama yang dilakukan oleh sekelompok warga masyarakat secara sukarela tanpa paksaan untuk kepentingan kemaslahatan bersama disebut...',
    options: [
      'Musyawarah',
      'Kemandirian',
      'Gotong royong',
      'Modernisasi'
    ],
    correctAnswer: 2,
    explanation: 'Gotong royong adalah warisan budaya leluhur Indonesia berupa kerja bersama yang dilakukan sukarela demi kemakmuran lingkungan bersama.'
  },
  {
    id: 'pancasila_2',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Nilai Utama Gotong Royong',
    questionText: 'Nilai utama yang melandasi pentingnya kegiatan kerja bakti gotong royong di tengah keragaman warga Indonesia adalah...',
    options: [
      'Persaingan memperebutkan hadiah lomba kebersihan',
      'Kebersamaan, kerukunan, serta tolong-menolong tanpa memandang latar belakang perbedaan',
      'Upah kerja harian yang didistribusikan merata bagi ketua jajaran RT',
      'Mencari perhatian dan pujian dari pejabat kepala desa setempat'
    ],
    correctAnswer: 1,
    explanation: 'Melalui gotong royong, rasa persatuan dan kerukunan warga diperkokoh tanpa membedakan suku, kasta, ras, maupun agama.'
  },
  {
    id: 'pancasila_3',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Tujuan Gotong Royong',
    questionText: 'Salah satu tujuan utama dilaksanakannya gotong royong membersihkan saluran air desa secara bersama-sama adalah...',
    options: [
      'Supaya saluran air semakin dalam dan tidak dapat dilalui ikan',
      'Meringankan beban pekerjaan yang berat terasa ringan dan mempercepat penyelesaian kegiatan',
      'Memberi ruang bagi anak-anak untuk mandi genangan lumpur bersama',
      'Mengurangi kesempatan silaturahmi warga paruh baya'
    ],
    correctAnswer: 1,
    explanation: 'Dengan dikerjakan beramai-ramai, beban tugas berat terbagi habis sehingga pekerjaan berat lekas selesai tanpa menguras tenaga satu orang saja.'
  },
  {
    id: 'pancasila_4',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Dampak Positif Gotong Royong',
    questionText: 'Manakah di bawah ini yang menunjukkan dampak positif gotong royong dalam menciptakan lingkungan sekitar rumah tempat tinggal?',
    options: [
      'Lingkungan desa menjadi berantakan, basah kumuh, dan terabaikan',
      'Memicu permusuhan dan rasa bosan di antara tetangga sekitar',
      'Tercipta lingkungan desa yang bersih, tertata rapi, asri, aman, dan nyaman dihuni',
      'Biaya hidup bulanan warga menjadi meningkat drastis'
    ],
    correctAnswer: 2,
    explanation: 'Kerja bakti secara berkala menjamin kebersihan lingkungan, menekan resiko penyakit, serta menguatkan interaksi sosial yang sehat.'
  },
  {
    id: 'pancasila_5',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Peran dalam Persatuan',
    questionText: 'Kegiatan gotong royong dapat memperkokoh persatuan dan kesatuan bangsa Indonesia yang majemuk. Hal ini dikarenakan...',
    options: [
      'Warga bersepakat untuk mengucilkan warga pendatang dari suku luar',
      'Kegiatan gotong royong menepis prasangka buruk dan menyatukan tekad warga demi kebaikan umum',
      'Gotong royong mengajarkan sikap mementingkan suku masing-masing warga',
      'Gotong royong meniadakan hak warga untuk beribadah sesuai agama mandiri'
    ],
    correctAnswer: 1,
    explanation: 'Hubungan akrab antarwarga yang terbentuk semasa gotong royong melenyapkan batasan prasangka dan menumbuhkan toleransi sosial.'
  },
  {
    id: 'pancasila_6',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Gotong Royong Menjaga Fasilitas Umum',
    questionText: 'Menjaga dan merawat kelayakan fasilitas umum seperti pos ronda siskamling dan jalanan desa merupakan tanggung jawab dari...',
    options: [
      'Kepala desa atau camat seorang diri saja',
      'Seluruh lapisan masyarakat yang memanfaatkan fasilitas umum tersebut tanpa terkecuali',
      'Hanya warga lansia yang sudah purna tugas bekerja',
      'Petugas dinas kebersihan kota terdekat'
    ],
    correctAnswer: 1,
    explanation: 'Fasilitas umum digunakan bersama, sehingga pemeliharaan kebersihan dan perbaikan fisiknya dipikul bersama oleh komunitas warga.'
  },
  {
    id: 'pancasila_7',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Sikap Bermasyarakat',
    questionText: 'Jika tetangga sebelah rumah kita terkena musibah pohon tumbang yang menimpa pagar rumahnya, maka sikap bermasyarakat yang benar adalah...',
    options: [
      'Menutup pintu rapat-rapat agar tidak dimintai bantuan apa pun',
      'Segera berkumpul bersama warga lain membawakan peralatan untuk membantu menyingkirkan dahan batang pohon tersebut',
      'Mengambil gambar foto kejadian lalu menyebarkannya di grup dengan kalimat mengolok-olok bencana',
      'Menyalahkan tetangga tersebut karena tidak menebang pohonnya sejak lama'
    ],
    correctAnswer: 1,
    explanation: 'Pancasila menjunjung tinggi kemanusiaan dan tolong-menolong. Membantu menolong tetangga tertimpa musibah adalah perbuatan mulia.'
  },
  {
    id: 'pancasila_8',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Musyawarah',
    questionText: 'Sebelum mengadakan gotong royong membersihkan selokan besar desa, para tokoh masyarakat dan warga biasanya melakukan...',
    options: [
      'Adu kekuatan fisik untuk menentukan pimpinan gotong royong',
      'Musyawarah mufakat di balai desa guna membagi tugas dan menentukan hari pelaksanaan',
      'Arisan berantai berhadiah kupon bahan makanan',
      'Pembelian peralatan mahal dari luar negeri tanpa koordinasi'
    ],
    correctAnswer: 1,
    explanation: 'Musyawarah memastikan seluruh kepala keluarga memahami pembagian plot wilayah pembersihan dan mempersiapkan logistik alat berbakti.'
  },
  {
    id: 'pancasila_9',
    subjectId: 'pancasila',
    type: 'isian',
    topic: 'Semboyan Negara',
    questionText: 'Semboyan pemersatu bangsa Indonesia yang tertulis di pita cengkeraman kaki burung Garuda Pancasila adalah Bhinneka Tunggal ...',
    correctAnswers: ['ika'],
    placeholder: 'Satu kata pelengkap...'
  },
  {
    id: 'pancasila_10',
    subjectId: 'pancasila',
    type: 'isian',
    topic: 'Definisi',
    questionText: 'Kegiatan bermusyawarah dilakukan untuk menyelesaikan masalah bersama guna mencapai keputusan yang mufakat atau keputusan ...',
    correctAnswers: ['bersama', 'mufakat', 'bulat', 'adil'],
    placeholder: 'Keputusan...'
  },
  {
    id: 'pancasila_11',
    subjectId: 'pancasila',
    type: 'isian',
    topic: 'Sikap Pancasila',
    questionText: 'Gotong royong adalah warisan berharga bangsa Indonesia yang sesuai dengan pengamalan Pancasila, sila ke-...',
    correctAnswers: ['tiga', '3'],
    placeholder: 'Ketik angka atau kata...'
  },
  {
    id: 'pancasila_12',
    subjectId: 'pancasila',
    type: 'menjodohkan',
    topic: 'Bentuk Gotong Royong',
    questionText: 'Pasangkan tempat pelaksanaan gotong royong berikut dengan contoh kegiatannya yang sesuai!',
    pairs: [
      { left: 'Gotong Royong di Sekolah', right: 'Piket kebersihan kelas bersama teman-teman sekelompok' },
      { left: 'Gotong Royong di Rumah', right: 'Membantu Ibu mencuci piring dan membersihkan ruang tamu bersama kakak' },
      { left: 'Gotong Royong di Masyarakat', right: 'Bekerja bakti membangun pos ronda malam perumahan warga' },
      { left: 'Gotong Royong di Kelas', right: 'Menghias dinding mading bersama menjelang hari kemerdekaan' }
    ]
  },
  {
    id: 'pancasila_13',
    subjectId: 'pancasila',
    type: 'menjodohkan',
    topic: 'Sikap Bermasyarakat',
    questionText: 'Jodohkanlah situasi sosial berikut dengan sikap bermasyarakat yang terpuji!',
    pairs: [
      { left: 'Tetangga sakit keras', right: 'Menjenguk serta membawakan makanan atau memberikan doa kesembuhan' },
      { left: 'Kerja bakti hari Minggu', right: 'Ikut serta dengan membawa peralatan seperti cangkul atau sapu lidi' },
      { left: 'Rapat kelurahan', right: 'Menghadiri rapat tepat waktu dan menyampaikan usul dengan sopan' }
    ]
  },
  {
    id: 'pancasila_14',
    subjectId: 'pancasila',
    type: 'uraian',
    topic: 'Tujuan Gotong Royong',
    questionText: 'Sebutkan 3 (tiga) dampak buruk yang dapat timbul di kalangan warga desa apabila budaya gotong royong sudah mulai diabaikan atau terlupakan!',
    sampleAnswer: '1. Lingkungan sekitar menjadi kotor, tidak terawat, dan memicu penumpukan sampah di selokan yang mengalir.\n2. Hubungan persaudaraan antar-tetangga menjadi renggang dan rasa tidak peduli (individualis) akan meningkat.\n3. Masalah-masalah kerukunan desa sulit dipecahkan karena warga enggan duduk bersama bermusyawarah.',
    keywords: ['kotor', 'individualis', 'renggang', 'selokan', 'sampah', 'musyawarah']
  },
  {
    id: 'pancasila_15',
    subjectId: 'pancasila',
    type: 'uraian',
    topic: 'Musyawarah',
    questionText: 'Mengapa dalam memulai suatu kegiatan besar di tingkat RT atau RW selalu dianjurkan untuk mengadakan "Musyawarah" terlebih dahulu? Jelaskan alasannya!',
    sampleAnswer: 'Musyawarah diadakan agar semua warga mendapat kesempatan menyampaikan pendapat mereka secara adil, menyamakan pendapat atau tujuan, mengoordinasikan pembagian tugas kerja dengan jelas, dan mencapai kesepakatan bersama (mufakat) sehingga tidak ada warga yang merasa terpaksa atau tidak dilibatkan.',
    keywords: ['pendapat', 'mufakat', 'sepakat', 'koordinasi', 'tugas', 'bersama']
  },
  {
    id: 'pancasila_16',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Sikap Bermasyarakat',
    questionText: 'Sikap mendahulukan kepentingan pribadi di atas kepentingan umum dalam kehidupan bertetangga merupakan sikap yang...',
    options: [
      'Harus diteladani demi kesuksesan pribadi',
      'Kurang terpuji karena merusak nilai kerukunan bermasyarakat',
      'Sesuai dengan nilai Pancasila sila pertama',
      'Dapat mempererat keharmonisan interaksi sosial'
    ],
    correctAnswer: 1,
    explanation: 'Individualisme berlebihan merusak sendi kekeluargaan yang dijunjung tinggi dalam kebersamaan warga.'
  },
  {
    id: 'pancasila_17',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Penerapan di Sekolah',
    questionText: 'Ahmad melihat lemari pajangan buku di sudut kelas roboh berantakan setelah tersenggol tidak sengaja. Sikap gotong royong Ahmad adalah...',
    options: [
      'Menertawakan teman yang menyenggol lalu melaporkannya ke guru kelas',
      'Mengajak teman-teman terdekat bersatu merapikan kembali tumpukan buku dan membereskan lemarinya',
      'Keluar kelas menghindari tanggung jawab membersihkan',
      'Memfoto kejadian lemari tersebut untuk dibagikan di media sosial'
    ],
    correctAnswer: 1,
    explanation: 'Membantu mengembalikan kondisi kelas menjadi tertata kembali menunjukkan budi pekerti gotong royong sekolah.'
  },
  {
    id: 'pancasila_18',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Identifikasi Gotong Royong',
    questionText: 'Tindakan berikut yang TIDAK tergolong sebagai kegiatan gotong royong sukarela warga adalah...',
    options: [
      'Membersihkan lingkungan makam desa menjelang bulan Ramadan',
      'Membayar upah harian untuk menyuruh kuli membuang sampah halaman rumah kita pribadi',
      'Membantu menambal lubang aspal jalan gang perumahan warga',
      'Mendirikan tenda hajatan pesta perkawinan di pekarangan rumah tetangga'
    ],
    correctAnswer: 1,
    explanation: 'Membayar upah pekerja untuk membersihkan halaman pribadi adalah transaksi jasa komersial biasa, bukan esensi gotong royong sukarela demi kemakmuran lingkungan.'
  },
  {
    id: 'pancasila_19',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Persatuan',
    questionText: 'Apa yang mengikat keberagaman suku, ras, dan kebudayaan Indonesia sehingga menjadi satu kesatuan yang utuh?',
    options: [
      'Persamaan tingkat kekayaan finansial antar warganya',
      'Semboyan Bhinneka Tunggal Ika serta semangat sumpah pemuda dan Pancasila',
      'Aturan wajib memakai pakaian adat yang sama tiap hari',
      'Jumlah penduduk pulau Jawa yang mendominasi seluruh wilayah darat'
    ],
    correctAnswer: 1,
    explanation: 'Semboyan Bhinneka Tunggal Ika mengarahkan bangsa Indonesia untuk tetap bersatu kokoh walau memiliki jutaan keragaman adat.'
  },
  {
    id: 'pancasila_20',
    subjectId: 'pancasila',
    type: 'isian',
    topic: 'Gotong Royong',
    questionText: 'Kata "Gotong" memiliki arti mengangkat, sedangkan kata "Royong" memiliki arti secara ...',
    correctAnswers: ['bersama', 'bersama-sama', 'bersama sama'],
    placeholder: 'Ketik satu kata saja...'
  },
  {
    id: 'pancasila_21',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Nilai Kerukunan',
    questionText: 'Kerja bakti membersihkan bak mandi penampung air sekolah bermakna bagi pencegahan penyakit karena dapat mencegah perkembangbiakan...',
    options: [
      'Kucing pembohong',
      'Nyamuk demam berdarah (Aedes aegypti)',
      'Tanaman benalu parasit di pagar',
      'Burung hantu dari ladang tebu'
    ],
    correctAnswer: 1,
    explanation: 'Menguras bak penampungan air secara gotong royong menghabisi jentik-jentik nyamuk demam berdarah dari lingkungan sekolah.'
  },
  {
    id: 'pancasila_22',
    subjectId: 'pancasila',
    type: 'pilihan_ganda',
    topic: 'Tindakan Bergotong Royong',
    questionText: 'Berikut adalah karakter mulia yang terlatih apabila kita rutin mempraktikkan gotong royong sejak belia, KECUALI...',
    options: [
      'Sikap toleransi tinggi',
      'Tolong-menolong sukarela',
      'Keserakahan dan sikap egois bertetangga',
      'Kepedulian sosial tinggi'
    ],
    correctAnswer: 2,
    explanation: 'Keserakahan dan sikap egoisme adalah karakter buruk yang bertolak belakang dengan cita-cita mulia gotong royong Pancasila.'
  },

  // ==========================================
  // BAHASA INGGRIS (22 Questions)
  // ==========================================
  {
    id: 'en_1',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'The sky is glowing, and the bright sun is shining high. There are no black clouds at all. What is the weather like today?',
    options: [
      'It is snowy',
      'It is rainy',
      'It is sunny',
      'It is windy'
    ],
    correctAnswer: 2,
    explanation: 'Bright sun and glowing blue sky describe "sunny" (cerah) weather.'
  },
  {
    id: 'en_2',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'Translate this weather vocabulary into Indonesian: "Windy" means...',
    options: [
      'Berangin',
      'Berawan',
      'Panas sekali',
      'Berkabut'
    ],
    correctAnswer: 0,
    explanation: 'Windy berasal dari kata wind (angin), sehingga windy berarti berangin.'
  },
  {
    id: 'en_3',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Gears',
    questionText: 'When it starts raining heavily outside, which gear should we bring to protect ourselves from getting wet?',
    options: [
      'A pair of sunglasses',
      'An umbrella or a raincoat',
      'A scarf and warm gloves',
      'A woolly hat and boots'
    ],
    correctAnswer: 1,
    explanation: 'Umbrella (payung) and raincoat (jas hujan) are standard rain protection gears.'
  },
  {
    id: 'en_4',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Activities',
    questionText: 'What is a popular outdoor activity that children usually do in the field on a bright, sunny afternoon?',
    options: [
      'Sleeping under a cozy blanket',
      'Playing football with their friends',
      'Drinking hot sweet chocolate inside',
      'Reading books next to the fireplace'
    ],
    correctAnswer: 1,
    explanation: 'Playing football (bermain sepak bola) in the field is ideal when the weather is warm and sunny.'
  },
  {
    id: 'en_5',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Activities',
    questionText: 'Since it is raining outside, we decide to stay home. We can do some cozy indoor activities, such as...',
    options: [
      'Riding a bicycle around the park',
      'Swimming at the public pool with family',
      'Playing board games or reading books under a blanket',
      'Having a pleasant picnic on the wet grass'
    ],
    correctAnswer: 2,
    explanation: 'Playing board games (permainan papan) is a classic cozy indoor activity for a rainy day.'
  },
  {
    id: 'en_6',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Gears',
    questionText: 'Translate this sentence: "I wear my sunglasses on a sunny day." What does "sunglasses" mean in Indonesia?',
    options: [
      'Sepatu bot',
      'Kacamata hitam',
      'Mantel tebal',
      'Syal berbulu'
    ],
    correctAnswer: 1,
    explanation: 'Sunglasses berasal dari sun (matahari) + glasses (kacamata) = kacamata hitam.'
  },
  {
    id: 'en_7',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'The morning is very white and thick. Drivers must turn on their headlights because they cannot see the road clearly. The weather is...',
    options: [
      'Sunny',
      'Rainbow',
      'Foggy',
      'Cloudy'
    ],
    correctAnswer: 2,
    explanation: 'Foggy (berkabut) restricts spatial visibility, making headlight usage critical for drivers.'
  },
  {
    id: 'en_8',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'The temperature is extremely low, below 0 degrees. Water turns into ice. We feel...',
    options: [
      'Freezing',
      'Warm',
      'Hot',
      'Dry'
    ],
    correctAnswer: 0,
    explanation: 'Freezing berarti sangat dingin sekali/membeku yang terjadi pada suhu di bawah titik beku.'
  },
  {
    id: 'en_9',
    subjectId: 'bahasa_inggris',
    type: 'isian',
    topic: 'Spelling Fill-in',
    questionText: 'Complete the missing weather gear word: "When we jump on the water puddle on a rainy day, we should wear rubber b_ _ts on our feet."',
    correctAnswers: ['boots', 'boot'],
    placeholder: 'Fill in the word...'
  },
  {
    id: 'en_10',
    subjectId: 'bahasa_inggris',
    type: 'isian',
    topic: 'Vocabulary Translate',
    questionText: '"Rainbow" is a beautiful circle of colors in the sky after the rain. What is the Indonesian word for rainbow?',
    correctAnswers: ['pelangi'],
    placeholder: 'Terjemahan bahasa Indonesianya...'
  },
  {
    id: 'en_11',
    subjectId: 'bahasa_inggris',
    type: 'isian',
    topic: 'Spelling Fill-in',
    questionText: 'Complete the missing weather word: "Look at the dark clouds! There is loud t_ _ _ _ _r (petir/guntur) in the sky."',
    correctAnswers: ['thunder'],
    placeholder: 'Complete the spelling...'
  },
  {
    id: 'en_12',
    subjectId: 'bahasa_inggris',
    type: 'menjodohkan',
    topic: 'Weather Vocabularies',
    questionText: 'Match the weather condition with its Indonesian translations!',
    pairs: [
      { left: 'Cloudy', right: 'Mendung / Berawan' },
      { left: 'Snowy', right: 'Bersalju' },
      { left: 'Rainy', right: 'Hujan' },
      { left: 'Stormy', right: 'Badai' }
    ]
  },
  {
    id: 'en_13',
    subjectId: 'bahasa_inggris',
    type: 'menjodohkan',
    topic: 'Weather Gears',
    questionText: 'Match these weather gears with their Indonesian translations!',
    pairs: [
      { left: 'Raincoat', right: 'Jas hujan' },
      { left: 'Gloves', right: 'Sarung tangan' },
      { left: 'Scarf', right: 'Syal leher' },
      { left: 'Jacket', right: 'Jaket / Mantel hangat' }
    ]
  },
  {
    id: 'en_14',
    subjectId: 'bahasa_inggris',
    type: 'uraian',
    topic: 'Writing Activities',
    questionText: 'Write 2 (two) sentences containing activities you usually do when it is a wet, rainy day, and another 2 (two) sentences for a sunny day!',
    sampleAnswer: 'Activities on a Rainy Day:\n1. I like reading a book inside my bedroom.\n2. I enjoy drinking hot chocolate to stay warm.\nActivities on a Sunny Day:\n1. I play football in the field with my school friends.\n2. We ride a bicycle around the beautiful park.',
    keywords: ['reading', 'drinking', 'chocolate', 'football', 'bicycle', 'picnic', 'sunny', 'rainy']
  },
  {
    id: 'en_15',
    subjectId: 'bahasa_inggris',
    type: 'uraian',
    topic: 'Translation Task',
    questionText: 'Translate this paragraph into Indonesian: "Today is rainy. I cannot go outside to play football. So, I stay at home and play board games under a blanket with my sister."',
    sampleAnswer: 'Hari ini hari hujan. Saya tidak bisa pergi ke luar rumah untuk bermain sepak bola. Jadi, saya berdiam di rumah dan bermain permainan papan (board games) di bawah selimut bersama adik perempuan saya.',
    keywords: ['hari ini', 'hujan', 'permainan papan', 'selimut', 'pergi', 'luar', 'sepak bola']
  },
  {
    id: 'en_16',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Gears',
    questionText: 'If you want to go out on a sunny day to play, what should you wear on your head to protect your face from solar heat?',
    options: [
      'A warm scarf',
      'A rain cap or a hat',
      'A heavy jacket',
      'Waterproof boots'
    ],
    correctAnswer: 1,
    explanation: 'A cap or a hat (topi) protects the head and facial area from immediate scorching sunlight.'
  },
  {
    id: 'en_17',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: '"It is cloudy." What does "cloudy" mean in Indonesian?',
    options: [
      'Berangin kencang',
      'Cerah benderang',
      'Berawan / Mendung',
      'Bersalju tebal'
    ],
    correctAnswer: 2,
    explanation: 'Cloudy berasal dari kata cloud (awan), yang berarti banyak awan mendung menutup langit.'
  },
  {
    id: 'en_18',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'If it is "cold", we need warmth. But if the weather is "c_ _l", it feels comfortable, slightly cold but refreshing (sejuk). What is the missing word?',
    options: [
      'warm',
      'cool',
      'hot',
      'wet'
    ],
    correctAnswer: 1,
    explanation: 'Cool artinya sejuk atau suhunya nyaman (tidak terlalu dingin seperti cold).'
  },
  {
    id: 'en_19',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'Which word means the opposite of "Wet" (Basah)?',
    options: [
      'Dry (Kering)',
      'Rainbow (Pelangi)',
      'Foggy (Berkabut)',
      'Freezing (Membeku)'
    ],
    correctAnswer: 0,
    explanation: 'Lawan kata dari wet (basah) adalah dry (kering).'
  },
  {
    id: 'en_20',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Activities',
    questionText: 'Where does the activity "swimming at the pool" usually take place?',
    options: [
      'In the library',
      'In the swimming pool',
      'In the bedroom',
      'In the football field'
    ],
    correctAnswer: 1,
    explanation: 'Swimming at the pool berarti berenang di kolam renang.'
  },
  {
    id: 'en_21',
    subjectId: 'bahasa_inggris',
    type: 'isian',
    topic: 'Activities Translate',
    questionText: 'Translate this activity to English: "membaca buku" is called r_ _ _ing a b_ _k.',
    correctAnswers: ['reading a book', 'reading book'],
    placeholder: 'English vocabulary...'
  },
  {
    id: 'en_22',
    subjectId: 'bahasa_inggris',
    type: 'pilihan_ganda',
    topic: 'Weather Vocabularies',
    questionText: 'What color is the sky when it is "sunny" contrasted to when it is "foggy"?',
    options: [
      'Blue vs White',
      'Black vs Green',
      'Red vs Purple',
      'Orange vs Pink'
    ],
    correctAnswer: 0,
    explanation: 'Sunny day langitnya biru cerah (blue), sedangkan foggy day didominasi kabut putih (white).'
  },

  // ==========================================
  // PAI (22 Questions)
  // ==========================================
  {
    id: 'pai_1',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Arti Salam',
    questionText: 'Apakah arti kalimat salam "Assalamu\'alaikum wa rahmatullahi wa barakatuh" yang diajarkan dalam Islam?',
    options: [
      'Semoga kamu lekas sembuh dari segala penyakit lahir dan batin',
      'Semoga keselamatan, rahmat Allah, dan keberkahan-Nya tercurah kepadamu',
      'Marilah kita saling bersaing ketat meraih kesuksesan duniawi',
      'Segala puji bagi Tuhan Semesta Alam yang telah menciptakan kita'
    ],
    correctAnswer: 1,
    explanation: 'Ucapan salam merupakan untaian doa keselamatan, rahmah (kasih sayang), serta berkah limpahan dari Allah SWT.'
  },
  {
    id: 'pai_2',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Hukum Salam',
    questionText: 'Dalam hukum fikih Islam, bagaimana ketetapan hukum bagi orang yang MEMULAI mengucapkan salam dan orang yang MENJAWAB salam?',
    options: [
      'Memulai adalah wajib, sedangkan menjawab adalah makruh',
      'Memulai mengucap salam berhukum sunnah, sedangkan membalas/menjawabnya berhukum wajib',
      'Keduanya berhukum haram secara mutlak',
      'Memulai adalah fardu kifayah sedangkan membalas berhukum sunnah muakkad'
    ],
    correctAnswer: 1,
    explanation: 'Mengucapkan/memulai salam adalah sunnah muakkadah (sangat dianjurkan), sedangkan membalasnya bagi muslim yang mendengar adalah fardu ain (wajib).'
  },
  {
    id: 'pai_3',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Tolong Menolong',
    questionText: 'Sesuai perintah Allah dalam Al-Qur\'an Surah Al-Ma\'idah ayat 2, umat Islam diwajibkan untuk saling tolong-menolong dalam hal...',
    options: [
      'Kemaksiatan dan perencanaan kezaliman bersama',
      'Kebajikan dan takwa (kebaikan)',
      'Permusuhan antar suku bangsa',
      'Contek-menontek selama pengerjaan lembar ujian'
    ],
    correctAnswer: 1,
    explanation: 'Ayat terjemahannya berbunyi: "Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan."'
  },
  {
    id: 'pai_4',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Tolong Menolong',
    questionText: 'Manakah di bawah ini tindakan tolong-menolong yang dilarang (Diharamkan) di dalam Al-Qur\'an?',
    options: [
      'Membantu tetangga membawakan belanjaan berat',
      'Bekerjasama membantu teman mengelabui ibunya dan berbohong setelah membolos',
      'Menyumbangkan baju muslim layak pakai bagi korban banjir',
      'Mengajarkan materi pelajaran yang sukar dipelajari teman sekelas'
    ],
    correctAnswer: 1,
    explanation: 'Tolong-menolong membantu kemaksiatan atau kebohongan adalah dosa (atsm) yang dilarang keras.'
  },
  {
    id: 'pai_5',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Arti Munafik',
    questionText: 'Secara istilah agama Islam, siapakah yang digolongkan sebagai orang "Munafik"?',
    options: [
      'Orang yang menolak percaya kepada rukun iman sejak lahir',
      'Orang yang menampakkan keislaman di luar saja, tetapi menyembunyikan kekufuran atau permusuhan di dalam hatinya',
      'Orang muslim yang tidak lancar membaca tartil Al-Qur\'an',
      'Orang asing yang memutuskan berhijrah dari daerah asalnya'
    ],
    correctAnswer: 1,
    explanation: 'Orang munafik bermuka dua; lisannya mengaku beriman sedangkan kalbunya menolak keras syariat Islam.'
  },
  {
    id: 'pai_6',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Ciri-Ciri Orang Munafik',
    questionText: 'Berdasarkan hadis riwayat Nabi Muhammad SAW, berapakah ciri-ciri kemunafikan yang melekat pada seseorang?',
    options: [
      'Ada 2 ciri',
      'Ada 3 ciri',
      'Ada 5 ciri',
      'Ada 10 ciri'
    ],
    correctAnswer: 1,
    explanation: '"Tanda-tanda orang munafik itu ada tiga: jika berbicara ia berdusta, jika berjanji ia mengingkari, dan jika dipercayakan amanah ia berkhianat."'
  },
  {
    id: 'pai_7',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Ciri-Ciri Orang Munafik',
    questionText: 'Di bawah ini yang BUKAN merupakan tanda atau ciri orang munafik menurut hadis nabi adalah...',
    options: [
      'Apabila berbicara, ia sering berdusta',
      'Apabila dipercaya, ia berkhianat mengabaikan amanah',
      'Apabila berjanji, ia selalu menepatinya dengan jujur',
      'Apabila berjanji, ia sering mengingkari'
    ],
    correctAnswer: 2,
    explanation: 'Menepati janji dengan jujur adalah tanda orang mukmin yang saleh, bukan orang munafik.'
  },
  {
    id: 'pai_8',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Sikap Ber-Salam',
    questionText: 'Bagaimanakah sikap kesopanan terbaik ketika berpapasan di jalan dengan guru atau teman sesuai adab salam?',
    options: [
      'Memalingkan muka ke arah lain pura-pura tidak melihat',
      'Tersenyum ramah serta mendahului mengucapkan salam "Assalamu\'alaikum"',
      'Berlari sekencang mungkin mendahului tanpa menyapa',
      'Berteriak memanggil namanya saja dengan nada tidak santun'
    ],
    correctAnswer: 1,
    explanation: 'Nabi menganjurkan untuk mengedepankan senyuman dan mendahului mengucap salam bagi sesama muslim.'
  },
  {
    id: 'pai_9',
    subjectId: 'pai',
    type: 'isian',
    topic: 'Hukum Salam',
    questionText: 'Menjawab ucapan salam dari saudara sesama muslim hukumnya adalah fardhu atau ...',
    correctAnswers: ['wajib'],
    placeholder: 'Ketik satu kata saja...'
  },
  {
    id: 'pai_10',
    subjectId: 'pai',
    type: 'isian',
    topic: 'Tolong Menolong',
    questionText: 'Umat Islam dilarang keras tolong-menolong dalam perbuatan dosa dan ...',
    correctAnswers: ['permusuhan', 'maksiat', 'kejahatan'],
    placeholder: 'Dilarang tolong-menolong dalam...'
  },
  {
    id: 'pai_11',
    subjectId: 'pai',
    type: 'isian',
    topic: 'Ciri Munafik',
    questionText: 'Salah satu ciri munafik adalah "apabila berjanji ia mengingkari". Sikap terpuji kebalikannya adalah kita harus ... janji yang telah kita ucapkan.',
    correctAnswers: ['menepati', 'memenuhi', 'menepati / memenuhi'],
    placeholder: 'Kata kerja dasar...'
  },
  {
    id: 'pai_12',
    subjectId: 'pai',
    type: 'menjodohkan',
    topic: 'Melengkapi Lafaz Arab',
    questionText: 'Pasangkanlah potongan ucapan salam islami berikut dengan kelengkapan lafaznya!',
    pairs: [
      { left: 'Assalamu', right: 'alaikum' },
      { left: 'Wa Rahmatullahi', right: 'wa Barakatuh' },
      { left: 'Wa\'alaikumsalam', right: 'warahmatullah' }
    ]
  },
  {
    id: 'pai_13',
    subjectId: 'pai',
    type: 'menjodohkan',
    topic: 'Ciri Orang Munafik',
    questionText: 'Jodohkan tindakan berikut dengan jenis klasifikasinya yang tepat!',
    pairs: [
      { left: 'Berkata Bohong', right: 'Dusta (Kadzib)' },
      { left: 'Ingkar Janji', right: 'Mengingkari (Khulaf)' },
      { left: 'Maling uang amanah', right: 'Berkhianat (Khianah)' }
    ]
  },
  {
    id: 'pai_14',
    subjectId: 'pai',
    type: 'uraian',
    topic: 'Tolong Menolong',
    questionText: 'Sebutkan ayat potong/lafaz surah Al-Maidah ayat 2 yang menerangkan kewajiban dan larangan tolong-menolong, beserta kandungan ringkas artinya!',
    sampleAnswer: 'Lafaz potongan ayat: "Wa ta\'awanu \'alal-birri wat-taqwa, wa la ta\'awanu \'alal-itsmi wal-\'udwan"\nArtinya: "Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan janganlah kamu tolong-menolong dalam berbuat dosa dan permusuhan."\nKandungan ayat: Umat Islam diwajibkan bekerja sama dalam hal-hal positif yang mendekatkan diri pada ketakwaan dan dilarang berkompromi membantu kebatilan, maksiat, atau permusuhan.',
    keywords: ['tolong-menolong', 'kebajikan', 'takwa', 'dosa', 'permusuhan', 'maidah']
  },
  {
    id: 'pai_15',
    subjectId: 'pai',
    type: 'uraian',
    topic: 'Menghindari Sifat Munafik',
    questionText: 'Sebutkan 3 (tiga) ciri orang munafik berdasarkan sabda Rasulullah SAW, serta jelaskan cara kita sehari-hari agar terhindar dari sifat tercela tersebut!',
    sampleAnswer: 'Tiga ciri orang munafik adalah:\n1. Apabila berbicara ia berdusta.\n2. Apabila berjanji ia mengingkari.\n3. Apabila dipercaya ia berkhianat.\nTindakan agar terhindar dari sifat ini adalah: selalu berusaha berkata jujur walaupun pahit, berhati-hati dalam berjanji dan segera menepatinya, serta menjaga rahasia maupun barang titipan amanah dari orang lain dengan rasa tanggung jawab tinggi.',
    keywords: ['berdusta', 'mengingkari', 'berkhianat', 'jujur', 'menepati', 'amanah']
  },
  {
    id: 'pai_16',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Adab Berpapasan',
    questionText: 'Menurut tuntunan Islam, jika ada yang berkendara berpapasan dengan yang berjalan kaki, siapakah yang disunnahkan mengucap salam terlebih dahulu?',
    options: [
      'Yang berjalan kaki mengucapi yang berkendara',
      'Orang yang berkendara mengucapkan salam kepada orang yang berjalan kaki',
      'Keduanya harus diam membisu bersama',
      'Orang yang usianya lebih muda melarang yang tua bersuara'
    ],
    correctAnswer: 1,
    explanation: 'Dalam hadits adab salam, ditekankan: orang berkendara memberi salam kepada yang berjalan kaki, yang berjalan kepada yang duduk, dan kelompok kecil kepada kelompok besar.'
  },
  {
    id: 'pai_17',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Keutamaan Salam',
    questionText: 'Manakah di bawah ini kebaikan sosial yang tersebar jika sesama Muslim membiasakan saling ber-Salam?',
    options: [
      'Menimbulkan kesombongan antar-golongan kelas',
      'Menumbuhkan rasa cinta, kedamaian, persaudaraan, dan keakraban sejati di dalam masyarakat',
      'Membuat waktu terbuang sia-sia di pinggir jalan raya',
      'Menaikkan prestise kekayaan pribadi warga kelurahan'
    ],
    correctAnswer: 1,
    explanation: 'Nabi mengabarkan: "Maukah aku tunjukkan sesuatu jika kalian lakukan akan melahirkan rasa cinta? Sebarkanlah salam di antara kalian."'
  },
  {
    id: 'pai_18',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Ciri Kemunafikan',
    questionText: 'Hasan dititipi uang kas kelas sebesar Rp 50.000 untuk diserahkan ke Wali Kelas. Namun, Hasan memakai sebagian uang tersebut untuk membeli komik baru tanpa izin. Perbuatan Hasan mencerminkan salah satu ciri kemunafikan, yaitu...',
    options: [
      'Jika berjanji ia mengingkari',
      'Jika dipercaya ia berkhianat (khianat)',
      'Jika berbicara ia berdusta',
      'Jika bermusyawarah ia marah'
    ],
    correctAnswer: 1,
    explanation: 'Melanggar kepercayaan titipan berupa uang kas mencerminkan sikap khianat terhadap amanah (kepercayaan).'
  },
  {
    id: 'pai_19',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Salam',
    questionText: 'Siapakah nama malaikat Allah yang bertugas menyampaikan wahyu-Mu sekaligus sering berkunjung memberikan salam kepada para nabi?',
    options: [
      'Malaikat Malik',
      'Malaikat Jibril',
      'Malaikat Izrail',
      'Malaikat Munkar'
    ],
    correctAnswer: 1,
    explanation: 'Malaikat Jibril adalah penyampai wahyu Ilahi yang memuliakan nabi-nabi Allah SWT.'
  },
  {
    id: 'pai_20',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Aspek Akhlak',
    questionText: 'Berikut merupakan contoh tolong-menolong yang paling dianjurkan di sekolah, KECUALI...',
    options: [
      'Menjelaskan cara memecahkan rumus pelajaran di jam istirahat',
      'Membantu teman yang terjatuh di halaman sekolah menuju ruang UKS',
      'Membantu memberikan lembar contekan pada saat ulangan harian berlangsung',
      'Membantu menyapu lantai kelas bersama kelompok piket harian'
    ],
    correctAnswer: 2,
    explanation: 'Menyontek saat ujian adalah perilaku curang yang melanggar kejujuran akademik. Membantu berbuat curang dilarang di dalam agama.'
  },
  {
    id: 'pai_21',
    subjectId: 'pai',
    type: 'isian',
    topic: 'Tolong Menolong',
    questionText: 'Membimbing adik kandung membaca Iqra di sore hari di rumah tergolong amal tolong-menolong dalam hal ...',
    correctAnswers: ['kebajikan', 'kebaikan', 'kebajikan dan takwa', 'takwa'],
    placeholder: 'Sebutkan hal positif...'
  },
  {
    id: 'pai_22',
    subjectId: 'pai',
    type: 'pilihan_ganda',
    topic: 'Sifat Orang Munafik',
    questionText: 'Mengapa sifat munafik sangat dilarang dan dianggap tercela di dalam ajaran agama Islam?',
    options: [
      'Karena orang munafik selalu memberikan sedekah harta berlimpah',
      'Sebab kemunafikan menghancurkan kepercayaan sesama manusia, memicu permusuhan terselubung, dan merusak kerukunan umat',
      'Karena orang munafik memiliki rupa yang sangat rupawan',
      'Karena kemunafikan mempermudah seseorang masuk ke surga Firdaus'
    ],
    correctAnswer: 1,
    explanation: 'Ketiadaan kejujuran dalam diri orang munafik memutus jembatan ukhuwah islamiyah dan meracuni jalinan kepercayaan sosial.'
  },

  // ==========================================
  // BAHASA ARAB (22 Questions)
  // ==========================================
  {
    id: 'ar_1',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Pelajaran (Asma\'ud Durus)',
    questionText: 'Bila guru membacakan kosakata "الدِّرَاسَةُ العَرَبِيَّةُ" atau "اللُّغَةُ العَرَبِيَّةُ" (Darsul LughatAl-Arabiyyah), pelajaran apakah yang dimaksud?',
    options: [
      'Pelajaran Matematika',
      'Pelajaran IPA',
      'Pelajaran Bahasa Arab',
      'Pelajaran Seni Budaya'
    ],
    correctAnswer: 2,
    explanation: 'Al-Lughah Al-Arabiyyah (اللغة العربية) berarti bahasa Arab.'
  },
  {
    id: 'ar_2',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Pelajaran (Asma\'ud Durus)',
    questionText: 'Nama pelajaran sains atau Ilmu Pengetahuan Alam (IPA) dalam kosakata terjemahan bahasa Arab dinamakan...',
    options: [
      'عَقِيْدَةُ وَأَخْلَاقُ (Aqidah Akhlak)',
      'الرِّيَاضِيَّاتُ (Riyadiyyat)',
      'العُلُوْمُ الطَّبِيْعِيَّةُ (Darsul Ulum Al-Thabi\'iyyah)',
      'الفِقْهُ (Fiqih)'
    ],
    correctAnswer: 2,
    explanation: 'Al-Ulum Al-Thabi\'iyyah (العلوم الطبيعية) merujuk kepada ilmu-ilmu alam (IPA).'
  },
  {
    id: 'ar_3',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Pelajaran (Asma\'ud Durus)',
    questionText: 'Siswa kelas 4 hafal bahwa "الرِّيَاضِيَّاتُ" (Ar-Riyadiyyat) adalah sebutan bahasa Arab untuk mata pelajaran...',
    options: [
      'Bahasa Indonesia',
      'Matematika',
      'Pendidikan Pancasila',
      'Bahasa Inggris'
    ],
    correctAnswer: 1,
    explanation: 'Ar-Riyadiyyat (الرياضيات) adalah ilmu berhitung alias pelajaran Matematika.'
  },
  {
    id: 'ar_4',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang (Asma\'ul Hayawanat)',
    questionText: 'Binatang bersayap yang pandai berkicau di pepohonan memiliki sebutan bahasa Arab "طَائِرٌ" (Tha\'irun), artinya adalah...',
    options: [
      'Singa',
      'Gajah',
      'Ikan',
      'Burung'
    ],
    correctAnswer: 3,
    explanation: 'Tha\'irun (طائر) memiliki bentuk jamak thuyur yang berarti sejenis burung.'
  },
  {
    id: 'ar_5',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang (Asma\'ul Hayawanat)',
    questionText: 'Kosakata bahasa Arab untuk hewan pemakan wortel yang pandai melompat tinggi, "أَرْنَبٌ" (Arnabun), artinya adalah...',
    options: [
      'Sapi',
      'Kelinci',
      'Kucing',
      'Kambing'
    ],
    correctAnswer: 1,
    explanation: 'Arnabun (أرنب) adalah kosakata bahasa Arab untuk kelinci.'
  },
  {
    id: 'ar_6',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang (Asma\'ul Hayawanat)',
    questionText: 'Hewan pemakan rumput bertubuh besar pendonor susu perah putih "بَقَرَةٌ" (Baqaratun), manakah arti Indonesianya?',
    options: [
      'Sapi',
      'Kuda',
      'Kambing',
      'Gajah'
    ],
    correctAnswer: 0,
    explanation: 'Baqarah (seperti nama surah Al-Baqarah) berarti sapi betina / sapi secara umum.'
  },
  {
    id: 'ar_7',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang (Asma\'ul Hayawanat)',
    questionText: 'Lengkapilah dialog tanya-jawab sederhana berikut: \nSola: "مَا هَذَا؟" (Ma hadza? - Apa ini?)\nZaki: "هَذَا قِطٌّ" (Hadza Qitthun). Qitthun berarti...',
    options: [
      'Burung',
      'Kucing',
      'Ayam',
      'Kuda'
    ],
    correctAnswer: 1,
    explanation: 'Qitthun (قطّ) adalah kata bahasa Arab untuk kucing.'
  },
  {
    id: 'ar_8',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang (Asma\'ul Hayawanat)',
    questionText: 'Hewan air bersirip yang bernapas menggunakan insang memiliki sebutan nama Arab "سَمَكٌ" (Samakun), artinya...',
    options: [
      'Ikan',
      'Kepiting',
      'Kelinci',
      'Kambing'
    ],
    correctAnswer: 0,
    explanation: 'Samak / Samakun (سمك) bermakna ikan.'
  },
  {
    id: 'ar_9',
    subjectId: 'bahasa_arab',
    type: 'isian',
    topic: 'Terjemah Pelajaran',
    questionText: 'Tuliskan sebutan bahasa Arab (nama latin transkripsi atau huruf Arab) untuk mata pelajaran "Sejarah" (Tarikh): ...',
    correctAnswers: ['tarikh', 'at-tarikh', 'التاريخ', 'التَّارِيْخُ'],
    placeholder: 'Sebutkan nama pelajarannya...'
  },
  {
    id: 'ar_10',
    subjectId: 'bahasa_arab',
    type: 'isian',
    topic: 'Menyusun Huruf',
    questionText: 'Susunlah pecahan huruf hijaiyah berikut menjadi nama binatang yang benar: [ ق - ط - ّ - ٌ ] (Cat: berbunyi meong)',
    correctAnswers: ['qitthun', 'qitun', 'قِطٌّ', 'قطّ', 'قط', 'qithun'],
    placeholder: 'Ketik dalam bahasa Arab atau latinnya...'
  },
  {
    id: 'ar_11',
    subjectId: 'bahasa_arab',
    type: 'isian',
    topic: 'Terjemah Binatang',
    questionText: 'Kata bahasa Arab "فِيْلٌ" (Fiilun, memiliki belalai panjang dan telinga lebar) jika diterjemahkan ke Indonesia berarti hewan ...',
    correctAnswers: ['gajah'],
    placeholder: 'Ketik nama hewannya...'
  },
  {
    id: 'ar_12',
    subjectId: 'bahasa_arab',
    type: 'menjodohkan',
    topic: 'Nama-nama Pelajaran',
    questionText: 'Pasangkanlah muatan nama pelajaran bahasa Arab dengan arti Indonesianya!',
    pairs: [
      { left: 'اللُّغَةُ الْعَرَبِيَّةُ (Al-Lughah Al-Arabiyyah)', right: 'Bahasa Arab' },
      { left: 'الرِّيَاضِيَّاتُ (Ar-Riyadiyyat)', right: 'Matematika' },
      { left: 'الْعَقِيْدَةُ وَالْأَخْلَاقُ (Al-Aqidah wal-Akhlaq)', right: 'Akidah Akhlak' },
      { left: 'الْقُرْآنُ وَالْحَدِيْثُ (Al-Qur\'an wal-Hadits)', right: 'Al-Qur\'an Hadis' }
    ]
  },
  {
    id: 'ar_13',
    subjectId: 'bahasa_arab',
    type: 'menjodohkan',
    topic: 'Nama Binatang',
    questionText: 'Pasangkanlah nama binatang berhuruf Arab berikut dengan arti bahasa Indonesianya!',
    pairs: [
      { left: 'أَرْنَبٌ (Arnabun)', right: 'Kelinci' },
      { left: 'بَقَرَةٌ (Baqaratun)', right: 'Sapi' },
      { left: 'غَنَمٌ (Ghanamun)', right: 'Kambing' },
      { left: 'أَسَدٌ (Asadun)', right: 'Singa (Raja Hutan)' }
    ]
  },
  {
    id: 'ar_14',
    subjectId: 'bahasa_arab',
    type: 'uraian',
    topic: 'Menyusun Kalimat Kata',
    questionText: 'Susunlah rangkaian potongan huruf hijaiyah berikut menjadi kata utuh bahasa Arab yang benar beserta artinya:\na) [ أ - ر - ن - ب ]\nb) [ ح - ص - ا - ن ]',
    sampleAnswer: 'a) Susunan huruf [ أ - ر - n - ب ] menjadi kata أَرْنَبٌ (Arnabun) yang artinya Kelinci.\nb) Susunan huruf [ ح - ص - ا - ن ] menjadi kata حِصَانٌ (Hishanun) yang artinya Kuda.',
    keywords: ['kuda', 'kelinci', 'arnab', 'hishan', 'arnabun', 'hishanun']
  },
  {
    id: 'ar_15',
    subjectId: 'bahasa_arab',
    type: 'uraian',
    topic: 'Menuliskan Kosakata',
    questionText: 'Tuliskanlah kosakata bahasa Arab lengkap dengan cara membacanya untuk 3 (tiga) nama pelajaran sekolahmu sehari-hari!',
    sampleAnswer: 'Tiga nama pelajaran dalam bahasa Arab:\n1. Matematika = الرِّيَاضِيَّاتُ (Ar-Riyadiyyat)\n2. Pelajaran IPA = العُلُوْمُ الطَّبِيْعِيَّةُ (Al-Ulumul Thabi\'iyyah)\n3. Pelajaran Bahasa Arab = اللُّغَةُ الْعَرَبِيَّةُ (Al-Lughatul \'Arabiyyah)\nAtau Fikih = الْفِقْهُ (Al-Fiqhu).',
    keywords: ['riyadiyyat', 'lughah', 'ulum', 'fiqhu', 'matematika', 'ipa', 'bahasa arab']
  },
  {
    id: 'ar_16',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang',
    questionText: 'Binatang "حِصَانٌ" (Hishanun) adalah berkaki empat, berlari sangat cepat dan biasa digunakan untuk menarik delman. Hewan ini adalah...',
    options: [
      'Gajah',
      'Kambing',
      'Kuda',
      'Singa'
    ],
    correctAnswer: 2,
    explanation: 'Hishanun (حصان) diterjemahkan sebagai kuda.'
  },
  {
    id: 'ar_17',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang',
    questionText: 'Hewan "دَجَاجَةٌ" (Dajajatun) menghasilkan telur bernutrisi setiap harinya dan bersuara petok-petok. Hewan ini adalah...',
    options: [
      'Ayam betina / Ayam',
      'Kucing rumah',
      'Burung perkutut',
      'Kuda jantan'
    ],
    correctAnswer: 0,
    explanation: 'Dajajah / Dajajatun (دجاجة) bermakna ayam.'
  },
  {
    id: 'ar_18',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Binatang',
    questionText: '"هَذَا أَسَدٌ فِي الغَابَةِ" (Hadza Asadun fil ghabati) artinya "Ini adalah ... di dalam hutan buah". Kata yang rumpang berisikan...',
    options: [
      'Kancik cerdik',
      'Singa pemberani',
      'Sapi perah',
      'Burung hantu'
    ],
    correctAnswer: 1,
    explanation: 'Asad / Asadun (أسد) bermakna singa.'
  },
  {
    id: 'ar_19',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Nama Pelajaran',
    questionText: 'Kamus arab mencatat darsul "الْفِقْهُ" (Al-Fiqhu) mengajarkan adab bersuci dan rukun shalat umat Islam. Pelajaran ini adalah...',
    options: [
      'Pelajaran Aqidah Akhlak',
      'Pelajaran Fikih',
      'Pelajaran Sejarah Kebudayaan Islam',
      'Pelajaran Al-Qur\'an Hadis'
    ],
    correctAnswer: 1,
    explanation: 'Darsul Fiqhu (الفقه) bermakna pelajaran Fikih.'
  },
  {
    id: 'ar_20',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Mata Pelajaran',
    questionText: '"مَاذَا تَدْرُسُ الآنَ؟" (Madza tadrusu al-\'ana? - Apa yang sedang kamu pelajari sekarang?)\n"أَدْرُسُ الآنَ تَعْلِيْمَ القُرْآنِ وَالحَدِيْثِ". Arti dari mata pelajaran Al-Qur\'an wal-Hadits adalah...',
    options: [
      'Pelajaran Aqidah Akhlak',
      'Pelajaran Sejarah Kebudayaan Islam',
      'Pelajaran Al-Qur\'an Hadis',
      'Pelajaran Bahasa Arab'
    ],
    correctAnswer: 2,
    explanation: 'Al-Qur\'an wal-Hadits (القرآن والحديث) diterjemahkan sebagai Al-Qur\'an Hadis.'
  },
  {
    id: 'ar_21',
    subjectId: 'bahasa_arab',
    type: 'isian',
    topic: 'Spelling Translate',
    questionText: 'Kambing dalam bahasa Arab (punya jenggot, memakan rumput, bersuara mbeek) disebut ...',
    correctAnswers: ['ghanamun', 'ghanam', 'غَنَمٌ', 'غنم'],
    placeholder: 'Ketik dalam bahasa Arab atau latin...'
  },
  {
    id: 'ar_22',
    subjectId: 'bahasa_arab',
    type: 'pilihan_ganda',
    topic: 'Pelajaran',
    questionText: 'Guru berkata, "Bukalah buku pelajaran اللُّغَةُ الْإِنْجِلِيْزِيَّةُ (Al-Lughatul Injiliziyyah)." Siswa segera mempersiapkan buku...',
    options: [
      'Bahasa Arab',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Matematika'
    ],
    correctAnswer: 2,
    explanation: 'Al-Injiliziyyah (الإنجليزية) adalah istilah bahasa Arab untuk bahasa Inggris.'
  }
];

// Subject specific distractors for converting fill-in questions to multiple-choice
const SUBJECT_DISTRACTORS: { [key: string]: string[] } = {
  ipas: ['Organik', 'Anorganik', 'B3 (Berbahaya)', 'Reduce', 'Reuse', 'Recycle', 'Penghijauan', 'Reboisasi', 'Evaporasi', 'Kondensasi', 'Konduksi', 'Konveksi', 'Radiasi', 'Mencair', 'Membeku', 'Menguap', 'Menyublim', 'Mengembun', 'Gaya Gesek', 'Gaya Magnet', 'Gaya Gravitasi', 'Produsen', 'Konsumen I', 'Konsumen II', 'Pengurai'],
  matematika: ['Persegi', 'Siku-siku', 'Lurus', 'Lancip', 'Tumpul', 'Persegi Panjang', 'Segitiga Sisi', 'Trapesium', 'Aritmatika', 'Piktogram', 'Diagram Batang', 'Sumbu Simetri', 'Diagonal', 'Keliling', 'Luas', '10', '180', '90', '360'],
  bahasa_indonesia: ['Fakta', 'Opini', 'Watak', 'Protagonis', 'Antagonis', 'Latar', 'Alur', 'Majas', 'Personifikasi', 'Metafora', 'Hiperbola', 'Sinonim', 'Antonim', 'Hemat', 'Boros', 'Disiplin', 'Pemalas'],
  pancasila: ['Hak', 'Kewajiban', 'Gotong Royong', 'Kerjasama', 'Bintang', 'Rantai', 'Beringin', 'Banteng', 'Padi dan Kapas', 'Bhinneka', 'Tunggal Ika', 'Honai', 'Saman', 'Kecak', 'Gadang', 'Sasando'],
  bahasa_inggris: ['Sunny', 'Rainy', 'Cloudy', 'Cold', 'Hot', 'Under', 'On', 'In', 'Behind', 'Elephant', 'Rabbit', 'Giraffe', 'Bag', 'Reading', 'Writing', 'Dry', 'Wet'],
  pai: ['Wajib', 'Sunnah', 'Haram', 'Makruh', 'Dusta', 'Khianat', 'Jujur', 'Bohong', 'Penyayang', 'Pengasih', 'Ar-Rahman', 'Ar-Rahim', 'Munafik', 'Akhlak', 'Aqidah', 'Salam'],
  bahasa_arab: ['Matematika', 'Bahasa Arab', 'Fikih', 'Kucing', 'Sapi', 'Kelinci', 'Gajah', 'Kuda', 'Singa', 'Pena', 'Meja', 'Kursi', 'Buku', 'Mata', 'Hidung', 'Tangan', 'Kepala']
};

export function convertToMultipleChoice(q: Question, seedIndex: number = 0): MultipleChoiceQuestion {
  if (q.type === 'pilihan_ganda') {
    return q as MultipleChoiceQuestion;
  }

  const base: any = {
    id: q.id,
    subjectId: q.subjectId,
    type: 'pilihan_ganda',
    topic: q.topic || 'Pilihan Ganda',
    questionText: q.questionText,
    explanation: q.explanation || 'Jawaban yang benar ditentukan dari materi pelajaran.'
  };

  if (q.type === 'isian') {
    const isian = q as FillInQuestion;
    const correct = isian.correctAnswers[0];
    const correctOpt = correct.charAt(0).toUpperCase() + correct.slice(1);
    
    // Select distractors from SUBJECT_DISTRACTORS
    const pool = SUBJECT_DISTRACTORS[q.subjectId] || [];
    const filteredPool = pool.filter(item => 
      item.toLowerCase() !== correct.toLowerCase() && 
      item.toLowerCase() !== correctOpt.toLowerCase()
    );
    
    // Deterministic selection based on seedIndex or length of questionText to make it predictable
    const seed = q.questionText.length + seedIndex;
    const shuffledPool = [...filteredPool];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
      const j = Math.abs(seed * (i + 7) + 13) % (i + 1);
      const temp = shuffledPool[i];
      shuffledPool[i] = shuffledPool[j];
      shuffledPool[j] = temp;
    }
    
    const distractors = shuffledPool.slice(0, 3);
    const options = [correctOpt, ...distractors];
    
    // Shuffle the final options deterministically
    const finalOptions = [...options];
    for (let i = finalOptions.length - 1; i > 0; i--) {
      const j = Math.abs((seed + 5) * (i + 3) + 7) % (i + 1);
      const temp = finalOptions[i];
      finalOptions[i] = finalOptions[j];
      finalOptions[j] = temp;
    }

    base.options = finalOptions;
    base.correctAnswer = finalOptions.indexOf(correctOpt);
    if (base.correctAnswer === -1) {
      base.correctAnswer = 0;
      base.options[0] = correctOpt;
    }
    return base as MultipleChoiceQuestion;
  }

  if (q.type === 'menjodohkan') {
    const matching = q as MatchingQuestion;
    const targetPair = matching.pairs[0];
    
    base.questionText = `${matching.questionText.replace('Jodohkanlah ', '').replace('Jodohkan ', '').replace('Pasangkanlah ', '').replace('Pasangkan ', '')}\n\nPasangan yang paling TEPAT untuk **"${targetPair.left}"** adalah...`;
    
    const correctOpt = targetPair.right;
    const otherRights = matching.pairs.slice(1).map(p => p.right);
    
    const pool = SUBJECT_DISTRACTORS[q.subjectId] || [];
    const extraDistractors = pool.filter(item => 
      item.toLowerCase() !== correctOpt.toLowerCase() &&
      !otherRights.some(r => r.toLowerCase() === item.toLowerCase())
    );

    const distractors = [...otherRights, ...extraDistractors].slice(0, 3);
    const options = [correctOpt, ...distractors];
    
    // Shuffle deterministic
    const seed = q.questionText.length + seedIndex;
    const finalOptions = [...options];
    for (let i = finalOptions.length - 1; i > 0; i--) {
      const j = Math.abs((seed + 9) * (i + 2) + 11) % (i + 1);
      const temp = finalOptions[i];
      finalOptions[i] = finalOptions[j];
      finalOptions[j] = temp;
    }

    base.options = finalOptions;
    base.correctAnswer = finalOptions.indexOf(correctOpt);
    if (base.correctAnswer === -1) {
      base.correctAnswer = 0;
      base.options[0] = correctOpt;
    }
    return base as MultipleChoiceQuestion;
  }

  // Treat 'uraian' (essays) similarly or filter them out in build process.
  // As a fallback converter for essays:
  const essay = q as EssayQuestion;
  const correctOpt = essay.sampleAnswer.split('\n')[0].replace(/^\d+[\.\)]\s*/, '') || 'Kunci jawaban yang direkomendasikan.';
  base.questionText = q.questionText;
  base.options = [
    correctOpt,
    'Kurang tepat karena tidak sesuai dengan topik yang dibahas.',
    'Pernyataan yang bertentangan dengan jawaban ilmiah.',
    'Jawaban acak tidak relevan.'
  ];
  base.correctAnswer = 0;
  return base as MultipleChoiceQuestion;
}

// Convert all static pool questions except essays to multiple-choice
const CONVERTED_STATIC_POOL = STATIC_QUESTION_POOL
  .filter(q => q.type !== 'uraian')
  .map((q, idx) => convertToMultipleChoice(q, idx));

// Append generated questions for each subject to reach exactly 140 questions per subject
const extraQuestions: Question[] = [];
SUBJECTS.forEach((subject) => {
  const currentCount = CONVERTED_STATIC_POOL.filter(q => q.subjectId === subject.id).length;
  const targetCount = 140;
  if (currentCount < targetCount) {
    const needed = targetCount - currentCount;
    extraQuestions.push(...generateQuestionsForSubject(subject.id, currentCount + 1, needed));
  }
});

export const QUESTION_POOL: Question[] = [
  ...CONVERTED_STATIC_POOL,
  ...extraQuestions
];
