// src/components/PatternGrid.tsx
import { MajorScaleKey, ScaleType, DisplayMode } from '../types';
import { getAllThreeNotesPerStringPatterns } from '../utils/patternUtils';
import ScaleDiagram from './ScaleDiagram';

interface PatternGridProps {
  selectedKey: MajorScaleKey;
  scaleType: ScaleType;
  displayMode: DisplayMode;
}

const PatternGrid: React.FC<PatternGridProps> = ({
  selectedKey,
  scaleType,
  displayMode
}) => {
  const patterns = getAllThreeNotesPerStringPatterns(selectedKey, scaleType);

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
        {patterns.map(pattern => (
          <ScaleDiagram
            key={pattern.patternNumber}
            pattern={pattern}
            displayMode={displayMode}
          />
        ))}
      </div>
    </div>
  );
};

export default PatternGrid;