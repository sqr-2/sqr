import Head from "next/head";
import React from "react";
import { Button, Input } from "ui";
import { PaletteEntropy } from "sqr2";
import { Layout } from "src/components/Layout";
import { chunk } from "lodash";
import c from "clsx";

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

  return (
    <Layout>
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="bg-red row-span-3">
          <div className="grid h-[4cm] w-[4cm] grid-cols-5 grid-rows-5 bg-black">
            {frameMatrix.map((r, i) => (
              <>
                {r.map((val, j) => (
                  <>
                    <div
                      className={c(
                        val === "1" ? "bg-white" : "bg-black",
                        "text-magenta"
                      )}
                    ></div>
                  </>
                ))}
                <div className={i === 0 && "bg-white"} />
              </>
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <div className={c([0, 4].includes(i) && "bg-white")} />
            ))}
          </div>

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
