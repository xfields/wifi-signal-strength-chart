var wifiChart = undefined

function entry() {
  var data = {
    title: '',
    wifiList: [
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 4,
      //   bandwidth: 2,
      //   peak: -50
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 2,
      //   bandwidth: 2,
      //   peak: -63
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 6,
      //   bandwidth: 2,
      //   peak: -50
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 9,
      //   bandwidth: 2,
      //   peak: -63
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 11,
      //   bandwidth: 2,
      //   peak: -50
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 4,
      //   bandwidth: 2,
      //   peak: -50
      // },
      // {
      //   name: 'NetDragon-FZ',
      //   centerFreq: 4,
      //   bandwidth: 2,
      //   peak: 50
      // }
    ]
  }
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
