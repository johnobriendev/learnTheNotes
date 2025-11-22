// src/components/LessonLayout.tsx
import { useState, ReactNode } from 'react';

interface LessonLayoutProps {
  title: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  diagram: ReactNode;
  textContent: ReactNode;
  videoUrl?: string;
  videoTitle?: string;
}

const LessonLayout = ({
  title,
  difficulty,
  diagram,
  textContent,
  videoUrl,
  videoTitle
}: LessonLayoutProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className=" text-xl md:text-4xl font-bold text-gray-900">{title}</h1>
          {difficulty && (
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area - Desktop: diagram left, content right. Mobile: content first, diagram second */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Content Section (Text or Video) - Shows first on mobile */}
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Toggle buttons if video is available */}
            {videoUrl && (
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                    !showVideo
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                    showVideo
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Video
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {!showVideo ? (
                <div className="prose prose-lg max-w-none">
                  {textContent}
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={videoUrl}
                    title={videoTitle || title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diagram Section - Shows second on mobile */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            {diagram}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonLayout;
