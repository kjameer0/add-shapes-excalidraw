"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MainMenu, Footer, convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/types/data/transform";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
export default function Home() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [clickState, setClickState] = useState<boolean>(false)
  const updateScene = (excalidrawAPI: ExcalidrawImperativeAPI) => {
    const el: ExcalidrawElementSkeleton = {
      type: "rectangle",
      x: 300,
      y: 300
    }
    const final = convertToExcalidrawElements([el])
    const sceneData = {
      elements: final,
    };
    excalidrawAPI.updateScene(sceneData);
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/3 h-screen bg-slate-100">
        <input type="radio" id="rectandle" name="shape" value="rectangle" />
        <label htmlFor="rectangle">Rectangle</label>
        <input type="radio" id="circle" name="shape" value="circle" />
        <label htmlFor="circle">Circle</label>
        <input type="radio" id="arrow" name="shape" value="arrow" />
        <label htmlFor="arrow">Arrow</label>
      </div>
      <div className="w-2/3">
        <Excalidraw excalidrawAPI={(api)=> setExcalidrawAPI(api)} theme="dark">
          <Footer>
            <button onClick={() => excalidrawAPI ? updateScene(excalidrawAPI) : () => alert('no api')}>toggle click state</button>
            <button onClick={() => setClickState(!clickState)}>toggle click state</button>
          </Footer>
        </Excalidraw>
      </div>
    </div>
  );
}
