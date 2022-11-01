import { EChartsOption } from 'echarts';

export const tempGuageOption: EChartsOption = {
  title: {
    text: 'Average Temperature',
  },
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },

      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 60,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'auto'
      },
      data: [
        {
          value: 20
        }
      ]
    },

    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      itemStyle: {
        color: '#FD7347'
      },
      progress: {
        show: true,
        width: 8
      },

      pointer: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 20
        }
      ]
    }
  ]
};

export const pressGuageOption: EChartsOption = {
  title: {
    text: 'Average pressure',
  },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      splitNumber: 10,
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [[1, '#f00']],
          width: 3
        }
      },
      splitLine: {
        distance: -10,
        length: 9,
        lineStyle: {
          color: '#f00'
        }
      },
      axisTick: {
        distance: -8,
        length: 6,
        lineStyle: {
          color: '#f00'
        }
      },
      axisLabel: {
        distance: -30,
        color: '#f00',
        fontSize: 20
      },
      anchor: {
        show: true,
        size: 20,
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2
        }
      },
      pointer: {
        offsetCenter: [0, '10%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '115%',
        itemStyle: {
          color: '#000'
        }
      },
      detail: {
        valueAnimation: true,
        precision: 1
      },
      title: {
        offsetCenter: [0, '-50%']
      },
      data: [
        {
          value: 58.46,
          name: 'bar'
        }
      ]
    },
    {
      type: 'gauge',
      min: 0,
      max: 60,
      splitNumber: 6,
      radius: '65%',
      axisLine: {
        lineStyle: {
          color: [[1, '#000']],
          width: 3
        }
      },
      splitLine: {
        distance: -3,
        length: 9,
        lineStyle: {
          color: '#000'
        }
      },
      axisTick: {
        distance: 0,
        length: 6,
        lineStyle: {
          color: '#000'
        }
      },
      axisLabel: {
        distance: 10,
        fontSize: 20,
        color: '#000'
      },
      pointer: {
        show: false
      },
      title: {
        show: false
      },
      anchor: {
        show: true,
        size: 14,
        itemStyle: {
          color: '#000'
        }
      }
    }
  ]
};

export const radarOptions: EChartsOption = {
  title: {
    text: 'Site Temperature'
  },
  legend: {
    data: ['Predicted', 'Actual'],
    left: 'right',
    top: 'center',
    orient: 'vertical'
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Site 1', max: 6500 },
      { name: 'Site 2', max: 16000 },
      { name: 'Site 3', max: 30000 },
      { name: 'Site 4', max: 38000 },
      { name: 'Site 5', max: 52000 },
      { name: 'Site 6', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Predicted'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual'
        }
      ]
    }
  ]
};

const colors = ['#5470C6', '#91CC75', '#EE6666'];
export const barOptions: EChartsOption = {
  color: colors,
  title: {
    text: 'Moisture Graph'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['Evaporation', 'Precipitation', 'Temperature'],
    top: 'bottom',
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Evaporation',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Precipitation',
      position: 'right',
      alignTicks: true,
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      yAxisIndex: 1,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 2,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};