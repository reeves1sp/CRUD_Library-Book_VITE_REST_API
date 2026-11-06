<script>
// UNUSED 
// Could not get the router links to work, so I used a different method that does not require this file.
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const API_BASE_URL = 'https://crud-library-book-vite-rest-api.onrender.com';

export default {
    setup() {
        const book = ref({
            entryId: '',
            name: '',
            author: '',
            genre: '',
            status: '',
            abstract: '',
        });
        return {
            book
        }
    }
}
const error = ref('');
const router = useRouter();

const createBook = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book.value),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(errorBody || 'Failed to create book.');
        }
        router.push({
            path: '/books/list',
            query: {
            message: `Book '${book.value.name}' created!`,
            },
        });
    } catch (e) {
        error.value = 'Error creating book: ' + e.message;
    }
};
</script>

<template>
    <form @submit.prevent="createBook">

        <p>
            <label for="name">Book Name:</label><br />
            <input type="text" id="name" v-model="book.name" required />
        </p>
        <p>
            <label for="author">Author:</label><br />
            <input type="text" id="author" v-model="book.author" required />
        </p>
        <p>
            <label for="genre">Genre:</label><br />
            <input type="text" id="genre" v-model="book.genre" required />
        </p>
        <p>
            <label for="status">Rented or Available:</label><br />
            <input type="text" id="genre" v-model="book.status" required />
        </p>
        <p>
            <button type="submit">Save New Book</button>
        </p>
    </form>
</template>