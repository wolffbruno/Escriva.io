import { fromEvent, Subscription } from "rxjs";
import { CanvasRenderingManager } from "../../canvasRenderingManager";
import { CanvasElementContainer } from "../canvasElementContainer";
import { CanvasTool } from "../canvasTool";

export class CanvasTextTool extends CanvasTool {
    currentContainer: CanvasTextContainer;

    constructor(manager: CanvasRenderingManager) {
        super(manager);

        window.addEventListener('click', ({x, y}) => {
            if (this.currentContainer) {
                this.$putContainer.next(this.currentContainer);
                this.currentContainer.tapListener.unsubscribe();
                this.currentContainer = null;
            }

            const textContainer = new CanvasTextContainer(manager, [x, y]);
            this.currentContainer = textContainer;
        });
    }
}

class CanvasTextContainer extends CanvasElementContainer {
    text: string = '';
    tapListener: Subscription;
    lineHeight = 20;

    constructor(manager: CanvasRenderingManager, originPosition: number[]) {
        super();

        this.manager = manager;
        this.originPosition = originPosition;
        this.tapListener = fromEvent(window, 'keydown').subscribe((e: KeyboardEvent) => this.tapKey(e.key));
    }

    tapKey(key: string) {
        if (key.length === 1) {
            this.text = this.text + key;
        }

        switch(key) {
            case 'Backspace':
                this.text = this.text.substring(0, this.text.length - 1);
                break;
            case 'Enter':
                this.text = this.text + '\n';
                break;
            default:
                break;
        }

        this.manager.renderAll();
        this.render();
    }

    render() {
        this.manager.context.font = '1.4rem Marck Script'
        const width = this.manager.context.measureText(this.text).width;

        this.manager.context.lineWidth=0.4;
        this.manager.context.globalAlpha = .3;
        
        this.text.split(/\n/gi).forEach((line, i) => {
            this.manager.context.strokeText(line, this.originPosition[0], this.originPosition[1] + (this.lineHeight * i));
            this.manager.context.fillText(line, this.originPosition[0], this.originPosition[1] + (this.lineHeight * i));    
        });
    }
}