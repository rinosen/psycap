import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { DIMENSIONS, getTier } from '../../data/pcq12Data';

export default function OverviewTab({ history, onGoAcademy }) {
  const latest = history[history.length - 1];
  const prev = history.length > 1 ? history[history.length - 2] : null;
  const delta = prev ? Number((latest.total - prev.total).toFixed(2)) : null;
  const tier = getTier(latest.total);

  const radarData = DIMENSIONS.map((d) => ({
    dimension: d.clinical,
    score: latest.dimensions[d.key],
    fullMark: 6,
  }));

  const lowestDimKey = Object.entries(latest.dimensions).sort((a, b) => a[1] - b[1])[0][0];
  const lowestDim = DIMENSIONS.find((d) => d.key === lowestDimKey);

  return (
    <div className="space-y-6">
      {/* Top Summary Card */}
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4A6B5D]">
              Skor Modal Psikologis Saat Ini ({latest.label})
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-[#1F2421]">
                {latest.total.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-[#636A65]">/ 6.00</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tier.bg} ${tier.text}`}>
                {tier.label}
              </span>
            </div>
          </div>

          {delta !== null && (
            <div className="rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] px-4 py-2.5 text-xs">
              <span className="font-semibold text-[#4A6B5D]">
                {delta >= 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}
              </span>{' '}
              <span className="text-[#636A65]">sejak tes sebelumnya</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#1F2421]">Keseimbangan 4 Pilar HERO</h3>
            <p className="text-xs text-[#636A65]">Skala 1.00 (rendah) hingga 6.00 (kuat)</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#DCD7CC" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#636A65', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis domain={[0, 6]} tick={{ fill: '#636A65', fontSize: 10 }} />
                <Radar dataKey="score" stroke="#4A6B5D" strokeWidth={2} fill="#4A6B5D" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#1F2421]">Tren Evaluasi Berkala</h3>
            <p className="text-xs text-[#636A65]">Dinamika skor total modal mental kerja</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid stroke="#DCD7CC" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: '#636A65', fontSize: 12 }} />
                <YAxis domain={[1, 6]} tick={{ fill: '#636A65', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F6F5F1',
                    borderColor: '#DCD7CC',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#1F2421',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4A6B5D"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#4A6B5D', strokeWidth: 2, stroke: '#F6F5F1' }}
                  activeDot={{ r: 6, fill: '#3D5A4E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommended Action Priority */}
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#EDEAE2] p-6 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#4A6B5D]">
          Prioritas Pengembangan Diri · {lowestDim.label} ({lowestDim.clinical})
        </span>
        <h3 className="mt-1 text-base font-bold text-[#1F2421]">{lowestDim.actionTitle}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#636A65]">{lowestDim.actionDesc}</p>
        <button
          onClick={onGoAcademy}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4A6B5D] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3D5A4E]"
        >
          <span>Buka Modul di Akademi</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
