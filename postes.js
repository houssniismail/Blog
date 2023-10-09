const Posts = require('./post');
const categores = require('./categorie')
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

const getAll = async (req, res) => {
  try {
    const posts = await new Promise((resolve, reject) => {
      Posts.getAll((err, rows) => {
        if (err) {
          console.error('Error:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const categories = await new Promise((resolve, reject) => {
      categores.getCategories((err, rows) => {
        if (err) {
          console.error('Error:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.render("index", {
      title: "Express",
      data: posts,
      titleC: "Categories",
      data_categories: categories,
    });
  } catch (err) {
    res.render("index", { title: "Express Demo", data: [], titleC: "Express Demo", data_categories: [] });
  }
};


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
