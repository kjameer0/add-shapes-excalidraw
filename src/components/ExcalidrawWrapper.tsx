"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { handleCreateShapeClick } from "@/lib/utils/excalidraw-utils";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export default function ExcalidrawWrapper() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();

  return (
    <div
      onClick={(evt) => handleCreateShapeClick(evt, excalidrawAPI, 300, 300)}
      className="w-2/3 h-screen"
    >
      <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} theme="dark" />
    </div>
  );
}
