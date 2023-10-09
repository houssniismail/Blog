const conn = require("./database");

const getCategories = (callback) => {
    conn.query('SELECT * FROM `categore`', function (err, rows) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, rows)
        }
    })
}

const getOneCategorie = (id, callback) => {
    const query = 'SELECT * FROM `categore` WHERE id=?';
    conn.query(query, [id], function (err, rows) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  };

const addOneCategorie =(titre,callback) => {
    var query = 'INSERT INTO `categore`(`titre`) VALUES (?)';
    conn.query(query, [titre], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

const updateOneCategorie = () => {

}

let deleteCategorie = (id, callback) => {
  const query = 'DELETE FROM `categore` WHERE id = ?';
  conn.query(query, [id], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};




module.exports = { getCategories, getOneCategorie, addOneCategorie, updateOneCategorie, deleteCategorie}