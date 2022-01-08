
const validate = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({
    [property]: req[property]
  })

  console.log('value', value, 'error', error)
  const hasError = error

  if(hasError){
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
