function IsValidCapacity(field){
  const RegxPass = /^[0-9]*$/
  return (RegxPass.test(field) && !(field < 2 || field > 100))
};
  module.exports = IsValidCapacity
  ;