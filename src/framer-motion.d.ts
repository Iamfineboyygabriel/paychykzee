type MotionProps = {
  initial?: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
  animate?: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
  transition?: {
    delay?: number;
    type?: "spring" | "tween";
    duration?: number;
    ease?: string;
  };
};

export const motion: React.FC<MotionProps>;

type AnimationControls = {
  start: () => void;
  stop: () => void;
};

export const useAnimation: () => AnimationControls;
