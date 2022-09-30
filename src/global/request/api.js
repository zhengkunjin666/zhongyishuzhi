const API_PREFIX = "https://" + import.meta.env.VITE_APP_DOMAIN;
export default {
  experts: `${API_PREFIX}/api/admin/experts`,
  projects: `${API_PREFIX}/api/admin/projects`,
};
