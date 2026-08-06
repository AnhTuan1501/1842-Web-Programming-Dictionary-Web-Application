// npm install express mongoose cors dotenv
import Book from "../models/bookModel.js";

// GET /api/books
export async function getAllBooks(req, res) {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve books.',
            error: error.message
        })
    }
}

// GET /api/books/:id
export async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({
                message: 'Book not found.'
            })
        }

        res.json(book)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot retrieve a book.',
            error: error.message
        })
    }
}

// POST /api/books
export async function createBook(req, res) {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author
        })

        const savedBook = await book.save()

        res.status(201).json(savedBook)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot create a book.',
            error: error.message
        })
    }
}

// PUT /api/books/:id
export async function updateBook(req, res) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found.'
            })
        }

        res.json(updatedBook)
    } catch (error) {
        res.status(500).json({
            message: 'Cannot create a book.',
            error: error.message
        })
    }
}

// DELETE /api/books/:id
export async function deleteBook(req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found.'
            })
        }

        res.json({
            message: 'Book deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Cannot create a book.',
            error: error.message
        })
    }
}