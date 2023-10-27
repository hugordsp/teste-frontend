import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
// lazy-loaded
const Project = () => import("../components/Project.vue")


const routes = [
  {
    path: "/",
    redirect: { name: 'login' }
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/projects",
    name: "projects",
    // lazy-loaded
    component: Project,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
