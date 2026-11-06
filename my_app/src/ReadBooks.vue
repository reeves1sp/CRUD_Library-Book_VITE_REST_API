<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute(); // Access the current route
// Read flash message/error from query parameters on load
const books = ref([]);
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');
const API_BASE_URL = 'https://rest-library.onrender.com/books'
// Functions

const fetchBooks = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch books.');
        books.value = await response.json();
    } catch (e) { error.value = 'Error loading books: ' + e.message; }
};

const deleteBook = async (bookId, bookName) => {
    if (confirm(`Are you sure you want to delete '${bookName}'?`)) {
        try {
            const response = await fetch(`${API_BASE_URL}/${bookId}`, {method: 'DELETE' });
            if (!response.ok) throw new Error(`Deletion failed: ${response.status}`);    
            await fetchBooks();
            message.value = `Book '${bookName}' deleted!`;
        } catch (e) { error.value = 'Error deleting book: '+ e.message; }
    }
};

const returnBook = async (bookId) => {
    try {
            const book = books.value.find((a) => a.bookId === Number(bookId));
        if (book) {
            book.status = 'Available'
            return true;
        }
        return false;
    } catch (e) { error.value = 'Error returning book: ' + e.message }
};

const rentBook = async (bookId) => {
    try {
        const book = books.value.find((a) => a.bookId === Number(bookId));
        if (book) {
            book.status = 'Rented'
            return true;
        }
        return false;
    } catch (e) { error.value = 'Error renting book: '+ e.message}
}

onMounted(fetchBooks);
</script>
<template>
    <div class="book-list">
        <h1>Book Management</h1>
        <div v-if="message" class="alert success"><p>{{  message  }}</p></div>
        <div v-if="error" class="alert error"><p>{{  error  }}</p></div>
        <h2>Current Books ({{  books.length  }})</h2>
        <table border="1">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.bookId">
                    <td>{{ book.bookId }}</td>
                    <td>
                        <router-link :to="{ name: 'UpdateBook', params: { bookId:book.bookId } }">{{ book.name }}</router-link>
                    </td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.status }}</td>
                    <td>
                        <button v-if="book.status === 'Rented'" @click="returnBook(book.bookId)">Return</button>
                        <button v-if="book.status === 'Available'" @click="rentBook(book.bookId, book.name)">Rent</button>
                    </td>
                    <td>
                        <button @click="deleteBook(book.bookId, book.name)">Delete</button>
                    </td>
                    <td>
                        <router-link :to="{ name: 'UpdateBook', params: { bookId: book.bookId } }" custom v-slot="{ navigate }">
                            <button @click="navigate" role="link" class="router-button">Update</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        <div class="book-create">
        <p><router-link to="/books/create">+ Add New Book</router-link></p>
    </div>
</template>