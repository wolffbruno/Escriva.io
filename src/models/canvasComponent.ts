import { CanvasRenderingManager } from "./canvasRenderingManager";

export abstract class CanvasComponent {
    manager: CanvasRenderingManager;
    position = [0, 0];

    constructor(manager: CanvasRenderingManager) {
        this.manager = manager;
    }

    get context(): CanvasRenderingContext2D {
        return this.manager.context;
    }

    abstract render();

    changePosition(x = this.position[0], y = this.position[1]): void {
        this.position = [x, y];
    }
}