/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MathVisualProps {
  questionId: string;
}

export const MathVisual: React.FC<MathVisualProps> = ({ questionId }) => {
  // Render based on the question ID to provide highly rich, custom visuals
  switch (questionId) {
    case 'mtk_1': // Persegi
      return (
        <div id="visual_mtk_1" className="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-xl my-3 border border-blue-100">
          <svg className="w-40 h-40" viewBox="0 0 160 160">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="160" height="160" fill="url(#grid)" rx="8" />
            
            {/* Square shape */}
            <rect x="30" y="30" width="100" height="100" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" rx="2" />
            
            {/* 90 degree corner indicators */}
            <rect x="30" y="110" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <rect x="120" y="120" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <rect x="120" y="30" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <rect x="30" y="30" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />

            {/* Equal-side ticks */}
            {/* Top */}
            <line x1="80" y1="25" x2="80" y2="35" stroke="#2563eb" strokeWidth="2" />
            {/* Bottom */}
            <line x1="80" y1="125" x2="80" y2="135" stroke="#2563eb" strokeWidth="2" />
            {/* Left */}
            <line x1="25" y1="80" x2="35" y2="80" stroke="#2563eb" strokeWidth="2" />
            {/* Right */}
            <line x1="125" y1="80" x2="135" y2="80" stroke="#2563eb" strokeWidth="2" />

            {/* Labels */}
            <text x="80" y="145" textAnchor="middle" className="text-xs font-semibold fill-blue-700">Sisi (s)</text>
            <text x="15" y="85" textAnchor="middle" className="text-xs font-semibold fill-blue-700" transform="rotate(-90 15 85)">Sisi (s)</text>
          </svg>
          <span className="text-xs text-blue-600 mt-2 font-medium">Bangun Datar Segi Empat (Persegi)</span>
        </div>
      );

    case 'mtk_2': // Trapesium
      return (
        <div id="visual_mtk_2" className="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-xl my-3 border border-blue-100">
          <svg className="w-48 h-36" viewBox="0 0 200 120">
            <rect width="200" height="120" fill="none" rx="8" />
            
            {/* Parallel lines help indications (dashed) */}
            <line x1="10" y1="20" x2="190" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="10" y1="90" x2="190" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Trapezoid shape */}
            <polygon points="50,20 150,20 180,90 20,90" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            
            {/* Parallel arrow markers */}
            {/* Top parallel indicator */}
            <path d="M 97,15 L 105,20 L 97,25" fill="none" stroke="#b91c1c" strokeWidth="2" />
            {/* Bottom parallel indicator */}
            <path d="M 97,85 L 105,90 L 97,95" fill="none" stroke="#b91c1c" strokeWidth="2" />

            {/* Labels */}
            <text x="100" y="15" textAnchor="middle" className="text-xs font-bold fill-red-700">Sisi Sejajar A</text>
            <text x="100" y="110" textAnchor="middle" className="text-xs font-bold fill-red-700">Sisi Sejajar B</text>
          </svg>
          <span className="text-xs text-blue-600 mt-2 font-medium">Memiliki tepat satu pasang sisi sejajar (Trapesium)</span>
        </div>
      );

    case 'mtk_3': // Jajaran Genjang
      return (
        <div id="visual_mtk_3" className="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-xl my-3 border border-blue-100">
          <svg className="w-48 h-36" viewBox="0 0 200 120">
            {/* Parallelogram */}
            <polygon points="50,25 180,25 150,95 20,95" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            
            {/* Opposite angles arcs */}
            {/* Bottom-left obtuse */}
            <path d="M 33,95 A 15,15 0 0,1 30,75" fill="none" stroke="#10b981" strokeWidth="2" />
            {/* Top-right obtuse */}
            <path d="M 167,25 A 15,15 0 0,1 170,45" fill="none" stroke="#10b981" strokeWidth="2" />
            
            {/* Bottom-right acute */}
            <path d="M 140,95 A 12,12 0 0,0 148,85" fill="none" stroke="#b91c1c" strokeWidth="2" />
            {/* Top-left acute */}
            <path d="M 60,25 A 12,12 0 0,0 52,35" fill="none" stroke="#b91c1c" strokeWidth="2" />

            {/* Texts */}
            <text x="35" y="70" className="text-[10px] font-bold fill-emerald-700">α</text>
            <text x="155" y="55" className="text-[10px] font-bold fill-emerald-700">α</text>
            <text x="135" y="85" className="text-[10px] font-bold fill-red-700">β</text>
            <text x="58" y="42" className="text-[10px] font-bold fill-red-700">β</text>
          </svg>
          <span className="text-xs text-blue-600 mt-2 font-medium">Sudut berhadapan sama besar (Jajaran Genjang)</span>
        </div>
      );

    case 'mtk_4': // Diagram Batang Nilai Murid
      return (
        <div id="visual_mtk_4" className="w-full p-4 bg-slate-50/80 rounded-xl my-3 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 mb-3 text-center">Diagram Batang: Hasil Nilai Harian Matematika</h4>
          <div className="flex items-end justify-center h-48 gap-4 px-4 border-b border-l border-slate-400 pb-2">
            {/* Bar 1 (Nilai 70: 5 anak) */}
            <div className="flex flex-col items-center w-12 gap-1 group">
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">5 Siswa</span>
              <div 
                className="w-full bg-blue-300 group-hover:bg-blue-400 rounded-t-md transition-all duration-300 border border-blue-400" 
                style={{ height: '50px' }}
              />
              <span className="text-xs font-bold text-slate-700 mt-1">Nilai 70</span>
            </div>
            {/* Bar 2 (Nilai 80: 12 anak) */}
            <div className="flex flex-col items-center w-12 gap-1 group">
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">12 Siswa</span>
              <div 
                className="w-full bg-blue-500 group-hover:bg-blue-600 rounded-t-md transition-all duration-300 border border-blue-600" 
                style={{ height: '120px' }}
              />
              <span className="text-xs font-bold text-slate-700 mt-1">Nilai 80</span>
            </div>
            {/* Bar 3 (Nilai 90: 8 anak) */}
            <div className="flex flex-col items-center w-12 gap-1 group">
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">8 Siswa</span>
              <div 
                className="w-full bg-blue-400 group-hover:bg-blue-500 rounded-t-md transition-all duration-300 border border-blue-500" 
                style={{ height: '80px' }}
              />
              <span className="text-xs font-bold text-slate-700 mt-1">Nilai 90</span>
            </div>
            {/* Bar 4 (Nilai 100: 3 anak) */}
            <div className="flex flex-col items-center w-12 gap-1 group">
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">3 Siswa</span>
              <div 
                className="w-full bg-sky-200 group-hover:bg-sky-300 rounded-t-md transition-all duration-300 border border-sky-400" 
                style={{ height: '30px' }}
              />
              <span className="text-xs font-bold text-slate-700 mt-1">Nilai 100</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-center">*Sumbu vertikal menunjukkan kuantitas anak, sumbu horizontal menunjukkan kelompok nilai.</p>
        </div>
      );

    case 'mtk_5': // Piktogram Penjualan Roti
      return (
        <div id="visual_mtk_5" className="w-full p-4 bg-amber-50/50 rounded-xl my-3 border border-amber-100">
          <h4 className="text-xs font-bold text-amber-900 mb-2 text-center">Piktogram (Diagram Gambar) Penjualan Roti Koperasi</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse bg-white rounded-lg overflow-hidden border border-amber-200">
              <thead>
                <tr className="bg-amber-100/80 text-amber-900">
                  <th className="px-3 py-2 font-bold border border-amber-200">Hari</th>
                  <th className="px-3 py-2 font-bold border border-amber-200">Gambar Penjualan</th>
                  <th className="px-3 py-2 font-bold border border-amber-200 text-center">Jumlah Penjualan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-amber-50/40">
                  <td className="px-3 py-2.5 font-semibold border border-amber-200 bg-amber-100/10">Senin</td>
                  <td className="px-3 py-2.5 border border-amber-200">
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-md font-extrabold text-sm" title="Roti Besar (10)">🍞</span>
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-md font-extrabold text-sm" title="Roti Besar (10)">🍞</span>
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-md font-extrabold text-sm" title="Roti Besar (10)">🍞</span>
                      <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-md font-extrabold text-sm" title="Roti Kecil (5)">🥐</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 border border-amber-200 text-center font-bold text-amber-800">?</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="px-3 py-2.5 font-semibold border border-amber-200 bg-amber-100/10">Selasa</td>
                  <td className="px-3 py-2.5 border border-amber-200">
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-md font-extrabold text-sm">🍞</span>
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-md font-extrabold text-sm">🍞</span>
                      <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-md font-extrabold text-sm">🥐</span>
                      <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-md font-extrabold text-sm">🥐</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 border border-amber-200 text-center font-semibold text-slate-600">30 Roti</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-3 pt-2 border-t border-amber-100 text-[11px] text-amber-800 font-medium">
            <div className="flex items-center gap-1">
              <span className="text-sm">🍞</span>
              <span>mewakili 10 Roti</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">🥐</span>
              <span>mewakili 5 Roti</span>
            </div>
          </div>
        </div>
      );

    case 'mtk_6': // Tabel Perpustakaan
      return (
        <div id="visual_mtk_6" className="w-full p-4 bg-slate-50 rounded-xl my-3 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 mb-2 text-center">Tabel Koleksi Buku Perpustakaan "Cerdas Mulia"</h4>
          <table className="w-full text-xs text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="px-3 py-2 border border-slate-200 font-bold">Kategori Koleksi Buku</th>
                <th className="px-3 py-2 border border-slate-200 text-center font-bold">Jumlah Buku</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border border-slate-200 font-medium">Buku Cerita Bergambar</td>
                <td className="px-3 py-2 border border-slate-200 text-center font-bold text-blue-600">120 buku</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-3 py-2 border border-slate-200 font-medium">Buku Sains (Sains/IPAS)</td>
                <td className="px-3 py-2 border border-slate-200 text-center font-bold text-emerald-600">85 buku</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border border-slate-200 font-medium">Novel Anak</td>
                <td className="px-3 py-2 border border-slate-200 text-center font-bold text-amber-600">60 buku</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-3 py-2 border border-slate-200 font-medium">Kamus Bahasa</td>
                <td className="px-3 py-2 border border-slate-200 text-center font-bold text-pink-600">15 buku</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'mtk_7': // Segitiga Siku-Siku
      return (
        <div id="visual_mtk_7" className="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-xl my-3 border border-blue-100">
          <svg className="w-40 h-40" viewBox="0 0 160 160">
            {/* Right-angled triangle */}
            <polygon points="30,30 30,130 130,130" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
            
            {/* right angle square symbol */}
            <rect x="30" y="120" width="10" height="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            
            {/* Angle labels */}
            <text x="35" y="115" className="text-[10px] font-bold fill-red-600">90°</text>
            <text x="20" y="80" textAnchor="middle" className="text-xs font-semibold fill-blue-700" transform="rotate(-90 20 80)">Tinggi</text>
            <text x="80" y="145" textAnchor="middle" className="text-xs font-semibold fill-blue-700">Alas</text>
            <text x="90" y="75" textAnchor="middle" className="text-xs font-semibold fill-blue-700" transform="rotate(45 90 75)">Miring</text>
          </svg>
          <span className="text-xs text-blue-600 mt-2 font-medium">Segitiga Siku-Siku dengan Sudut 90 Derajat</span>
        </div>
      );

    case 'mtk_9': // Hobi Siswa
      return (
        <div id="visual_mtk_9" className="w-full p-4 bg-slate-50 rounded-xl my-3 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 mb-2 text-center">Diagram Batang: Hobi Olahraga Siswa Kelas 4</h4>
          <div className="flex items-end justify-center h-40 gap-4 border-b border-l border-slate-300 pb-2">
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] font-semibold text-slate-550">15 Anak</span>
              <div className="w-full bg-indigo-400 rounded-t-sm" style={{ height: '75px' }} />
              <span className="text-[10px] font-semibold text-slate-700 mt-1 text-center truncate w-full">Futsal</span>
            </div>
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] font-semibold text-slate-550">10 Anak</span>
              <div className="w-full bg-indigo-400 rounded-t-sm" style={{ height: '50px' }} />
              <span className="text-[10px] font-semibold text-slate-700 mt-1 text-center truncate w-full">Bulu Tangkis</span>
            </div>
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] font-bold text-red-600">8 Anak</span>
              <div className="w-full bg-red-400 rounded-t-sm border border-red-500" style={{ height: '40px' }} />
              <span className="text-[10px] font-bold text-red-800 mt-1 text-center truncate w-full">Renang</span>
            </div>
            <div className="flex flex-col items-center w-12 gap-1">
              <span className="text-[9px] font-semibold text-slate-550">12 Anak</span>
              <div className="w-full bg-indigo-400 rounded-t-sm" style={{ height: '60px' }} />
              <span className="text-[10px] font-semibold text-slate-700 mt-1 text-center truncate w-full">Basket</span>
            </div>
          </div>
        </div>
      );

    case 'mtk_12': // Tabel Berat Badan
      return (
        <div id="visual_mtk_12" className="w-full p-4 bg-slate-50 rounded-xl my-3 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 mb-2 text-center">Tabel Distribusi Berat Badan Murid Kelas 4</h4>
          <table className="w-full text-xs border border-slate-200 text-center bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-150 text-slate-800 font-bold">
                <th className="px-3 py-1.5 border border-slate-200">Berat Badan (kg)</th>
                <th className="px-3 py-1.5 border border-slate-200">Frekuensi (Jumlah Anak)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-1.5 border border-slate-200 font-semibold">32 kg</td>
                <td className="px-3 py-1.5 border border-slate-200 text-slate-600">4 Anak</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-3 py-1.5 border border-slate-200 font-semibold text-indigo-700">34 kg</td>
                <td className="px-3 py-1.5 border border-slate-200 text-indigo-700 font-bold">7 Anak</td>
              </tr>
              <tr>
                <td className="px-3 py-1.5 border border-slate-200 font-semibold text-indigo-700">36 kg</td>
                <td className="px-3 py-1.5 border border-slate-200 text-indigo-700 font-bold">3 Anak</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'mtk_18': // Penjualan Sayur Batang
      return (
        <div id="visual_mtk_18" className="w-full p-4 bg-emerald-50/30 rounded-xl my-3 border border-emerald-100">
          <h4 className="text-xs font-bold text-emerald-900 mb-2 text-center">Volume Penjualan Sayur Mayur (kg)</h4>
          <div className="flex flex-col gap-2 mt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-0.5 font-medium">
                <span>🥬 Sawi Hijau</span>
                <span className="font-bold text-slate-800">42 kg</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '84%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-0.5 font-medium">
                <span>🌱 Bayam</span>
                <span className="font-bold text-slate-800">30 kg</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                <div className="bg-green-400 h-full rounded-full transition-all duration-500" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-0.5 font-medium">
                <span>🌿 Kangkung</span>
                <span className="font-bold text-slate-800">25 kg</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
