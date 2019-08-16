import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound.vue";
import Home from "./views/Home.vue";
import Info from "./views/Info.vue";



Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: Index,
      children: [
        { 
          path: '',
          component: Home
        },
        { 
          path: '/home',
          name: 'home',
          component: Home
        },
        { 
          path: '/info',
          name: 'info',
          component: Info
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "*",
      name: "notfound",
      component: NotFound
    }
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("eleToken") ? true : false;
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
