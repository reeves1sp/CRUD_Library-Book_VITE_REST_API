<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_BASE_URL = 'https://rest-library.onrender.com/books'

const book = ref({
    name: '',
    author: '',
    genre: '',
    status: '',
});
const error = ref('');

const createBook = async () => {
    try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json ' },
            body: JSON.stringify(book.value)
        });
        if (!response.ok) throw new Error( await response.text() || 'Failed to create new book.');
        router.push({
            pather: '/books/list',
            query: { message: `Book '${book.value.name}' created!` },  
        });
    } catch (e) {
        error.value = 'Error creating book: ' + e.message;
    }
};

</script>
<template>
    <div class="book-create">
        <h1>+ Create New Book</h1>
        <div v-if="error" class="alert error"><p>{{  error  }}</p></div>
        <form @submit.prevent="createBook">
            <p>
                <label for="name">Name:</label><br />
                <input type="text" id="name" v-model="book.name" required />
            </p>
            <p>
                <label for="author">Author:</label><br />
                <input type="text" id="location" v-model="book.author" required />
            </p>
            <p>
                <label for="genre">Genre:</label><br />
                <input type="text" id="genre" v-model="book.genre" required />
            </p>
            <p>
                <label for="status">Rented or Available:</label><br />
                <input type="text" id="status" v-model="book.status" required />
            </p>
            <p><button type="submit">Save New Book</button></p>
        </form>
    </div>
</template>