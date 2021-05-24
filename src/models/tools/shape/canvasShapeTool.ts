import { fromEvent, Subscription } from "rxjs";
import { CanvasRenderingManager } from "src/models/canvasRenderingManager";
import { CanvasElementContainer } from "../canvasElementContainer";
import { CanvasTool } from "../canvasTool";

export class CanvasShapeTool extends CanvasTool {
    constructor(manager: CanvasRenderingManager) {
        super(manager);

        window.addEventListener('mousedown', ({x, y}) => {
            this.currentContainer = new CanvasShapeContainer(manager, [x, y]);
        });

        window.addEventListener('mouseup', () => {
            if (this.currentContainer) {
                this.$putContainer.emit(this.currentContainer);
                (this.currentContainer as CanvasShapeContainer).event.unsubscribe();
                this.currentContainer = null;
            }
        })
    }
}

class CanvasShapeContainer extends CanvasElementContainer {
    currentPosition: number[];
    event: Subscription;

    constructor(manager: CanvasRenderingManager, originPosition: number[]) {
        super();
        this.originPosition = originPosition;
        this.manager = manager;

        this.event = fromEvent(window, 'mousemove').subscribe((e) => {
            this.currentPosition = [e['x'], e['y']];
            this.manager.renderAll();
            this.render();
        });
    }

    render() {
        const l1 = Math.abs(this.originPosition[0] - this.currentPosition[0]);
        const l2 = Math.abs(this.originPosition[1] - this.currentPosition[1]);

        const l3 = l1 < l2 ? l1 : l2;
        this.manager.context.beginPath();
        this.manager.context.arc(this.originPosition[0], this.originPosition[1], l3 * 2, 0, Math.PI * 2);
        this.manager.context.closePath();
        this.manager.context.stroke();
    }
}