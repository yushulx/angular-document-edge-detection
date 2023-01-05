import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FileDetectionComponent } from './file-detection/file-detection.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';
import { DynamsoftService } from './dynamsoft.service';
console.log('run module');
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    FileDetectionComponent,
    CameraDetectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    DynamsoftService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
