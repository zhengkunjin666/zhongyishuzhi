import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Camps = {
  getCampsList: () => {
    return request.get(API.camps);
  },
  getCampsDetail: (id) => {
    return request.get(`${API.camps}/${id}`);
  },
  getPageDetail: (id, pageId) => {
    return request.get(`${API.camps}/${id}/pages/${pageId}`);
  },
  getProjectsList: ({ page }) => {
    return request.get(API.projects, { page });
  },
  getProjectsDetail: (id) => {
    return request.get(`${API.projects}/${id}`);
  },
};

export default Camps;
