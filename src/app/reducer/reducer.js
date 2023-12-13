import { combineReducers } from "redux";

const initialState = {
  employees: {
    empName: null,
    empDateOfBirth: null,
    empGender: null,
    empEmail: null,
    empPhone: null,
    empAddress: null,
    empJobTitle: null,
    empRole: null,
    empUsername: null,
    empHireDate: null,
    empManagerId: null
  },
  shiftTable: {
    shiftId:null,
    startTime: null,
    EndTime: null,
    shitType: null,
  },
  employessShiftTable:{
    empName: null,
    empId:null,
    shiftId:null,
    startTime: null,
    EndTime: null,
    shitType: null,
    shiftLocation: null,
  },
  report: {
    reportId: null,
    reportDate: null,
    reportType: null,
    reportDescription: null,
    reportStatus: null,
    reportExhibitId: null,
    reportTechnicianId: null,
    reportManagerId: null
  },
  exhibit: null,
  exibitIssues: null,
  technician: null,
  employeeLogin: null,
  managerLogin: null,
  userInputEmail: null,
  userInputPassword: null
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES": {
      return {
        ...state,
        employees: action.payload
      };
    }

    case "SET_SHIFT_TABLE": {
      return {
        ...state,
        shiftTable: action.payload
      };
    }

    case "SET_EMPLOYEES_SHIFT_TABLE": {
      return {
        ...state,
        employessShiftTable: action.payload
      };
    }

    case "SET_REPORT": {
      return {
        ...state,
        report: action.payload
      };
    }

    case "SET_EXHIBIT": {
      return {
        ...state,
        exhibit: action.payload
      };
    }

    case "SET_EXHIBIT_ISSUES": {
      return {
        ...state,
        exibitIssues: action.payload
      };
    }

    case "SET_TECHNICIAN": {
      return {
        ...state,
        technician: action.payload
      };
    }

    case "SET_EMPLOYEE_LOGIN": {
      return {
        ...state,
        employeeLogin: action.payload
      };
    }

    case "SET_MANAGER_LOGIN": {
      return {
        ...state,
        managerLogin: action.payload
      };
    }

    case "SET_USER_INPUT_EMAIL": {
      return {
        ...state,
        userInputEmail: action.payload
      };
    }

    case "SET_USER_INPUT_PASSWORD": {
      return {
        ...state,
        userInputPassword: action.payload
      };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  employees: employeesReducer
});

export default rootReducer;
