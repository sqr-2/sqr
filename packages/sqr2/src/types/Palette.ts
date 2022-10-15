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
export const PaletteEntropy = {
  [Palette.MONO]: 1,
  [Palette.RGB]: 2,
  [Palette.CMYK]: 2,
  [Palette.HEX]: 3,

  // TODO
  [Palette.KELVIN]: -1,
} as const;

export const PaletteColors = {
  /**
   * By default, contrast color in monochrome  scheme is white
   * But in case, when SQR printed on list of paper, contrast color will be black
   *
   * TODO: Make palette adaptive to different background (and different contrast color)
   */
  [Palette.MONO]: ["#000", "#fff"],
  [Palette.RGB]: ["#f00", "#0f0", "#00f", "#fff", "#000"],
  [Palette.CMYK]: ["#0ff", "#f0f", "#ff0", "#000"],
  [Palette.HEX]: [
    "#000",
    "#fff",
    "#f00",
    "#0f0",
    "#00f",
    "#0ff",
    "#f0f",
    "#ff0",
  ],

  // TODO
  [Palette.KELVIN]: [],
} as const;

export type Colors = typeof PaletteColors[Palette];
