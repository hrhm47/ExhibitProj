const setEmployees = (employees) => {
    return ({type: "SET_EMPLOYEES", payload: employees})
}


const setShiftTable = (shiftTable) => {
    return ({type: "SET_SHIFT_TABLE", payload: shiftTable})
}

const setEmployeesShiftTable = (employessShiftTable) => {
    return ({type: "SET_EMPLOYEES_SHIFT_TABLE", payload: employessShiftTable})
}

const setReport = (report) => {
    return ({type: "SET_REPORT", payload: report})
}

const setExhibit = (exhibit) => {
    return ({type: "SET_EXHIBIT", payload: exhibit})
}

const setExhibitIssues = (exibitIssues) => {
    return ({type: "SET_EXHIBIT_ISSUES", payload: exibitIssues})
}

const setTechnician = (technician) => {
    return ({type: "SET_TECHNICIAN", payload: technician})
}

const setEmployeeLogin = (employeeLogin) => {
    return ({type: "SET_EMPLOYEE_LOGIN", payload: employeeLogin})
}

const setManagerLogin = (managerLogin) => {
    return ({type: "SET_MANAGER_LOGIN", payload: managerLogin})
}

const setUserEmail = (userEmail) => {
    return ({type: "SET_USER_INPUT_EMAIL", payload: userEmail})
}

const setUserPassword = (userPassword) => {
    return ({type: "SET_USER_INPUT_PASSWORD", payload: userPassword})
}




const employeeActions={
    setEmployees,
    setShiftTable,
    setEmployeesShiftTable,
    setReport,
    setExhibit,
    setExhibitIssues,
    setTechnician,
    setEmployeeLogin,
    setManagerLogin,
    setUserEmail,
    setUserPassword
}


export default employeeActions;