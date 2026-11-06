

// Book Management

import { ref } from 'vue';
    // Starter Books
export const books= ref([
    { bookId: 1, name: 'The Lightning Thief', author: 'Rick Riordan', genre: 'Fantasy Fiction', status: 'Rented', libraries: [] },
    { bookId: 2, name: 'Into The Wild', author: 'Erin Hunter', genre: 'Fantasy Fiction', status: 'Available', libraries: [] },
    { bookId: 3, name: 'The Dragonet Prophecy', author: 'Tui T. Sutherland', genre: 'Fantasy Fiction', status: 'Rented', libraries: [] },
]);

let nextId = 4;
export function getBook(bookId) {       // Grabs a book's values/data based off the given ID
    return books.value.find((a) => a.bookId === Number(bookId));
}
export function addBook(book) {         // Adds a book with empty values/data, increases the nextID by 1
let currentId = books.value.length
const nextId = currentId + 1
books.value.push({ ...book, bookId: nextId });
}
export function updateBookById(book) {  // Updates the book with new values/data, based off of the given ID
const index = books.value.findIndex((a) => a.bookId === Number(book.bookId));
if (index === -1) throw new Error('Could not find that book.');
books.value[index] = { ...book };
}
export function deleteBookById(bookId) {    // Filters out a book based off of the ID, making it invisible
books.value = books.value.filter((a) => a.bookId !== Number(bookId));
}
    // Rent/Return Functions
export function returnBookById(bookId) { // Changes the Status of a book to 'Available'
    const book = getBook(bookId);
    if (book) {
        book.status = 'Available'
        return true;
    }
    return false;
}
export function rentBookById(bookId) { // CHanges the Status of a book to 'Rented'
    const book = getBook(bookId)
    if (book) {
        book.status = 'Rented'
        return true;
    }
    return false;
}

