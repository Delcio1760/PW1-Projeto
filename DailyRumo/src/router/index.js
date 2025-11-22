import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const Sobre = () => import('../pages/Sobre.vue')
const Contacto = () => import('../pages/Contacto.vue')
const Login = () => import('../pages/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/sobre', component: Sobre },
  { path: '/contacto', component: Contacto },
  { path: '/login', component: Login },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
