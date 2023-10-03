const Posts = require('./post');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

let getAll = (req, res) => {
  Posts.getAll(function (err, rows) { 
    if (err) {
      console.error('Error:', err);
      res.render("index", { title: "Express Demo", data: [] });
    } else {
      res.render("index", { title: "Express b", data: rows });
    }
  });
}

let AddPost = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('File Upload Error:', err);
      return res.status(500).send('File upload failed.');
    }

    const { titre, description } = req.body;
    const uploadedImage = req.file;
    const imageFileName = uploadedImage.filename;
    Posts.AddPost(titre, description, imageFileName, function (err) {
      if (err) {
        console.error('Database Insertion Error:', err);
        return res.status(500).send('Database insertion failed.');
      }
      res.redirect('/');
    });
  });
};





let DeletePost = (req,res) => {
  const {id} = req.body;
  Posts.DeletePost(id,function(err){
    if(err){
      console.error('Error:', err)
    } else {
      res.redirect("/");
    }
  })
}
module.exports = { getAll, AddPost, DeletePost};
