<script></script>
<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/libraries/list" >Libraries</router-link> |
      <router-link to="/books/list" >Books</router-link> |
      <router-link to="/">Home</router-link>
    </nav>
  <hr />
    <main class="container" >
      <router-view />
    </main>
  </div>
</template>