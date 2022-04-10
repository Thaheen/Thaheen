function IsValidPhone(field){
    const RegxPhone = /^[0-9]*$/;
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return RegxPhone.test(field) &&regex.test(field) ;
}
module.exports=IsValidPhone