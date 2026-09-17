export type DecorItem = {
  id: string;
  source: any;
  /** screen width ka % — 0 se 1 */
  x: number;
  /** screen height ka % — 0 se 1 */
  y: number;
  /** screen width ka % */
  size: number;
  rotate?: number;
  /** float animation ka delay (ms) */
  delay?: number;
};

export const welcomeDecor: DecorItem[] = [
  { id: "rupee",  source: require("../../../assets/images/decor-rupee.png"), x: 0.30, y: 0.06, size: 0.10, delay: 0 },
  { id: "percent",source: require("../../../assets/images/decor-percent.png"), x: 0.70, y: 0.12, size: 0.07, delay: 300 },
  { id: "star-1", source: require("../../../assets/images/decor-star.png"), x: 0.15, y: 0.13, size: 0.05, delay: 600 },
  { id: "star-2", source: require("../../../assets/images/decor-star.png"), x: 0.58, y: 0.22, size: 0.07, delay: 200 },
  { id: "coin-1", source: require("../../../assets/images/decor-coin.png"), x: 0.20, y: 0.29, size: 0.15, rotate: -15, delay: 450 },
  { id: "coin-2", source: require("../../../assets/images/decor-coin.png"), x: 0.76, y: 0.35, size: 0.15, rotate: 20, delay: 150 },
];