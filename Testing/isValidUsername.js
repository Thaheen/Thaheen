function isValidusername(field) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(field);
}

module.exports=isValidusername