module.exports = function(status, data, errors) {
  if(status) {
    return {
      success : status,
      data: data,
      errors: null
    }
  } else {
    return {
      success : status,
      data: null,
      errors: errors
    }
  }
}