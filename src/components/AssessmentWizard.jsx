import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { DIMENSIONS, LIKERT_SCALE, PCQ12_ITEMS } from '../data/pcq12Data';

export default function AssessmentWizard({ onComplete, onCancel }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const item = PCQ12_ITEMS[index];
  const dim = DIMENSIONS.find((d) => d.key === item.dimension);
  const progress = ((index + 1) / PCQ12_ITEMS.length) * 100;

  const selectValue = (val) => {
    const next = { ...answers, [item.id]: val };
    setAnswers(next);
    if (index < PCQ12_ITEMS.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete(next);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= '1' && e.key <= '6') {
        selectValue(Number(e.key));
      } else if (e.key === 'ArrowLeft' && index > 0) {
        setIndex(index - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-2xl flex-col justify-center px-6 py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#636A65]">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 transition hover:text-[#1F2421]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <span>Butir {index + 1} dari {PCQ12_ITEMS.length}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E6E3DA]">
          <div
            className="h-full bg-[#4A6B5D] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA]/80 p-6 shadow-sm sm:p-9">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md border border-[#DCD7CC] bg-[#F6F5F1] px-2.5 py-1 text-xs font-semibold text-[#4A6B5D]">
            {dim.label} · {dim.clinical}
          </span>
        </div>

        <h2 className="mb-8 text-xl font-medium leading-relaxed text-[#1F2421] sm:text-2xl">
          {item.text}
        </h2>

        <div className="grid gap-2.5">
          {LIKERT_SCALE.map((opt) => {
            const selected = answers[item.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => selectValue(opt.value)}
                className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-150 ${
                  selected
                    ? 'border-[#4A6B5D] bg-[#4A6B5D] font-medium text-white shadow-xs'
                    : 'border-[#DCD7CC] bg-[#F6F5F1] text-[#1F2421] hover:border-[#4A6B5D]/60 hover:bg-[#EDEAE2]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
                    selected ? 'border-white text-white' : 'border-[#DCD7CC] text-transparent group-hover:border-[#4A6B5D]'
                  }`}>
                    {selected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </span>
                  <span>{opt.label}</span>
                </div>
                <kbd
                  className={`rounded-md border px-2 py-0.5 text-xs font-mono transition ${
                    selected
                      ? 'border-white/30 bg-white/20 text-white'
                      : 'border-[#DCD7CC] bg-[#E6E3DA] text-[#636A65]'
                  }`}
                >
                  {opt.value}
                </kbd>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#DCD7CC] pt-4 text-xs text-[#636A65]">
          {index > 0 ? (
            <button
              onClick={() => setIndex(index - 1)}
              className="inline-flex items-center gap-1 font-medium transition hover:text-[#1F2421]"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Butir sebelumnya</span>
            </button>
          ) : <span />}

          <span className="text-[11px] opacity-75">Tips: Anda dapat menekan tombol angka 1-6 pada keyboard</span>
        </div>
      </div>
    </main>
  );
}
