<script>

// UNUSED 
// Could not get the router links to work, so I used a different method that does not require this file.
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { libraries, addLibrary } from './libraryscripts.js'

const router = useRouter();
const API_BASE_URL = 'https://papers-knol.onrender.com/libraries'


export default {
    setup() {
        const library = ref({
            name: '',
            location: '',
            email: '',
        });
        return {
            library
        }
    }
}
const error = ref('');
const createLibrary = async () => {
try {
 const response = await fetch(`${API_BASE_URL}`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(library.value),
 });
 if (!response.ok) {
 const errorBody = await response.text();
 throw new Error(errorBody || 'Failed to create library.');
 }
 router.push({
 path: '/librariess/list',
 query: {
 message: `Library '${library.value.name}' created!`,
 },
 });
 } catch (e) {
 error.value = 'Error creating library: ' + e.message;
 }
};

</script>
<template>
    <form @submit.prevent="createLibrary">
        <p>
            <label for="name">Name:</label><br />
            <input type="text" id="name" v-model="library.name" required />
        </p>
        <p>
            <label for="location">Location:</label><br />
            <input type="text" id="location" v-model="library.location" />
        </p>
        <p>
            <label for="email">Email:</label><br />
            <input type="email" id="email" v-model="library.email" required />
        </p>
        <p>
            <button type="submit">Save New Library</button>
        </p>
    </form>
</template>