export const LIKERT_SCALE = [
  { value: 1, label: 'Sangat Tidak Setuju' },
  { value: 2, label: 'Tidak Setuju' },
  { value: 3, label: 'Agak Tidak Setuju' },
  { value: 4, label: 'Agak Setuju' },
  { value: 5, label: 'Setuju' },
  { value: 6, label: 'Sangat Setuju' },
];

export const DIMENSIONS = [
  {
    key: 'hope',
    label: 'Harapan & Arah Kerja',
    clinical: 'Hope',
    shortDesc: 'Kemauan dan kemampuan mencari jalur alternatif saat target kerja terhambat.',
    workplaceExample:
      'Saat vendor utama terlambat mengirim bahan, Anda langsung menyiapkan dua opsi pemasok cadangan agar proyek tetap berjalan.',
    actionTitle: 'Pecah Target Mingguan Jadi 3 Langkah Kecil',
    actionDesc: 'Tulis satu target kerja yang terasa buntu, lalu buat dua rute alternatif untuk mencapainya minggu ini.',
  },
  {
    key: 'efficacy',
    label: 'Keyakinan Diri',
    clinical: 'Efficacy',
    shortDesc: 'Rasa percaya diri mengambil tanggung jawab dan menuntaskan tugas yang menantang.',
    workplaceExample:
      'Anda bersedia memimpin presentasi ke klien baru setelah mempelajari data produk, meski belum pernah melakukannya sendirian.',
    actionTitle: 'Tinjau Ulang SOP & Target Peran Anda',
    actionDesc: 'Buka tab Konteks Kerja untuk memastikan ekspektasi KPI Anda jelas sebelum mengeksekusi tugas baru.',
  },
  {
    key: 'resilience',
    label: 'Daya Bangkit',
    clinical: 'Resilience',
    shortDesc: 'Kapasitas pulih cepat dan tetap fokus setelah menghadapi tekanan, kritik, atau kegagalan.',
    workplaceExample:
      'Setelah kampanye produk tidak mencapai target, Anda mengevaluasi datanya secara objektif dan langsung menyusun perbaikan.',
    actionTitle: 'Latih Jeda 5 Menit Pasca-Tekanan',
    actionDesc: 'Ambil kursus singkat "Pulih Cepat dari Revisi Berat" di Akademi untuk melatih respons tenang saat krisis.',
  },
  {
    key: 'optimism',
    label: 'Optimisme Realistis',
    clinical: 'Optimism',
    shortDesc: 'Cara pandang positif yang realistis terhadap hasil kerja dan masa depan karier.',
    workplaceExample:
      'Anda melihat perubahan sistem kerja di kantor sebagai peluang belajar keterampilan baru, bukan sekadar beban tambahan.',
    actionTitle: 'Catat 1 Kemajuan Kerja Hari Ini',
    actionDesc: 'Biasakan mencatat satu hal yang berjalan baik setiap sore agar otak tidak hanya merekam masalah.',
  },
];

export const PCQ12_ITEMS = [
  { id: 1, dimension: 'hope', isReverse: false, text: 'Jika saya menemui jalan buntu di pekerjaan saat ini, saya bisa memikirkan banyak cara untuk keluar dari masalah tersebut.' },
  { id: 2, dimension: 'hope', isReverse: false, text: 'Saat ini, saya merasa cukup berenergi dalam mengejar target-target kerja saya.' },
  { id: 3, dimension: 'hope', isReverse: false, text: 'Selalu ada banyak cara untuk menyelesaikan setiap hambatan pekerjaan yang sedang saya hadapi.' },
  { id: 4, dimension: 'hope', isReverse: false, text: 'Saat ini, saya melihat diri saya cukup berhasil dalam mencapai rencana kerja yang saya tetapkan.' },
  { id: 5, dimension: 'efficacy', isReverse: false, text: 'Saya merasa yakin mampu menganalisis masalah jangka panjang di pekerjaan dan menemukan solusinya.' },
  { id: 6, dimension: 'efficacy', isReverse: false, text: 'Saya yakin dapat mempresentasikan area kerja saya dengan baik dalam rapat bersama manajemen atau tim lain.' },
  { id: 7, dimension: 'efficacy', isReverse: false, text: 'Saya percaya diri dalam membantu menetapkan target atau sasaran di unit kerja saya.' },
  { id: 8, dimension: 'resilience', isReverse: true, text: 'Saat ini, saya merasa sangat kesulitan untuk bangkit kembali jika rencana kerja saya berantakan.' },
  { id: 9, dimension: 'resilience', isReverse: false, text: 'Saya mampu menangani berbagai tekanan pekerjaan yang datang bersamaan dengan kepala dingin.' },
  { id: 10, dimension: 'resilience', isReverse: false, text: 'Saya bisa melewati masa-masa sulit di kantor karena saya pernah menghadapi situasi serupa sebelumnya.' },
  { id: 11, dimension: 'optimism', isReverse: false, text: 'Saya selalu melihat sisi positif dari setiap perubahan atau situasi di pekerjaan saya.' },
  { id: 12, dimension: 'optimism', isReverse: true, text: 'Mengenai masa depan pekerjaan saya saat ini, saya sering merasa hal-hal buruk lebih mungkin terjadi daripada hal baik.' },
];

