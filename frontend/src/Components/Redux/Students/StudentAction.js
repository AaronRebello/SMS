import axios from "../../utils/axios";

export const STUDENT_ACTION_TYPES = {
  FETCHING: "STUDENTS/FETCHING",
  STUDENT_FETCH_SUCCESS: "STUDENTS/STUDENT_FETCH_SUCCESS",
  STUDENT_FETCH_FAILED: "STUDENTS/STUDENT_FETCH_FAILED",
  STUDENT_SEND_SUCCESS: "STUDENTS/STUDENT_SEND_SUCCESS",
  STUDENT_SEND_FAILED: "STUDENTS/STUDENT_SEND_FAILED",
};

export const onFetching = () => {
  return {
    type: STUDENT_ACTION_TYPES.FETCHING,
  };
};

export const studentFetchSuccess = (data) => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_FETCH_SUCCESS,
    payload: data,
  };
};

export const studentFetchFailed = (error) => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_FETCH_FAILED,
    payload: error,
  };
};

export const studentSendSuccess = () => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_SEND_SUCCESS,
  };
};

export const studentSendFailed = () => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_SEND_FAILED,
  };
};

export const onFetchingStudent = () => {
  return (dispatch) => {
    dispatch(onFetching());
    axios
      .get(`http://localhost:5000/admin/students`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(studentFetchSuccess(res.data));
        } else {
          dispatch(studentFetchFailed(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onAddingStudent = (studentData) => {
  // console.log(file);
  // console.log(resourceData)
  return (dispatch) => {
    dispatch(onFetching());
    axios
      .post(`http://localhost:5000/admin/students`, studentData)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const EditStudent = (student) => {
  console.log(student);
  return (dispatch) => {
    axios
      .put(`http://localhost:5000/admin/student/${student.id}`, student)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteStudent = (student) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/admin/student/delete/${student._id}`)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
