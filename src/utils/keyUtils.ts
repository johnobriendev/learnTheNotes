// src/utils/keyUtils.ts
import { MajorScaleKey, KeyName, KeyInfo, KeyType } from '../types';

// Circle of fifths order (clockwise starting from C)
export const circleOfFifthsOrder: MajorScaleKey[] = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'
];

// Key signature data for all major keys
export const majorKeyData: Record<MajorScaleKey, KeyInfo> = {
  'C': {
    key: 'C',
    type: 'major',
    sharpsFlats: 0,
    signature: [],
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    relativeMinor: 'A'
  },
  'G': {
    key: 'G',
    type: 'major',
    sharpsFlats: 1,
    signature: ['F#'],
    notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    relativeMinor: 'E'
  },
  'D': {
    key: 'D',
    type: 'major',
    sharpsFlats: 2,
    signature: ['F#', 'C#'],
    notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    relativeMinor: 'B'
  },
  'A': {
    key: 'A',
    type: 'major',
    sharpsFlats: 3,
    signature: ['F#', 'C#', 'G#'],
    notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    relativeMinor: 'F#'
  },
  'E': {
    key: 'E',
    type: 'major',
    sharpsFlats: 4,
    signature: ['F#', 'C#', 'G#', 'D#'],
    notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    relativeMinor: 'C#'
  },
  'B': {
    key: 'B',
    type: 'major',
    sharpsFlats: 5,
    signature: ['F#', 'C#', 'G#', 'D#', 'A#'],
    notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    relativeMinor: 'G#'
  },
  'F#': {
    key: 'F#',
    type: 'major',
    sharpsFlats: 6,
    signature: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    relativeMinor: 'D#'
  },
  'F': {
    key: 'F',
    type: 'major',
    sharpsFlats: -1,
    signature: ['Bb'],
    notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    relativeMinor: 'D'
  },
  'Bb': {
    key: 'Bb',
    type: 'major',
    sharpsFlats: -2,
    signature: ['Bb', 'Eb'],
    notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    relativeMinor: 'G'
  },
  'Eb': {
    key: 'Eb',
    type: 'major',
    sharpsFlats: -3,
    signature: ['Bb', 'Eb', 'Ab'],
    notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    relativeMinor: 'C'
  },
  'Ab': {
    key: 'Ab',
    type: 'major',
    sharpsFlats: -4,
    signature: ['Bb', 'Eb', 'Ab', 'Db'],
    notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    relativeMinor: 'F'
  },
  'Db': {
    key: 'Db',
    type: 'major',
    sharpsFlats: -5,
    signature: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
    notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    relativeMinor: 'Bb'
  },
  'Gb': {
    key: 'Gb',
    type: 'major',
    sharpsFlats: -6,
    signature: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'],
    notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    relativeMinor: 'Eb'
  }
};

// Generate minor key data based on major keys
export const minorKeyData: Record<KeyName, KeyInfo> = {} as Record<KeyName, KeyInfo>;

// Initialize minor key data
Object.values(majorKeyData).forEach(majorKey => {
  if (majorKey.relativeMinor) {
    const minorKey = majorKey.relativeMinor;
    minorKeyData[minorKey] = {
      key: minorKey,
      type: 'minor',
      sharpsFlats: majorKey.sharpsFlats,
      signature: majorKey.signature,
      notes: generateMinorScaleNotes(minorKey, majorKey.sharpsFlats),
      relativeMajor: majorKey.key
    };
  }
});

// Generate natural minor scale notes for a given key
function generateMinorScaleNotes(key: KeyName, accidentals: number): string[] {
  const noteOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const keyIndex = noteOrder.findIndex(note => key.startsWith(note));

  let notes = [];
  for (let i = 0; i < 7; i++) {
    const noteIndex = (keyIndex + i) % 7;
    let noteName = noteOrder[noteIndex];

    // Apply accidentals based on key signature
    if (accidentals > 0) {
      // Sharp keys
      const sharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
      if (sharps.slice(0, accidentals).includes(noteName)) {
        noteName += '#';
      }
    } else if (accidentals < 0) {
      // Flat keys
      const flats = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
      if (flats.slice(0, Math.abs(accidentals)).includes(noteName)) {
        noteName += 'b';
      }
    }

    notes.push(noteName);
  }

  return notes;
}

// Get key info for any key (major or minor)
export const getKeyInfo = (key: KeyName, type: KeyType): KeyInfo | null => {
  if (type === 'major') {
    return majorKeyData[key as MajorScaleKey] || null;
  } else {
    return minorKeyData[key] || null;
  }
};

// Get all keys of a specific type
export const getKeysOfType = (type: KeyType): KeyName[] => {
  const data = type === 'major' ? majorKeyData : minorKeyData;
  return Object.keys(data) as KeyName[];
};

// Get a random key for quiz purposes
export const getRandomKey = (type?: KeyType): { key: KeyName, type: KeyType } => {
  const selectedType = type || (Math.random() > 0.5 ? 'major' : 'minor');
  const keys = getKeysOfType(selectedType);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return { key: randomKey, type: selectedType };
};

// Format key signature for display
export const formatKeySignature = (keyInfo: KeyInfo): string => {
  if (keyInfo.sharpsFlats === 0) {
    return 'No sharps or flats';
  }

  const count = Math.abs(keyInfo.sharpsFlats);
  const type = keyInfo.sharpsFlats > 0 ? 'sharp' : 'flat';
  const plural = count > 1 ? 's' : '';

  return `${count} ${type}${plural}`;
};

// Get display name for keys (showing enharmonic equivalents)
export const getKeyDisplayName = (key: KeyName, type: KeyType): string => {
  if (key === 'F#' && type === 'major') {
    return 'F#/Gb';
  }
  if (key === 'D#' && type === 'minor') {
    return 'D#/Eb';
  }
  return key;
};

// Get circle position for SVG
export const getCirclePosition = (key: KeyName, isMinor: boolean = false): { x: number, y: number, angle: number } => {
  let targetKey = key;

  // If it's a minor key, find its relative major to get the base position
  if (isMinor) {
    // Find the relative major key for this minor key
    const majorKeyEntry = Object.values(majorKeyData).find(majorKey => majorKey.relativeMinor === key);
    if (majorKeyEntry) {
      targetKey = majorKeyEntry.key;
    }
  }

  const index = circleOfFifthsOrder.indexOf(targetKey as MajorScaleKey);
  const angle = (index * 30) - 90; // 30 degrees per position, start at top
  const centerX = 200;
  const centerY = 200;

  // Use different radii for major and minor keys
  const radius = isMinor ? 110 : 160; // Inner circle for minor, outer for major
  const radian = (angle * Math.PI) / 180;
  const x = centerX + radius * Math.cos(radian);
  const y = centerY + radius * Math.sin(radian);

  return { x, y, angle };
};