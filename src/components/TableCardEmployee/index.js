import {ParaElement} from './StyledComponents'

import './index.css'

const TableCardEmployee = props => {
  const {employeeProps} = props

  const {EmployeeName, totalHours} = employeeProps

  return (
    <li className="employee-li-card">
      <ParaElement lessHours={totalHours < 100}>{EmployeeName}</ParaElement>

      <ParaElement
        lessHours={totalHours < 100}
      >{`${totalHours} Hours`}</ParaElement>
    </li>
  )
}

export default TableCardEmployee
