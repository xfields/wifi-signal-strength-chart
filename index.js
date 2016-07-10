function entry() {
  var ele = document.getElementById('echart')
  var dataArr = [{
    name: '1',
    centerFreq: 10,
    bandwidth: 5,
    peak: 10
  },{
    name: '2',
    centerFreq: 15,
    bandwidth: 5,
    peak: 15
  }]
  var options = {
    chartTitle: 'wifi signal strength'
  }
  drawWifiDbmChart(ele, dataArr, {})
}
