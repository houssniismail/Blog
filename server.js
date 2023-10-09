const express = require("express");
const bodyParser = require("body-parser");
const Posts = require('./postes');
const categores = require('./categories')
const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Posts.getAll(req, res);
});

app.get("/AddPost", (req, res) => {
  res.render("addPost");
});

app.post("/post/add", (req, res) => {
  Posts.AddPost(req, res,(err) => {
    if (err) {
      res.status(500).send("Error deleting the post");
    } else {
      res.redirect("/");
    }
  });
});

app.post("/post/delete", (req, res) => {
  Posts.DeletePost(req, res,(err) => {
    if (err) {
      res.status(500).send("Error deleting the pos");
    } else {
      res.redirect("/");
    }
  });
});

app.get('/blog/:id', (req, res) => {
  categores.getOneCategorie(req, res);
});

app.get('/add/categorie',(req,res)=>{
  res.render('addCategorie')
})

app.post('/categorie/add',(req,res)=>{
  categores.addOneCategorie(req,res,(err)=>{
    if(err){
      res.status(500).send("Error deleting the category");
    }
  })
})


app.post("/categorie/delete", (req, res) => {
  categores.deleteOneCategorie(req, res, (err) => {
    if (err) {
      res.status(500).send("Error deleting the pos");
    }
  });
});



app.listen(7000, "localhost", () => {
  console.log("Server is running on port 7000");
});
