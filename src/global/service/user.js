import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

const userService = {
  getUserInfo: () => {
    return request.get(API.userInfo);
  },
  getUserList: ({ page_size, page, phone, nickname, gender }) => {
    if (page_size || page || phone || nickname || gender) {
      return request.get(API.users, {
        page_size,
        page,
        phone,
        nickname,
        gender,
      });
    } else {
      return request.get(API.users);
    }
  },
  getUserDetail: (id) => {
    return request.get(`${API.users}/${id}`);
  },
  editUser: (id, { phone, nickname, gender, birthday, introduction }) => {
    return request.put(`${API.users}/${id}`, {
      phone,
      nickname,
      gender,
      birthday,
      introduction,
    });
  },
  postAddUser: ({ phone, nickname, gender, birthday, introduction }) => {
    return request.post(API.users, {
      phone,
      nickname,
      gender,
      birthday,
      introduction,
    });
  },
};

export default userService;
