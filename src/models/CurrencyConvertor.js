const fetch = require("node-fetch");
const { API_CONFIG } = require("../config");

const { CURRENCY_CONVERTOR_KEY, CURRENCY_CONVERTOR_URL } = API_CONFIG;

async function fetchLiveCurrency(currency) {
  const url = `${CURRENCY_CONVERTOR_URL}?q=${currency}&compact=ultra&apiKey=${CURRENCY_CONVERTOR_KEY}`;

  const response = await fetch(url);
  return response.json();
}

const CurrencyConvertorModel = {
  fetchLiveCurrency
};

module.exports = {
  CurrencyConvertorModel
};
