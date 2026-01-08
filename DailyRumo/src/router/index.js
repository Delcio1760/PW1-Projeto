import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Registrar from '@/pages/Registrar.vue'



const Contacto = () => import('../pages/Contacto.vue')
const Login = () => import('../pages/Login.vue')
const CreateHabit = () => import("../pages/CreateHabit.vue")
const HabitsCategory = () => import("../pages/HabitsCategory.vue")
const Profile = () => import("../pages/Perfil.vue")
const HabitDetail = () => import("../pages/HabitDetail.vue")

const routes = [
  { path: '/', component: Home },
  { path: '/contacto', component: Contacto },
  { path: "/login", component: Login },
  { path: "/register", component: Registrar},
  {path:"/perfil", component: Profile},
  {
    path:'/dashboard',
    name:'userDashboard',
    component: () => import('../pages/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  
  {
    path: "/habits/:category/create",
    name: "CreateHabit",
    component: CreateHabit,
    props: true
  },

  {
    path: "/habits/:id",
    name : "HabitDetail",
    component: HabitDetail,
    props: true,
  },

  {path: "/habits/:category",
    name : "HabitsCategory",
    component: HabitsCategory,
    props: true
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})
