<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { books, addBook, returnBookById, rentBookById, deleteBookById } from './bookscript.js';
const route = useRoute(); // Access the current route
// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');
// Functions
const deleteBook = (bookId, bookName) => {  // Deletes book with deleteBookById, optional messages
if (confirm(`Are you sure you want to delete book '${bookName}'?`)) {
    try {
        deleteBookById(bookId);
        message.value = `Book '${bookName}' deleted successfully!`; // Only visible in certain formats
        error.value = '';
    } catch (e) {   // Logs the error as an error message, sends to the user/console
        error.value = 'Error deleting book: ' + e.message;
        message.value = '';
    }
    }
}
</script>
<template>
    <div>
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
                        <button v-if="book.status === 'Rented'" @click="returnBookById(book.bookId, book.name)">Return</button>
                        <button v-if="book.status === 'Available'" @click="rentBookById(book.bookId, book.name)">Rent</button>
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
        <button @click="addBook('Unnamed')">Create New Library</button>
    </div>
</template>