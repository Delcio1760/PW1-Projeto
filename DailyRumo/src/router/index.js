import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Registrar from '@/pages/Registrar.vue'


const Sobre = () => import('../pages/Sobre.vue')
const Contacto = () => import('../pages/Contacto.vue')
const Login = () => import('../pages/Login.vue')
const CreateHabit = () => import("../pages/CreateHabit.vue")
const HabitsCategory = () => import("../pages/HabitsCategory.vue")

const routes = [
  { path: '/', component: Home },
  { path: '/sobre', component: Sobre },
  { path: '/contacto', component: Contacto },
  { path: "/login", component: Login },
  { path: "/register", component: Registrar},
  
  {path: "/habits/:category",
    name : "HabitsByCategory",
    component: HabitsCategory,
    props: true
  },

  {
    path: "/habits/:category/create",
    name: "CreateHabit",
    component: CreateHabit,
    props: true
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})
