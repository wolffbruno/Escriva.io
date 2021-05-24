import { CanvasComponent } from "./canvasComponent";
import { CanvasTextComponent } from "./canvasTextComponent";
import { CanvasTextTool } from "./tools/text/canvasTextTool";
import { CanvasTool } from "./tools/canvasTool";
import { CanvasElementContainer } from "./tools/canvasElementContainer";
import { CanvasShapeTool } from "./tools/shape/canvasShapeTool";

export class CanvasRenderingManager {
    canvas: HTMLCanvasElement = null;
    components: CanvasComponent[] = [];
    containers: CanvasElementContainer[] = [];
    leftPressed = false;
    rightPressed = false;
    currentTool: CanvasTool;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.registerEvents();
    }

    get context(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    registerEvents(): void {

    }

    renderAll(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.components.forEach(c => c.render());
        this.containers.forEach(c => c.render());
    }

    createText(): CanvasTextComponent {
        const text = new CanvasTextComponent(this);
        this.components.push(text);
        return text;
    }

    runBrush(): void {
        
    }

    runText(): void {
        const textTool = new CanvasTextTool(this);
        this.currentTool = textTool;
        this.currentTool.$putContainer.subscribe(container => {
            this.containers.push(container);
        })
    }

    runShape(): void {
        const shapeTool = new CanvasShapeTool(this);
        this.currentTool = shapeTool;

        this.currentTool.$putContainer.subscribe(container => {
            this.containers.push(container);
        })
    }
}