import CleanLayout from "@/layouts/CleanLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";

import NotFound from "@/views/NotFound.vue";

export const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "HomeView",
        component: HomeView,
        meta: {},
      },
      {
        path: "/about",
        name: "AboutView",
        component: AboutView,
        meta: {},
      },
    ],
  },
  {
    path: "/",
    name: "CleanLayout",
    component: CleanLayout,
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {},
  },
];
