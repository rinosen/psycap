import { useState } from 'react';
import { Send, PhoneCall } from 'lucide-react';
import { DIMENSIONS } from '../../data/pcq12Data';

export default function SupportTab({ latestResult, messages, onSendMessage, onSubmitFeedback }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const lowestKey = latestResult
    ? Object.entries(latestResult.dimensions).sort((a, b) => a[1] - b[1])[0][0]
    : 'hope';
  const lowestDim = DIMENSIONS.find((d) => d.key === lowestKey) || DIMENSIONS[0];

  const starters = [
    `Skor ${lowestDim.label} saya ${latestResult ? latestResult.dimensions[lowestKey].toFixed(2) : '3.50'}. Latihan harian apa yang paling realistis?`,
    'Bagaimana cara memulihkan fokus saat beban revisi datang bertubi-tubi?',
  ];

  const handleSend = (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    onSendMessage(content);
    if (!text) setInput('');
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    onSubmitFeedback(feedback.trim());
    setFeedback('');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Chat Area */}
      <div className="flex flex-col rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] lg:col-span-2">
        <div className="border-b border-[#DCD7CC] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4A6B5D]" />
            <h3 className="text-sm font-bold text-[#1F2421]">Konsultasi Pendampingan Coach Kerja</h3>
          </div>
          <p className="mt-0.5 text-xs text-[#636A65]">Dr. Rina Kusuma (Psikolog Kerja) · Aman & Rahasia</p>
        </div>

        <div className="flex-1 space-y-3.5 p-6 min-h-[300px]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl border px-4 py-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'ml-auto border-[#4A6B5D] bg-[#4A6B5D] text-white shadow-xs'
                  : 'border-[#DCD7CC] bg-[#F6F5F1] text-[#1F2421] shadow-xs'
              }`}
            >
              <p>{m.text}</p>
              <span
                className={`mt-1 block text-[10px] ${
                  m.sender === 'user' ? 'text-white/75' : 'text-[#636A65]'
                }`}
              >
                {m.time}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#DCD7CC] p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {starters.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-lg border border-[#DCD7CC] bg-[#F6F5F1] px-2.5 py-1 text-[11px] text-[#636A65] transition hover:border-[#4A6B5D] hover:text-[#4A6B5D]"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan atau situasi kerja Anda..."
              className="flex-1 rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] px-3.5 py-2.5 text-xs text-[#1F2421] outline-none transition focus:border-[#4A6B5D]"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-[#4A6B5D] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3D5A4E]"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Kirim</span>
            </button>
          </form>
        </div>
      </div>

      {/* Support Info & Feedback */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-5 shadow-xs">
          <div className="flex items-center gap-2 text-[#4A6B5D]">
            <PhoneCall className="h-4 w-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Jadwal Sesi Mendalam</h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#636A65]">
            Ingin mendiskusikan hasil asesmen secara privat bersama psikolog kerja mitra perusahaan?
          </p>
          <button
            onClick={() => alert('Jadwal sesi konsultasi telah diajukan ke psikolog kerja.')}
            className="mt-4 w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] py-2 text-xs font-semibold text-[#1F2421] transition hover:bg-[#EDEAE2]"
          >
            Reservasi Sesi 30 Menit
          </button>
        </div>

        <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-5 shadow-xs">
          <h4 className="text-xs font-bold text-[#1F2421]">Beri Masukan Alat Ini</h4>
          <p className="mt-1 text-xs text-[#636A65]">Bantu kami meningkatkan kegunaan instrumen ini di tempat kerja Anda.</p>
          <form onSubmit={handleFeedback} className="mt-3">
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Bagikan masukan atau kendala..."
              className="w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] p-2.5 text-xs text-[#1F2421] outline-none transition focus:border-[#4A6B5D]"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#4A6B5D] py-2 text-xs font-semibold text-white transition hover:bg-[#3D5A4E]"
            >
              Kirim Masukan (+20 Pts)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
