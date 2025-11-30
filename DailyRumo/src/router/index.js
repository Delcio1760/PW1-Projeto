import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Registrar from '@/pages/Registrar.vue'

const Sobre = () => import('../pages/Sobre.vue')
const Contacto = () => import('../pages/Contacto.vue')
const Login = () => import('../pages/Login.vue')
const createHabit = () => import("../pages/CreateHabit.vue")

const routes = [
  { path: '/', component: Home },
  { path: '/sobre', component: Sobre },
  { path: '/contacto', component: Contacto},
  { path: "/login", component: Login },
  { path: "/register", component: Registrar},
  {path: "/habits/:category", component: createHabit}
]

export default createRouter({
  history: createWebHistory(),
  routes
})
