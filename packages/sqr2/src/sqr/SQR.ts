import {
  Colors,
  Palette,
  PaletteColors,
  PaletteEntropy,
  Size,
} from "src/types";
import { chunk } from "lodash";
import * as Buffer from "buffer";

/**
 * Creates binary array from uint8 array
 *
 * @param {Uint8Array} source data array
 * @returns {(0|1)[]} Binary array
 */
const toBitArray = (a: Uint8Array) => {
  return a.reduce((bits: number[], uint8) => {
    const uint8Bits = Array.from(uint8.toString(2).padStart(8, "0")).map(
      Number
    );
    return [...bits, ...uint8Bits];
  }, []);
};

// Generates palette-specific bit array
const toPaletteBitArray = (data: Uint8Array, palette: Palette) => {
  // Convert uint8 to array of bits for future processing
  const bits = toBitArray(data);

  // Bits per 1 cell
  const paletteEntropy = PaletteEntropy[palette];

  if (paletteEntropy < 1) {
    throw new Error(
      `Entropy cannot be lower, than 1 bit (${paletteEntropy}bit for ${palette})`
    );
  }

  // Converts binary bit array to palette-specific bit array
  // For example (hex palette):
  // [0, 1, 0, 1, 1, 1, 1, 1, 0, ...] -> [[0,1,0], [1,1,1], [1, 1, 0], ...]
  const paletteChunkedBits = chunk(bits, paletteEntropy);

  // Convert bit chunk to palette specific number array
  // [[1,1], [0,1], ...] -> [3, 1]
  const paletteBits = paletteChunkedBits.map((n) =>
    parseInt(n.join("").padStart(paletteEntropy), 2)
  );

  // Array of raw data cells
  return paletteEntropy === 1 ? bits : paletteBits;
};

export class SQR {
  protected size: number;
  protected palette: Palette;
  protected data: Buffer;

  /**
   * @param {Size} size - Equivalent of data-cells count
   */
  constructor({
    size,
    palette,
    data,
  }: {
    size: Size;
    palette: Palette;
    data: Buffer;
  }) {
    // Only 5x5 and 9x9 matrix accepted
    if (!Size[size]) {
      throw new Error(`Unsupported SQR size. (${size})`);
    }
    this.size = size;

    if (!Palette[palette]) {
      throw new Error(`Unsupported SQR palette. (${palette})`);
    }
    this.palette = palette;

    this.data = data;
  }

  public get cells() {
    return toPaletteBitArray(this.data, this.palette);
  }

  public get coloredCells() {
    const cells = this.cells;
    const paletteColors = PaletteColors[this.palette];
    return cells.map((c) => paletteColors[c]);
  }

  // TODO: Count frames by actual book
  public get frameCount() {
    const frameDataCellsCount = Math.pow(this.size - 1, 2);

    const framesCount = Math.ceil(
      this.coloredCells.length / frameDataCellsCount
    );

    return framesCount;
  }

  generateBook() {
    const paletteEntropy = PaletteEntropy[this.palette];

    // N*N matrix cells count
    const frameDataCellsCount = Math.pow(this.size - 1, 2);

    // 3 data-cells reserved for positioning
    const framePageCellsCount = 2 * this.size - 4;

    const frames = chunk(this.coloredCells, frameDataCellsCount);
    const pagedFrames = frames.map((f, pageNumber) => {
      const pageBits = pageNumber
        .toString(paletteEntropy)
        .padStart(framePageCellsCount);
      console.log(pageBits, "pageBits");
      // const page = parseInt(pageBits.join("").padStart(paletteEntropy), 2);
      return f;
    });
    return frames;
  }
}
