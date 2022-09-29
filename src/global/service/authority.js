import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Authority = {
  my: () => {
    return request.get(`${API.authority}/my`);
  },
};
export default Authority;
