"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MainMenu,
  Footer,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/types/data/transform";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
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
  useEffect(() => {
    if (typeof window !== "undefined" && excalidrawAPI) {
      const clickWindow = window.addEventListener("click", (event) => {
        console.log(event.clientX, event.clientY);
        updateScene(excalidrawAPI, event.clientX, event.clientY);
        console.log(excalidrawAPI.getAppState());
      });
    }
  }, [excalidrawAPI]);

  const updateScene = (
    excalidrawAPI: ExcalidrawImperativeAPI,
    x?: number,
    y?: number
  ) => {
    const el: ExcalidrawElementSkeleton = {
      type: "rectangle",
      x: x || 0,
      y: y || 0,
    };
    const final = convertToExcalidrawElements([el]);
    elements.push(final[0]);
    const sceneData = {
      elements: elements,
    };
    excalidrawAPI.updateScene(sceneData);
    setElements((prev) => [...elements]);
  };
  return (
    <div className="flex h-screen">
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
      <div className="w-screen">
        <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} theme="dark">
          <Footer>
            <button
              onClick={(evt) =>
                excalidrawAPI
                  ? updateScene(excalidrawAPI)
                  : () => alert("no api")
              }
            >
              toggle click state
            </button>
            <button onClick={() => setClickState(!clickState)}>
              toggle click state
            </button>
            <button
              onClick={(evt) =>
                excalidrawAPI
                  ? updateScene(excalidrawAPI)
                  : () => alert("no api")
              }
            >
              toggle click state
            </button>
          </Footer>
        </Excalidraw>
      </div>
    </div>
  );
}
