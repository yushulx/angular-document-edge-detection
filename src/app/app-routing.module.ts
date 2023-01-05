import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { FileDetectionComponent } from './file-detection/file-detection.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
      { path: 'file-detection', component: FileDetectionComponent },
      { path: 'camera-detection', component: CameraDetectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
