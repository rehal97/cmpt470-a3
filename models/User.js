
module.exports = User = {
    get: function(con, callback) {
      con.query("SELECT * FROM Users", callback);
    },
  
    getById: function(con, id, callback) {
      con.query(`SELECT * FROM Users WHERE UserID = ${id}`, callback);
    },
  
    create: function(con, data, callback) {
      con.query(
        `INSERT INTO Users SET 
        FirstName = '${data.fname}', 
        LastName = '${data.lname}', 
        Age = '${data.age}', 
        Email = '${data.email}'`,
        callback
      );
    },
  
    update: function(con, data, id, callback) {
      console.log("updating user with id: " + id);
      con.query(
        `UPDATE Users SET 
        FirstName = '${data.fname}', 
        LastName = '${data.lname}', 
        Age = '${data.age}', 
        Email = '${data.email}'
        WHERE UserID = ${id}`,
        callback
      );
    },
  
    destroy: function(con, id, callback) {
      con.query(`DELETE FROM Users WHERE UserID = ${id}`, callback);
    }
  }