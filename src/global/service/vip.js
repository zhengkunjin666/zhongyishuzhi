import request from "@/global/request/axios.js";
import API from "@/global/request/api.js";

const VIP = {
  getVipHistory: ({ phone }) => {
    return request.get(`${API.vip}/history`, { phone });
  },
  getVipList: () => {
    return request.get(`${API.vip}/sku`);
  },
  postVip: ({ user_id, vip_sku_id, number, remark }) => {
    return request.post(`${API.vip}/user`, {
      user_id,
      vip_sku_id,
      number,
      remark,
    });
  },
};

export default VIP;
