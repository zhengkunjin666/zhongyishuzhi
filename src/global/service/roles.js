import API from "../request/api";
import request from "../request/axios";

const Roles = {
  getRolesList: () => {
    return request.get(API.rolesList);
  },
  getRoleDetail: (id) => {
    return request.get(`${API.rolesList}/${id}`);
  },
  editRole: (id, { name, display_name, description, permission_ids }) => {
    return request.put(`${API.rolesList}/${id}`, {
      name,
      display_name,
      description,
      permission_ids,
    });
  },
  deleteRole: (id) => {
    return request.delete(`${API.rolesList}/${id}`);
  },
  addRole: ({ name, display_name, description, permission_ids }) => {
    return request.post(API.rolesList, {
      name,
      display_name,
      description,
      permission_ids,
    });
  },
  getAllAuthority: () => {
    return request.get(API.authority);
  },
};

export default Roles;
