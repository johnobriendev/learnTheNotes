// src/components/CircleOfFifths.tsx
import { CircleOfFifthsProps, MajorScaleKey, KeyType } from '../types';
import { circleOfFifthsOrder, getCirclePosition } from '../utils/keyUtils';

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({
  selectedKey,
  selectedType,
  onKeySelect
}) => {
  const centerX = 150;
  const centerY = 150;
  const outerRadius = 120;
  const innerRadius = 80;

  // Minor keys in the same order as their relative majors
  const minorKeys: MajorScaleKey[] = ['A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

  const renderKeySegment = (key: MajorScaleKey, type: KeyType, index: number) => {
    const position = getCirclePosition(key, type === 'minor');
    const radius = type === 'minor' ? innerRadius : outerRadius;

    const isSelected = selectedKey === key && selectedType === type;

    // Calculate segment path for clickable area
    const startAngle = (index * 30 - 105) * Math.PI / 180;
    const endAngle = (index * 30 - 75) * Math.PI / 180;

    const innerR = type === 'minor' ? 50 : innerRadius;
    const outerR = radius;

    const x1 = centerX + innerR * Math.cos(startAngle);
    const y1 = centerY + innerR * Math.sin(startAngle);
    const x2 = centerX + outerR * Math.cos(startAngle);
    const y2 = centerY + outerR * Math.sin(startAngle);
    const x3 = centerX + outerR * Math.cos(endAngle);
    const y3 = centerY + outerR * Math.sin(endAngle);
    const x4 = centerX + innerR * Math.cos(endAngle);
    const y4 = centerY + innerR * Math.sin(endAngle);

    const pathData = [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${outerR} ${outerR} 0 0 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${innerR} ${innerR} 0 0 0 ${x1} ${y1}`,
      'Z'
    ].join(' ');

    return (
      <g key={`${key}-${type}`}>
        {/* Clickable segment */}
        <path
          d={pathData}
          fill={isSelected ? '#6366f1' : 'transparent'}
          stroke="transparent"
          className="cursor-pointer hover:fill-indigo-100 transition-colors"
          onClick={() => onKeySelect(key, type)}
        />

        {/* Key label */}
        <g onClick={() => onKeySelect(key, type)} className="cursor-pointer">
          <circle
            cx={position.x}
            cy={position.y}
            r={type === 'minor' ? 18 : 22}
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
            fontSize={type === 'minor' ? '11' : '13'}
            fontWeight={isSelected ? 'bold' : 'normal'}
            fill={isSelected ? 'white' : type === 'minor' ? '#6b7280' : '#374151'}
            className="pointer-events-none select-none"
          >
            {key}
          </text>
          {type === 'minor' && (
            <text
              x={position.x}
              y={position.y + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
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
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Circle of Fifths</h3>

      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-sm">
          {/* Outer circle (major keys background) */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius + 25}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Inner circle (minor keys background) */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius - 30}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="30"
            fill="#f9fafb"
            stroke="#d1d5db"
            strokeWidth="1"
          />

          {/* Center text */}
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="semibold"
            fill="#6b7280"
            className="select-none"
          >
            Circle
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="semibold"
            fill="#6b7280"
            className="select-none"
          >
            of Fifths
          </text>

          {/* Render major key segments */}
          {circleOfFifthsOrder.map((key, index) =>
            renderKeySegment(key, 'major', index)
          )}

          {/* Render minor key segments */}
          {minorKeys.map((key, index) =>
            renderKeySegment(key, 'minor', index)
          )}

          {/* Labels */}
          <text x="150" y="20" textAnchor="middle" fontSize="10" fill="#6b7280" className="select-none">
            Major Keys (outer)
          </text>
          <text x="150" y="285" textAnchor="middle" fontSize="10" fill="#6b7280" className="select-none">
            Minor Keys (inner)
          </text>
        </svg>
      </div>

      <div className="mt-4 text-xs text-gray-600 text-center max-w-sm">
        <p>Click on any key to see its signature and notes</p>
        <p className="mt-1">Major keys on outer ring • Minor keys on inner ring</p>
      </div>
    </div>
  );
};

export default CircleOfFifths;