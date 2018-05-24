
const model = require("../model/blogs")

const getAllBlogs = (req, res, next) => {
  const blogs = model.getAllBlogs();
  res.status(200).json({ data: blogs });
};

const getBlogsId = (req, res, next) => {
  const id = req.params.id;
  const blogs = model.getBlogsId(id);
  if (blogs) return res.status(200).json({ data: blogs });
  next({ status: 404, message: `Blogs ${id} not found` });
}

const createBlogs = (req, res, next) => {
  const { title, content } = req.body
  
  if (!title || !content) {
    return next ({ status: 400, message: "You need to provide a title and content to create a post."})
  }
  else {
    const newBlog = model.createBlog(title, content);
    res.status(201).json({ data: newBlog});
  }
}

const updateBlogs = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title
  const content = req.body.content

  if(!id || !title || !content) {
    return next ({ status: 400, message: "You need to submit the following info to update : id, title, content"})
  }
  else {
    const updatedBlog = model.updateBlogs(id, title, content)
    res.status(200).json({data: updatedBlog})
  }
}

const deleteBlogs = (req, res, next) => {
  const id = req.params.id
  const deletedBlog = model.deleteBlogs(id)

  if(!id) {({status: 404, message: `Blog ${id} was not found.`})
    return next
  }
  else {
    res.status(204).json()
  }
}
module.exports = {
  getAllBlogs,
  getBlogsId,
  createBlogs,
  updateBlogs,
  deleteBlogs,
};
