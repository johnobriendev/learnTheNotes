// src/components/KeyInfo.tsx
import { KeyInfo as KeyInfoType, MajorScaleKey, KeyType } from '../types';
import { getKeyInfo, formatKeySignature } from '../utils/keyUtils';

interface KeyInfoProps {
  selectedKey: MajorScaleKey | null;
  selectedType: KeyType;
}

const KeyInfo: React.FC<KeyInfoProps> = ({ selectedKey, selectedType }) => {
  if (!selectedKey) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="text-4xl mb-2">🎵</div>
        <p>Select a key from the Circle of Fifths to see its information</p>
      </div>
    );
  }

  const keyInfo = getKeyInfo(selectedKey, selectedType);

  if (!keyInfo) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Key information not found</p>
      </div>
    );
  }

  const renderKeySignature = () => {
    if (keyInfo.signature.length === 0) {
      return (
        <div className="text-gray-600">
          <span className="font-mono text-lg">♮</span> No accidentals
        </div>
      );
    }

    const isSharp = keyInfo.sharpsFlats > 0;
    const symbol = isSharp ? '♯' : '♭';

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {keyInfo.signature.map((note, index) => (
            <span key={index} className="font-mono text-lg">
              {note.replace('#', '♯').replace('b', '♭')}
            </span>
          ))}
        </div>
        <span className="text-gray-600 text-sm">
          ({Math.abs(keyInfo.sharpsFlats)} {isSharp ? 'sharp' : 'flat'}{Math.abs(keyInfo.sharpsFlats) !== 1 ? 's' : ''})
        </span>
      </div>
    );
  };

  const relativeKey = selectedType === 'major' ? keyInfo.relativeMinor : keyInfo.relativeMajor;
  const relativeType = selectedType === 'major' ? 'minor' : 'major';

  return (
    <div className="space-y-4">
      {/* Key Title */}
      <div className="text-center border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedKey} {selectedType === 'major' ? 'Major' : 'Minor'}
        </h3>
        <p className="text-gray-600 mt-1">{formatKeySignature(keyInfo)}</p>
      </div>

      {/* Key Signature */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Key Signature</h4>
        {renderKeySignature()}
      </div>

      {/* Notes in Key */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Notes in Key</h4>
        <div className="flex flex-wrap gap-2">
          {keyInfo.notes.map((note, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
            >
              {note.replace('#', '♯').replace('b', '♭')}
            </span>
          ))}
        </div>
      </div>

      {/* Scale Pattern */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Scale Pattern</h4>
        <div className="text-gray-600 font-mono">
          {selectedType === 'major' ? 'W-W-H-W-W-W-H' : 'W-H-W-W-H-W-W'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          W = Whole step (2 frets), H = Half step (1 fret)
        </div>
      </div>

      {/* Relative Key */}
      {relativeKey && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Relative {relativeType === 'major' ? 'Major' : 'Minor'}</h4>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {relativeKey} {relativeType === 'major' ? 'Major' : 'Minor'}
            </span>
            <span className="text-xs text-gray-500">
              (same key signature)
            </span>
          </div>
        </div>
      )}

      {/* Quick Facts */}
      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Quick Facts</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• {keyInfo.notes.length} notes in the scale</li>
          <li>• {keyInfo.sharpsFlats === 0 ? 'Natural key' : `${Math.abs(keyInfo.sharpsFlats)} accidental${Math.abs(keyInfo.sharpsFlats) !== 1 ? 's' : ''}`}</li>
          <li>• {selectedType === 'major' ? 'Bright, happy sound' : 'Darker, more emotional sound'}</li>
          {relativeKey && (
            <li>• Shares notes with {relativeKey} {relativeType}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default KeyInfo;