export type ANIM_CONFIG = {
  key: string;
  framesConfig: {
    sprite: string;
    prefix: string;
    suffix: string;
    start: number;
    end: number;
  };
  frameRate: number;
  repeat: number;
};
