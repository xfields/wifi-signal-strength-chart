var wifiChart = undefined

var data = {
  title: '2.4GHz',
  wifiList: [{
    name: 'my-2.4GHz-1',
    centerFreq: 10,
    bandwidth: 5,
    peak: 10
  }, {
    name: 'my-2.4GHz-1',
    centerFreq: 15,
    bandwidth: 5,
    peak: 15
  }, {
    name: 'my-2.4GHz-3',
    centerFreq: 20,
    bandwidth: 5,
    peak: 8
  }]
}

function entry() {
  setChartData(data)
}

function setChartData(data) {
  if (!wifiChart) {
    wifiChart = echarts.init(document.getElementById('echart'))
  }

  var options = {
    chartTitle: data.title
  }

  drawWifiDbmChart(wifiChart, data.wifiList, options)
}