export function scoreAssessment(answers) {
  const calculated = {};
  PCQ12_ITEMS.forEach((item) => {
    const raw = answers[item.id] ?? 4;
    calculated[item.id] = item.isReverse ? 7 - raw : raw;
  });

  const dimScores = {};
  DIMENSIONS.forEach((dim) => {
    const items = PCQ12_ITEMS.filter((i) => i.dimension === dim.key);
    const sum = items.reduce((acc, i) => acc + calculated[i.id], 0);
    dimScores[dim.key] = Number((sum / items.length).toFixed(2));
  });

  const totalSum = PCQ12_ITEMS.reduce((acc, i) => acc + calculated[i.id], 0);
  const total = Number((totalSum / PCQ12_ITEMS.length).toFixed(2));

  return { total, dimensions: dimScores, calculated };
}

export function getTier(score) {
  if (score >= 4.75) return { label: 'Kuat', bg: 'bg-[#E1EBE6]', text: 'text-[#344E43]' };
  if (score >= 3.5) return { label: 'Berkembang', bg: 'bg-[#EDEAE2]', text: 'text-[#4F544F]' };
  return { label: 'Perlu Dukungan', bg: 'bg-[#F4EBE8]', text: 'text-[#7D4037]' };
}

export const INITIAL_RETURNING_HISTORY = [
  {
    id: 'pre-1',
    label: 'Pre-Training',
    date: '12 Okt 2026',
    total: 3.75,
    dimensions: { hope: 3.75, efficacy: 4.0, resilience: 3.33, optimism: 4.0 },
  },
  {
    id: 'post-1',
    label: 'Post-Training',
    date: '18 Nov 2026',
    total: 4.55,
    dimensions: { hope: 4.75, efficacy: 4.67, resilience: 4.0, optimism: 4.75 },
  },
];

export const COURSES = [
  {
    id: 'c1',
    dimension: 'hope',
    title: 'Merancang Jalur Cadangan Saat Proyek Terhambat',
    duration: '6 menit baca',
    points: 50,
    summary: 'Teknik memetakan Rencana B sebelum tenggat waktu mepet agar tidak panik saat ada kendala.',
  },
  {
    id: 'c2',
    dimension: 'efficacy',
    title: 'Berani Bicara di Rapat Lintas Divisi',
    duration: '8 menit video',
    points: 50,
    summary: 'Kerangka 3 poin untuk menyampaikan argumen kerja secara ringkas dan berbasis data.',
  },
  {
    id: 'c3',
    dimension: 'resilience',
    title: 'Pulih Cepat dari Revisi Berat & Kritik',
    duration: '5 menit baca',
    points: 50,
    summary: 'Memisahkan evaluasi hasil kerja dari harga diri agar energi tidak habis oleh rasa kecewa.',
  },
  {
    id: 'c4',
    dimension: 'optimism',
    title: 'Membaca Peluang di Tengah Perubahan Struktur',
    duration: '7 menit baca',
    points: 50,
    summary: 'Cara menilai ulang situasi kerja yang tidak pasti menjadi daftar hal yang masih bisa dikontrol.',
  },
];

export const WORK_ITEMS = [
  {
    id: 'w1',
    type: 'Jobdesc',
    dimensionLink: 'Efficacy',
    title: 'Spesialis Operasional & Koordinasi Proyek',
    code: 'JD-OPS-04',
    body: 'Bertanggung jawab memastikan alur serah-terima tugas antar tim berjalan tepat waktu, memantau risiko harian, dan menyusun laporan mingguan.',
  },
  {
    id: 'w2',
    type: 'SOP',
    dimensionLink: 'Hope',
    title: 'Prosedur Eskalasi Kendala Vendor',
    code: 'SOP-12',
    body: 'Jika vendor melewati SLA > 24 jam: (1) Kirim pengingat tertulis, (2) Aktifkan vendor cadangan daftar tier-2, (3) Catat di log proyek.',
  },
  {
    id: 'w3',
    type: 'KPI',
    dimensionLink: 'Hope & Efficacy',
    title: 'Ketepatan Waktu Serah-Terima Q4',
    code: 'KPI-Q4-01',
    body: 'Target: Minimal 92% tugas proyek selesai sesuai tenggat yang disepakati tanpa revisi mayor berulang.',
  },
];

export const INITIAL_ORG_DOCS = [
  { id: 'o1', unit: 'People & Culture', note: 'Jam fokus tanpa rapat berlaku setiap Selasa & Kamis pukul 09.00–12.00 WIB.' },
  { id: 'o2', unit: 'Operasional', note: 'Semua catatan kendala proyek wajib masuk ke kanal #ops-log sebelum pukul 17.00.' },
];

export const INITIAL_CHAT = [
  {
    id: 'm1',
    sender: 'coach',
    name: 'Dr. Rina Kusuma (Psikolog Kerja)',
    time: '09:15',
    text: 'Halo! Saya sudah melihat ringkasan PCQ-12 Anda. Bagian mana dari pekerjaan minggu ini yang paling menguras energi Anda?',
  },
];