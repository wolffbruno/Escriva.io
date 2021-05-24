import { CanvasComponent } from "./canvasComponent";

export class CanvasTextComponent extends CanvasComponent {
    private lineHeight = 12;
    private letterSpacing = 2;
    private fontSize = 12; // Points
    private fontWeight = 500;
    private fontFamily = 'Newsreader';
    private rawText: string;
    private title: string = null;
    private titleIncrease = 5;
    private width = 50;

    setText(rawText: string) {
        this.rawText = rawText.trim();
    }

    get processedText() {
        let text = this.rawText || '';
        
        return text;
    }

    get lines(): string[] {
        return this.processedText.split(/\n/gi) || [];
    }

    setFontFamily(fontFamily: string) {
        this.fontFamily = fontFamily;
    }

    setLineHeight(lineHeight: number) {
        this.lineHeight = lineHeight;
    }

    setFontSize(fontSize: number) {
        this.fontSize = fontSize;
    }

    setFontWeight(fontWeight: number) {
        this.fontWeight = fontWeight;
    }

    useTitle(title: string) {
        this.title = title;
    }

    render() {
        this.context.globalAlpha = 1;
        if (this.title) {
            this.context.font = `${this.fontWeight} ${this.fontSize + this.titleIncrease}pt ${this.fontFamily}`;
            this.context.strokeText(this.title, this.position[0], this.position[1] + this.fontSize);
            this.context.fillText(this.title, this.position[0], this.position[1] + this.fontSize);
        }

        this.context.font = `${this.fontWeight} ${this.fontSize}pt ${this.fontFamily}`;
        this.lines.forEach((line, i) => {
            line = line.trim();
            this.context.lineWidth=0.4;
            this.context.strokeText(line, this.position[0], this.position[1] + (this.title ? (this.fontSize + (this.titleIncrease * 3)) : 0) + this.fontSize + (this.lineHeight * i));
            this.context.fillText(line, this.position[0], this.position[1] + (this.title ? (this.fontSize + (this.titleIncrease * 3)) : 0) + this.fontSize + (this.lineHeight * i));
        });
    }
}