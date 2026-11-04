LAYOUT:

Libraries:
> Array of lists inside a list
    > IDs: Name, Location, Manager, Email
    > Example: Vestaburg Community Library, Vestaburg MI, Dan Snyder, vblibrary@vcs-k12.net
Books:
> Array of lists inside a list
    >IDs: Title, Author (Not List Specific), Genre, Status (Rented vs Available), Library
    >Example: The Lightning Thief, Rick Riordan, Fantasy Fiction, Available, Vestaburg Library

Creation:
> Create a Book
> Create a Library

Renting/Returning:
> Rent a Book
    > Takes a book (by ID), updates the Status to Rented
> Return a Book
    > Takes a book (by ID), updates the Status to Available
    

Read:
> Load all Books into a List with Info
    > Each book has a hyperlink for the Status (if Available, link to Rent a Book page. If Rented, link to Return a Book page.)
> Load all Libraries into a List with Info

Update:
> Have a hyperlink on the bottom of the Book/Library Read page for editing.
> Each book will have a hyperlink on the Status column, linking to either the Rent a Book page or the Return a Book page depending on the status of the book.

Delete:
> Each Read page will have a hyperlink on the bottom alongside the Update hyperlink for removing a book/library.