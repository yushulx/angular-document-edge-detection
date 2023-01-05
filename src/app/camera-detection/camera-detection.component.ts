import { Component, OnInit } from '@angular/core';
import { DocumentNormalizer } from 'dynamsoft-document-normalizer';
import { CameraEnhancer } from 'dynamsoft-camera-enhancer';
import { DynamsoftService } from '../dynamsoft.service';
import { OverlayManager } from '../overlay';
import { Template } from '../template';

@Component({
  selector: 'app-camera-detection',
  templateUrl: './camera-detection.component.html',
  styleUrls: ['./camera-detection.component.css']
})
export class CameraDetectionComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  normalizer: DocumentNormalizer | undefined;
  overlayManager: OverlayManager;
  currentData: any;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
  enhancer: CameraEnhancer | undefined;
  isDetecting = false;
  captured: any[] = [];

  constructor(private dynamsoftService: DynamsoftService) {
    this.overlayManager = new OverlayManager();
  }

  ngOnDestroy() {
    this.normalizer?.dispose();
    this.normalizer = undefined;

    this.enhancer?.dispose(true);
    this.enhancer = undefined;
  }

  ngOnInit(): void {
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      this.normalizer = await DocumentNormalizer.createInstance();
      this.enhancer = await CameraEnhancer.createInstance();
      this.enhancer.on("cameraOpen", (playCallBackInfo: any) => {
        this.overlayManager.updateOverlay(playCallBackInfo.width, playCallBackInfo.height);
      });
      this.enhancer.on("cameraClose", (playCallBackInfo: any) => {
        console.log(playCallBackInfo.deviceId);
      });


      this.isLoaded = true;
      await this.normalizer.setRuntimeSettings(Template.color);

      let uiElement = document.getElementById('videoContainer');
      if (uiElement) {
        await this.enhancer.setUIElement(uiElement);
        let cameras = await this.enhancer.getAllCameras();
        this.listCameras(cameras);
        await this.openCamera();
      }
    })();
  }

  detect(): void {
    if (this.normalizer && this.enhancer && this.isDetecting) {

      let data = this.enhancer.getFrame().toCanvas();
      this.normalizer.detectQuad(data).then((results: any) => {
        this.overlayManager.clearOverlay();
        if (!this.isDetecting) return;
        try {
          if (results.length > 0) {
            if (this.captured.length > 0) {
              this.captured.pop();
            }

            let result = results[0];
            let points = result['location']['points'];
            this.captured.push({ 'image': data, 'points': points });
            this.overlayManager.drawOverlay(
              points,
            );
          }
        } catch (e) {
          alert(e);
        }
        this.detect();
      });
    }
  }

  async openCamera(): Promise<void> {
    this.overlayManager.clearOverlay();
    if (this.videoSelect) {
      let deviceId = this.videoSelect.value;
      if (this.enhancer) {
        await this.enhancer.selectCamera(this.cameraInfo[deviceId]);
        await this.enhancer.open()
      }
    }

  }

  listCameras(deviceInfos: any): void {
    for (var i = 0; i < deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label;
      this.cameraInfo[deviceInfo.deviceId] = deviceInfo;
      if (this.videoSelect) this.videoSelect.appendChild(option);
    }
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
      if (this.currentData) this.normalize(this.currentData['image'], this.currentData['points']);
    })();
  }

  normalize(data: any, points: any) {
    if (this.normalizer) {
      this.normalizer.normalize(data, points).then((result: any) => {
        let image = document.getElementById('normalizedImage') as HTMLCanvasElement;
        if (image) {
          image.width = result.image.width;
          image.height = result.image.height;
          let option: CanvasRenderingContext2DSettings = {};
          option.willReadFrequently = true;
          let ctx = image.getContext('2d', option) as CanvasRenderingContext2D;

          var imgdata = ctx.createImageData(image.width, image.height);
          var imgdatalen = result.image.data.length;
          for (var i = 0; i < imgdatalen; i++) {
            imgdata.data[i] = result.image.data[i];
          }
          ctx.putImageData(imgdata, 0, 0);
        }
      });
    }
  }

  captureDocument() {
    if (this.isDetecting && this.captured.length > 0) {
      this.currentData = this.captured.pop();
      this.normalize(this.currentData['image'], this.currentData['points']);
    }
    else {
      alert('No document detected');
    }
  }

  detectDocument() {
    if (this.isDetecting) {
      let button = document.getElementById('detectButton') as HTMLButtonElement;
      button.textContent = 'Start Detection';
      this.isDetecting = false;
      this.overlayManager.clearOverlay();
      this.currentData = null;
    } else {
      let button = document.getElementById('detectButton') as HTMLButtonElement;
      button.textContent = 'Stop Detection';
      this.isDetecting = true;
      this.detect();
    }
  }

  async updateThresholdCompensation(event: Event) {
    let target = event.target as HTMLInputElement;
    if (this.normalizer) {
      let settings: any = await this.normalizer.getRuntimeSettings();
      settings.ImageParameterArray[0].BinarizationModes[0].ThresholdCompensation = parseInt(target.value)
      await this.normalizer.setRuntimeSettings(settings);
      document.getElementById('ThresholdCompensationval')!.textContent = target.value;
    }
  }
}
