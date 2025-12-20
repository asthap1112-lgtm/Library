const express = require('express');
const Book = require('../models/book');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const { title, author, publishedYear, category } = req.body;

    if (!title || !author || !publishedYear || !genre)
      return res.status(400).json({ message: 'All fields required' });

    const book = await Book.create({
      title,
      author,
      publishedYear,
      category
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/', async (req , res) => {
  try{
    console.log('Update ID:', req.params.id);
    console.log('Update Body:', req.body);

    const updatedbook = await
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true}
    );
    if(!updatedbook) {
      return res.status(404).json({message:'Book not found'});
    }
    res.status(200).json({message:'Book updated successfully', book: updatedbook});
} catch(error) {
  console.error('Update error:', error);
  res.status(500).json({message: 'Update failed', error: error.message});
}
});
router.delete('/',async (req , res) => {
  try{
   const book = await 
    Book.findByIdAndDelete(req.params.id);
     if(!book){
      return res.status(404).json({message:'Book not found'});
     }

    res.json({message: "Book deleted successfully" });
  } catch(err) {
    res.status(500).json({message: "Delete failed" });
  }
});
module.exports = router;
