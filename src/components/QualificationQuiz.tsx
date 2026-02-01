'use client';

import { useState } from 'react';

interface QuizProps {
  onComplete: () => void;
}

const questions = [
  {
    id: 'household',
    question: 'How many people are in your household?',
    options: [
      { value: '1', label: 'Just me' },
      { value: '2', label: '2 people' },
      { value: '3-4', label: '3-4 people' },
      { value: '5+', label: '5 or more' },
    ]
  },
  {
    id: 'income',
    question: 'What is your approximate annual household income?',
    options: [
      { value: 'under50', label: 'Under $50,000' },
      { value: '50-75', label: '$50,000 - $75,000' },
      { value: '75-100', label: '$75,000 - $100,000' },
      { value: 'over100', label: 'Over $100,000' },
    ]
  },
  {
    id: 'debtType',
    question: 'What type of debt is causing the most stress?',
    options: [
      { value: 'creditCards', label: 'Credit cards & medical bills' },
      { value: 'mortgage', label: 'Mortgage/behind on house payments' },
      { value: 'lawsuit', label: 'Being sued by creditors' },
      { value: 'mixed', label: 'Multiple types of debt' },
    ]
  },
  {
    id: 'goal',
    question: 'What is your primary goal?',
    options: [
      { value: 'eliminate', label: 'Eliminate all my debt and start fresh' },
      { value: 'reduce', label: 'Reduce what I owe without bankruptcy' },
      { value: 'stop', label: 'Stop foreclosure or lawsuits' },
      { value: 'unsure', label: 'Not sure - I need advice' },
    ]
  }
];

type Recommendation = 'chapter7' | 'chapter13' | 'debtSettlement' | 'consultation';

export default function QualificationQuiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      const rec = calculateRecommendation(newAnswers);
      setRecommendation(rec);
      if (typeof window !== 'undefined') {
        const win = window as Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };
        win.gtag?.('event', 'quiz_complete', { event_category: 'engagement', event_label: rec });
        win.fbq?.('track', 'Lead', { content_name: 'Qualification Quiz', content_category: rec });
      }
    }
  };

  const calculateRecommendation = (ans: Record<string, string>): Recommendation => {
    if (ans.debtType === 'lawsuit') return 'consultation';
    if (ans.goal === 'reduce') return 'debtSettlement';
    if (ans.debtType === 'mortgage') return 'chapter13';
    if (ans.income === 'under50' || ans.income === '50-75') return 'chapter7';
    return 'consultation';
  };

  const recommendations = {
    chapter7: { title: 'Chapter 7 May Be Right For You', description: 'You may qualify for Chapter 7 bankruptcy to eliminate most unsecured debts.' },
    chapter13: { title: 'Chapter 13 May Help Save Your Home', description: 'Chapter 13 can stop foreclosure and give you time to catch up on payments.' },
    debtSettlement: { title: 'Debt Settlement Could Work', description: 'We may be able to negotiate with creditors to reduce what you owe.' },
    consultation: { title: "Let's Discuss Your Options", description: "Your situation is unique. Let's review your complete financial picture." },
  };

  if (recommendation) {
    const rec = recommendations[recommendation];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{rec.title}</h3>
          <p className="text-gray-600 mb-8">{rec.description}</p>
          <button onClick={onComplete} className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button key={option.value} onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[currentQuestion.id] === option.value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {currentStep > 0 && (
        <button onClick={() => setCurrentStep(currentStep - 1)} className="mt-4 text-gray-500 hover:text-gray-700 text-sm">
          ← Back
        </button>
      )}
    </div>
  );
}
