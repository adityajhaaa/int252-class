/**
 * Home Page
 * Landing page with hero section and platform overview
 */

import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { PLATFORMS_BENEFITS, PLATFORM_FEATURES } from '../constants/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="px-4 pt-16 pb-10">
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Language Learning Platform</p>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-black">
              Master Any Language, Connect with the World.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Learn Spanish, French, German, Japanese and more with interactive lessons, real-time feedback, and personalized progress tracking.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/courses">
                <Button variant="primary" size="lg">Explore Courses</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg">Start Free</Button>
              </Link>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-black">10+ Languages</p>
                <p>from beginner to advanced</p>
              </div>
              <div>
                <p className="font-semibold text-black">Track Progress</p>
                <p>see your improvement</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900 to-black" />
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80&sat=-100"
                alt="Minimal workspace"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-300">Interactive Learning</p>
                <p className="text-2xl font-semibold">Speak, Listen, Read, Write.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">Why Learn Languages With Us</h2>
            <span className="text-sm text-gray-500">Proven methodology</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLATFORMS_BENEFITS.map((benefit) => (
              <Card key={benefit.id} className="h-full border border-gray-200/70">
                <h3 className="text-xl font-semibold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-semibold">Language Learning Features</h2>
            <span className="text-sm text-gray-300">Complete learning system</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PLATFORM_FEATURES.map((feature) => (
              <div key={feature.id} className="flex gap-4 p-6 rounded-2xl border border-gray-800 bg-white/5">
                <div className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-black text-lg font-semibold">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center">From signup to certificate</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign up', description: 'Create your profile and pick your goals.' },
              { step: '02', title: 'Browse', description: 'Find curated tracks and bite-sized lessons.' },
              { step: '03', title: 'Practice', description: 'Ship projects, quizzes, and peer reviews.' },
              { step: '04', title: 'Showcase', description: 'Earn certificates and share your work.' },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">{item.step}</p>
                <h3 className="text-xl font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 md:p-14">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff,transparent_25%),radial-gradient(circle_at_80%_0%,#ffffff,transparent_20%)]" />
            <div className="relative space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Join the cohort</p>
              <h2 className="text-3xl md:text-4xl font-semibold">Ready to learn in monochrome?</h2>
              <p className="text-gray-200 max-w-2xl">Minimal UI, maximal focus. Enroll now and keep your learning flow clean and intentional.</p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/signup">
                  <Button variant="secondary" size="lg">Get Started</Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">See Courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
