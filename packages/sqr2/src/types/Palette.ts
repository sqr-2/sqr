export enum Palette {
  "MONO" = "MONO",
  "RGB" = "RGB",
  "CMYK" = "CMYK",

  // HEX = CMYK + RGB
  "HEX" = "HEX",

  // RFC
  "KELVIN" = "KELVIN",
}

// https://en.wikipedia.org/wiki/Entropy_(information_theory)
// NOTE: Negative entropy can be used in future (for power receiving, for example)
export const PaletteEntropy = {
  [Palette.MONO]: 1,
  [Palette.RGB]: 2,
  [Palette.CMYK]: 2,
  [Palette.HEX]: 3,

  // TODO
  [Palette.KELVIN]: -1,
} as const;

export enum Colors {
  W = "#fff",
  R = "#f00",
  G = "#0f0",
  B = "#00f",
  C = "#0ff",
  Y = "#ff0",
  M = "#f0f",
  K = "#000",
}

export const PaletteColors = {
  /**
   * By default, contrast color in monochrome  scheme is white
   * But in case, when SQR2 printed on list of paper, contrast color will be black
   *
   * TODO: Make palette adaptive to different background (and different contrast color)
   */
  [Palette.MONO]: [Colors.W, Colors.K],
  [Palette.RGB]: [Colors.W, Colors.R, Colors.G, Colors.B, Colors.K],
  [Palette.CMYK]: [Colors.C, Colors.M, Colors.Y, Colors.K],

  // MONO + RGB + CMYK
  [Palette.HEX]: [
    Colors.W,
    Colors.R,
    Colors.G,
    Colors.B,
    Colors.C,
    Colors.M,
    Colors.Y,
    Colors.K,
  ],

  // TODO
  [Palette.KELVIN]: [],
} as const;
