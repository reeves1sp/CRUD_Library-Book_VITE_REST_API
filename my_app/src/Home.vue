<script setup></script>
<template>
   <p>Manage the authors and papers in your collection.</p>
 <div class="home-links">
    <router-link to="/libraries/list" class="home-link"> Libraries </router-link>
    <router-link to="/books/list" class="home-link"> Books </router-link>
 </div>
</template>

<style>
.container { max-width: 600px; margin: 50px auto; padding: 20px;
 border: 1px solid #ccc; border-radius: 8px; text-align: center;
 font-family: Arial, sans-serif; }
.links { margin-top: 20px; display: flex; flex-direction: column;
 gap: 12px; align-items: center; }
.links a { display: block; width: 260px; padding: 15px;
 text-decoration: none; background: #007bff; color: #fff;
 border-radius: 5px; font-size: 1.05rem; text-align: center; }
.links a:hover { background: #0056b3; }
</style>

