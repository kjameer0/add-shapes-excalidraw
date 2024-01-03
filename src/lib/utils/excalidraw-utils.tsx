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
import { NON_SHAPE_TOOLS } from "../constants/excalidraw-constants";

type NonShapeToolTuple = typeof NON_SHAPE_TOOLS;
type NonShapeToolType = NonShapeToolTuple[number];

function isNonShapeTool(tool: ToolType | "custom"): tool is NonShapeToolType {
  return !(tool in NON_SHAPE_TOOLS);
}
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
  const currentTool = appState.activeTool.type;
  if (isNonShapeTool(currentTool) || !excalidrawAPI) return;

  const { x, y } = viewportCoordsToSceneCoords(
    {
      clientX: evt.clientX,
      clientY: evt.clientY,
    },
    appState
  );

  const newElement: ExcalidrawElementSkeleton = {
    type: currentTool,
    x,
    y,
    width,
    height,
  };
  const sceneElements = [
    ...excalidrawAPI.getSceneElements(),
  ] as ExcalidrawElement[];
  sceneElements.push(convertToExcalidrawElements([newElement])[0]);
  excalidrawAPI.updateScene({ elements: sceneElements });
}
