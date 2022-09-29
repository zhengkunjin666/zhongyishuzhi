import API from "../request/api";
import request from "../request/axios";

const Exam = {
  getStack: ({ page, page_size }) => {
    return request.get(`${API.exam}-stack`, { page, page_size });
  },
  getQuestion: ({ page, page_size }) => {
    return request.get(API.exam, { page, page_size });
  },
  getPaper: ({ page, page_size }) => {
    return request.get(`${API.exam}-exam`, { page, page_size });
  },
  getPaperDetail: (id) => {
    return request.get(`${API.exam}-exam/${id}`);
  },
};
export default Exam;
