import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  isLoading = true;
  dataCount = 5e5;
  data = this.generateData(this.dataCount);

  constructor() {}

  ngOnInit() {}

  barOption: echarts.EChartsOption = {
    title: {
      text: 'Very large bar chart',
      left: 10,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      bottom: 90,
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
    xAxis: {
      data: this.data.categoryData,
      silent: false,
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      splitArea: {
        show: false,
      },
    },
    series: [
      {
        type: 'bar',
        data: this.data.valueData,
        // Set `large` for large data amount
        large: true,
      },
    ],
  };

  public onFinished() {
    this.isLoading = false;
  }

  private generateData(count: number) {
    let baseValue = Math.random() * 1000;
    let time = +new Date(2022, 0, 1);
    let smallBaseValue: number;

    function next(idx: number) {
      smallBaseValue =
        idx % 30 === 0
          ? Math.random() * 700
          : smallBaseValue + Math.random() * 500 - 250;
      baseValue += Math.random() * 20 - 10;
      return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
    }

    const categoryData = [];
    const valueData = [];

    for (let i = 0; i < count; i++) {
      categoryData.push(
        echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false)
      );
      valueData.push(next(i).toFixed(2));
      time += 1000;
    }

    return {
      categoryData: categoryData,
      valueData: valueData,
    };
  }
}
