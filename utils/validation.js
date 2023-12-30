const Joi = require("joi");

function createBookValidation(object) {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(50).required(),
    author: Joi.string().required(),
    desciption: Joi.string().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("hard cover", "soft cover").required()
    })

    return schema.validate(object);
}

function updateBookValidation(object) {
  const schema = Joi.object({
      title: Joi.string().trim().min(5).max(50),
      author: Joi.string(),
      desciption: Joi.string().min(5),
      price: Joi.number().min(0),
      cover: Joi.string().valid("hard cover", "soft cover")
    })

    return schema.validate(object);
}


function createAuthorValidation(object) {
  const schema = Joi.object({
      fName: Joi.string().trim().min(3).max(50).required(),
      lName: Joi.string().trim().min(3).max(50).required(),
      nationality: Joi.string().trim().min(5).max(50).required(),
      image: Joi.string().trim().min(5).max(50)
    })

    return schema.validate(object);
}

function updateAuthorValidation(object) {
  const schema = Joi.object({
    fName: Joi.string().trim().min(3).max(50),
    lName: Joi.string().trim().min(3).max(50),
    nationality: Joi.string().trim().min(5).max(50),
    image: Joi.string().trim().min(5).max(50)
    })

    return schema.validate(object);
}



function createUserRegisterValidation(object) {
  const schema = Joi.object({
      email: Joi.string().trim().min(10).max(50).required().email(),
      username: Joi.string().trim().min(3).max(50).required(),
      password: Joi.string().trim().min(8).required(),
    })

    return schema.validate(object);
}

function createUserLoginValidation(object) {
  const schema = Joi.object({
      email: Joi.string().trim().min(10).max(50).required().email(),
      password: Joi.string().trim().min(8).required(),
    })

    return schema.validate(object);
}

function updateUserValidation(object) {
  const schema = Joi.object({
      email: Joi.string().trim().min(10).max(50).email(),
      username: Joi.string().trim().min(8).max(50),
      password: Joi.string().trim().min(8),
    })

    return schema.validate(object);
}
module.exports = {
  createBookValidation,updateBookValidation, updateAuthorValidation, createAuthorValidation,
  createUserRegisterValidation, createUserLoginValidation, updateUserValidation
}
