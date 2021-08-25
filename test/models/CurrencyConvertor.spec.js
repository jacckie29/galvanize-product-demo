/* eslint-disable no-undef */
const { CurrencyConvertorModel } = require("../../src/models");

describe("Currecy API Testing", () => {
  test("Check Currency API", async () => {
    const result = await CurrencyConvertorModel.fetchLiveCurrency("INR_USD");
    expect(result).toHaveProperty("INR_USD");
  });
});
