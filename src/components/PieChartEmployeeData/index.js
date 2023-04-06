import {useEffect, useState} from 'react'

import PieChartComponent from '../PieChartComponent'
import TableCardEmployee from '../TableCardEmployee'

import './index.css'

const PieChartEmployeeData = () => {
  const [employeesData, setEmployeesData] = useState([])

  useEffect(() => {
    const getEmployeesDataFromApi = async () => {
      const requestOptions = {
        method: 'GET',
      }
      const url =
        'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='

      const employeeRowData = await fetch(url, requestOptions)

      const employeesDataJson = await employeeRowData.json()
      setEmployeesData(employeesDataJson)
    }
    getEmployeesDataFromApi()
  }, [])

  const removeDuplicateEmployees = []

  employeesData.forEach(eachEmp => {
    const findObject = removeDuplicateEmployees.find(
      findObj => findObj.EmployeeName === eachEmp.EmployeeName,
    )
    if (findObject === undefined) {
      removeDuplicateEmployees.unshift(eachEmp)
    }
  })

  const monthlyData = removeDuplicateEmployees.map(eachOne => {
    let totalTime = 0
    const singleEmployeeMonthlyData = employeesData.filter(
      eachFilteredEmployee =>
        eachOne.EmployeeName === eachFilteredEmployee.EmployeeName,
    )

    singleEmployeeMonthlyData.forEach(forEachSingleEmployee => {
      const {EndTimeUtc, StarTimeUtc} = forEachSingleEmployee

      const startTime = new Date(StarTimeUtc).getHours()
      const endTime = new Date(EndTimeUtc).getHours()
      const startTimeMins = new Date(StarTimeUtc).getMinutes()
      const endMinutes = new Date(EndTimeUtc).getMinutes()
      const differenceMinutes = endMinutes - startTimeMins
      const difference = endTime - startTime
      const totalMinutes = difference * 60 + differenceMinutes
      const getFinalHours = Math.floor(totalMinutes / 60)
      const getFinalMinutes = Math.floor(totalMinutes % 60)

      const parsedHours = parseFloat(`${getFinalHours}.${getFinalMinutes}`)
      totalTime += parsedHours
    })
    totalTime = totalTime.toFixed(2)
    return {...eachOne, totalHours: totalTime}
  })

  return (
    <div>
      <h1>Employee Monthly data</h1>
      <div className="employees-data-main-container">
        <div>
          <ul className="table-columns-ul-container">
            <li className="employee-column">EmployeeName</li>

            <li className="employee-column">total work Time</li>
          </ul>
          <ul>
            {monthlyData.map(eachEmployee => (
              <TableCardEmployee
                key={eachEmployee.id}
                employeeProps={eachEmployee}
              />
            ))}
          </ul>
        </div>

        <PieChartComponent monthlyData={monthlyData} />
      </div>
    </div>
  )
}

export default PieChartEmployeeData
