<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const API_BASE_URL = 'https://rest-library.onrender.com/books'
    const LIBRARIES_API_URL = 'https://rest-library.onrender.com/libraries'

    const book = ref({  // Object traits for Book
        bookId: null,
        name: '',
        author: '',
        genre: '',
        status: '',
        libraries: [],

    });
    const error = ref('');
    const allLibraries = ref([]);
    const selectedLibraryId = ref('');

    const fetchBookDetails = async () => {    // Grabs the information of a Book with getBook(bookId)
        try {
            const res = await fetch(`${API_BASE_URL}/${route.params.bookId}`);
            if (!res.ok) throw new Error('Could not find that book.');
            book.value = await res.json();
        } catch (e) {
            error.value = "Error pre-loading: "+ e.message;
        }
    };

    const fetchAllLibraries = async () => {
        const res = await fetch(LIBRARIES_API_URL);
        allLibraries.value = await res.json();
    };



    const updateBook = async () => { // Pushes the user to the Update page
        try {
            const res = await fetch(`${API_BASE_URL}/${book.value.bookId}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book.value),
            });
            if (!res.ok) throw new Error('Failed to update book.');
                router.push({ path: 'books/list', query: { message: 'Book updated. ' } });

        } catch (e) { error.value = 'Error saving: ' + e.message; }
    };

    const removeLibrary = async (libraryId) => {
        const res = await fetch(`${API_BASE_URL}/${book.value.bookId}/libraries/${library.Id}`,
            { method: 'DELETE' });
            if (!res.ok) alert('Failed to remove library from book.');
            else await fetchBookDetails();
    };

    const addLibrary = async () => {
        if (!selectedLibraryId.value) return;
        const res = await fetch(`${API_BASE_URL}/${book.value.bookId}/libraries/${selectedLibraryId.value}`, { method: 'PUT' });
        if (!res.ok) alert('Failed to add library to book.');
        else { selectedLibraryId.value = ''; await fetchBookDetails(); }
    };

    onMounted(() => { fetchBookDetails(); fetchAllLibraries(); });
</script>
<template>
    <div class="book-update">
        <h1>Updating Book</h1>
        <div v-if="error" class="alert error"><p>{{  error  }}</p></div>
    <form v-if="book.bookId" @submit.prevent="updateBook">
        <input type="hidden" v-model="book.bookId" />
        <p>
            <label for="bookId">Entry ID:</label><br />
            <input type="text" id="bookId" v-model="book.bookId" readonly />
        </p>
        <p>
            <label for="name">Name:</label><br />
            <input type="text" id="title" v-model="book.name" required />
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
            <input type="text" id="status" v-model="book.status" required />
        </p>
        <p>
            <label for="abstract">Abstract</label><br />
            <textarea id="abstract" v-model="book.abstract" rows="5" cols="50"></textarea>
        </p>
        <p>
            <button type="submit">Update Book</button>
        </p>
    </form>
    <div v-else-if="!error">
        <p>Loading book details...</p>
    </div>
    <div v-if="book.bookId" class="libraries-section">
        <hr /><h2>Libraries of this Book</h2>
        <ul>
            <li v-for="library in book.libraries" :key="library.libraryId">
                {{  library.name  }} ({{  library.location  }})
                <button @click.prevent="removeLibrary(library.libraryId)">Remove</button>
            </li>
        </ul>
        <li v-if="!book.libraries || book.libraries.length === 0">No Libraries Assigned</li>
        <h3>Add a Library</h3>
        <select v-model="selectedLibraryId">
            <option disabled value="">Please select one</option>
            <option v-for="l in allLibraries" :key="l.libraryId" :value="l.libraryId">
                {{  l.name  }}
            </option>
        </select>
        <button @click.prevent="addLibrary" :disabled="!selectedLibraryId">Add Library</button>
    </div>
    <p><router-link to="/books/list">Back to Books List</router-link></p>
    </div>
</template>