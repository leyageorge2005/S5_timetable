import { X, BookOpen, GraduationCap, Layers, Phone } from "lucide-react";
import { subjectEmoji } from "@/lib/timetable";

export interface SubjectDetails {
  code: string;
  name: string;
  type: string;
  teachers: string[];
}

export const SUBJECT_DETAILS: Record<string, SubjectDetails> = {
  "Microcontrollers": {
    code: "24SJPBCST504",
    name: "Microcontrollers",
    type: "Theory",
    teachers: ["Ms. Sreelakshmi K.R"],
  },
  "Digital Signal Processing": {
    code: "24SJPCCST601",
    name: "Digital Signal Processing",
    type: "Theory",
    teachers: ["Dr. Giby Jose"],
  },
  "Theory of Computation": {
    code: "24SJPCCST602",
    name: "Theory of Computation",
    type: "Theory",
    teachers: ["Ms. Ashitha Jose"],
  },
  "Database Management Systems": {
    code: "24SJPCCST603",
    name: "Database Management Systems",
    type: "Theory",
    teachers: ["Ms. Ancy Mathew"],
  },
  "SNA / Cloud Computing": {
    code: "24SJPECST621",
    name: "Social Network Analysis / Cloud Computing",
    type: "Program Elective",
    teachers: ["Ms. Shilpa Lizbeth George", "Ms. Christy Joy"],
  },
  "DSP Lab / DBMS Lab": {
    code: "24SJPCCSL607 / 608",
    name: "DSP Lab / DBMS Lab",
    type: "Practical",
    teachers: ["N/A"],
  },
  "Placement Training": {
    code: "24SJPLS6",
    name: "In-House Placement Training",
    type: "No University Exam and No Internal Exam (Theory)",
    teachers: ["Pinky Ms"],
  },
  "Library": {
    code: "24SJLIB",
    name: "Library",
    type: "Reading & Study",
    teachers: ["N/A"],
  },
  "Activity / Association": {
    code: "24SJACT",
    name: "Activity Slot",
    type: "No University Exam and No Internal Exam (Theory)",
    teachers: ["Anu V Kottath", "Sarju S"],
  },
  // Short-code aliases
  "MCI": {
    code: "24SJPBCST504",
    name: "Microcontrollers",
    type: "Theory",
    teachers: ["Ms. Sreelakshmi K.R"],
  },
  "DSP": {
    code: "24SJPCCST601",
    name: "Digital Signal Processing",
    type: "Theory",
    teachers: ["Dr. Giby Jose"],
  },
  "TOC": {
    code: "24SJPCCST602",
    name: "Theory of Computation",
    type: "Theory",
    teachers: ["Ms. Ashitha Jose"],
  },
  "DBMS": {
    code: "24SJPCCST603",
    name: "Database Management Systems",
    type: "Theory",
    teachers: ["Ms. Ancy Mathew"],
  },
  "SNA/CC": {
    code: "24SJPECST621",
    name: "Social Network Analysis / Cloud Computing",
    type: "Program Elective",
    teachers: ["Ms. Shilpa Lizbeth George", "Ms. Christy Joy"],
  },
  "PLA": {
    code: "24SJPLS6",
    name: "In-House Placement Training",
    type: "No University Exam and No Internal Exam (Theory)",
    teachers: ["Pinky Ms"],
  },
  // Legacy / fallback entries
  "Computer Networks": {
    code: "24SJPCCST501",
    name: "Computer Networks",
    type: "Theory",
    teachers: ["Mary Treesa Thomas"],
  },
  "Design and Analysis of Algorithms": {
    code: "24SJPCCST502",
    name: "Design and Analysis of Algorithms",
    type: "Theory",
    teachers: ["Renju Renjith"],
  },
  "Machine Learning": {
    code: "24SJPCCST503",
    name: "Machine Learning",
    type: "Theory",
    teachers: ["Sarju S"],
  },
  "Networks Lab": {
    code: "24SJPCCSL507",
    name: "Networks Lab",
    type: "Practical",
    teachers: ["Ashly Thomas", "Mary Treesa Thomas"],
  },
  "Machine Learning Lab": {
    code: "24SJPCCSL508",
    name: "Machine Learning Lab",
    type: "Practical",
    teachers: ["Sarju S", "Merlin Joshi"],
  },
  "Library / Mentoring": {
    code: "24SJLIBM",
    name: "Library/Mentoring",
    type: "No University Exam and No Internal Exam (Theory)",
    teachers: ["Anu V Kottath", "Sarju S"],
  },
  "Elective": {
    code: "24SJPECST521",
    name: "Software Project Management",
    type: "Program Elective",
    teachers: ["N/A"],
  },
  "MC Project": {
    code: "24SJPCCSL508",
    name: "Microcontroller Project",
    type: "Practical / Project",
    teachers: ["Anjumol Antony"],
  }
};

