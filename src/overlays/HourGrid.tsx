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

  for (let i = 0; i < hours; i++) {

    
    const angle = (i * 360 / hours + rotation) * Math.PI / 180;
    
    // Start from center (0, 0 since we're inside a positioned Group)
    const x1 = 0;
    const y1 = 0;
    
    // End at the radius
    const x2 = Math.cos(angle) * size;
    const y2 = Math.sin(angle) * size;

    lines.push(
      <Line
        key={`hour-line-${i}`}
        points={[x1, y1, x2, y2]}
        stroke={color}
        strokeWidth={2}
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
        strokeWidth={2}
        opacity={opacity}
      />
    );
  }

  return (
    <>
      {lines}
      {circles}
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

