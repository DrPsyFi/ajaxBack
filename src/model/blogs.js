const fs = require('fs')

///////  Lines Below are to create dynamic file paths ///////////
const path = require('path')
const filePath = path.join('__dirname../../db.json' )
///////////////////////////////////////////////////////////////

const db =JSON.parse(fs.readFileSync(filePath, 'utf-8' ))


function getAllBlogs() {
  return db.blogs;
}

function getBlogsId(id) {
  return db.blogs.find((blogs) => {
  return blogs.id === parseInt(id);
  });
}

function createBlog (title, content) {

  const lastBlogs = db.blogs[db.blogs.length-1];
  const newBlog = { id: lastBlogs.id+1, title, content};
    db.blogs.push(newBlog)
  const contentsAsJSON = JSON.stringify(db)
  const result = fs.writeFileSync(filePath, contentsAsJSON)

  return newBlog;
}

function updateBlogs(id, title, content) {

  let blogs2Update = db.blogs.find((blogs) => {
   return blogs.id === parseInt(id);
   })
    blogs2Update.title= title
    blogs2Update.content= content

    const updatedBlogs = {id , title, content };

    const contentsAsJSON = JSON.stringify(db)
    const result = fs.writeFileSync(filePath, contentsAsJSON)
  }

function deleteBlogs(id) {
  let blogs2Delete = db.blogs.findIndex((blogs) => {
   return blogs.id === parseInt(id);
   })

   const deletedBlogs = db.blogs.splice(blogs2Delete, 1)

   const contentsAsJSON = JSON.stringify(db)
   const result = fs.writeFileSync(filePath, contentsAsJSON)

}



module.exports = {
  getAllBlogs,
  getBlogsId,
  createBlog,
  updateBlogs,
  deleteBlogs
};
