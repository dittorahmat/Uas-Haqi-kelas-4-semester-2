/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Leaf, Calculator, Shield, Globe, Heart, Languages,
  Timer, Award, RotateCcw, Play, Check, ChevronLeft, ChevronRight, 
  HelpCircle, Star, AlertTriangle, History, Trophy, Target, BookMarked, 
  Home, CheckCircle, Info, Sparkles, X, Trash2, ArrowRight
} from 'lucide-react';
import { SUBJECTS, QUESTION_POOL, Question, SubjectInfo, MatchingQuestion, EssayQuestion, FillInQuestion, MultipleChoiceQuestion } from './data/questions';
import { MathVisual } from './components/MathVisual';
import { getRandomSlice, shuffleArray } from './utils/shuffle';

interface ExamAttempt {
  id: string;
  subjectId: string;
  subjectName: string;
  timestamp: string;
  score: number;
  correctCount: number;
  totalCount: number;
  mode: 'ujian' | 'latihan';
}

export default function App() {
  // Screens: 'dashboard' | 'lobby' | 'exam' | 'results'
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'lobby' | 'exam' | 'results'>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo | null>(null);
  const [examMode, setExamMode] = useState<'ujian' | 'latihan'>('ujian');
  
  // Quiz states
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: any }>({});
  const [raguRagu, setRaguRagu] = useState<{ [questionId: string]: boolean }>({});
  const [activeMatchingLeft, setActiveMatchingLeft] = useState<string | null>(null);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 minutes (1200 seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [examDurationSec, setExamDurationSec] = useState<number>(0);
  const examTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // History & Highscores loaded from LocalStorage
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);
  
  // Latihan Mode check helper (shows expl after check)
  const [checkedQuestions, setCheckedQuestions] = useState<{ [questionId: string]: boolean }>({});

  // Achievements/Badges computed dynamically
  const [badges, setBadges] = useState<Array<{ id: string; name: string; description: string; color: string; icon: any }>>([]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('haqi_school_quiz_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExamHistory(parsed);
      } catch (e) {
        console.error('Error parsing exam history', e);
      }
    }
  }, []);

  // Compute stats and badges whenever history changes
  useEffect(() => {
    const activeBadges = [];
    
    // Average score or Total attempts checks
    const totalAttempts = examHistory.length;
    const avgScore = totalAttempts > 0 
      ? Math.round(examHistory.reduce((sum, item) => sum + item.score, 0) / totalAttempts)
      : 0;

    if (totalAttempts >= 1) {
      activeBadges.push({
        id: 'pemberani',
        name: 'Pahlawan Ujian Pertama',
        description: 'Menyelesaikan ujian latihan pertama kamu!',
        color: 'emerald',
        icon: Award
      });
    }
    if (totalAttempts >= 5) {
      activeBadges.push({
        id: 'pecinta_belajar',
        name: 'Pejuang Belajar',
        description: 'Menyelesaikan 5 kali sesi pengerjaan ujian!',
        color: 'blue',
        icon: Sparkles
      });
    }
    
    // Perfect scores or specific subjects
    const perfectScores = examHistory.filter(h => h.score === 100);
    if (perfectScores.length >= 1) {
      activeBadges.push({
        id: 'sempurna',
        name: 'Nilai 100 Sempurna!',
        description: 'Berhasil memperoleh nilai 100 mutlak di lembar ujian!',
        color: 'amber',
        icon: Star
      });
    }

    // Check if mathematical expert
    const hasMathScore = examHistory.some(h => h.subjectId === 'matematika' && h.score >= 80);
    if (hasMathScore) {
      activeBadges.push({
        id: 'ahli_matematika',
        name: 'Ahli Geometri & Data',
        description: 'Mendapat nilai di atas 80 untuk mata pelajaran Matematika!',
        color: 'indigo',
        icon: Calculator
      });
    }

    // Check if language expert
    const hasLangScore = examHistory.some(h => (h.subjectId === 'bahasa_inggris' || h.subjectId === 'bahasa_arab') && h.score >= 80);
    if (hasLangScore) {
      activeBadges.push({
        id: 'ahli_bahasa',
        name: 'Penjelajah Bahasa',
        description: 'Mendapat nilai di atas 80 untuk Bahasa Inggris atau Bahasa Arab!',
        color: 'purple',
        icon: Languages
      });
    }

    setBadges(activeBadges);
  }, [examHistory]);

  // Handle active countdown timer when in exam screen and using "ujian" mode
  useEffect(() => {
    if (currentScreen === 'exam') {
      // General safety cleanup
      if (timerRef.current) clearInterval(timerRef.current);
      if (examTimerRef.current) clearInterval(examTimerRef.current);
      
      setIsTimeOut(false);
      setExamDurationSec(0);

      // Sesi timer
      if (examMode === 'ujian') {
        setTimeLeft(1200); // 20 minutes
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsTimeOut(true);
              handleAutoSubmit();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      // Duration timer (to track how long they took)
      examTimerRef.current = setInterval(() => {
        setExamDurationSec((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (examTimerRef.current) clearInterval(examTimerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (examTimerRef.current) clearInterval(examTimerRef.current);
    };
  }, [currentScreen, examMode]);

  // Handle auto-submission when timer expires
  const handleAutoSubmit = () => {
    alert('Waktu ujian kamu telah habis! Lembar jawaban kamu terkumpul otomatis.');
    finishExam();
  };

  /**
   * Start a new randomized exam for chosen subject
   */
  const startExam = (subj: SubjectInfo) => {
    // Filter out questions for selected subject
    const subjectPool = QUESTION_POOL.filter(q => q.subjectId === subj.id);
    
    // Select exactly 20 randomized questions for the exam session
    const randomizedQuestions = getRandomSlice(subjectPool, 20);
    
    setSessionQuestions(randomizedQuestions);
    setAnswers({});
    setRaguRagu({});
    setCheckedQuestions({});
    setCurrentQIndex(0);
    setActiveMatchingLeft(null);
    setCurrentScreen('exam');
  };

  /**
   * CBT Navigation
   */
  const prevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      setActiveMatchingLeft(null);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < sessionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setActiveMatchingLeft(null);
    }
  };

  const toggleRaguRagu = (qId: string) => {
    setRaguRagu(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  /**
   * Save individual answers
   */
  const handleSelectMultipleChoice = (qId: string, optIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optIndex
    }));
  };

  const handleTextChange = (qId: string, val: string) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  // Matching Question coupling logic
  const handleMatchLeftSelect = (leftText: string) => {
    setActiveMatchingLeft(leftText);
  };

  const handleMatchRightSelect = (qId: string, rightText: string) => {
    if (!activeMatchingLeft) return;
    
    setAnswers(prev => {
      const currentMatch = prev[qId] || {};
      return {
        ...prev,
        [qId]: {
          ...currentMatch,
          [activeMatchingLeft]: rightText
        }
      };
    });
    
    // Clear selection
    setActiveMatchingLeft(null);
  };

  const handleRemoveMatch = (qId: string, leftText: string) => {
    setAnswers(prev => {
      const currentMatch = { ...(prev[qId] || {}) };
      delete currentMatch[leftText];
      return {
        ...prev,
        [qId]: currentMatch
      };
    });
  };

  /**
   * Scoring Engine - Sesuai kisi-kisi dan materi evaluasi
   */
  const calculateScore = () => {
    let totalPoints = 0;
    let correctCount = 0;
    
    sessionQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      
      if (q.type === 'pilihan_ganda') {
        if (userAnswer === q.correctAnswer) {
          totalPoints += 5;
          correctCount++;
        }
      } 
      else if (q.type === 'isian') {
        const cleanedUser = (userAnswer || '').trim().toLowerCase();
        const isCorrect = q.correctAnswers.some(ans => ans.trim().toLowerCase() === cleanedUser);
        if (isCorrect) {
          totalPoints += 5;
          correctCount++;
        }
      } 
      else if (q.type === 'menjodohkan') {
        // Evaluate pairs fractionally
        const expectedPairs = q.pairs;
        const matched = userAnswer || {};
        let matchesCorrect = 0;
        
        expectedPairs.forEach(p => {
          if (matched[p.left] === p.right) {
            matchesCorrect++;
          }
        });
        
        if (matchesCorrect === expectedPairs.length) {
          totalPoints += 5;
          correctCount++;
        } else if (matchesCorrect > 0) {
          // Fractional score proportional for matching
          const fraction = matchesCorrect / expectedPairs.length;
          totalPoints += 5 * fraction;
          if (fraction >= 0.5) correctCount++; // count as partially correct for totals
        }
      } 
      else if (q.type === 'uraian') {
        // Keyword-assisted grading + default score backings
        const cleanedUser = (userAnswer || '').trim().toLowerCase();
        if (cleanedUser.length > 0) {
          const matchedKeywords = q.keywords.filter(kw => cleanedUser.includes(kw.toLowerCase()));
          if (matchedKeywords.length >= 2) {
            totalPoints += 5; // Sempurna
            correctCount++;
          } else if (matchedKeywords.length === 1) {
            totalPoints += 3; // Cukup Lengkap
            correctCount += 0.5;
          } else {
            totalPoints += 1.5; // Menjawab tapi minim kata kunci
          }
        }
      }
    });

    // Max score is 20 questions * 5 points each = 100 points
    return {
      score: Math.min(100, Math.round(totalPoints)),
      correctCount: Math.round(correctCount),
      totalCount: sessionQuestions.length
    };
  };

  const finishExam = () => {
    const evaluation = calculateScore();
    const newAttempt: ExamAttempt = {
      id: 'attempt_' + Date.now(),
      subjectId: selectedSubject!.id,
      subjectName: selectedSubject!.name,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: evaluation.score,
      correctCount: evaluation.correctCount,
      totalCount: evaluation.totalCount,
      mode: examMode
    };

    // Save history
    const updatedHistory = [newAttempt, ...examHistory];
    setExamHistory(updatedHistory);
    localStorage.setItem('haqi_school_quiz_history', JSON.stringify(updatedHistory));
    
    setCurrentScreen('results');
  };

  // Helper to format remaining timer: seconds -> MM:SS
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const clearHistory = () => {
    if (confirm('Apakah kamu yakin ingin mereset riwayat dan semua lencana prestasi belajar kamu?')) {
      localStorage.removeItem('haqi_school_quiz_history');
      setExamHistory([]);
    }
  };

  // Get subject icon element
  const getSubjectIcon = (iconName: string, color: string) => {
    const baseClass = `w-6 h-6 text-${color}-600`;
    switch (iconName) {
      case 'Leaf': return <Leaf className={baseClass} />;
      case 'Calculator': return <Calculator className={baseClass} />;
      case 'BookOpen': return <BookOpen className={baseClass} />;
      case 'Shield': return <Shield className={baseClass} />;
      case 'Globe': return <Globe className={baseClass} />;
      case 'Heart': return <Heart className={baseClass} />;
      case 'Languages': return <Languages className={baseClass} />;
      default: return <BookOpen className={baseClass} />;
    }
  };

  const getSubjectBg = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'blue': return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'amber': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'red': return 'bg-red-50 text-red-900 border-red-200';
      case 'cyan': return 'bg-cyan-50 text-cyan-900 border-cyan-200';
      case 'indigo': return 'bg-indigo-50 text-indigo-900 border-indigo-200';
      case 'purple': return 'bg-purple-50 text-purple-900 border-purple-200';
      default: return 'bg-slate-50 text-slate-900 border-slate-200';
    }
  };

  // Help calculate top score per subject
  const getTopScoreForSubject = (subjId: string) => {
    const subjAttempts = examHistory.filter(h => h.subjectId === subjId);
    if (subjAttempts.length === 0) return null;
    return Math.max(...subjAttempts.map(a => a.score));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* GLOBAL BANNER HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl text-white shadow-sm flex items-center justify-center">
              <Star className="w-6 h-6 fill-amber-300 stroke-amber-200" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Haqi School CBT Portal
                <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">Kelas 4</span>
              </h1>
              <p className="text-xs text-slate-500">Asesmen Sumatif Akhir Semester Genap 2025/2026</p>
            </div>
          </div>

          {currentScreen !== 'dashboard' && (
            <button 
              id="header_home_btn"
              onClick={() => {
                if (currentScreen === 'exam') {
                  if (confirm('Ujian kamu sedang berjalan! Meninggalkan halaman ini akan meriset/membatalkan ujian. Apakah kamu yakin ingin keluar?')) {
                    setCurrentScreen('dashboard');
                  }
                } else {
                  setCurrentScreen('dashboard');
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100 rounded-lg transition-all font-semibold"
            >
              <Home className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* ========================================================
            SCREEN 1: DASHBOARD / HOME DECK
           ======================================================== */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Elegant Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-md">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
                <BookOpen className="w-72 h-72" />
              </div>
              
              <div className="relative max-w-2xl space-y-3 z-10">
                <span className="inline-block bg-teal-500/30 backdrop-blur-md text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-400/20">
                  Semoga Allah Mudahkan ☺
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Selamat Datang Pejuang Ilmu!</h2>
                <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                  Gunakan portal latihan CBT mandiri ini untuk menguji pemahaman kamu sebelum menghadapi Asesmen Sumatif Akhir Semester Kelas 4 Haqi School.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-100">
                  <span className="flex items-center gap-1.5 bg-emerald-800/40 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    Sesuai Kisi-Kisi Soal Sekolah
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-800/40 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Variasi 100+ Soal Acak
                  </span>
                </div>
              </div>
            </div>

            {/* Overall stats and dynamic badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat card 1: Attempts */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-xs">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-800">{examHistory.length} Sesi</div>
                  <div className="text-xs text-slate-500 font-medium">Ujian / Latihan Diselesaikan</div>
                </div>
              </div>

              {/* Stat card 2: Average */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-xs">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-800">
                    {examHistory.length > 0 
                      ? `${Math.round(examHistory.reduce((sum, item) => sum + item.score, 0) / examHistory.length)}`
                      : '0'
                    }
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Rata-rata Nilai Ujian Kamu</div>
                </div>
              </div>

              {/* Stat card 3: Badge counts */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-xs">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-800">{badges.length} Penghargaan</div>
                  <div className="text-xs text-slate-500 font-medium">Lencana Belajar Tercapai</div>
                </div>
              </div>
            </div>

            {/* List of Subjects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Mata Pelajaran Ujian
                </h3>
                <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-1 rounded-md">7 Cabang Pelajaran</span>
              </div>

              <div id="subject_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUBJECTS.map((subj) => {
                  const topScore = getTopScoreForSubject(subj.id);
                  const questionsInSubject = QUESTION_POOL.filter(q => q.subjectId === subj.id).length;

                  return (
                    <div 
                      key={subj.id}
                      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Accent colors */}
                      <div className={`absolute top-0 left-0 w-2 h-full bg-${subj.color}-500 group-hover:w-3.5 transition-all duration-300`} />
                      
                      <div className="space-y-3.5 pl-2">
                        <div className="flex items-start justify-between">
                          <div className={`p-2.5 rounded-xl ${getSubjectBg(subj.color)} border flex items-center justify-center`}>
                            {getSubjectIcon(subj.icon, subj.color)}
                          </div>
                          {topScore !== null && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-600" />
                              Nilai Terbaik: {topScore}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {subj.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 md:leading-relaxed font-medium">
                            {subj.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pl-2 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400">
                          {questionsInSubject} Soal di Bank Soal
                        </span>
                        
                        <button
                          id={`start_btn_${subj.id}`}
                          onClick={() => {
                            setSelectedSubject(subj);
                            setCurrentScreen('lobby');
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-slate-900 hover:bg-emerald-600 rounded-lg font-bold transition-all shadow-xs`}
                        >
                          Mulai Sesi
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges Box & History Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              
              {/* Left Column: Badges Earned */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Pencapaian Kamu ({badges.length})
                </h3>

                {badges.length === 0 ? (
                  <div className="p-6 text-center bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                    <Award className="w-10 h-10 stroke-slate-300 mx-auto mb-2" />
                    Belum ada lencana. Selesaikan kuis ujian dengan nilai bagus untuk mendapatkannya!
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {badges.map((badge) => {
                      const IconComponent = badge.icon;
                      return (
                        <div 
                          key={badge.id}
                          className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-3.5 shadow-xs"
                        >
                          <div className={`p-2 rounded-lg bg-${badge.color}-50 text-${badge.color}-600 flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 fill-current" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">{badge.name}</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-0.5">{badge.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: History table */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-600" />
                    Riwayat Latihan & Ujian Terakhir
                  </h3>
                  {examHistory.length > 0 && (
                    <button 
                      onClick={clearHistory}
                      className="text-xs text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      Reset Riwayat
                    </button>
                  )}
                </div>

                {examHistory.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs shadow-xs">
                    <History className="w-12 h-12 stroke-slate-300 mx-auto mb-3" />
                    Kamu belum pernah melakukan ujian di portal ini. Pilih salah satu mata pelajaran di atas untuk memulai latihan pertama kamu!
                  </div>
                ) : (
                  <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                            <th className="px-4 py-3">Mata Pelajaran</th>
                            <th className="px-4 py-3 text-center">Tanggal</th>
                            <th className="px-4 py-3 text-center">Tipe Sesi</th>
                            <th className="px-4 py-3 text-center">Jawaban Benar</th>
                            <th className="px-4 py-3 text-center">Nilai</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                          {examHistory.slice(0, 5).map((att) => (
                            <tr key={att.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 font-semibold text-slate-900">{att.subjectName}</td>
                              <td className="px-4 py-3 text-center text-slate-500 font-mono">{att.timestamp}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold ${att.mode === 'ujian' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-cyan-50 text-cyan-700 border border-cyan-100'}`}>
                                  {att.mode === 'ujian' ? 'UJIAN STRIKT' : 'LATIHAN'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center text-slate-500 font-bold">{att.correctCount} / {att.totalCount}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-block font-mono font-bold text-sm ${att.score >= 80 ? 'text-emerald-600' : att.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                                  {att.score}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {examHistory.length > 5 && (
                      <div className="bg-slate-50/80 px-4 py-2 border-t border-slate-200 font-semibold text-center text-[11px] text-slate-500">
                        Menampilkan 5 riwayat pengerjaan terakhir
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: SUBJECT EXAM LOBBY (LOBI KISI-KISI)
           ======================================================== */}
        {currentScreen === 'lobby' && selectedSubject && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl ${getSubjectBg(selectedSubject.color)} border flex items-center justify-center`}>
                    {getSubjectIcon(selectedSubject.icon, selectedSubject.color)}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">{selectedSubject.name}</h2>
                    <p className="text-xs text-slate-500 font-medium">Asesmen Sumatif Akhir Genap Kelas 4</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold bg-slate-150 rounded-lg hover:bg-slate-200"
                  >
                    Batal
                  </button>
                </div>
              </div>

              {/* Study helper block */}
              <div className="mt-5 space-y-4">
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                  <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-800 space-y-1">
                    <p className="font-bold">Materi Seleksi & Konsep Pembelajaran</p>
                    <p className="leading-relaxed font-semibold">
                      Ujian ini ditarik secara acak mengambil tepat <strong>20 soal berbeda</strong> dari total bank soal kami. Setiap kali kamu memulai sesi ujian baru, susunan soal akan diacak ulang untuk menjamin tantangan belajar yang dinamis dan bervariasi!
                    </p>
                  </div>
                </div>

                {/* Ringkasan Materi Tab / Kisi-Kisi Cheat Sheet */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <div className="bg-slate-150 px-4 py-2 text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4 text-emerald-600" />
                    Bahan Pelajaran Kisi-Kisi (Pelajari Ini Dahulu!)
                  </div>
                  <div className="p-4 bg-white space-y-3 max-h-72 overflow-y-auto text-xs text-slate-600 border-t border-slate-200">
                    {selectedSubject.id === 'ipas' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Bab 8 IPAS (Menjadi Pahlawan di Lingkunganku)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Deforestasi:</strong> Kegiatan penebangan hutan secara liar yang menyebabkan kerusakan ekosistem.</li>
                          <li><strong>Dampak Pembakaran Plastik:</strong> Menghasilkan gas beracun berbahaya bagi pernapasan manusia dsb.</li>
                          <li><strong>Gas Rumah Kaca:</strong> Karbon dioksida (CO₂) memerangkap radiasi panas matahari di atmosfer.</li>
                          <li><strong>Penyebab Banjir:</strong> Saluran selokan yang tersumbat timbunan sampah anorganik.</li>
                          <li><strong>Reboisasi:</strong> Kegiatan menanam kembali pohon/tanaman di hutan gundul agar tanah lestari.</li>
                          <li><strong>Pilar 3R Pengelolaan Sampah:</strong>
                            <ul className="list-circle pl-6 space-y-0.5 mt-1">
                              <li><strong>Reduce:</strong> Mengurangi barang sekali pakai (contoh: membawa tas kain sendiri).</li>
                              <li><strong>Reuse:</strong> Memakai kembali botol plastik bekas untuk wadah tanaman.</li>
                              <li><strong>Recycle:</strong> Mendaur ulang limbah menjadi barang baru (kompos daun kering).</li>
                            </ul>
                          </li>
                          <li><strong>Sampah Organik vs Anorganik:</strong> Organik mudah terurai (sisa makanan/kulit buah). Anorganik sulit terurai (plastik/kaleng/logam).</li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'matematika' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Matematika (Bab 6 Bangun Datar & Bab 7 Penyajian Data)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Persegi:</strong> Memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90°). Keliling K = 4 × s.</li>
                          <li><strong>Trapesium:</strong> Bangun datar segi empat yang memiliki tepat satu pasang sisi berhadapan sejajar.</li>
                          <li><strong>Jajaran Genjang:</strong> Sisi berhadapan sejajar dan sama panjang, sudut seberang sama besar (bukan 90°).</li>
                          <li><strong>Segitiga:</strong> Memiliki 3 sisi. Total jumlah sudut bagian dalamnya adalah tepat 180°.</li>
                          <li><strong>Belah Ketupat:</strong> 4 sisi sama panjang dengan diagonal berpotongan tegak lurus membentuk siku-siku.</li>
                          <li><strong>Piktogram:</strong> Penyajian data statistik di mana jumlah nilai digambarkan dengan simbol/gambar dengan legenda nilai representatif (misal: 1 gambar mewakili 10 buku).</li>
                          <li><strong>Diagram Batang:</strong> Penyajian data menggunakan persegi panjang (batang) vertikal atau horizontal di mana tingginya mewakili frekuensi.</li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'bahasa_indonesia' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Bahasa Indonesia (Bab 8 Hidup Sehat)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Watak Tokoh:</strong> Karakter moral/sifat tokoh (misal: rajin, penolong, kikir, penakut, pemalas) yang disimpulkan dari ucapan atau perilaku dalam cerpen.</li>
                          <li><strong>Kalimat Fakta:</strong> Kalimat yang kebenarannya bersifat mutlak/objektif dan pasti dapat dibuktikan secara ilmiah (contoh: "Air membeku di bawah suhu 0°C").</li>
                          <li><strong>Kalimat Opini:</strong> Kalimat yang berisi pendapat pribadi, selera, dugaan dari penulis yang sifatnya subyektif (contoh: "Menurutku soto ayam jauh lebih nikmat daripada mi bakso").</li>
                          <li><strong>Latar Cerita:</strong> Terdiri atas Latar Tempat (posisi kejadian, seperti sekolah) dan Latar Waktu (kapan terjadinya, seperti sore hari).</li>
                          <li><strong>Unsur Cerita:</strong> Watak tokoh, konflik masalah, rincian penyebab masalah, serta solusi/resolusi cerita kesimpulan di akhir.</li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'pancasila' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Pendidikan Pancasila (Persatuan & Gotong Royong)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Gotong Royong:</strong> Kegiatan bekerja bersama-sama secara sukarela demi kepentingan umum.</li>
                          <li><strong>Nilai Utama:</strong> Sikap tolong-menolong, kekeluargaan, toleransi, serta merendahkan ego tanpa membeda-bedakan suku, kasta, gender, ras, maupun agama.</li>
                          <li><strong>Tujuan Mulia:</strong> Meringankan beban kerja yang berat agar lekas selesai secara teratur.</li>
                          <li><strong>Penerapan:</strong>
                            <ul className="list-circle pl-6 space-y-0.5 mt-1">
                              <li><strong>Di Sekolah:</strong> Piket kelas, kerja bakti menata perpustakaan, menghias dinding mading.</li>
                              <li><strong>Di Masyarakat:</strong> Membangun pos keamanan, membersihkan selokan tersumbat, memperbaiki jembatan rusak.</li>
                            </ul>
                          </li>
                          <li><strong>Musyawarah:</strong> Rapat penyampaian pendapat untuk mencapai mufakat. Penting dilakukan agar hak semua warga terpenuhi adil dan tercapai kesepakatan damai.</li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'bahasa_inggris' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Bahasa Inggris (Unit 8: Rainy and Sunny Days)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Weather Words (Cuaca):</strong> Sunny (Cerah), Rainy (Hujan), Cloudy (Berawan/Mendung), Windy (Berangin), Snowy (Bersalju), Foggy (Berkabut), Thunder (Petir), Rainbow (Pelangi), Warm (Hangat), Freezing (Sangat dingin/membeku), Wet (Basah), Dry (Kering).</li>
                          <li><strong>Weather Gears (Peralatan & Pakaian):</strong> Umbrella (Payung), Raincoat (Jas hujan), Boots (Sepatu bot karet), Jacket (Jaket hangat), Scarf (Syal leher), Gloves (Sarung tangan), Sunglasses (Kacamata hitam panas), Hat/Cap (Topi pelindung terik).</li>
                          <li><strong>Rainy Day Activities:</strong> Reading a book (membaca buku), Drinking hot chocolate (minum cokelat panas), Playing board games (permainan papan), Sleeping under a blanket.</li>
                          <li><strong>Sunny Day Activities:</strong> Playing football in the field, Swimming at the pool, Riding a bicycle, Having a picnic in the park.</li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'pai' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Pendidikan Agama Islam (Bab 8: Adab Islami)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Adab Salam:</strong> Mengucapkan "Assalamu'alaikum..." artinya doa keselamatan, rahmah, dan berkah dari Allah. Hukum memulai salam adalah Sunnah Muakkadah. Hukum menjawab salam adalah Wajib (Fardu Ain).</li>
                          <li><strong>Surah Al-Ma\'idah ayat 2:</strong> Memerintahkan umat Islam tolong-menolong dalam kebajikan dan ketakwaan (wa ta'awanu 'alal-birri wat-taqwa). Melarang tolong-menolong dalam perbuatan dosa dan permusuhan (wa la ta'awanu 'alal-itsmi wal-'udwan).</li>
                          <li><strong>Sifat Munafik:</strong> Bermuka dua, menampakkan iman di mulut tetapi mengkafiri di dalam hati syirik.</li>
                          <li><strong>Tiga Ciri Orang Munafik (Hadis Nabi):</strong>
                            <ol className="list-decimal pl-6 space-y-0.5 mt-1">
                              <li>Apabila berbicara, ia berdusta (bohong).</li>
                              <li>Apabila berjanji, ia mengingkari (ingkar).</li>
                              <li>Apabila dipercaya menjaga amanah, ia berkhianat (khianat).</li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                    )}

                    {selectedSubject.id === 'bahasa_arab' && (
                      <div className="space-y-2 leading-relaxed">
                        <p className="font-bold text-slate-800">📌 Rangkuman Bahasa Arab (Bab 1 Pelajaran & Bab 2 Binatang)</p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                          <li><strong>Bahasa Arab Pelajaran:</strong>
                            <ul className="list-circle pl-6 space-y-0.5">
                              <li>Bahasa Arab = دَرْسُ اللُّغَةِ الْعَرَبِيَّةِ (Darsul Al-Lughah Al-Arabiyyah)</li>
                              <li>Matematika = الرِّيَاضِيَّاتُ (Ar-Riyadiyyat)</li>
                              <li>IPA/Sains = العُلُوْمُ الطَّبِيْعِيَّةُ (Al-Ulumul Thabi'iyyah)</li>
                              <li>Fikih = الْفِقْهُ (Al-Fiqhu)</li>
                              <li>Sejarah = التَّارِيْخُ (At-Tarikh)</li>
                              <li>Bahasa Inggris = اللُّغَةُ الْإِنْجِلِيْزِيَّةُ (Al-Lughatul Injiliziyyah)</li>
                            </ul>
                          </li>
                          <li><strong>Bahasa Arab Binatang:</strong>
                            <ul className="list-circle pl-6 space-y-0.5">
                              <li>Kelinci = أَرْنَبٌ (Arnabun)</li>
                              <li>Kucing = قِطٌّ (Qitthun)</li>
                              <li>Burung = طَائِرٌ (Tha'irun)</li>
                              <li>Sapi = بَقَرَةٌ (Baqaratun)</li>
                              <li>Kambing = غَنَمٌ (Ghanamun)</li>
                              <li>Gajah = فِيْلٌ (Fiilun)</li>
                              <li>Singa = أَسَدٌ (Asadun)</li>
                              <li>Kuda = حِصَانٌ (Hishanun)</li>
                              <li>Ikan = سَمَكٌ (Samakun)</li>
                              <li>Ayam = دَجَاجَةٌ (Dajajatun)</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5 text-center">
                    <Target className="w-4 h-4 text-emerald-600" />
                    Pilih Tipe Mode Pengerjaan:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Mode Ujian strict */}
                    <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${examMode === 'ujian' ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-200' : 'bg-white border-slate-200 hover:border-slate-350 bg-white'}`}>
                      <input 
                        type="radio" 
                        name="exam_mode" 
                        value="ujian"
                        checked={examMode === 'ujian'} 
                        onChange={() => setExamMode('ujian')}
                        className="sr-only"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                          <span className="text-xs font-extrabold text-rose-800 uppercase">Mode Ujian CBT</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Batas waktu 20 menit, strict score, pembahasan & hasil hanya muncul setelah seluruh jawaban disubmit ke server guru harian.</p>
                      </div>
                    </label>

                    {/* Mode Latihan loose */}
                    <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${examMode === 'latihan' ? 'bg-cyan-50/50 border-cyan-300 ring-2 ring-cyan-200' : 'bg-white border-slate-200 hover:border-slate-350 bg-white'}`}>
                      <input 
                        type="radio" 
                        name="exam_mode" 
                        value="latihan"
                        checked={examMode === 'latihan'} 
                        onChange={() => setExamMode('latihan')}
                        className="sr-only"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-600" />
                          <span className="text-xs font-extrabold text-cyan-800 uppercase">Mode Latihan Bebas</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Tanpa ada batas waktu. Kamu bisa melihat kecocokan kunci jawaban guru & penjelasan ilmiah langsung setelah menekan cek tombol di tiap nomor.</p>
                      </div>
                    </label>

                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    id="start_exam_go_btn"
                    onClick={() => startExam(selectedSubject)}
                    className="flex items-center gap-2 px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold shadow-md transition-all hover:scale-[1.02]"
                  >
                    <Play className="w-4 h-4 fill-current text-white" />
                    Mulai Kerja Ujian Sekarang
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 3: ACTIVE EXAM CBT WINDOW
           ======================================================== */}
        {currentScreen === 'exam' && selectedSubject && sessionQuestions.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top CBT Bar */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full ${getSubjectBg(selectedSubject.color)} border`}>
                  {selectedSubject.name}
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${examMode === 'ujian' ? 'bg-rose-100 text-rose-800' : 'bg-cyan-100 text-cyan-800'}`}>
                  {examMode === 'ujian' ? 'MODE UJIAN CBT STRIKT' : 'MODE LATIHAN BEBAS'}
                </span>
              </div>

              {/* Timer indicator */}
              <div className="flex items-center gap-3">
                {examMode === 'ujian' ? (
                  <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 font-mono font-bold text-sm">
                    <Timer className="w-4 h-4 animate-spin" />
                    Sisa Waktu: {formatTime(timeLeft)}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-100 text-cyan-700 font-mono text-xs">
                    <Timer className="w-4 h-4" />
                    Latihan Terbuka (No Timer)
                  </div>
                )}

                <button
                  id="final_submit_exam_btn"
                  onClick={() => {
                    const unanswered = sessionQuestions.length - Object.keys(answers).length;
                    const confirmMsg = unanswered > 0
                      ? `Kamu masih memiliki ${unanswered} soal yang BELUM TERJAWAB. Apakah kamu yakin ingin mengakhiri ujian dan mengumpulkan lembar jawaban saat ini ke guru dan mencatat nilai?`
                      : 'Apakah kamu yakin seluruh jawaban sudah benar dan siap untuk mengakhiri ujian?';
                    
                    if (confirm(confirmMsg)) {
                      finishExam();
                    }
                  }}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 transition px-5 text-white text-xs font-extrabold rounded-lg shadow-sm"
                >
                  Selesai Ujian
                </button>
              </div>
            </div>

            {/* CBT Core Pane Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              {/* Main Question view (Left 3 columns) */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 min-h-[460px] flex flex-col justify-between shadow-xs">
                  
                  {/* Question Prompt Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                      <span className="text-xs font-bold text-slate-500">
                        NOMOR {currentQIndex + 1} DARI {sessionQuestions.length}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-650 px-2.5 py-0.5 rounded-md font-bold uppercase">
                        Tipe: {sessionQuestions[currentQIndex].type.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-6">
                      <div className="text-sm md:text-base font-extrabold text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {sessionQuestions[currentQIndex].questionText}
                      </div>

                      {/* Math / Graphic Visual injection */}
                      <MathVisual questionId={sessionQuestions[currentQIndex].id} />

                      {/* Options / Input Block based on Question Type */}
                      <div className="pt-2">
                        
                        {/* 1. TYPE: PILIHAN GANDA */}
                        {sessionQuestions[currentQIndex].type === 'pilihan_ganda' && (
                          <div id={`options_container_${sessionQuestions[currentQIndex].id}`} className="grid grid-cols-1 gap-3.5">
                            {(sessionQuestions[currentQIndex] as MultipleChoiceQuestion).options.map((option, idx) => {
                              const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D...
                              const isSelected = answers[sessionQuestions[currentQIndex].id] === idx;
                              
                              return (
                                <button
                                  id={`option_${sessionQuestions[currentQIndex].id}_${idx}`}
                                  key={idx}
                                  onClick={() => handleSelectMultipleChoice(sessionQuestions[currentQIndex].id, idx)}
                                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-left text-xs transition-all duration-200 group font-bold ${
                                    isSelected 
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-100' 
                                      : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded-lg text-[11px] font-extrabold flex items-center justify-center shrink-0 border transition-colors ${
                                    isSelected 
                                      ? 'bg-emerald-600 text-white border-emerald-500' 
                                      : 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-slate-200 group-hover:text-slate-750'
                                  }`}>
                                    {optionLetter}
                                  </span>
                                  <span className="leading-relaxed mt-0.5 font-semibold text-[13px]">{option}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 2. TYPE: ISIAN SINGKAT */}
                        {sessionQuestions[currentQIndex].type === 'isian' && (
                          <div className="max-w-md space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ketik lembar jawaban kamu:</label>
                            <input 
                              id={`input_field_${sessionQuestions[currentQIndex].id}`}
                              type="text"
                              value={answers[sessionQuestions[currentQIndex].id] || ''}
                              onChange={(e) => handleTextChange(sessionQuestions[currentQIndex].id, e.target.value)}
                              placeholder={(sessionQuestions[currentQIndex] as FillInQuestion).placeholder || "Ketik satu kata / angka jawaban..."}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-250 focus:border-emerald-500 bg-white shadow-xs"
                            />
                            <p className="text-[10px] text-slate-400 font-medium">*Jawaban isian bersih mengabaikan spasi ganda maupun huruf besar/kecil.</p>
                          </div>
                        )}

                        {/* 3. TYPE: MENJODOHKAN (Interactive Matchmaking) */}
                        {sessionQuestions[currentQIndex].type === 'menjodohkan' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                              
                              {/* Left Items Column */}
                              <div className="space-y-2">
                                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2 text-center">Definisi/Materi</span>
                                {(sessionQuestions[currentQIndex] as MatchingQuestion).pairs.map((p, idx) => {
                                  const alreadyPaired = !!(answers[sessionQuestions[currentQIndex].id]?.[p.left]);
                                  const isSelected = activeMatchingLeft === p.left;
                                  
                                  return (
                                    <button
                                      id={`match_left_${idx}`}
                                      key={idx}
                                      onClick={() => handleMatchLeftSelect(p.left)}
                                      className={`w-full text-left p-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between ${
                                        isSelected 
                                          ? 'bg-blue-600 text-white border-blue-500 ring-4 ring-blue-100 scale-[1.02]' 
                                          : alreadyPaired 
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 opacity-80'
                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50'
                                      }`}
                                    >
                                      <span className="line-clamp-2 pr-2">{p.left}</span>
                                      <span className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                                        isSelected ? 'bg-white border-blue-600' : alreadyPaired ? 'bg-emerald-500 border-emerald-400 text-white text-[9px]' : 'bg-slate-100 border-slate-300'
                                      }`}>
                                        {alreadyPaired && !isSelected ? '✓' : ''}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Right Items Column */}
                              <div className="space-y-2">
                                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2 text-center">Istilah/Jawaban</span>
                                {shuffleArray((sessionQuestions[currentQIndex] as MatchingQuestion).pairs).map((p, idx) => {
                                  // Verify if this option is already used in current couplings
                                  const currentPairs = answers[sessionQuestions[currentQIndex].id] || {};
                                  const isUsed = Object.values(currentPairs).includes(p.right);
                                  
                                  return (
                                    <button
                                      id={`match_right_${idx}`}
                                      key={idx}
                                      disabled={!activeMatchingLeft || isUsed}
                                      onClick={() => handleMatchRightSelect(sessionQuestions[currentQIndex].id, p.right)}
                                      className={`w-full text-left p-3 rounded-lg border text-xs font-semibold transition-all ${
                                        isUsed 
                                          ? 'bg-emerald-100/40 text-emerald-700 border-emerald-200 cursor-not-allowed opacity-60'
                                          : activeMatchingLeft 
                                            ? 'bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-900 border-dashed animate-pulse'
                                            : 'bg-white border-slate-200 text-slate-550 cursor-not-allowed'
                                      }`}
                                    >
                                      <span className="line-clamp-2">{p.right}</span>
                                    </button>
                                  );
                                })}
                              </div>

                            </div>

                            {/* Couplings display map */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Pasangan Terbentuk:</span>
                              {Object.keys(answers[sessionQuestions[currentQIndex].id] || {}).length === 0 ? (
                                <p className="text-[11px] text-slate-400 italic">Klik item "Definisi" di sebelah kiri, lalu pasangkan dengan mengeklik pecahan "Istilah" yang cocok di kanan.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2.5">
                                  {Object.entries(answers[sessionQuestions[currentQIndex].id] || {}).map(([lKey, rVal], index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-[11px] font-bold"
                                    >
                                      <span className="max-w-[120px] truncate">{lKey}</span>
                                      <span className="text-emerald-400">➔</span>
                                      <span className="max-w-[120px] truncate">{rVal as string}</span>
                                      <button 
                                        onClick={() => handleRemoveMatch(sessionQuestions[currentQIndex].id, lKey)}
                                        className="text-emerald-600 hover:text-rose-600 hover:bg-emerald-100 rounded-full p-0.5 ml-1 transition"
                                        title="Hapus Sambungan"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* 4. TYPE: URAIAN */}
                        {sessionQuestions[currentQIndex].type === 'uraian' && (
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ketik penjelasan / uraian jawaban kamu secara mendalam:</label>
                            <textarea 
                              id={`textarea_field_${sessionQuestions[currentQIndex].id}`}
                              value={answers[sessionQuestions[currentQIndex].id] || ''}
                              onChange={(e) => handleTextChange(sessionQuestions[currentQIndex].id, e.target.value)}
                              placeholder="Ketik ulasan/ jawaban tertulis di sini sesuai pemahaman kamu..."
                              rows={5}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-250 focus:border-emerald-500 bg-white shadow-xs leading-relaxed"
                            />
                            <p className="text-[10px] text-slate-400 font-medium leading-normal">*Jawaban uraian mandiri akan diperiksa guru berdasarkan kelengkapan kata kunci akademis dan kunci jawaban yang sesuai.</p>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Immediate Feedback in Latihan Mode */}
                  {examMode === 'latihan' && answers[sessionQuestions[currentQIndex].id] !== undefined && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      {!checkedQuestions[sessionQuestions[currentQIndex].id] ? (
                        <button
                          onClick={() => {
                            setCheckedQuestions(prev => ({ ...prev, [sessionQuestions[currentQIndex].id]: true }));
                          }}
                          className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-extrabold flex items-center gap-1 shadow-xs transition"
                        >
                          <Check className="w-4 h-4" />
                          Cek Jawaban Saya Nombor Ini
                        </button>
                      ) : (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 animate-fade-in">
                          <div className="flex items-center gap-2">
                            <Info className="w-4.5 h-4.5 text-blue-600" />
                            <span className="text-xs font-extrabold text-slate-800">Pembahasan & Konsep Guru</span>
                          </div>
                          
                          <div className="text-xs text-slate-600 leading-relaxed font-semibold">
                            {sessionQuestions[currentQIndex].type === 'pilihan_ganda' && (
                              <p>
                                Jawaban kamu: <strong className="text-indigo-700">{String.fromCharCode(65 + answers[sessionQuestions[currentQIndex].id])}</strong> | 
                                Kunci jawaban benar: <strong className="text-emerald-700">{String.fromCharCode(65 + (sessionQuestions[currentQIndex] as MultipleChoiceQuestion).correctAnswer)}</strong>
                              </p>
                            )}
                            
                            {sessionQuestions[currentQIndex].type === 'isian' && (
                              <p>
                                Kunci Jawaban yang diterima: <strong className="text-emerald-700">{(sessionQuestions[currentQIndex] as FillInQuestion).correctAnswers.join(' / ')}</strong>
                              </p>
                            )}

                            {sessionQuestions[currentQIndex].type === 'menjodohkan' && (
                              <p>
                                Kunci Pasangan Sempurna: <br />
                                <span className="inline-block mt-1 font-mono text-[11px] bg-white p-1.5 rounded border">
                                  {(sessionQuestions[currentQIndex] as MatchingQuestion).pairs.map(p => `${p.left} ➔ ${p.right}`).join(', ')}
                                </span>
                              </p>
                            )}

                            {sessionQuestions[currentQIndex].type === 'uraian' && (
                              <p>
                                Kunci Jawaban Guru: <br />
                                <span className="inline-block mt-1 bg-white p-2.5 rounded border font-semibold italic text-slate-700">
                                  {(sessionQuestions[currentQIndex] as EssayQuestion).sampleAnswer}
                                </span>
                              </p>
                            )}

                            {sessionQuestions[currentQIndex].explanation && (
                              <div className="mt-2.5 pt-2 border-t border-slate-200 text-slate-500 font-medium">
                                💡 <strong>Penjelasan Ilmiah:</strong> {sessionQuestions[currentQIndex].explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation footer buttons */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    
                    <button
                      id="prev_q_btn"
                      disabled={currentQIndex === 0}
                      onClick={prevQuestion}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border ${
                        currentQIndex === 0 
                          ? 'bg-slate-50 border-slate-100 text-slate-350 cursor-not-allowed' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Sebelumnya
                    </button>

                    {/* Bookmark checkbox */}
                    <button
                      id="action_flag_raguragu_btn"
                      onClick={() => toggleRaguRagu(sessionQuestions[currentQIndex].id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors ${
                        raguRagu[sessionQuestions[currentQIndex].id]
                          ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <BookMarked className={`w-4 h-4 ${raguRagu[sessionQuestions[currentQIndex].id] ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
                      {raguRagu[sessionQuestions[currentQIndex].id] ? 'Ragu-Ragu Aktif' : 'Tandai Ragu-Ragu'}
                    </button>

                    <button
                      id="next_q_btn"
                      disabled={currentQIndex === sessionQuestions.length - 1}
                      onClick={nextQuestion}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border ${
                        currentQIndex === sessionQuestions.length - 1
                          ? 'bg-slate-50 border-slate-100 text-slate-350 cursor-not-allowed' 
                          : 'bg-slate-900 hover:bg-emerald-600 text-white'
                      }`}
                    >
                      Selanjutnya
                      <ChevronRight className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              </div>

              {/* CBT Navigation Matrix (Right side column) */}
              <div className="lg:col-span-1 space-y-4">
                
                {/* Statistics helper */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-extrabold text-slate-700 tracking-wider uppercase border-b border-slate-100 pb-2">
                    Skema Lembar Ujian
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-650">
                      <span>Soal Dijawab</span>
                      <span className="font-bold text-slate-800">
                        {Object.keys(answers).length} / {sessionQuestions.length}
                      </span>
                    </div>
                    {/* Visual bar progress */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(Object.keys(answers).length / sessionQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-md">
                      <span className="w-2.5 h-2.5 bg-slate-200 border border-slate-300 rounded-xs" />
                      <span>Kosong</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-md">
                      <span className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-400 rounded-xs" />
                      <span>Terisi</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-md col-span-2">
                      <span className="w-2.5 h-2.5 bg-amber-500 border border-amber-400 rounded-xs animate-pulse" />
                      <span>Bintang Ragu-Ragu</span>
                    </div>
                  </div>
                </div>

                {/* Question matrix map */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-extrabold text-slate-700 tracking-wider uppercase border-b border-slate-100 pb-2">
                    Matriks CBT Siswa
                  </h4>

                  <div id="cbt_matrix_grid" className="grid grid-cols-4 gap-2">
                    {sessionQuestions.map((q, idx) => {
                      const isVisited = currentQIndex === idx;
                      const hasAnswer = answers[q.id] !== undefined && answers[q.id] !== '';
                      const isRagu = raguRagu[q.id];

                      let btnStyle = 'border-slate-250 bg-white text-slate-750 hover:bg-slate-50';
                      
                      if (hasAnswer) {
                        btnStyle = 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700';
                      }
                      if (isRagu) {
                        btnStyle = 'bg-amber-500 border-amber-400 text-white hover:bg-amber-600';
                      }
                      if (isVisited) {
                        btnStyle += ' ring-2 ring-indigo-500 ring-offset-1 font-extrabold scale-[1.05] shadow-xs';
                      }

                      return (
                        <button
                          key={q.id}
                          id={`matrix_item_${idx}`}
                          onClick={() => {
                            setCurrentQIndex(idx);
                            setActiveMatchingLeft(null);
                          }}
                          className={`h-10 text-xs font-bold rounded-lg border transition-all flex items-center justify-center ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            SCREEN 4: EXAM RESULTS BREAKDOWN (HASIL DAN PEMBAHASAN)
           ======================================================== */}
        {currentScreen === 'results' && selectedSubject && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            
            {/* Scorecard Gauge */}
            {(() => {
              const report = calculateScore();
              let congratsText = 'Ayo Terus Belajar!';
              let congratsSub = 'Jangan menyerah, pengerjaan berkala akan membuat kamu semakin cerdas dan cemerlang!';
              let stars = 1;

              if (report.score === 100) {
                congratsText = 'Luar Biasa Sempurna! ⭐⭐⭐';
                congratsSub = 'Masya Allah! Jawaban kamu seluruhnya benar. Kamu layak menjadi Pahlawan Akademis!';
                stars = 3;
              } else if (report.score >= 80) {
                congratsText = 'Sangat Baik!';
                congratsSub = 'Hebat sekali! Pemahaman materi kamu sudah matang dan sangat siap menghadapi ujian sekolah.';
                stars = 3;
              } else if (report.score >= 60) {
                congratsText = 'Cukup Baik!';
                congratsSub = 'Hasil yang lumayan bagus! Tetap ulas lembar pembahasan di bawah untuk memperbaiki nomor yang salah.';
                stars = 2;
              }

              return (
                <div className="bg-white rounded-3xl border border-slate-250 p-6 md:p-8 shadow-md relative overflow-hidden text-center space-y-6">
                  {/* Decorative background rays */}
                  <div className="absolute inset-0 bg-radial-gradient from-emerald-50/40 via-transparent to-transparent pointer-events-none" />

                  <div className="relative space-y-3 z-10 max-w-xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-1 text-amber-500">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="w-7 h-7 fill-current stroke-amber-600" />
                      ))}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                      {congratsText}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {congratsSub}
                    </p>

                    <div className="py-6 flex justify-center items-center gap-8">
                      {/* Circle Score Gauge */}
                      <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-slate-50 border-4 border-slate-100 shadow-inner">
                        <div className="text-center">
                          <div className="text-4xl font-black font-mono text-emerald-600 leading-none">
                            {report.score}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                            SKOR AKHIR
                          </div>
                        </div>
                      </div>

                      {/* Stat summary items */}
                      <div className="text-left space-y-2">
                        <div className="text-xs font-semibold text-slate-600">
                          Mata Pelajaran: <strong className="text-slate-950 block text-sm font-extrabold">{selectedSubject.name}</strong>
                        </div>
                        <div className="text-xs font-semibold text-slate-600">
                          Jawaban Benar: <strong className="text-slate-950 font-bold block">{report.correctCount} dari {report.totalCount} Soal</strong>
                        </div>
                        <div className="text-xs font-semibold text-slate-600">
                          Sesi Mode: <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 uppercase mt-0.5">{examMode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex gap-4 justify-center">
                      <button 
                        onClick={() => setCurrentScreen('dashboard')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                      >
                        <Home className="w-4 h-4" />
                        Kembali ke Dashboard
                      </button>
                      
                      <button
                        id="retake_exam_now_btn"
                        onClick={() => startExam(selectedSubject)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Ulangi Ujian (Soal Acak Baru!)
                      </button>
                    </div>

                  </div>
                </div>
              );
            })()}

            {/* Complete Discussion Panel (Pembahasan Soal) */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-emerald-600" />
                  Kertas Koreksi & Pembahasan Soal
                </h3>
                <p className="text-xs text-slate-500 mt-1">Ulas seluruh lembar jawaban kamu di bawah untuk belajar materi yang salah.</p>
              </div>

              <div id="answers_review_deck" className="space-y-6">
                {sessionQuestions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  let isCorrect = false;
                  
                  if (q.type === 'pilihan_ganda') {
                    isCorrect = userAnswer === q.correctAnswer;
                  } else if (q.type === 'isian') {
                    const cleaned = (userAnswer || '').trim().toLowerCase();
                    isCorrect = q.correctAnswers.some(ans => ans.trim().toLowerCase() === cleaned);
                  } else if (q.type === 'menjodohkan') {
                    const matched = userAnswer || {};
                    let corr = 0;
                    q.pairs.forEach(p => {
                      if (matched[p.left] === p.right) corr++;
                    });
                    isCorrect = corr === q.pairs.length;
                  } else if (q.type === 'uraian') {
                    const cleaned = (userAnswer || '').trim().toLowerCase();
                    const wordsFound = q.keywords.filter(kw => cleaned.includes(kw.toLowerCase()));
                    isCorrect = wordsFound.length >= 2;
                  }

                  return (
                    <div 
                      key={q.id}
                      className={`p-5 rounded-xl border bg-white shadow-xs space-y-4 transition ${
                        isCorrect ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500'
                      }`}
                    >
                      {/* Individual Header Status */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
                        <span className="font-extrabold text-slate-700">SOAL NOMOR {idx + 1}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ JAWABAN BENAR' : '✗ PERLU BELAJAR'}
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="text-xs md:text-sm text-slate-850 font-bold whitespace-pre-wrap">{q.questionText}</p>

                      {/* Math / Geometry visualization */}
                      <MathVisual questionId={q.id} />

                      {/* User answers VS Key Answers feedback */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5 text-xs text-slate-650">
                        {/* Multiple Choice specific */}
                        {q.type === 'pilihan_ganda' && (
                          <div className="space-y-1">
                            <p>
                              Jawaban Kamu: {userAnswer !== undefined ? (
                                <strong className={`font-mono text-sm ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                                  {String.fromCharCode(65 + userAnswer)}. {q.options[userAnswer]}
                                </strong>
                              ) : (
                                <strong className="text-red-600 font-mono">Belum Dijawab</strong>
                              )}
                            </p>
                            <p>
                              Kunci Jawaban Guru: <strong className="text-emerald-700 font-mono text-sm">{String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</strong>
                            </p>
                          </div>
                        )}

                        {/* Fill-in specific */}
                        {q.type === 'isian' && (
                          <div className="space-y-1">
                            <p>
                              Jawaban Kamu: {userAnswer ? (
                                <strong className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>"{userAnswer}"</strong>
                              ) : (
                                <strong className="text-red-600 font-semibold">Kosong (Belum Diisi)</strong>
                              )}
                            </p>
                            <p>
                              Rentang Kunci Jawaban Benar: <strong className="text-emerald-700">"{q.correctAnswers.join(' / ')}"</strong>
                            </p>
                          </div>
                        )}

                        {/* Matching specific */}
                        {q.type === 'menjodohkan' && (
                          <div className="space-y-2">
                            <p className="font-bold">Jawaban Pasangan Kamu:</p>
                            {Object.keys(userAnswer || {}).length === 0 ? (
                              <p className="text-red-600 font-medium">Bermasalah: Belum memasangkan pilihan sama sekali.</p>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(userAnswer || {}).map(([lKey, rVal], i) => {
                                  // Validate if this individual connection is correct
                                  const perfectPair = q.pairs.find(p => p.left === lKey);
                                  const connectingCorrect = perfectPair?.right === rVal;
                                  
                                  return (
                                    <div key={i} className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                                      connectingCorrect ? 'bg-emerald-50 text-emerald-800 border-emerald-250' : 'bg-rose-50 text-rose-800 border-rose-250'
                                    }`}>
                                      {lKey} ➔ {rVal as string} {connectingCorrect ? '✓' : '✗'}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <p className="font-bold text-slate-700 pt-1">Kunci Pasangan Pasangan Benar:</p>
                            <div className="flex flex-wrap gap-2">
                              {q.pairs.map((p, i) => (
                                <div key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-[10px] font-semibold">
                                  {p.left} ➔ {p.right}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Essay specific */}
                        {q.type === 'uraian' && (
                          <div className="space-y-2">
                            <p>
                              Esai Jawaban Kamu: <br />
                              <span className="inline-block mt-1 bg-white p-2 text-slate-800 border rounded font-semibold italic">
                                {userAnswer || <span className="text-red-500 font-semibold text-xs">Kosong (Belum menuliskan apa-apa)</span>}
                              </span>
                            </p>
                            <p>
                              Analisis Kunci Jawaban Penting Guru: <br />
                              <span className="inline-block mt-1 bg-emerald-50/20 p-2 text-emerald-950 border border-emerald-200 rounded font-semibold italic leading-relaxed">
                                {q.sampleAnswer}
                              </span>
                            </p>
                            <div className="text-[10px] text-slate-400 font-bold bg-white p-1.5 rounded border inline-block mt-1.5">
                              Poin Kata Kunci Diperiksa: {q.keywords.join(', ')}
                            </div>
                          </div>
                        )}

                        {/* Explanation text */}
                        {q.explanation && (
                          <div className="pt-2.5 mt-2 border-t border-slate-200 text-slate-500 leading-relaxed">
                            💡 <strong>Penjelasan Ilmiah:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-2">
          <p className="text-xs font-bold text-slate-350">
            © 2026 Haqi School. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-500 leading-normal">
            BUPENA 4D, Kurikulum Merdeka - SD Kelas 4 SD/MI <br />
            Dibuat secara profesional sesuai kaidah penyajian data, ilmu sosial dan ketaatan kurikulum harian sekolah.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
