"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  MainMenu,
  Footer,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { handleCreateShapeClick } from "@/lib/utils/excalidraw-utils";
import { MouseEvent } from "react";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export default function Home() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
  const [clickState, setClickState] = useState<boolean>(false);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  

  }, [excalidrawAPI]);

  return (
    <div ref={wrapperRef} className="flex h-screen">
      {/* <div className="w-1/3 h-screen bg-slate-100">
        <input type="radio" id="rectandle" name="shape" value="rectangle" />
        <label htmlFor="rectangle">Rectangle</label>
        <input type="radio" id="circle" name="shape" value="circle" />
        <label htmlFor="circle">Circle</label>
        <input type="radio" id="arrow" name="shape" value="arrow" />
        <label htmlFor="arrow">Arrow</label>
        <button
          onClick={() =>
            excalidrawAPI ? console.dir(excalidrawAPI.getAppState()) : ""
          }
        >
          Check app state
        </button>
      </div> */}
      <div
      onClick={(evt) => handleCreateShapeClick(
          evt,
          excalidrawAPI,
          300,
          300
        )}
        className="w-screen">
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          theme="dark"
          // onPointerDown={() =>
          //   console.log(excalidrawAPI?.getAppState().activeTool)
          // }
        ></Excalidraw>
      </div>
    </div>
  );
}
