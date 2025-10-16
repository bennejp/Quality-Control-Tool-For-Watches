import { Rect, Line } from 'react-konva';

interface DateGuideProps {
  size: number;
  color: string;
  opacity: number;
}

export const DateGuide: React.FC<DateGuideProps> = ({ size, color, opacity }) => {
  const width = size * 0.4;
  const height = size * 0.3;
  
  return (
    <>
      {/* Rectangular frame for date window */}
      <Rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        stroke={color}
        strokeWidth={2}
        opacity={opacity}
      />
      {/* Center crosshair for alignment */}
      <Line
        points={[-width / 2, 0, width / 2, 0]}
        stroke={color}
        strokeWidth={1}
        opacity={opacity}
        dash={[5, 5]}
      />
      <Line
        points={[0, -height / 2, 0, height / 2]}
        stroke={color}
        strokeWidth={1}
        opacity={opacity}
        dash={[5, 5]}
      />
    </>
  );
};

