<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// --- State Definitions using ref ---
const libraries = ref([]);
const route = useRoute(); // Access the current route
// Read flash message/error from query parameters on load
const message = ref(route.query.message || '');
const error = ref(route.query.error || '');
const API_BASE_URL = 'https://rest-library.onrender.com/libraries'

const fetchLibraries = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch libraries.');
        libraries.value = await response.json();
    } catch (e) {
        error.value = 'Error loading libraries: ' + e.message;
    }
};

const deleteLibrary = async (libraryId, libraryName) => {
    if (confirm(`Are you sure you want to delete '${libraryName}'?`)) {
        try {
            const response = await fetch(`${API_BASE_URL}/${libraryId}`, { method: 'DELETE'});
            if (!response.ok) throw new Error(`Deletion failed: ${response.status}`);
            await fetchLibraries();
            message.value = `Library '${libraryName}' deleted!`;
        } catch (e) {
            error.value = 'Error deleting library: ' + e.message;
        }
    }
};

onMounted(fetchLibraries);
</script>
<template>
    <div class="library-list">
        <h1>Library Management</h1>
        <div v-if="message" class="alert success"><p>{{  message  }}</p></div>
        <div v-if="error" class="alert error"><p>{{ error }}</p></div>
        <h2>Current Libraries ({{ libraries.length }})</h2>
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
    </div>
    <div class="library-create">
        <p><router-link to="/libraries/create">+ Add New Library</router-link></p>
    </div>
</template>