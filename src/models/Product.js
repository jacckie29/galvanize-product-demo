const { CurrencyConvertorModel } = require("./CurrencyConvertor");
const { POSTGRES_CONFIG, API_CONFIG } = require("../config");

const { getDBClient } = POSTGRES_CONFIG;
const { DEFAULT_LIMIT } = API_CONFIG;

async function addProduct(params) {
  const knex = await getDBClient();
  let result = null;
  try {
    result = await knex("product")
      .insert(params)
      .returning([
        "product_id",
        "name",
        "price",
        "description",
        "status",
        "views"
      ]);
  } catch (e) {
    console.error(e);
    result = "No Record Inserted";
  }
  return result;
}

async function deleteProduct(params) {
  const knex = await getDBClient();
  let result = null;
  try {
    result = await knex("product")
      .where("product_id", params.productId)
      .update({ status: "inactive" })
      .returning([
        "product_id",
        "name",
        "price",
        "description",
        "status",
        "views"
      ]);
    if (result.length === 0) result = "No Record Found";
  } catch (e) {
    console.error(e);
    result = "No Record Found";
  }
  return result;
}

async function fetchProduct(params) {
  let currencyData = 1;
  const { currency = "INR" } = params;
  if (currency !== "INR") {
    const currencyResult = await CurrencyConvertorModel.fetchLiveCurrency(
      `INR_${params.currency}`
    );

    if (currencyResult[`INR_${params.currency}`])
      currencyData = currencyResult[`INR_${params.currency}`];
  }

  const knex = await getDBClient();
  let result = null;
  try {
    result = await knex("product")
      .where({ product_id: params.productId, status: "active" })
      .increment("views")
      .returning([
        "product_id",
        "name",
        "price",
        "description",
        "status",
        "views"
      ]);

    if (result.length === 0) {
      result = "No Record Found";
    } else {
      result[0].price *= currencyData;
      result[0].currency = currency;
    }
  } catch (e) {
    console.error(e);
    result = "No Record Found";
  }
  return result;
}

async function fetchAllProduct(params) {
  let currencyData = 1;
  const { currency = "INR" } = params;
  if (currency !== "INR") {
    const currencyResult = await CurrencyConvertorModel.fetchLiveCurrency(
      `INR_${params.currency}`
    );

    if (currencyResult[`INR_${params.currency}`])
      currencyData = currencyResult[`INR_${params.currency}`];
  }

  const knex = await getDBClient();
  let result = null;
  try {
    result = await knex("product")
      .where({ status: "active" })
      .andWhere("views", ">", 0)
      .orderBy("views", "desc")
      .limit(params.limit ? params.limit : DEFAULT_LIMIT)
      .select(["product_id", "name", "description", "status", "views"])
      .select(knex.raw(`price * ${currencyData} as price`))
      .select(knex.raw(`'${currency}' as currency`));

    if (result.length === 0) result = "No Record Found";
  } catch (e) {
    console.error(e);
    result = "No Record Found";
  }
  return result;
}

const ProductModel = {
  addProduct,
  deleteProduct,
  fetchProduct,
  fetchAllProduct
};

module.exports = {
  ProductModel
};
