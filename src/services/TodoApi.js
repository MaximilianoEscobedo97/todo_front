import axios from "axios";
import ApiBase from "../constants/Api";

export const createTodo = async (values) => {
    return  await axios
    .post(`${ApiBase}/todos`, values)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }

  export const updateTodo = async (id,values) => {
    return  await axios
    .put(`${ApiBase}/todos/${id}`, values)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }

  export const updateTodoCompleted = async (id) => {
    return  await axios
    .patch(`${ApiBase}/todos/${id}`)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }

  export const deleteTodo = async (id) => {
    return  await axios
    .delete(`${ApiBase}/todos/${id}`)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }

  export const index = async () => {
    return  await axios
    .get(`${ApiBase}/todos`)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }

  export const show = async (id) => {
    return  await axios
    .get(`${ApiBase}/todos/${id}`)
    .then()
    .catch(function(error) {
      console.log(error);
    });
  }