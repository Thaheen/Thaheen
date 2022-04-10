function isValidPassowrd(field) {
    const strongPass = new RegExp(
        // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
      );
      return strongPass.test(field);
}

module.exports = isValidPassowrd
  ;