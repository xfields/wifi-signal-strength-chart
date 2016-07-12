var wifiChart = undefined

var data = {
  title: 'wifi',
  wifiList: [{
    name: 'NetDragon-FZ',
    centerFreq: 1,
    bandwidth: 2,
    peak: 50
  }, {
    name: 'NetDragon-FZ',
    centerFreq: 11,
    bandwidth: 2,
    peak: 63
  }, {
    name: 'NetDragon-FZ',
    centerFreq: 6,
    bandwidth: 2,
    peak: 58
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
