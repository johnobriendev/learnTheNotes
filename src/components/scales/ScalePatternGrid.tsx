// src/components/scales/ScalePatternGrid.tsx
import React from 'react';
import ScaleDiagram from './ScaleDiagram';
import { ScalePattern } from '../../types';

interface ScalePatternGridProps {
  patterns: ScalePattern[];
  displayMode?: 'notes' | 'intervals';
}

const ScalePatternGrid: React.FC<ScalePatternGridProps> = ({
  patterns,
  displayMode = 'notes'
}) => {
  if (patterns.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patterns.map((pattern, index) => (
        <ScaleDiagram
          key={index}
          pattern={pattern}
          displayMode={displayMode}
        />
      ))}
    </div>
  );
};

export default ScalePatternGrid;
