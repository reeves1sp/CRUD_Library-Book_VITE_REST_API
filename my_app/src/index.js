import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue';
import ReadLibraries from './ReadLibraries.vue';
import ReadBooks from './ReadBooks.vue';
import CreateLibrary from './CreateLibrary.vue';
import CreateBook from './CreateBook.vue';
import UpdateLibrary from './UpdateLibrary.vue';
import UpdateBook from './UpdateBook.vue';
// API KEY: rnd_um87tyHRlV4O0powcRCgAOWnVqaB

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/libraries/list',
      name: 'ReadLibraries',
      component: ReadLibraries
    },
    {
      path: '/books/list',
      name: 'BooksList',
      component: ReadBooks
    },
    {
      path: '/libraries/create',
      name: 'CreateLibrary',
      component: CreateLibrary
    },
    {
      path: '/books/create',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/books/update/:bookId',
      name: 'UpdateBook',
      component: UpdateBook
    },
    {
      path: '/libraries/update/:libraryId',
      name: 'UpdateLibrary',
      component: UpdateLibrary
    }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router
