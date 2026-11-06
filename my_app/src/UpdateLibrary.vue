<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const API_BASE_URL = 'https://rest-library.onrender.com/libraries';
const BOOKS_API_URL = 'https://rest-library.onrender.com/books';


const library = ref({   // Object traits for each Library
    libraryId: null,
    name: '',
    location: '',
    email: '',
    books: []
});
const error = ref('');
const allBooks = ref([]);
const selectedBookId = ref('');

const fetchLibraryDetails = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/${route.params.libraryId}`);
        if (!res.ok) throw new Errow('Could not find that library');
        library.value = await res.json();
    } catch (e) { error.value = 'Error pre-loading: ' + e.message; }
};

const updateLibrary = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/${library.value.libraryId}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(library.value),
        });
        if (!res.ok) throw new Error('Failed to update library');
            router.push({ path: '/libraries/list', query: { message: 'Library updated!' } });
    } catch (e) { error.value = 'Error saving: '+ e.message; }
};

const fetchAllBooks = async () => {
    const res = await fetch(BOOKS_API_URL);
    allBooks.value = await res.json();
};

const removeBook = async (bookId) => {
    const res = await fetch(`${API_BASE_URL}/${library.value.libraryId}/books/${bookId}`,
        { method: 'DELETE' });
    if (!res.ok) alert('Failed to remove book.');
    else await fetchLibraryDetails();
};

const addBook = async () => {
    if (!selectedBookId.value) return;
    const res = await fetch(`${API_BASE_URL}/${library.value.libraryId}/books/${selectedBookId.value}`, { method: 'PUT' });
    if (!res.ok) alert('Failed to add book.');
    else { selectedBookId.value = ''; await fetchLibraryDetails(); }
};

onMounted(() => { fetchLibraryDetails(); fetchAllBooks(); });

</script>
<template>
    <div class="library-update">
        <h1>Updating Library</h1>
    <form v-if="library.libraryId" @submit.prevent="updateLibrary">
                <input type="hidden" v-model="library.libraryId" />
        <p>
            <label for="libraryId">Entry ID:</label><br />
            <input type="text" id="libraryId" v-model="library.libraryId" readonly />
        </p>
        <p>
            <label for="name">Name:</label><br />
            <input type="text" id="name" v-model="library.name" required />
        </p>
        <p>
            <label for="location">Location:</label><br />
            <input type="text" id="location" v-model="library.location" required />
        </p>
        <p>
            <label for="email">Email:</label><br />
            <input type="email" id="email" v-model="library.email" required />
        </p>
        <p>
            <button type="submit">Update Library</button>
        </p>
    </form>
    <div v-else-if="!error">
        <p>Loading Library Details...</p>
    </div>
    <div v-if="library.libraryId" class="books-section">
        <hr /><h2>Books in this Library</h2>
        <ul>
            <li v-for="book in library.books" :key="book.bookId">
                {{  book.name }} ({{ book.genre }})
                <button @click.prevent="removeBook(book.bookId)">Remove</button>
            </li>
        </ul>
        <p v-if="!library.books || library.books.length === 0">No Books Assigned</p>
        <h3>Add a Book</h3>
        <select v-model="selectedBookId">
            <option disabled value="">Please select one</option>
            <option v-for="b in allBooks" :key="b.bookId" :value="b.bookId">
                {{ b.name }}
            </option>
        </select>
        <button @click.prevent="addBook" :disabled="!selectedBookId">Add Book</button>
    </div>
    <p><router-link to="/libraries/list">Back to Libraries</router-link></p>
    </div>
</template>
