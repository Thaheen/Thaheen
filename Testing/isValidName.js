function isValidName(field) {
    const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
    return RegxOfNames.test(field) && (field.replace(/\s/g, "") !='');
}

module.exports=isValidName;