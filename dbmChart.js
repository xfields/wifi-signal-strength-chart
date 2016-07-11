/**
 * element {DOM Element} - element container for chart
 * dataArr {Array} - data series [{name, centerFreq, bandwidth, peak}]
 * options {Object} - options of echart, include: chartTitle
 */
function drawWifiDbmChart(chart, dataArr, options) {
  var xAxisData = getXAxisData(dataArr)
  var seriesData = getInterpolatedData(dataArr, xAxisData) // 数据插值
  var chartOpts = getEchartOptions(xAxisData, seriesData, options)
  chart.setOption(chartOpts, true)
}

function getFreqRange(dataArr) {
  var maxFreq = dataArr[0]['centerFreq'] + dataArr[0]['bandwidth']
  var minFreq = dataArr[0]['centerFreq'] - dataArr[0]['bandwidth']
  dataArr.forEach(function(data) {
    var f = data.centerFreq
    var b = data.bandwidth
    if (maxFreq < f + b) {
      maxFreq = f + b
    }
    if (minFreq > f - b) {
      minFreq = f - b
    }
  })
  return [minFreq, maxFreq]
}

function getXAxisData(dataArr) {
  var freqRange = getFreqRange(dataArr)
  var step = 0.05
  var x = freqRange[0]
  var xAxisData = []
  while(x <= freqRange[1]) {
    xAxisData.push(x)
    x += step
  }
  return xAxisData
}

function getInterpolatedData(dataArr, xAxisData) {
  var colorMap = {}
  var colorList = COLOR_LIST.slice(0)

  var series = dataArr.map(function(data) {
    var yData = getYAxisData(xAxisData, data.bandwidth, data.centerFreq, data.peak)

    if (colorList.length === 0) {
      colorList = COLOR_LIST.slice(0)
    }
    if (!colorMap[data.name]) {
      colorMap[data.name] = colorList.pop()
    }

    return {
      name: data.name,
      color: colorMap[data.name],
      centerFreq: data.centerFreq,
      peak: data.peak,
      bandwidth: data.bandwidth,
      data: yData
    }
  })

  return series
}

// 数学关系
// 已知条件：中心频点f0， 频段宽度B，峰值P
// 抛物线方程：y = ax * x + bx + c
// 解得 a = -1 * P / (B * B)
//     b = 2 * P * f0 / (B * B)
//     c = p * (1 - ((f0 * f0) / (B * B)))
function getYAxisData(xAxisData, B, f0, p) {
  var a = -1 * p / (B * B)
  var b = 2 * p * f0 / (B * B)
  var c = p * (1 - ((f0 * f0) / (B * B)))
  return xAxisData.map(function(x) {
    var y = (a * x * x + b * x + c).toFixed(2)
    y = y >= 0 ? y : null
    return [x, y]
  })
}

function getSymbolSize(value, params) {
  var name = params.seriesName
  return [name.length * 8, 15]
}

function getEchartOptions(xAxisData, seriesData, options) {
  var series = seriesData.map(function(item, index) {
    return {
      name: item.name + '#' + index, // series的name一样时，markLine只会显示一条
      type: 'line',
      data: item.data,
      symbol: 'none',
      markLine: {
        silent: true,
        label: {
          normal: {
            formatter: item.name
          }
        },
        data: [[{
          coord: [item.centerFreq, item.peak + 0.5],
          symbol: 'none'
        }, {
          coord: [item.centerFreq, item.peak + 0.5],
          symbol: 'none'
        }]]
      },
      itemStyle: {
        normal: {
          color: item.color
        }
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: [8, 8],
        // silent: true,
        // symbolOffset: [0, '-60%'],
        label: {
          normal: {
            show: true,
            formatter: ' ',
          }
        },
        data: [
          {type: 'max', value: ''}
        ]
      },
      areaStyle: {
        normal: {
          color: item.color,
          opacity: 0.3
        }
      },
      smooth: true
    }
  })

  // 指定图表的配置项和数据
  return {
      title: {
        textStyle: {
          color: '#eee'
        },
        text: options.chartTitle
      },
      backgroundColor: '#222',
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          }
        },
        iconStyle: {
          normal: {
            borderColor: '#eee'
          }
        }
      },
      tooltip: {
        show: true,
        formatter: getTip
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        boundaryGap: [0, '20%'],
        splitLine: {
          show: false
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        boundaryGap: [0, '20%'],
      },
      series: series
  }
}

function getTip(params) {
  var name = params.seriesName
  name = name.replace(/#\d+$/g, '')
  return name + '<br\>' + '峰值：' + params.value
}

var COLOR_LIST = [
  "#c4ccd3", "#546570", "#6e7074", "#bda29a", "#ca8622",
  "#749f83", "#91c7ae", "#d48265", "#61a0a8", "#2f4554",
  "#c23531", "#30e0e0", "#b8860b", "#3cb371", "#ff00ff",
  "#6b8e23", "#ffd700", "#00fa9a", "#7b68ee", "#ff6347",
  "#1e90ff", "#40e0d0", "#ffa500", "#cd5c5c", "#ba55d3",
  "#ff69b4", "#6495ed", "#32cd32", "#da70d6", "#87cefa",
  "#ff7f50"
]
