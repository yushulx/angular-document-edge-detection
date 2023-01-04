import { Component, OnInit } from '@angular/core';
import { DocumentNormalizer } from 'dynamsoft-document-normalizer';
import { DynamsoftService } from '../dynamsoft.service';
import { OverlayManager } from '../overlay';
import { Template } from '../template';

@Component({
  selector: 'app-edge-detection',
  templateUrl: './edge-detection.component.html',
  styleUrls: ['./edge-detection.component.css']
})
export class EdgeDetectionComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  normalizer: DocumentNormalizer | undefined;
  overlayManager: OverlayManager;
  points: any[] = [];
  currentFile: File | undefined;

  constructor(private dynamsoftService: DynamsoftService) {
    this.overlayManager = new OverlayManager();
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      this.normalizer = await DocumentNormalizer.createInstance();
      this.isLoaded = true;
      await this.normalizer.setRuntimeSettings(Template.color);
    })();
  }

  onRadioChange(event: Event) {
    if (!this.normalizer) {
      return;
    }

    let target = event.target as HTMLInputElement;
    let template = Template.binary;
    if (target.value === 'binary') {
      template = Template.binary;
    } else if (target.value === 'grayscale') {
      template = Template.grayscale;
    } else if (target.value === 'color') {
      template = Template.color;
    }
    (async () => {
      await this.normalizer!.setRuntimeSettings(template);
      this.normalize(this.currentFile!, this.points);
    })();
  }

  normalize(file: File, points: any) {
    if (this.normalizer) {
      this.normalizer.normalize(file, points).then((result: any) => {
        let image = document.getElementById('normalizedImage') as HTMLCanvasElement;
        if (image) {
          image.width = result.image.width;
          image.height = result.image.height;
          let ctx = image.getContext('2d') as CanvasRenderingContext2D;

          var imgdata = ctx.createImageData(image.width, image.height);
          var imgdatalen = result.image.data.length;
          for(var i=0; i<imgdatalen; i++) {
              imgdata.data[i] = result.image.data[i];
          }
          ctx.putImageData(imgdata, 0, 0);
        }
      });
    }
  }

  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList.item(0) as any;
      if (file) {
        this.currentFile = file;
        let fr = new FileReader();
        fr.onload = (event: any) => {
          let image = document.getElementById('image') as HTMLImageElement;
          if (image) {
            image.src = event.target.result;
            const img = new Image();

            img.onload = (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);
              if (this.normalizer) {
                
                this.normalizer.detectQuad(file).then((results: any) => {
                  try {
                    if (results.length > 0) {
                      let result = results[0];
                        this.points = result['location']['points'];
                        this.overlayManager.drawOverlay(
                          this.points,
                        );

                      this.normalize(file, this.points);
                    } 
                  } catch (e) {
                    alert(e);
                  }
                });
              }
            };
            img.src = event.target.result;
          }
        };
        fr.readAsDataURL(file);
      }
    }
  }

}
