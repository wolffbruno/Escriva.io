import { CanvasRenderingManager } from "../canvasRenderingManager";
import { EventEmitter } from '@angular/core';
import { CanvasElementContainer } from "./canvasElementContainer";

export abstract class CanvasTool {
    manager: CanvasRenderingManager;
    currentContainer: CanvasElementContainer;

    $putContainer: EventEmitter<CanvasElementContainer>;

    constructor(manager: CanvasRenderingManager) {
        this.manager = manager;
        this.$putContainer = new EventEmitter<CanvasElementContainer>();
    }
}