const express = require('express');
const auth = require('../middleware/auth');
const {Book} = require('../models/book');
const router = express.Router()

router.get('/', async (req,res)=>{
    const books = await Book.find().populate('author','name email phoneNumber').populate('category','name -_id');
    res.send(books);
})

router.get('/:id', async(req,res)=>{
    const book = await Book.findById({_id: req.params.id}).populate('author', 'name email phoneNumber -_id').populate('category', 'name -_id');
    res.send(book);
})

router.post('/', auth, async(req,res)=>{
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
})

router.put('/:id', auth, async(req,res)=>{
    const book = await Book.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            title: req.body.title,
            category: req.body.category,
            publishedDate: req.body.publishedDate,
            author: req.body.author
        }
    }, {new: true})

    res.send(book);
})

router.delete('/:id', auth ,async(req,res)=>{
    const book = await Book.findByIdAndRemove(req.params.id);
    if(!book) return res.status(404).send("The book with the given ID was not found");

    res.send(book);
})

module.exports = router;

