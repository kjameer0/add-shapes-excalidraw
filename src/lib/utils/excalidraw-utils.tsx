import {
  ExcalidrawImperativeAPI,
  ToolType,
} from "@excalidraw/excalidraw/types/types";
import {
  convertToExcalidrawElements,
  viewportCoordsToSceneCoords,
} from "@excalidraw/excalidraw";
import { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/types/data/transform";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
// import { MouseEvent } from "react";

type OneDimensionalShapeType = Extract<ToolType, "line" | "arrow">;
type TwoDimensionalShapeType = Extract<
  ToolType,
  "rectangle" | "diamond" | "ellipse"
>;
type NonShapeToolType =
  | Exclude<ToolType, OneDimensionalShapeType | TwoDimensionalShapeType>
  | "custom";

const isNonShapeTool = (
  tool: ToolType | "custom"
): tool is NonShapeToolType => {
  const nonShapeTools = [
    "selection",
    "freedraw",
    "text",
    "image",
    "eraser",
    "hand",
    "frame",
    "embeddable",
    "laser",
    "custom",
  ];
  return nonShapeTools.includes(tool);
};
const isOneDimensionalShapeTool = (
  tool: ToolType
): tool is OneDimensionalShapeType => {
  const oneDTools = ["line", "arrow"];
  return oneDTools.includes(tool);
};
const isTwoDimensionalShapeTool = (
  tool: ToolType
): tool is TwoDimensionalShapeType => {
  const twoDTools = ["rectangle", "diamond", "ellipse"];
  return twoDTools.includes(tool);
};

export function handleCreateShapeClick(
  evt: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  excalidrawAPI: ExcalidrawImperativeAPI | undefined,
  width: number,
  height: number = 0
) {
  //make sure event is happening on element,  not xhr request or web worker
  if (!(evt.target instanceof HTMLElement)) return;
  if (!excalidrawAPI) return;
  if (evt.target.nodeName !== "CANVAS") return;

  evt.stopPropagation();

  const appState = excalidrawAPI.getAppState();
  const { x, y } = viewportCoordsToSceneCoords(
    {
      clientX: evt.clientX,
      clientY: evt.clientY,
    },
    appState
  );
  const currentTool = appState.activeTool.type;
  if (isNonShapeTool(currentTool) || !excalidrawAPI) return;
  const finalElement: ExcalidrawElementSkeleton = {
    type: currentTool,
    x,
    y,
    width,
    height,
  };
  const sceneElements = [
    ...excalidrawAPI.getSceneElements(),
  ] as ExcalidrawElement[];
  sceneElements.push(convertToExcalidrawElements([finalElement])[0]);
  excalidrawAPI.updateScene({ elements: sceneElements });
}
