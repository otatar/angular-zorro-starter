import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { tempGuageOption, pressGuageOption, radarOptions, barOptions } from './charts/charts-options'

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  public tempGuageOption = tempGuageOption
  public pressGuageOption = pressGuageOption
  public radarOptions = radarOptions
  public barOptions = barOptions

  constructor() { }

  ngOnInit() {
  }

}