
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_BASE_URL = 'https://rest-library.onrender.com/libraries'

const library = ref({
    name: '',
    location: '',
    email: '',
});
const error = ref('');

const createLibrary = async () => {
    try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json ' },
            body: JSON.stringify(library.value)
        });
        if (!response.ok) throw new Error( await response.text() || 'Failed to create new library.');
        router.push({
            pather: '/libraries/list',
            query: { message: `Library '${library.value.name}' created!` },  
        });
    } catch (e) {
        error.value = 'Error creating library: ' + e.message;
    }
};

</script>
<template>
    <div class="library-create">
        <h1>+ Create New Library</h1>
        <div v-if="error" class="alert error"><p>{{  error  }}</p></div>
        <form @submit.prevent="createLibrary">
            <p>
                <label for="name">Name:</label><br />
                <input type="text" id="name" v-model="library.name" required />
            </p>
            <p>
                <label for="location">Location</label><br />
                <input type="text" id="location" v-model="library.location" required />
            </p>
            <p>
                <label for="email">Email:</label><br />
                <input type="text" id="email" v-model="library.email" required />
            </p>
            <p><button type="submit">Save New Library</button></p>
        </form>
    </div>
</template>