'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import data from './categorized-data.json';
import guestSummaries from './guest-summaries.json';

export default function WisdomWall() {
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [showGuestSummary, setShowGuestSummary] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowGuestSummary(false);
  }, [selectedConcept]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading Lenny's Wisdom Wall...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] relative">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b-2 border-[#FF6B35] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Lenny's Profile Picture */}
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEtN0NPUcDLrA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1668720550515?e=2147483647&v=beta&t=oC9mjouEijfAiMcf7JQJfGTMKlXJXzgQkUHOHa5hKFE"
                alt="Lenny Rachitsky"
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Lenny's Podcast - Wisdom Wall
                </h1>
              </div>
            </div>
            <Link
              href="/two-truths"
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A2B] transition-all shadow-sm hover:shadow-md"
            >
              Two Truths →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.concepts.map((concept: any) => {
            const category = data.categories.find(c => c.id === concept.category);
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className="bg-white hover:shadow-xl border-2 border-gray-200 hover:border-gray-400 rounded-xl p-6 text-left transition-all duration-200 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{category?.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-lg group-hover:text-[#FF6B35] transition-colors">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {category?.name}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic line-clamp-2">
                  "{concept.quote}"
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {concept.guests.length} guest{concept.guests.length > 1 ? 's' : ''}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedConcept && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSelectedConcept(null)}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-white shadow-2xl z-50 overflow-y-auto">
            {(() => {
              const category = data.categories.find(c => c.id === selectedConcept.category);
              return (
                <>
                  <div
                    className="sticky top-0 bg-white border-b-4 px-8 py-6 flex items-start justify-between"
                    style={{ borderColor: category?.color }}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{category?.icon}</span>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            {selectedConcept.name}
                          </h2>
                          <p className="text-sm" style={{ color: category?.color }}>
                            {category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedConcept(null)}
                      className="text-gray-400 hover:text-gray-900 transition-colors text-3xl leading-none flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="px-8 py-8 space-y-8">
                    {/* Key Quote */}
                    <div>
                      <h3
                        className="font-bold text-sm uppercase tracking-wide mb-4"
                        style={{ color: category?.color }}
                      >
                        💡 Key Insight
                      </h3>
                      <div
                        className="bg-gray-50 border-l-4 p-6 rounded-r-xl"
                        style={{ borderColor: category?.color }}
                      >
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                          "{selectedConcept.quote}"
                        </p>
                        <p className="font-semibold text-sm" style={{ color: category?.color }}>
                          — {selectedConcept.guestQuoted}
                        </p>
                      </div>
                    </div>

                    {/* Guest Conversation Summary */}
                    <div>
                      <h3
                        className="font-bold text-sm uppercase tracking-wide mb-4"
                        style={{ color: category?.color }}
                      >
                        📝 Full Episode Summary
                      </h3>
                      <button
                        onClick={() => setShowGuestSummary(!showGuestSummary)}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 hover:border-[#FF6B35] rounded-xl text-left transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                              View key insights from conversation with {selectedConcept.guestQuoted}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Click to view Steve Jobs-style analysis of the full episode
                            </p>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${showGuestSummary ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      {showGuestSummary && (
                        <div className="mt-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                            {(guestSummaries as any)[selectedConcept.guestQuoted] || 'Summary not available for this guest.'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guests */}
                    <div>
                      <h3
                        className="font-bold text-sm uppercase tracking-wide mb-4"
                        style={{ color: category?.color }}
                      >
                        🎙️ Featured Guests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedConcept.guests.map((guest: string) => (
                          <span
                            key={guest}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:text-white transition-colors cursor-default"
                            style={{
                              ['&:hover' as any]: { backgroundColor: category?.color }
                            }}
                          >
                            {guest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Related Concepts */}
                    <div>
                      <h3
                        className="font-bold text-sm uppercase tracking-wide mb-4"
                        style={{ color: category?.color }}
                      >
                        🔗 Explore Related
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {data.concepts
                          .filter(c => c.category === selectedConcept.category && c.id !== selectedConcept.id)
                          .slice(0, 4)
                          .map(concept => (
                            <button
                              key={concept.id}
                              onClick={() => setSelectedConcept(concept)}
                              className="text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all"
                              style={{
                                ['&:hover' as any]: {
                                  borderColor: category?.color,
                                  color: category?.color
                                }
                              }}
                            >
                              {concept.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}
