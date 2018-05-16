const express = require('express')
const router = express.Router()
const controller = require('../controller/blogs')

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogId);
router.post('/', controller.createBlog);
router.put('/:id', controller.updateBlog)
router.delete('/:id', controller.deleteBlog)
module.exports = router;
