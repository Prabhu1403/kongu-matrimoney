"use client";

import React, { useState } from "react";
import { apiFetch } from "@/lib/api";
import AuthNavbar from "@/components/AuthNavbar";
import Footer from "@/components/footer/Footer";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  RefreshCw,
  BookOpen,
  Star,
  MapPin,
  Flame,
} from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Kongu Nadu is traditionally associated with which part of Tamil Nadu?",
    options: ["Southern Tamil Nadu", "Western Tamil Nadu", "Eastern Tamil Nadu", "Northern Tamil Nadu"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which famous hill temple is located in Coimbatore and is an important spiritual landmark of the Kongu region?",
    options: ["Marudamalai Murugan Temple", "Meenakshi Amman Temple", "Rameswaram Temple", "Brihadeeswarar Temple"],
    answer: 0,
  },
  {
    id: 3,
    question: "Which festival is traditionally celebrated to thank nature and cattle for their role in agriculture?",
    options: ["Deepavali", "Pongal", "Navaratri", "Tamil New Year"],
    answer: 1,
  },
  {
    id: 4,
    question: "Which traditional Kongu dish is commonly prepared using rice and lentils and is associated with the region's food culture?",
    options: ["Arisi Paruppu Sadam", "Idiyappam", "Kuzhi Paniyaram", "Pani Puri"],
    answer: 0,
  },
  {
    id: 5,
    question: "What is the traditional name commonly associated with the Kongu region's agricultural communities?",
    options: ["Kongu Vellalar", "Chettiar", "Nadar", "Maravar"],
    answer: 0,
  },
  {
    id: 6,
    question: "Which river is one of the major rivers flowing through the Kongu region?",
    options: ["Narmada", "Kaveri", "Godavari", "Yamuna"],
    answer: 1,
  },
  {
    id: 7,
    question: "Which city is often considered an important commercial and industrial centre of Kongu Nadu?",
    options: ["Coimbatore", "Madurai", "Tirunelveli", "Nagapattinam"],
    answer: 0,
  },
  {
    id: 8,
    question: "Which festival is especially known for lighting lamps and is celebrated across Tamil Nadu, including the Kongu region?",
    options: ["Karthigai Deepam", "Aadi Perukku", "Thai Poosam", "Chithirai Thiruvizha"],
    answer: 0,
  },
  {
    id: 9,
    question: "Which traditional agricultural activity is strongly connected with Kongu Nadu's rural heritage?",
    options: ["Paddy and crop cultivation", "Deep-sea fishing", "Salt production", "Ship building"],
    answer: 0,
  },
  {
    id: 10,
    question: "Which language is predominantly spoken by the people of Kongu Nadu?",
    options: ["Malayalam", "Kannada", "Tamil", "Telugu"],
    answer: 2,
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

function getScoreBadge(score: number, total: number) {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: "Perfect Score! 🏆", color: "#16a34a", bg: "#dcfce7" };
  if (pct >= 80) return { label: "Excellent!", color: "#0284c7", bg: "#e0f2fe" };
  if (pct >= 60) return { label: "Good Job!", color: "#d97706", bg: "#fef3c7" };
  return { label: "Keep Learning!", color: "#dc2626", bg: "#fee2e2" };
}

