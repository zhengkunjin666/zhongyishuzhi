import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import NProgress from "nprogress"; //加载条
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta.title) document.title = to.meta.title;
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
