import { Line } from 'react-konva';

interface MinuteGridProps {
  size: number;
  color: string;
  opacity: number;
  rotation: number;
}

export const MinuteGrid: React.FC<MinuteGridProps> = ({ size, color, opacity, rotation }) => {
  const minutes = 60;
  const lines = [];

  for (let i = 0; i < minutes; i++) {
    // Skip every 5th line (these are hour markers)
    if (i % 5 === 0) continue;

    const angle = (i * 360 / minutes + rotation) * Math.PI / 180;
    
    // Start closer to center for minute markers (relative to 0, 0)
    const innerRadius = size * 0.85;
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    
    const x2 = Math.cos(angle) * size;
    const y2 = Math.sin(angle) * size;

    lines.push(
      <Line
        key={`minute-line-${i}`}
        points={[x1, y1, x2, y2]}
        stroke={color}
        strokeWidth={1}
        opacity={opacity * 0.5}
      />
    );
  }

  return <>{lines}</>;
};

