import axios from "axios";

export const getAllStates = () => {
  return axios.get("/api/states");
};

