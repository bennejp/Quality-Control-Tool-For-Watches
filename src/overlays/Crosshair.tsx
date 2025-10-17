import { Line } from 'react-konva';

interface CrosshairProps {
  size: number;
  color: string;
  opacity: number;
  thickness?: number;
}

export const Crosshair: React.FC<CrosshairProps> = ({ size, color, opacity, thickness = 1 }) => {
  return (
    <>
      {/* Vertical line */}
      <Line
        points={[0, -size, 0, size]}
        stroke={color}
        strokeWidth={3 * thickness}
        opacity={opacity}
      />
      {/* Horizontal line */}
      <Line
        points={[-size, 0, size, 0]}
        stroke={color}
        strokeWidth={3 * thickness}
        opacity={opacity}
      />
      {/* Center dot */}
      <Line
        points={[0, 0, 1, 1]}
        stroke={color}
        strokeWidth={8 * thickness}
        lineCap="round"
        opacity={opacity}
      />
    </>
  );
};

