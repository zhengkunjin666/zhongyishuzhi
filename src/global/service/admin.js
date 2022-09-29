import API from "@/global/request/api.js";
import request from "@/global/request/axios";

const Admin = {
  getAdminList: () => {
    return request.get(`${API.administrators}/administrators`);
  },
  getAdminDetail: (id) => {
    return request.get(`${API.administrators}/administrators/${id}`);
  },
  editAdmin: (id, { role_ids }) => {
    return request.put(`${API.administrators}/administrators/${id}`, {
      role_ids,
    });
  },
  deleteAdmin: (id) => {
    return request.delete(`${API.administrators}/administrators/${id}`);
  },
  addAdmin: ({ user_id, role_ids }) => {
    return request.post(`${API.administrators}/administrators`, {
      user_id,
      role_ids,
    });
  },
  searchAdmin: (phone) => {
    return request.get(`${API.administrators}/users?phone=${phone}`);
  },
};

export default Admin;
