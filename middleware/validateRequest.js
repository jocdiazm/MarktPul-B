
const validate = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({
    [property]: req[property]
  })
  const hasError = error

  if(hasError){
    console.log('error in validate')
    return res.status(400).json({
      error: `${error.details[0].message}`
    })
  }
  // req.body = value;
  next()
}


module.exports = {
  validate,
}