export default function QuizzPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [animating, setAnimating] = useState(false);

  const currentQ = QUESTIONS[currentIndex];
  const score = answers.filter((ans, i) => ans === QUESTIONS[i].answer).length;
  const progressPct = ((currentIndex + (revealed ? 1 : 0)) / QUESTIONS.length) * 100;

  function handleOptionSelect(idx: number) {
    if (revealed) return;
    setSelectedOption(idx);
  }

  function handleReveal() {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[currentIndex] = selectedOption;
    setAnswers(updated);
    setRevealed(true);
  }

  function handleNext() {
    setAnimating(true);
    setTimeout(() => {
      if (currentIndex + 1 >= QUESTIONS.length) {
        setFinished(true);
      } else {
        setCurrentIndex((p) => p + 1);
        setSelectedOption(null);
        setRevealed(false);
      }
      setAnimating(false);
    }, 300);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setRevealed(false);
    setFinished(false);
    setSubmitResult(null);
  }

  async function handleSubmitScore() {
    setSubmitting(true);
    try {
      const payload = {
        score,
        total: QUESTIONS.length,
        percentage: Math.round((score / QUESTIONS.length) * 100),
      };
      await apiFetch("/quiz/submit", { method: "POST", body: JSON.stringify(payload) });
      setSubmitResult({ success: true, message: "Your score has been submitted successfully!" });
    } catch (err: any) {
      setSubmitResult({ success: false, message: err.message || "Failed to submit score. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function getOptionState(idx: number): "idle" | "selected" | "correct" | "wrong" {
    if (!revealed) return selectedOption === idx ? "selected" : "idle";
    if (idx === currentQ.answer) return "correct";
    if (idx === selectedOption && selectedOption !== currentQ.answer) return "wrong";
    return "idle";
  }

  const badge = getScoreBadge(score, QUESTIONS.length);

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f7faf5] font-sans">
        <AuthNavbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl">
            <div className="bg-white rounded-[32px] shadow-2xl shadow-emerald-900/10 overflow-hidden">
              <div
                className="relative flex flex-col items-center justify-center py-12 px-6"
                style={{ background: "linear-gradient(135deg, #178146 0%, #0e5c30 100%)" }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4 ring-4 ring-white/30">
                  <Trophy className="w-9 h-9 text-yellow-300" />
                </div>
                <h1 className="text-white text-3xl font-extrabold tracking-tight">Quiz Complete!</h1>
                <p className="text-white/70 text-sm mt-1 font-medium">Kongu Nadu Heritage Quiz</p>
              </div>

              <div className="px-8 py-8 flex flex-col items-center">
                <div
                  className="rounded-2xl px-8 py-5 mb-6 text-center w-full"
                  style={{ background: badge.bg }}
                >
                  <p className="text-5xl font-black mb-1" style={{ color: badge.color }}>
                    {score}
                    <span className="text-2xl font-bold text-slate-400">/{QUESTIONS.length}</span>
                  </p>
                  <p className="font-bold text-sm" style={{ color: badge.color }}>{badge.label}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {Math.round((score / QUESTIONS.length) * 100)}% correct answers
                  </p>
                </div>

                <div className="w-full mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Question Breakdown
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {QUESTIONS.map((q, i) => {
                      const correct = answers[i] === q.answer;
                      return (
                        <div
                          key={q.id}
                          className="flex flex-col items-center justify-center rounded-xl py-2 gap-1"
                          style={{ background: correct ? "#dcfce7" : "#fee2e2" }}
                        >
                          <span className="text-xs font-black" style={{ color: correct ? "#16a34a" : "#dc2626" }}>
                            Q{q.id}
                          </span>
                          {correct ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {submitResult && (
                  <div
                    className={`w-full rounded-xl p-3 mb-4 text-sm font-semibold text-center ${
                      submitResult.success
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}
                  >
                    {submitResult.message}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  {!submitResult?.success && (
                    <button
                      id="btn-submit-score"
                      onClick={handleSubmitScore}
                      disabled={submitting}
                      className="flex-1 bg-[#178146] hover:bg-[#126b39] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-900/20"
                    >
                      {submitting ? (
                        <><RefreshCw className="w-4 h-4 animate-spin" />Submitting…</>
                      ) : (
                        <><Star className="w-4 h-4" />Submit Score</>
                      )}
                    </button>
                  )}
                  <button
                    id="btn-restart-quiz"
                    onClick={handleRestart}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf5] font-sans">
      <AuthNavbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#178146] flex items-center justify-center shadow-md">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#178146] uppercase tracking-widest">Kongu Nadu</p>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">Heritage Quiz</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-100">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-black text-slate-700">{score}/{currentIndex}</span>
              </div>
              <div className="bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-100">
                <span className="text-xs font-black text-slate-700">
                  {currentIndex + 1}<span className="font-medium text-slate-400">/{QUESTIONS.length}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#178146] to-[#4ade80] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div
            className="bg-white rounded-[28px] shadow-xl p-7 sm:p-10 transition-opacity duration-300"
            style={{ opacity: animating ? 0 : 1 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 rounded-full px-3 py-1 mb-5">
              <MapPin className="w-3 h-3 text-[#178146]" />
              <span className="text-[11px] font-bold text-[#178146] tracking-wide">
                Question {currentIndex + 1} of {QUESTIONS.length}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-snug mb-7">
              {currentQ.question}
            </h2>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const state = getOptionState(idx);
                const stateStyles: Record<string, string> = {
                  idle: "border-slate-200 bg-white text-slate-700 hover:border-[#178146]/40 hover:bg-emerald-50/40",
                  selected: "border-[#178146] bg-emerald-50 text-[#178146] shadow-md",
                  correct: "border-green-500 bg-green-50 text-green-700 shadow-md",
                  wrong: "border-red-400 bg-red-50 text-red-600",
                };
                const labelBg: Record<string, string> = {
                  idle: "#f1f5f9",
                  selected: "#178146",
                  correct: "#16a34a",
                  wrong: "#dc2626",
                };
                const labelColor: Record<string, string> = {
                  idle: "#64748b",
                  selected: "#fff",
                  correct: "#fff",
                  wrong: "#fff",
                };

                return (
                  <button
                    key={idx}
                    id={`option-${currentIndex}-${idx}`}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={revealed}
                    aria-pressed={selectedOption === idx}
                    className={`relative w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold border-2 transition-all duration-200 cursor-pointer select-none text-left ${stateStyles[state]}`}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors duration-200"
                      style={{ background: labelBg[state], color: labelColor[state] }}
                    >
                      {OPTION_LABELS[idx]}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {revealed && idx === currentQ.answer && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    {revealed && idx === selectedOption && idx !== currentQ.answer && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div
                className={`rounded-xl p-4 mb-6 text-sm font-semibold flex items-start gap-2 ${
                  selectedOption === currentQ.answer
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}
              >
                {selectedOption === currentQ.answer ? (
                  <><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />Correct! Well done.</>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Incorrect. The correct answer is{" "}
                      <span className="font-black">
                        {OPTION_LABELS[currentQ.answer]}) {currentQ.options[currentQ.answer]}
                      </span>
                    </span>
                  </>
                )}
              </div>
            )}

            {!revealed ? (
              <button
                id="btn-check-answer"
                onClick={handleReveal}
                disabled={selectedOption === null}
                className="w-full bg-[#178146] hover:bg-[#126b39] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-900/20"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="btn-next-question"
                onClick={handleNext}
                className="w-full bg-[#178146] hover:bg-[#126b39] text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-900/20 group"
              >
                {currentIndex + 1 === QUESTIONS.length ? (
                  <><Trophy className="w-4 h-4" />See Results</>
                ) : (
                  <>Next Question<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
            )}
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {QUESTIONS.map((_, i) => {
              const isDone = answers[i] !== null;
              const isCurrent = i === currentIndex;
              return (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isCurrent ? "24px" : "8px",
                    height: "8px",
                    background: isDone
                      ? answers[i] === QUESTIONS[i].answer ? "#178146" : "#ef4444"
                      : isCurrent ? "#178146" : "#e2e8f0",
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
