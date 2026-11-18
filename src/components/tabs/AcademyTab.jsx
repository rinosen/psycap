import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { COURSES, DIMENSIONS } from '../../data/pcq12Data';

export default function AcademyTab({ completedCourses, onCompleteCourse }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA] p-6 shadow-xs">
        <h2 className="text-xl font-bold tracking-tight text-[#1F2421]">Akademi & Kursus Mikro</h2>
        <p className="mt-1 text-xs text-[#636A65]">
          Materi mikro 5–8 menit yang dirancang khusus untuk memperkuat masing-masing pilar HERO Anda secara terukur.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {COURSES.map((course) => {
          const dim = DIMENSIONS.find((d) => d.key === course.dimension);
          const done = completedCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className="flex flex-col justify-between rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA]/80 p-5 shadow-xs transition hover:bg-[#E6E3DA]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="rounded-md border border-[#DCD7CC] bg-[#F6F5F1] px-2.5 py-0.5 font-semibold text-[#4A6B5D]">
                    {dim.clinical}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#636A65]">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#1F2421]">{course.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#636A65]">{course.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#DCD7CC] pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A6B5D]">
                  <Sparkles className="h-3.5 w-3.5" />
                  +{course.points} Pts
                </span>
                {done ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD7CC] bg-[#F6F5F1] px-3 py-1 text-xs font-semibold text-[#4A6B5D]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Selesai
                  </span>
                ) : (
                  <button
                    onClick={() => onCompleteCourse(course)}
                    className="rounded-xl bg-[#4A6B5D] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#3D5A4E]"
                  >
                    Tandai Selesai
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
