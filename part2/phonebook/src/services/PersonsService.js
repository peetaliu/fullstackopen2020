import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => axios.get(baseURL);

const create = (personObj) => axios.post(baseURL, personObj);

const update = (id, personObj) => axios.put(`${baseURL}/${id}`, personObj);

const del = (id) => axios.delete(`${baseURL}/${id}`);

export default {
  getAll,
  create,
  update,
  del,
};
