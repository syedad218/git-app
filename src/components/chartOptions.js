export const getOption = (chartData) => {
  if (chartData){
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
      legend: {
        data:['owner','others','all']
    },
    xAxis: [
        {
            name: 'Weeks',
            type: 'category',
            data: ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Commits',
            min: 0,
            max: Math.max.apply(null, chartData["all"]) + 5,
            interval: 30,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'owner',
            type:'bar',
            data: chartData["owner"]
        },
        {
            name:'others',
            type:'bar',
            data: chartData["all"].map( (item,index) => { return item - chartData["owner"][index] } )
        },
        {
            name:'all',
            type:'line',
            yAxisIndex: 0,
            data: chartData["all"]
        }
      ]
    };
    return option;
  }
  else{
    return {}
  }
}