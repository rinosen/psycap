import { ArrowRight, Sparkles } from 'lucide-react';
import { DIMENSIONS } from '../data/pcq12Data';

export default function LandingView({ onStartAssessment, onGoDashboard, hasHistory }) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      {/* Centered Hero Section */}
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCD7CC] bg-[#E6E3DA] px-4 py-1.5 text-xs font-medium text-[#4A6B5D]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Standar Evaluasi Modal Psikologis Kerja</span>
        </div>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#1F2421] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Kapasitas mental kerja bisa dilatih, bukan sekadar sifat bawaan.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#636A65] sm:text-lg">
          Instrumen PCQ-12 mengukur 4 pilar kapasitas psikologis Anda saat ini: Harapan, Keyakinan Diri, Daya Bangkit, dan Optimisme. Kenali titik tumpu performa kerja Anda sebelum kelelahan mengambil alih.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#4A6B5D] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#3D5A4E] hover:shadow-md"
          >
            <span>Mulai Asesmen (3 Menit)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {hasHistory && (
            <button
              onClick={onGoDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-[#DCD7CC] bg-[#E6E3DA] px-5 py-3.5 text-sm font-medium text-[#1F2421] transition hover:bg-[#DCD7CC]"
            >
              <span>Buka Dashboard</span>
            </button>
          )}
        </div>

        <div className="mt-12 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-[#DCD7CC] pt-8 text-center text-xs text-[#636A65]">
          <div>
            <div className="font-semibold text-[#1F2421]">12 Butir Soal</div>
            <div className="mt-0.5">Ringkas & tervalidasi ilmiah</div>
          </div>
          <div>
            <div className="font-semibold text-[#1F2421]">4 Pilar HERO</div>
            <div className="mt-0.5">Hope, Efficacy, Resilience, Optimism</div>
          </div>
          <div>
            <div className="font-semibold text-[#1F2421]">Hasil Instan</div>
            <div className="mt-0.5">Analisis skor & modul mikro</div>
          </div>
        </div>
      </section>

      {/* 4 HERO Dimensions Deep Dive Grid */}
      <section className="mt-20 border-t border-[#DCD7CC] pt-14">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-[#1F2421] sm:text-2xl">
            Mengapa Modal Mental Kerja Menentukan Daya Tahan Anda?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#636A65]">
            Penelitian menunjukkan kombinasi keempat pilar menghasilkan sinergi performa yang lebih kokoh dibanding hanya berfokus pada satu keahlian teknis.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIMENSIONS.map((dim) => (
            <div
              key={dim.key}
              className="flex flex-col justify-between rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA]/80 p-5 shadow-xs transition-all hover:bg-[#E6E3DA]"
            >
              <div>
                <span className="inline-block rounded-md border border-[#DCD7CC] bg-[#F6F5F1] px-2 py-0.5 text-[11px] font-semibold text-[#4A6B5D]">
                  {dim.clinical}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[#1F2421]">{dim.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#636A65]">{dim.shortDesc}</p>
              </div>

              <div className="mt-5 border-t border-[#DCD7CC] pt-3 text-[11px] font-medium text-[#4A6B5D]">
                Latihan: {dim.actionTitle}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
