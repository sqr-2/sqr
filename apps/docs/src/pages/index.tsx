import React from "react";
import { Button, Input } from "ui";
import { Palette, PaletteEntropy, Size, SQR } from "sqr2";
import { Layout } from "src/components/Layout";
import { chunk } from "lodash";

const toBitArray = (a: Uint8Array) => {
  return a.reduce(
    (prev, curr) => [...prev, ...curr.toString(2).padStart(8, "0")],
    []
  );
};

export default function Home() {
  const [currentFrame, setCurrentFrame] = React.useState<number>(0);
  const bit = PaletteEntropy["MONO"];
  const [data, setData] = React.useState<string>("");

  const uint8Array = Buffer.from(data, "utf-8");
  const binArray = toBitArray(uint8Array);

  // const frameMatrix = new Array(5).map((i) => new Array(5));
  const chunks = chunk(binArray, 16);
  const frameMatrix = chunk(chunks[currentFrame], 4);

  const play = () => {
    setCurrentFrame((v) => {
      if (currentFrame < chunks.length) {
        return v + 1;
      }
    });
    setTimeout(play, 1000);
  };

  const sqr = new SQR({
    size: Size.V,
    data: uint8Array,
    palette: Palette.HEX,
  });

  console.log(sqr.generateBook());

  return (
    <Layout>
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="bg-red row-span-3">
          {/*<SQR2 sqr={hew SQR}*/}

          <div className={"mt-4"}>
            <Button onClick={play}>play</Button>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <span>Input</span>
          <Input value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <div className="bg-foreground col-span-2 flex flex-col rounded-md p-2">
          Info
          <div>
            type: <span>text</span>
          </div>
          <div>
            bytes: {uint8Array.byteLength} (b: {binArray.length})
          </div>
          <div className="flex gap-4">
            frame: {currentFrame}{" "}
            <span
              className="bg-red"
              onClick={() => setCurrentFrame((v) => v - 1)}
            >
              {"<"}
            </span>
            <span
              className="bg-green"
              onClick={() => setCurrentFrame((v) => v + 1)}
            >
              {">"}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
