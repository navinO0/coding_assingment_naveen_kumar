import {Chart} from 'react-google-charts'

const PieChartComponent = props => {
  const {monthlyData} = props

  const onlyNameWithWorkingHours = [['Task', 'Hours per Day']]

  monthlyData.forEach(eachEmployee => {
    onlyNameWithWorkingHours.push([
      eachEmployee.EmployeeName,
      parseInt(eachEmployee.totalHours),
    ])
  })

  const options = {
    title: 'Employees Data',
  }

  return (
    <Chart
      chartType="PieChart"
      data={onlyNameWithWorkingHours}
      options={options}
      width="100%"
      height="400px"
    />
  )
}

export default PieChartComponent
