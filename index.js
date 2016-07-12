var wifiChart = undefined

var data = {
  title: 'wifi',
  wifiList: [{
    name: 'NetDragon-FZ',
    centerFreq: 4,
    bandwidth: 2,
    peak: 50
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
