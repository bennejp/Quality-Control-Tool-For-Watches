import { Circle } from 'react-konva';

interface CenterCircleProps {
  size: number;
  color: string;
  opacity: number;
}

export const CenterCircle: React.FC<CenterCircleProps> = ({ size, color, opacity }) => {
  return (
    <>
      {/* Multiple concentric circles for alignment */}
      <Circle x={0} y={0} radius={size * 0.3} stroke={color} strokeWidth={2} opacity={opacity} />
      <Circle x={0} y={0} radius={size * 0.5} stroke={color} strokeWidth={2} opacity={opacity} />
      <Circle x={0} y={0} radius={size * 0.7} stroke={color} strokeWidth={2} opacity={opacity} />
      <Circle x={0} y={0} radius={size} stroke={color} strokeWidth={3} opacity={opacity} />
    </>
  );
};

