import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasRenderingManager } from 'src/models/canvasRenderingManager';
import { CanvasTextTool } from 'src/models/tools/text/canvasTextTool';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    (document as any).fonts.ready.then(() => {
      const newsreader = (document as any).fonts.check('1em Newsreader') || (document as any).fonts.check('1em MarckScript');
      
      if (newsreader) {
        this.init();
      }
    })
  }

  ngAfterViewChecked(): void {
  }

  init() {
    const canvasManager = new CanvasRenderingManager(this.canvas.nativeElement);
    const text = canvasManager.createText();

    text.setText(`
      A thing of beauty is a joy for ever:
      Its loveliness increases; it will never
      Pass into nothingness; but still will keep
      A bower quiet for us, and a sleep
      Full of sweet dreams, and health, and quiet breathing.
      Therefore, on every morrow, are we wreathing
      A flowery band to bind us to the earth,
      Spite of despondence, of the inhuman dearth
      Of noble natures, of the gloomy days,
      Of all the unhealthy and o’er-darkened ways
      Made for our searching: yes, in spite of all,
      Some shape of beauty moves away the pall
      From our dark spirits. Such the sun, the moon,
      Trees old, and young, sprouting a shady boon
      For simple sheep; and such are daffodils
    `);

    text.setLineHeight(22.5);
    text.setFontSize(13);
    text.setFontWeight(500);

    text.useTitle('The Waste Land');
    text.changePosition(200, 100);

    text.render();

    const text2 = canvasManager.createText();
    text2.setText(`
      April is the cruellest month, breeding
      Lilacs out of the dead land, mixing
      Memory and desire, stirring
      Dull roots with spring rain.
      Winter kept us warm, covering
      Earth in forgetful snow, feeding
      A little life with dried tubers.
      Summer surprised us, coming over the Starnbergersee
      With a shower of rain; we stopped in the colonnade,
      And went on in sunlight, into the Hofgarten,
      And drank coffee, and talked for an hour.
      Bin gar keine Russin, stamm’ aus Litauen, echt deutsch.
      And when we were children, staying at the arch-duke’s,
      My cousin’s, he took me out on a sled,
      And I was frightened. He said, Marie,
      Marie, hold on tight. And down we went.
      In the mountains, there you feel free.
      I read, much of the night, and go south in the winter.`);

    text2.setLineHeight(22.5);
    text2.setFontSize(13);
    text2.setFontWeight(500);

    text2.useTitle('The Waste Land');
    text2.changePosition(200, 530);
    text2.render();


    // canvasManager.runText();
    canvasManager.runShape();
  }

  setTool(tool: ('brush' | 'text')) {

  }
}
