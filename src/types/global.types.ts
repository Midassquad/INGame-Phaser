export type Coordinates = {
  x: number;
  y: number;
};

export type Quest = {
  name: string;
  description: string;
  modelName: string;
};

export type GameData = {
  quests: Quest[];
};
