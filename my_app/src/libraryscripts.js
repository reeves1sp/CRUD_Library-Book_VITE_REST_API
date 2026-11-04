import { ref } from 'vue';

// Library Management
    // Starter Libraries
export const libraries = ref([
{ libraryId: 1, name: 'Vestaburg Library', location: 'Vestaburg, MI', email: 'vslibrary@vcs-k12.net' },
{ libraryId: 2, name: 'Alma Public Library', location: 'Alma, MI', email: 'aslibrary@outlook.com' },
{ libraryId: 3, name: 'Alma College Bookstore', location: 'Alma, MI', email: 'acbookstore@alma.edu' },
]);

let nextId = 4;
export function getLibrary(libraryId) {     // Finds a library's value/data based off of the ID
    return libraries.value.find((a) => a.libraryId === Number(libraryId));
}
export function addLibrary(library) {       // Adds a library with empty info, increases the value of the nextID
    let currentId = libraries.value.length
    const nextId = currentId + 1
    libraries.value.push({ ...library, libraryId: nextId });
}
export function updateLibraryById(library) {    // Updates the data of a library by the given ID
    const index = libraries.value.findIndex((a) => a.libraryId === Number(library.libraryId));
    if (index === -1) throw new Error('Could not find that library.');
    libraries.value[index] = { ...library };
}
export function deleteLibraryById(libraryId) {  // Filters out a library of a specific ID so that it doesn't appear on the list.
    libraries.value = libraries.value.filter((a) => a.libraryId !== Number(libraryId));
}