export const TEACHER_CONTACTS: Record<string, { phone: string; whatsapp: string }> = {
  "Ms. Sreelakshmi K.R": {
    phone: "+918281030360",
    whatsapp: "918281030360",
  },
  "Dr. Giby Jose": {
    phone: "+919446273933",
    whatsapp: "919446273933",
  },
  "Ms. Ashitha Jose": {
    phone: "+919744106685",
    whatsapp: "919744106685",
  },
  "Ms. Ancy Mathew": {
    phone: "+917909162145",
    whatsapp: "917909162145",
  },
  "Ms. Shilpa Lizbeth George": {
    phone: "+918547637271",
    whatsapp: "918547637271",
  },
  "Ms. Shilpa Elizabeth George": {
    phone: "+918547637271",
    whatsapp: "918547637271",
  },
  "Ms. Christy Joy": {
    phone: "+919188328493",
    whatsapp: "9188328493",
  },
  "Pinky Ms": {
    phone: "+918138985642",
    whatsapp: "918138985642",
  },
  "Ms. Pinky": {
    phone: "+918138985642",
    whatsapp: "918138985642",
  },
  // Name variations without title
  "Sreelakshmi K.R": {
    phone: "+918281030360",
    whatsapp: "918281030360",
  },
  "Giby Jose": {
    phone: "+919446273933",
    whatsapp: "919446273933",
  },
  "Ashitha Jose": {
    phone: "+919744106685",
    whatsapp: "919744106685",
  },
  "Ancy Mathew": {
    phone: "+917909162145",
    whatsapp: "917909162145",
  },
  "Shilpa Lizbeth George": {
    phone: "+918547637271",
    whatsapp: "918547637271",
  },
  "Shilpa Elizabeth George": {
    phone: "+918547637271",
    whatsapp: "918547637271",
  },
  "Christy Joy": {
    phone: "+919188328493",
    whatsapp: "9188328493",
  },
  "Pinky": {
    phone: "+918138985642",
    whatsapp: "918138985642",
  },
  // Legacy contacts
  "Sarju S": {
    phone: "+919447233663",
    whatsapp: "919447233663",
  },
  "Mary Treesa Thomas": {
    phone: "+918547213581",
    whatsapp: "918547213581",
  },
  "Renju Renjith": {
    phone: "+918086868751",
    whatsapp: "918086868751",
  },
  "Neena K Pius": {
    phone: "+918921630491",
    whatsapp: "918921630491",
  },
  "Amala Maria Kuruvilla": {
    phone: "+917736956782",
    whatsapp: "917736956782",
  },
  "Anu V Kottath": {
    phone: "+918281669490",
    whatsapp: "918281669490",
  },
};

interface SubjectDetailsModalProps {
  subjectName: string | null;
  itemKey?: string | null;
  onClose: () => void;
}

