'use client';

import { useState } from 'react';
import QualificationQuiz from '@/components/QualificationQuiz';
import BookingEmbed from '@/components/BookingEmbed';
import { Phone, CheckCircle } from 'lucide-react';

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const scrollToBooking = () => {
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-3xl font-bold">
            <span className="text-teal-600">575</span><span className="text-gray-900">Law</span>
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-600 hover:text-teal-600 transition">Services</a>
            <a href="#quiz" className="text-gray-600 hover:text-teal-600 transition">Do I Qualify?</a>
            <a href="tel:+15755551234" className="flex items-center text-teal-600 font-semibold">
              <Phone size={18} className="mr-2" />
              (575) 555-1234
            </a>
            <button onClick={scrollToBooking} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
              Free Consultation
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-24 bg-gradient-to-br from-teal-800 via-teal-600 to-teal-700 text-white min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-200 font-semibold mb-4 uppercase tracking-wider">New Mexico Debt Relief Attorney</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
                Crushing Debt?<br />
                <span className="text-amber-400">We&apos;ll Fight For Your Fresh Start.</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                As your New Mexico debt relief attorney, I&apos;ll find the best solution for YOUR situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                  See Your Options
                </button>
                <button onClick={scrollToBooking} className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-teal-600 transition">
                  Free Consultation
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Debt Assessment</h3>
                <div className="space-y-4">
                  {['Credit card debt overwhelming you?', 'Medical bills piling up?', 'Creditors calling?', 'Facing wage garnishment?'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center">
                        <CheckCircle size={20} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quiz" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Which Solution is Right for You?</h2>
            <p className="text-xl text-gray-600">Answer a few questions to see your options.</p>
          </div>
          <QualificationQuiz onComplete={() => { setQuizCompleted(true); scrollToBooking(); }} />
        </div>
      </section>

      {(showBooking || quizCompleted) && (
        <section id="booking-section" className="py-20 bg-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">Ready to Explore Your Options?</h2>
            <p className="text-xl text-teal-200 mb-8">Schedule a free, confidential consultation.</p>
            <BookingEmbed />
          </div>
        </section>
      )}

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-500 text-sm mb-4"><strong>We are a debt relief agency.</strong> We help people file for relief under the Bankruptcy Code.</p>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} 575 Law. Licensed in New Mexico.</p>
        </div>
      </footer>
    </main>
  );
}
