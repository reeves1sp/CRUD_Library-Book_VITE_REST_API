<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { libraries, addLibrary, deleteLibraryById } from './libraryscripts.js';
// --- State Definitions using ref ---
const route = useRoute(); // Access the current route
const router = useRouter();
// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');
// --- Functions ---
const deleteLibrary = (libraryId, libraryName) => { // Deletes the Library with the deleteLibrary(libraryId) function
    if (confirm(`Are you sure you want to delete library '${libraryName}'?`)) {
        try {
        deleteLibraryById(libraryId);
        message.value = `Library '${libraryName}' deleted successfully!`;
        error.value = '';
        } catch (e) {
        error.value = 'Error deleting Library: ' + e.message;
        message.value = '';
        }
    }
};

</script>
<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="library in libraries" :key="library.libraryId">
                <td>{{ library.libraryId }}</td>
                <td>
                <router-link :to="{ name: 'UpdateLibrary', params: { libraryId: library.libraryId } }">
                {{ library.name }}
                </router-link>
                </td>
                <td>{{ library.location }}</td>
                <td>{{ library.email }}</td>
                <td>
                <button @click="deleteLibrary(library.libraryId, library.name)">Delete</button>
                </td>
                <td>
                <router-link :to="{ name: 'UpdateLibrary', params: { libraryId: library.libraryId } }" custom v-slot="{ navigate }">
                    <button @click="navigate" role="link" class="router-button">Update</button>
                </router-link>
                </td>
                </tr>
            </tbody>
        </table>
        <button @click="addLibrary('Unnamed')">Create New Library</button>
    </div>
</template>