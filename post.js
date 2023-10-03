let conn = require('./database');
let getAll = (callback) => {
  conn.query('SELECT * FROM post', function (err, rows) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};


let AddPost = (titre, description, image, callback) => {
  var query = 'INSERT INTO `post`(`titre`, `description`, `image`, `date_de_creation`) VALUES (?,?,?,NOW())';
  conn.query(query, [titre, description,image], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}


let DeletePost = (id,callback)=>{
  var query = 'DELETE FROM `post` WHERE `id` =?';
  conn.query(query,[id],function(err){
    if(err){
      callback(err);
    }else{
      callback(null)
    }
  })
}
module.exports = { getAll, AddPost ,DeletePost};



