const db = require('../db');
const ErrorWithHttpsSatus = require('../utils/ErrorWithHttpStatus');

exports.insert = async ({ name, password }) => {
  console.log(password);
  try {
    if (!password || !name) throw new ErrorWithHttpsSatus('Missing props', 400);

    const result = await db.query(
      'INSERT INTO author(name, password) VALUES ($1,$2)',
      [name, password]
    );
    return result;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpsSatus) throw err;
    else throw new ErrorWithHttpsSatus('Database error');
  }
};

exports.select = async name => {
  try {
    const sql = `SELECT * FROM author WHERE name = $1`;
    const result = await db.query(sql, [name]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new ErrorWithHttpsSatus('Database error');
  }
};