export function SubjectDetailsModal({ subjectName, itemKey, onClose }: SubjectDetailsModalProps) {
  if (!subjectName) return null;

  const details = { ...(SUBJECT_DETAILS[subjectName] || {
    code: "N/A",
    name: subjectName,
    type: "Theory",
    teachers: ["N/A"],
  }) };

  const emoji = subjectEmoji(subjectName);

  const isLab = subjectName === "Lab" || subjectName === "DSP Lab / DBMS Lab";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card content */}
      <div className="relative w-full max-w-md transform rounded-[32px] bg-surface p-6 shadow-2xl transition-all duration-300 border border-border/80 animate-slide-up mb-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-muted text-ink-soft hover:text-ink transition active:scale-[0.9]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Emoji Circle */}
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-lilac-soft text-4xl shadow-inner mb-4">
          {emoji}
        </div>

        <h3 className="text-center font-display text-xl font-extrabold text-ink px-4 leading-tight">
          {isLab ? "DSP Lab / DBMS Lab" : details.name}
        </h3>

        {isLab ? (
          <div className="mt-6 space-y-4">
            <p className="text-center text-xs text-ink-soft px-4">
              Class is split into two batches running in parallel sessions:
            </p>

            {/* Batch A (DSP Lab) */}
            <div className="rounded-2xl border border-border/60 bg-coral/5 p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="rounded-lg bg-indigo-deep px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                  Batch A
                </span>
                <h4 className="text-sm font-bold text-ink">DSP Lab</h4>
              </div>
              <div className="space-y-1.5 text-xs text-ink-soft pl-1">
                <p>
                  <span className="font-semibold text-ink-soft">Course Code:</span>{" "}
                  <code className="font-mono bg-surface px-1 py-0.5 rounded border border-border/60 text-[11px] text-ink font-semibold">
                    24SJPCCSL607
                  </code>
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[12px] font-medium text-ink">Digital Signal Processing Lab</span>
                </div>
              </div>
            </div>

            {/* Batch B (DBMS Lab) */}
            <div className="rounded-2xl border border-border/60 bg-sage/5 p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="rounded-lg bg-indigo px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                  Batch B
                </span>
                <h4 className="text-sm font-bold text-ink">DBMS Lab</h4>
              </div>
              <div className="space-y-1.5 text-xs text-ink-soft pl-1">
                <p>
                  <span className="font-semibold text-ink-soft">Course Code:</span>{" "}
                  <code className="font-mono bg-surface px-1 py-0.5 rounded border border-border/60 text-[11px] text-ink font-semibold">
                    24SJPCCSL608
                  </code>
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[12px] font-medium text-ink">Database Management Systems Lab</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3.5">
            {/* Course Code */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-surface/50 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blush text-ink">
                <BookOpen className="h-4.5 w-4.5 text-indigo-deep" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Course Code
                </p>
                <p className="font-mono text-[13px] font-bold text-ink truncate mt-0.5">
                  {details.code}
                </p>
              </div>
            </div>

            {/* Class Type */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-surface/50 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-ink">
                <Layers className="h-4.5 w-4.5 text-ink" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Class Type
                </p>
                <p className="text-[13px] font-bold text-ink truncate mt-0.5">
                  {details.type}
                </p>
              </div>
            </div>

            {/* Teacher */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-surface/50 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-butter text-ink mt-0.5">
                <GraduationCap className="h-4.5 w-4.5 text-ink" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  {details.teachers.length > 1 ? "Teachers" : "Teacher"}
                </p>
                <div className="space-y-2.5">
                  {details.teachers.map((teacherName) => {
                    const contact = TEACHER_CONTACTS[teacherName];
                    return (
                      <div key={teacherName} className="flex items-center justify-between gap-2 border-b border-border/5 last:border-b-0 pb-1.5 last:pb-0">
                        <span className="text-[13px] font-bold text-ink leading-tight">
                          {teacherName}
                        </span>
                        {contact && (
                          <div className="flex items-center gap-1 bg-muted/80 dark:bg-border/20 p-0.5 rounded-full border border-border/40 shadow-xs shrink-0">
                            <a
                              href={`https://wa.me/${contact.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-white hover:scale-105 active:scale-95 transition duration-150 shadow-xs"
                              title="Chat on WhatsApp"
                            >
                              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                            </a>
                            <a
                              href={`tel:${contact.phone}`}
                              className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-white hover:scale-105 active:scale-95 transition duration-150 shadow-xs"
                              title="Call"
                            >
                              <Phone className="h-3.5 w-3.5" strokeWidth={2.6} />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-[0_8px_24px_-8px_oklch(0.32_0.19_285_/_0.5)] active:scale-[0.98] transition"
        >
          Got it! 👍
        </button>
      </div>
    </div>
  );
}
