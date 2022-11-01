import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { BarComponent } from './bar/bar.component'
import { ChartRoutingModule } from './chart-routing.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [BarComponent]
})
export class ChartModule { }