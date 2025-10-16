import { Line, Circle } from 'react-konva';

interface MinuteGridProps {
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  thickness?: number;
}

export const MinuteGrid: React.FC<MinuteGridProps> = ({ size, color, opacity, rotation, thickness = 1 }) => {
  const minutes = 60;
  const lines = [];
  const circles = [];

  for (let i = 0; i < minutes; i++) {
    const angle = (i * 360 / minutes + rotation) * Math.PI / 180;
    
    // Start from a small inner radius to avoid splattering at the center
    const innerRadius = Math.max(thickness * 3, 10); // Scale with thickness, minimum 10px
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    
    // End at the outer radius
    const x2 = Math.cos(angle) * size;
    const y2 = Math.sin(angle) * size;

    // Every 5th marker (hour positions) has slightly larger circles
    const isHourMarker = i % 5 === 0;

    lines.push(
      <Line
        key={`minute-line-${i}`}
        points={[x1, y1, x2, y2]}
        stroke={color}
        strokeWidth={thickness}
        opacity={opacity}
      />
    );

    // Add circle markers at each minute position (fixed size, only stroke scales slightly)
    circles.push(
      <Circle
        key={`minute-circle-${i}`}
        x={x2}
        y={y2}
        radius={isHourMarker ? 5 : 4}
        stroke={color}
        strokeWidth={thickness}
        opacity={opacity}
      />
    );
  }

  return (
    <>
      {lines}
      {circles}
      {/* Small center dot for precise alignment with watch center */}
      <Circle
        x={0}
        y={0}
        radius={3}
        fill={color}
        opacity={opacity}
      />
    </>
  );
};

