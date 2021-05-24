import { EventEmitter } from "@angular/core";
import { CanvasRenderingManager } from "../canvasRenderingManager";

export abstract class CanvasElementContainer {
    // Redimensionamento, rotação, remoção et cetera...
    $finish: EventEmitter<any> = new EventEmitter<any>();
    manager: CanvasRenderingManager;
    originPosition = [0, 0];

    abstract render();
}