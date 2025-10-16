import { Line } from 'react-konva';

interface CrosshairProps {
  size: number;
  color: string;
  opacity: number;
}

export const Crosshair: React.FC<CrosshairProps> = ({ size, color, opacity }) => {
  return (
    <>
      {/* Vertical line */}
      <Line
        points={[0, -size, 0, size]}
        stroke={color}
        strokeWidth={3}
        opacity={opacity}
      />
      {/* Horizontal line */}
      <Line
        points={[-size, 0, size, 0]}
        stroke={color}
        strokeWidth={3}
        opacity={opacity}
      />
      {/* Center dot */}
      <Line
        points={[0, 0, 1, 1]}
        stroke={color}
        strokeWidth={8}
        lineCap="round"
        opacity={opacity}
      />
    </>
  );
};

