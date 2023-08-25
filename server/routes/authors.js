const express = require('express');
const {Author} = require('../models/author');
const auth = require('../middleware/auth');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req,res)=>{
    const authors = await Author.find();
    res.send(authors);
})

router.get('/:id', async (req,res)=>{
    const author = await Author.findById({_id: req.params.id});
    if(!author) return res.status(404).send("Author Not Found");
    res.send(author);
})

router.post('/', auth, async(req,res)=>{
    let author = await Author.findOne({email: req.body.email});
    if(author) return res.status(400).send('Author is Already Existed!');

    author = new Author(req.body);
    author.save();
    res.status(201).send(author);
})

router.put('/:id', auth, async(req,res)=>{
    await Author.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            about: req.body.about,
            job: req.body.job
        }
    })

    res.send('Updated Successfully');
})

router.delete('/:id', auth, async(req,res)=>{
    const author = await Author.findByIdAndRemove({_id: req.params.id});
    if(!author) return res.status(404).send('The author with the given ID was not found');

    res.send(author);
})

module.exports = router;

