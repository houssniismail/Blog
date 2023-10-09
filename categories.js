const categores = require('./categorie');

let getAllCategories = (err, res) => {
  categores.getCategories(function (err, rows) {
    if (err) {
      console.err('error', err)
      res.render("index", { titreC: "Express Demo", data_categories: [] })
    } else {
      res.render("index", { titleC: "Catigories", data_categories: rows })
    }
  })
}

let getOneCategorie = (req, res) => {
  const postId = req.params.id;
  categores.getOneCategorie(postId, (err, post) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (post.length > 0) {
      res.render('oneCategorie', { post: post[0] });
    } else {
      res.redirect('/');
    }
  });
};

let addOneCategorie = (req, res) => {
  const { titre } = req.body;
  categores.addOneCategorie(titre, function (err) {
    if (err) {
      console.error('Database Insertion Error:', err);
      return res.status(500).send('Database insertion failed.');
    } else {
      res.redirect('/categorie/get');
    }

  });
}


let deleteOneCategorie = (req, res) => {
  const { id } = req.body;
  categores.deleteCategorie(id, function (err) {
    if (err) {
      console.error('Error:', err)
    } else {
      res.redirect("/categorie/get");
    }
  })
}


module.exports = { getAllCategories, getOneCategorie, addOneCategorie, deleteOneCategorie }