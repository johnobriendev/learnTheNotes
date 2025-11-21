// src/components/PatternGrid.tsx
import { MajorScaleKey, ScaleType, DisplayMode, PatternSystemType } from '../../types';
import { getAllThreeNotesPerStringPatterns, getAllCAGEDPatterns } from '../../utils/patternUtils';
import ScaleDiagram from './ScaleDiagram';

interface PatternGridProps {
  selectedKey: MajorScaleKey;
  scaleType: ScaleType;
  displayMode: DisplayMode;
  patternSystem: PatternSystemType;
}

const PatternGrid: React.FC<PatternGridProps> = ({
  selectedKey,
  scaleType,
  displayMode,
  patternSystem
}) => {
  const patterns = patternSystem === '3nps'
    ? getAllThreeNotesPerStringPatterns(selectedKey, scaleType)
    : getAllCAGEDPatterns(selectedKey, scaleType);

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
        {patterns.map((pattern, idx) => (
          <ScaleDiagram
            key={pattern.patternNumber || pattern.cagedPattern || idx}
            pattern={pattern}
            displayMode={displayMode}
          />
        ))}
      </div>
    </div>
  );
};

export default PatternGrid;