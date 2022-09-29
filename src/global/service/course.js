import API from "../request/api";
import request from "../request/axios";

const Course = {
  getCourseList: ({ page }) => {
    return request.get(API.course, { page });
  },
  getCourseDetail: (id) => {
    return request.get(`${API.course}/${id}`);
  },
};

export default Course;
