"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
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
        ></Excalidraw>
      </div>
    </div>
  );
}
