'use client';

import { useState } from 'react';
import data from '../contradictions.json';
import Link from 'next/link';

export default function TwoTruths() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResolution, setShowResolution] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredContradictions = selectedCategory
    ? data.contradictions.filter(c => c.categoryId === selectedCategory)
    : data.contradictions;

  const current = filteredContradictions[currentIndex];

  const nextContradiction = () => {
    setShowResolution(false);
    setCurrentIndex((prev) => (prev + 1) % filteredContradictions.length);
  };

  if (!current) {
    return <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
      <div className="text-gray-900">No contradictions found for this category.</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b-2 border-[#FF6B35] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEtN0NPUcDLrA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1668720550515?e=2147483647&v=beta&t=oC9mjouEijfAiMcf7JQJfGTMKlXJXzgQkUHOHa5hKFE"
                alt="Lenny Rachitsky"
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Two Truths from Lenny's Podcast
                </h1>
                <p className="text-xs md:text-sm text-gray-600">Product wisdom isn't black and white</p>
              </div>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A2B] transition-all shadow-sm hover:shadow-md"
            >
              Wisdom Wall
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => { setSelectedCategory(null); setCurrentIndex(0); setShowResolution(false); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-[#FF6B35] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({data.contradictions.length})
          </button>
          {data.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); setShowResolution(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? cat.color : undefined
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Topic Header */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3"
            style={{ backgroundColor: current.categoryColor + '20', color: current.categoryColor }}
          >
            {current.category}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            {current.topic}
          </h2>
          <p className="text-gray-600">
            {currentIndex + 1} of {filteredContradictions.length}
          </p>
        </div>

        {/* Contradiction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Card 1 */}
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-l-4 hover:shadow-xl transition-shadow"
            style={{ borderColor: current.categoryColor }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h3
                  className="font-bold text-lg md:text-xl mb-2"
                  style={{ color: current.categoryColor }}
                >
                  {current.insight1.guest}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{current.insight1.context}</p>
              </div>
            </div>
            <blockquote className="text-gray-800 text-base md:text-lg leading-relaxed">
              "{current.insight1.quote}"
            </blockquote>
          </div>

          {/* VS Divider */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{ backgroundColor: current.categoryColor }}
            >
              VS
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-l-4 hover:shadow-xl transition-shadow"
            style={{ borderColor: current.categoryColor }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h3
                  className="font-bold text-lg md:text-xl mb-2"
                  style={{ color: current.categoryColor }}
                >
                  {current.insight2.guest}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{current.insight2.context}</p>
              </div>
            </div>
            <blockquote className="text-gray-800 text-base md:text-lg leading-relaxed">
              "{current.insight2.quote}"
            </blockquote>
          </div>
        </div>

        {/* Resolution Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowResolution(!showResolution)}
            className="w-full px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#FF6B35] rounded-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                  {current.resolution.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click to reveal the nuanced truth
                </p>
              </div>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform ${showResolution ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {showResolution && (
            <div
              className="mt-4 p-6 md:p-8 bg-white rounded-xl border-2 shadow-sm animate-fadeIn"
              style={{ borderColor: current.categoryColor }}
            >
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                  {current.resolution.explanation}
                </p>
                <div
                  className="px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: current.categoryColor + '10', color: current.categoryColor }}
                >
                  <strong>Key Factor:</strong> {current.resolution.keyFactor}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={nextContradiction}
            className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all shadow-md hover:shadow-lg"
          >
            Next Contradiction →
          </button>
        </div>
      </div>
    </div>
  );
}
