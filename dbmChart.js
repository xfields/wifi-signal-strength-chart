// 数学关系
// 已知条件：中心频点f0， 频段宽度B，峰值P
// 抛物线方程：y = ax * x + bx + c
// 解得 a = -1 * P / (B * B)
//     b = 2 * P * f0 / (B * B)
//     c = p * (1 - ((f0 * f0) / (B * B)))

// options
// chartTitle {String} - 图题

/**
 * element {DOM Element} - element container for chart
 * dataArr {Array} - data series [{name, centerFreq, bandwidth, peak}]
 * options {Object} - options of echart
 */
function drawWifiDbmChart(dom, dataArr, options) {
  var chart = echarts.init(dom)
  var xAxisData = getXAxisData(dataArr)
  var seriesData = getInterpolatedData(dataArr, xAxisData) // 数据插值
  var chartOpts = getEchartOptions(xAxisData, seriesData, options)
  chart.setOption(chartOpts)
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
  var step = 0.01
  var x = freqRange[0]
  var xAxisData = []
  while(x <= freqRange[1]) {
    xAxisData.push(x)
    x += step
  }
  return xAxisData
}

function getInterpolatedData(dataArr, xAxisData) {
  var series = dataArr.map(function(data) {
    var yData = getYAxisData(xAxisData, data.bandwidth, data.centerFreq, data.peak)
    return {
      name: data.name,
      data: yData
    }
  })

  return series
}

function getYAxisData(xAxisData, B, f0, p) {
  var a = -1 * p / (B * B)
  var b = 2 * p * f0 / (B * B)
  var c = p * (1 - ((f0 * f0) / (B * B)))
  return xAxisData.map(function(x) {
    return a * x * x + b * x + c
  })
}

function getEchartOptions(xAxisData, seriesData, options) {
  var series = seriesData.map(function(item) {
    return {
      name: item.name,
      type: 'line',
      data: item.data,
      areaStyle: {
        normal: {
          color: 'rgba(255, 158, 68, 0.5)'
        }
      }
    }
  })

  var legends = seriesData.map(function(item) {
    return item.name
  })

  // 指定图表的配置项和数据
  return {
      title: {
          text: options.chartTitle
      },
      tooltip: options.tooltip || {},
      legend: {
          data: legends
      },
      xAxis: {
          data: xAxisData
      },
      yAxis: {
        min: 0
      },
      series: series
  }
}
