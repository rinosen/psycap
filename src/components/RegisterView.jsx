import { useState } from 'react';
import { CheckCircle2, Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function RegisterView({ onRegister, assessmentSummary }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    setError('');
    onRegister({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      password,
    });
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-lg flex-col justify-center px-6 py-12">
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#4A6B5D] text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <span className="inline-block rounded-full border border-[#DCD7CC] bg-[#F6F5F1] px-3 py-1 text-xs font-semibold text-[#4A6B5D]">
            Asesmen Berhasil Diselesaikan
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#1F2421]">
            Buat Akun untuk Melihat Hasil
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[#636A65]">
            Skor 4 pilar HERO Anda telah dihitung. Daftarkan akun untuk membuka dashboard interaktif dan modul rekomendasi kerja Anda.
          </p>
        </div>

        {assessmentSummary && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] p-3.5 text-xs text-[#636A65]">
            <div className="flex items-center gap-2 font-medium text-[#1F2421]">
              <ShieldCheck className="h-4 w-4 text-[#4A6B5D]" />
              <span>Skor PCQ-12 Tersimpan</span>
            </div>
            <span className="rounded-md bg-[#E6E3DA] px-2 py-0.5 font-semibold text-[#4A6B5D]">
              {assessmentSummary.total.toFixed(2)} / 6.00
            </span>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#1F2421]">
              Nama Lengkap <span className="font-normal text-[#636A65]">(Opsional)</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#636A65]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth. Budi Pratama"
                className="w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] py-2.5 pl-10 pr-3 text-sm text-[#1F2421] outline-none transition focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#1F2421]">
              Alamat Email <span className="text-[#4A6B5D]">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#636A65]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                className="w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] py-2.5 pl-10 pr-3 text-sm text-[#1F2421] outline-none transition focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#1F2421]">
              Kata Sandi <span className="text-[#4A6B5D]">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#636A65]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] py-2.5 pl-10 pr-10 text-sm text-[#1F2421] outline-none transition focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#636A65] hover:text-[#1F2421]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A6B5D] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3D5A4E]"
          >
            <span>Daftar & Lihat Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] text-[#636A65]">
          Prototipe: data akun tersimpan secara lokal pada browser Anda.
        </p>
      </div>
    </main>
  );
}
