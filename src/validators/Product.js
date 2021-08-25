/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");

const validate = validations => {
  const val = async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().reduce((output, error) => {
      const { param, msg } = error;
      const outputResult = output;

      const currentValue = outputResult[param];
      if (!currentValue) {
        outputResult[param] = [];
      }
      outputResult[param].push(msg);

      return outputResult;
    }, {});

    res.status(400).json({ errors: extractedErrors });
  };
  return val;
};

function productValidate() {
  return validate([
    check("name", "Please enter a valid Name")
      .not()
      .isEmpty(),
    check("price", "Please enter a valid Price")
      .not()
      .isEmpty()
  ]);
}

function productIdValidate() {
  return validate([
    check("productId", "Please enter a valid Product Id")
      .not()
      .isEmpty()
  ]);
}

module.exports = {
  productValidate,
  productIdValidate
};
