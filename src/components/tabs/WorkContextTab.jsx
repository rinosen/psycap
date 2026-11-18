import { useState } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import { WORK_ITEMS } from '../../data/pcq12Data';

export default function WorkContextTab({ orgDocs, onAddOrgDoc }) {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState('');
  const [note, setNote] = useState('');

  const filtered = WORK_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.body.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!unit.trim() || !note.trim()) return;
    onAddOrgDoc({ id: Date.now().toString(), unit: unit.trim(), note: note.trim() });
    setUnit('');
    setNote('');
  };

  return (
    <div className="space-y-8">
      {/* Search & Header */}
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1F2421]">Konteks Kerja: Jobdesc, SOP & KPI</h2>
            <p className="mt-1 text-xs text-[#636A65]">
              Kejelasan peran kerja terbukti secara empiris meningkatkan Harapan (Hope) dan Keyakinan Diri (Efficacy).
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#636A65]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari SOP, KPI, atau Jobdesc..."
              className="w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] py-2.5 pl-10 pr-3 text-xs text-[#1F2421] outline-none transition focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]"
            />
          </div>
        </div>
      </div>

      {/* List of Work Items */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA]/80 p-5 shadow-xs transition hover:bg-[#E6E3DA]">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#DCD7CC] bg-[#F6F5F1] px-2.5 py-0.5 text-xs font-semibold text-[#4A6B5D]">
                  {item.type}
                </span>
                <span className="text-xs font-mono text-[#636A65]">{item.code}</span>
              </div>
              <span className="text-[11px] font-medium text-[#4A6B5D]">Mendukung: {item.dimensionLink}</span>
            </div>
            <h3 className="text-sm font-bold text-[#1F2421]">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#636A65]">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Org Docs and Add Note Section */}
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#1F2421]">Kebijakan & Catatan Tim Anda</h3>
        <p className="mt-1 text-xs text-[#636A65]">Tambahkan aturan kerja atau kesepakatan tim yang mendukung kestabilan kerja harian.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {orgDocs.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] p-4 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#4A6B5D]">
                <FileText className="h-3.5 w-3.5" />
                <span>{doc.unit}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-[#636A65]">{doc.note}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 border-t border-[#DCD7CC] pt-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Nama Unit / Tim"
              className="rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] px-3.5 py-2 text-xs text-[#1F2421] outline-none transition focus:border-[#4A6B5D]"
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Catatan kesepakatan / jam fokus..."
              className="rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] px-3.5 py-2 text-xs text-[#1F2421] outline-none transition focus:border-[#4A6B5D] sm:col-span-2"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#4A6B5D] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3D5A4E]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Catatan (+40 Pts)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
