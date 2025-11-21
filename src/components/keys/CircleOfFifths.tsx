// src/components/CircleOfFifths.tsx
import { CircleOfFifthsProps, KeyName, KeyType } from '../../types';
import { circleOfFifthsOrder, getCirclePosition, getKeyDisplayName } from '../../utils/keyUtils';

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({
  selectedKey,
  selectedType,
  onKeySelect
}) => {
  const centerX = 200;
  const centerY = 200;
  const outerRadius = 165;

  // Minor keys in the same order as their relative majors
  const minorKeys: KeyName[] = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D'];

  const renderKeySegment = (key: KeyName, type: KeyType) => {
    const position = getCirclePosition(key, type === 'minor');
    const isSelected = (selectedKey === key ||
                       (selectedKey === 'Gb' && key === 'F#' && type === 'major') ||
                       (selectedKey === 'F#' && key === 'Gb' && type === 'major') ||
                       (selectedKey === 'Eb' && key === 'D#' && type === 'minor') ||
                       (selectedKey === 'D#' && key === 'Eb' && type === 'minor')) &&
                      selectedType === type;
    const displayName = getKeyDisplayName(key, type);

    return (
      <g key={`${key}-${type}`}>
        {/* Key label */}
        <g onClick={() => onKeySelect(key, type)} className="cursor-pointer">
          <circle
            cx={position.x}
            cy={position.y}
            r={type === 'minor' ? 26 : 30}
            fill={isSelected ? '#4f46e5' : type === 'minor' ? '#f3f4f6' : 'white'}
            stroke={isSelected ? '#4f46e5' : '#d1d5db'}
            strokeWidth="2"
            className="hover:fill-indigo-50 transition-colors"
          />
          <text
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={displayName.includes('/') ? (type === 'minor' ? '14' : '15') : (type === 'minor' ? '17' : '19')}
            fontWeight={isSelected ? 'bold' : 'normal'}
            fill={isSelected ? 'white' : type === 'minor' ? '#6b7280' : '#374151'}
            className="pointer-events-none select-none"
          >
            {displayName}
          </text>
          {type === 'minor' && (
            <text
              x={position.x}
              y={position.y + (displayName.includes('/') ? 15 : 12)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={isSelected ? 'white' : '#9ca3af'}
              className="pointer-events-none select-none"
            >
              min
            </text>
          )}
        </g>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center bg-white p-2 lg:p-3 rounded-lg shadow-md h-full w-full max-w-none">
      <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2 lg:mb-3 flex-shrink-0">Circle of Fifths</h3>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          className="drop-shadow-sm w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ minWidth: '280px', minHeight: '280px' }}
        >
          {/* Outer border circle around major keys */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius + 8}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Separator circle in the middle of the gap between major and minor keys */}
          <circle
            cx={centerX}
            cy={centerY}
            r={137.5}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.5"
          />

          {/* Render major key segments */}
          {circleOfFifthsOrder.map((key) =>
            renderKeySegment(key, 'major')
          )}

          {/* Render minor key segments */}
          {minorKeys.map((key) =>
            renderKeySegment(key, 'minor')
          )}

        </svg>
      </div>
    </div>
  );
};

export default CircleOfFifths;