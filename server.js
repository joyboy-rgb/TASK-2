const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory books data
let books = [
  { id: 1, title: '1984', author: 'George Orwell', available: true },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Add a book
app.post('/api/books', (req, res) => {
  const { title, author, available } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    available: available ?? true,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author, available } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.available = available !== undefined ? available : book.available;

  res.json(book);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const removed = books.splice(index, 1);
  res.json(removed[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Library API running at http://localhost:${PORT}`);
});
