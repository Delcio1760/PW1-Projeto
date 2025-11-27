<template>
    <nav class="navBar">
      <router-link to="/">Home</router-link>
      <router-link to="/daily">Sobre</router-link>
      <router-link to="/goals">Contacto</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </template>
  
  <style scoped>
  .navBar {
    width: 95%;
    height: 60px;
    background-color: purple;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    border-radius: 8px;
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  </style>
  