const express = require('express')
const router = express.Router()
const controller = require('../controller/blogs')

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogsId);
router.post('/', controller.createBlogs);
router.put('/:id', controller.updateBlogs)
router.delete('/:id', controller.deleteBlogs)

module.exports = router;
