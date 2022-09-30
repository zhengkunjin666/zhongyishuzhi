import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Projects = {
  getProjectList: (params) => {
    return request.get(API.projects, params);
  },
  getProjectDetail: (id) => {
    return request.get(`${API.projects}/${id}`);
  },
  postProject: (params) => {
    return request.post(API.projects, params);
  }
  // getCampsDetail: (id) => {
  //   return request.get(`${API.camps}/${id}`);
  // },
  // getPageDetail: (id, pageId) => {
  //   return request.get(`${API.camps}/${id}/pages/${pageId}`);
  // },
  // getProjectsList: ({ page }) => {
  //   return request.get(API.projects, { page });
  // },
  // getProjectsDetail: (id) => {
  //   return request.get(`${API.projects}/${id}`);
  // },
};

export default Projects;
