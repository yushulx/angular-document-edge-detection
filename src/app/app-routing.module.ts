import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { EdgeDetectionComponent } from './edge-detection/edge-detection.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
      { path: 'edge-detection', component: EdgeDetectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
