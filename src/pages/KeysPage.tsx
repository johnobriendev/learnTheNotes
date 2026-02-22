// src/pages/KeysPage.tsx
import { useState, useEffect, useCallback } from 'react';
import CircleOfFifths from '../components/keys/CircleOfFifths';
import KeyInfo from '../components/keys/KeyInfo';
import KeyQuiz from '../components/keys/KeyQuiz';
import TipsModal from '../components/shared/TipsModal';
import { KeyName, KeyType } from '../types';

const KeysPage = () => {
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<KeyName | null>('C');
  const [selectedType, setSelectedType] = useState<KeyType>('major');
  const [mode, setMode] = useState<'info' | 'quiz'>('info');

  const handleKeySelect = useCallback((key: KeyName, type: KeyType) => {
    setSelectedKey(key);
    setSelectedType(type);
  }, []);

  useEffect(() => {
    return () => {
      setShowTipsModal(false);
    };
  }, []);

  return (
    <div className="rounded-lg shadow-md">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col">
        <div className="bg-gray-50 p-4 flex items-center justify-center">
          <CircleOfFifths
            selectedKey={selectedKey}
            selectedType={selectedType}
            onKeySelect={handleKeySelect}
          />
        </div>

        <div className="bg-white border-t border-gray-200 p-4 overflow-y-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setMode('info')}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  mode === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Key Information
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  mode === 'quiz' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Quiz
              </button>
            </div>
          </div>
          {mode === 'info' ? (
            <KeyInfo selectedKey={selectedKey} selectedType={selectedType} />
          ) : (
            <KeyQuiz onShowTips={() => setShowTipsModal(true)} />
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row">
        <div className="bg-gray-50 p-4 flex-1 max-w-[60%] flex items-center justify-center">
          <CircleOfFifths
            selectedKey={selectedKey}
            selectedType={selectedType}
            onKeySelect={handleKeySelect}
          />
        </div>

        <div className="flex-1 min-w-[40%] bg-white border-l border-gray-200 p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setMode('info')}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  mode === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Key Information
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  mode === 'quiz' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Quiz
              </button>
            </div>
          </div>
          {mode === 'info' ? (
            <KeyInfo selectedKey={selectedKey} selectedType={selectedType} />
          ) : (
            <KeyQuiz onShowTips={() => setShowTipsModal(true)} />
          )}
        </div>
      </div>

      {showTipsModal && (
        <TipsModal
          isOpen={showTipsModal}
          onClose={() => setShowTipsModal(false)}
          tipType="keys"
        />
      )}
    </div>
  );
};

export default KeysPage;
