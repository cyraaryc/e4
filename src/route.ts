import { WIDTH } from "./actors.ts";
export type Kind = "drone" | "dart" | "turret" | "lancer";
export type Formation = "line" | "vee" | "column" | "pincer";

export type Wave = [
  at: number,
  kind: Kind,
  count: number,
  centerX: number,
  formation: Formation,
];
export const enemyStats = {
  drone: { hp: 2, score: 100, radius: 13, dropChance: 0.015, canShoot: true },
  dart: { hp: 1, score: 150, radius: 12, dropChance: 0.015, canShoot: false },
  turret: { hp: 12, score: 400, radius: 19, dropChance: 0.3, canShoot: true },
  lancer: { hp: 4, score: 250, radius: 15, dropChance: 0.06, canShoot: true },
};

export interface Sector {
  name: string;
  subtitle: string;
  length: number;
  waves: Wave[];
}

export function getSpawn(wave) {
  const [at, , count, centerX, formation] = wave;
  const spawn = [];
  for (let i = 0; i < count; i++) {
    const middle = (count - 1) / 2;
    let x = centerX ?? WIDTH / 2;
    let y = -30;
    let atDelay = at;
    switch (formation) {
      case "line":
        x += (i - middle) * 64;
        break;
      case "vee":
        atDelay += Math.abs(i - middle) * 10;
        x += (i - middle) * 44;
        break;
      case "column":
        atDelay += i * 24;
        break;
      case "pincer":
        atDelay += Math.floor(i / 2) * 30;
        x = i % 2 === 0 ? -30 : 510;
        y = 70 + Math.floor(i / 2) * 50;
        break;
    }
    const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
    spawn.push([x, y, atDelay, dir]);
  }
  return spawn;
}
export const SECTORS: Sector[] = [
  {
    name: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      [60, "drone", 4, 240, "line"],
      [360, "drone", 5, 168, "vee"],
      [660, "drone", 5, 312, "vee"],
      [960, "drone", 6, 240, "line"],
      [1200, "drone", 4, 120, "column"],
      [1260, "drone", 4, 360, "column"],
    ],
  },
  {
    name: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      [60, "drone", 6, 240, "vee"],
      [300, "dart", 4, 240, "line"],
      [600, "dart", 5, 144, "column"],
      [720, "dart", 5, 336, "column"],
      [1020, "drone", 7, 240, "line"],
      [1140, "dart", 5, 240, "vee"],
      [1440, "dart", 6, 240, "line"],
    ],
  },
  {
    name: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      [60, "turret", 1, 240, "line"],
      [240, "drone", 6, 240, "vee"],
      [540, "turret", 2, 240, "line"],
      [840, "dart", 6, 240, "column"],
      [1080, "turret", 2, 240, "line"],
      [1140, "drone", 6, 240, "line"],
      [1500, "turret", 3, 240, "line"],
    ],
  },
  {
    name: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      [60, "lancer", 4, 0, "pincer"],
      [360, "dart", 6, 240, "vee"],
      [600, "lancer", 6, 0, "pincer"],
      [780, "turret", 2, 240, "line"],
      [1140, "lancer", 6, 0, "pincer"],
      [1260, "drone", 8, 240, "vee"],
      [1560, "dart", 8, 240, "line"],
    ],
  },
  {
    name: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      [60, "turret", 3, 240, "line"],
      [180, "lancer", 6, 0, "pincer"],
      [540, "dart", 6, 120, "column"],
      [540, "dart", 6, 360, "column"],
      [900, "drone", 9, 240, "vee"],
      [1020, "turret", 2, 240, "line"],
      [1320, "lancer", 8, 0, "pincer"],
      [1560, "dart", 8, 240, "vee"],
    ],
  },
];
