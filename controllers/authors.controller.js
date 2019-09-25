const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author.model');
const ErrorWithHttpsSatus = require('../utils/ErrorWithHttpStatus');

exports.signup = async (request, response, next) => {
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, 2);
    console.log('in the controller');
    await Author.insert({
      name: request.body.name,
      password: hashedPassword,
    });
    response.status(201).send('Signed up!');
  } catch (error) {
    next(error);
  }
};

exports.login = async (request, response, next) => {
  try {
    // 1. get the author
    const author = await Author.select(request.body.name);

    // 2. check if they exist
    if (!author) throw new ErrorWithHttpsSatus('user does not exist', 404);

    // 3. check if the password matches
    const isMatch = await bcrypt.compare(
      request.body.password,
      author.password
    );

    if (!isMatch) throw new ErrorWithHttpsSatus('Password is incorrect', 401);
    const token = jwt.sign(author.name, process.env.JWT_SECRET);
    response.send({ message: 'You got the logged in!', token });
  } catch (error) {
    next(error);
  }
};
