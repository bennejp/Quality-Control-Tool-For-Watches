import { Line, Circle } from 'react-konva';

interface HourGridProps {
  size: number;
  color: string;
  opacity: number;
  rotation: number;
}

export const HourGrid: React.FC<HourGridProps> = ({ size, color, opacity, rotation }) => {
  const hours = 12;
  const lines = [];
  const circles = [];
  const strokeWidth = 2;

  for (let i = 0; i < hours; i++) {
    const angle = (i * 360 / hours + rotation) * Math.PI / 180;
    
    // Start from a small inner radius to create a clear center
    const innerRadius = Math.max(strokeWidth * 3, 10); // Scale with thickness, minimum 10px
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    
    // End at the outer radius
    const x2 = Math.cos(angle) * size;
    const y2 = Math.sin(angle) * size;

    lines.push(
      <Line
        key={`hour-line-${i}`}
        points={[x1, y1, x2, y2]}
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    );

    // Add circle markers at each hour position
    circles.push(
      <Circle
        key={`hour-circle-${i}`}
        x={x2}
        y={y2}
        radius={8}
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    );
  }

  return (
    <>
      {lines}
      {circles}
      {/* Tiny black center dot for precise alignment with watch pip */}
      <Circle
        x={0}
        y={0}
        radius={2.0}
        fill="#000000"
        opacity={1}
      />
    </>
  );
};

