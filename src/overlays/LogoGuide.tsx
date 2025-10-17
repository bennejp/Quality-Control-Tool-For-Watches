import { Line } from 'react-konva';

interface LogoGuideProps {
  size: number;
  color: string;
  opacity: number;
  thickness?: number;
}

export const LogoGuide: React.FC<LogoGuideProps> = ({ size, color, opacity, thickness = 1 }) => {
  return (
    <>
      {/* Horizontal guides for logo/text alignment */}
      <Line
        points={[-size, 0, size, 0]}
        stroke={color}
        strokeWidth={2 * thickness}
        opacity={opacity}
      />
      <Line
        points={[-size, -size * 0.3, size, -size * 0.3]}
        stroke={color}
        strokeWidth={1 * thickness}
        opacity={opacity * 0.7}
        dash={[5, 5]}
      />
      <Line
        points={[-size, size * 0.3, size, size * 0.3]}
        stroke={color}
        strokeWidth={1 * thickness}
        opacity={opacity * 0.7}
        dash={[5, 5]}
      />
      {/* Vertical centerline */}
      <Line
        points={[0, -size * 0.5, 0, size * 0.5]}
        stroke={color}
        strokeWidth={2 * thickness}
        opacity={opacity}
      />
    </>
  );
};

