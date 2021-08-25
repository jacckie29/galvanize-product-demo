/* eslint-disable no-undef */
const { ProductModel } = require("../../src/models");
const { POSTGRES_CONFIG } = require("../../src/config");
const { CmdRunner } = require("../../src/utilities");

describe("Product API Testing", () => {
  beforeAll(async () => {
    // run the migrations and do any other setup here
    await CmdRunner.runDBMigrations();
    await CmdRunner.runDBSeeds();
  });

  test("Add Record", async () => {
    await POSTGRES_CONFIG.connect();
    const req = {
      name: "Test Product",
      price: 200,
      description: "Test description"
    };
    const result = await ProductModel.addProduct(req);
    expect(result[0]).toHaveProperty("product_id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("price");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("views");
    await POSTGRES_CONFIG.destroy();
  });

  test("Fetch Single Record", async () => {
    const req = {
      productId: 1
    };
    await POSTGRES_CONFIG.connect();
    const result = await ProductModel.fetchProduct(req);

    // Adding dummy req to fetch all record, DEFAULT_LIMIT=5

    await ProductModel.fetchProduct(req);
    await ProductModel.fetchProduct(req);
    await ProductModel.fetchProduct(req);
    await ProductModel.fetchProduct(req);
    await ProductModel.fetchProduct(req);

    expect(result[0]).toHaveProperty("product_id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("price");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("currency");
    expect(result[0]).toHaveProperty("views");
    await POSTGRES_CONFIG.destroy();
  });

  test("Fetch All Record", async () => {
    await POSTGRES_CONFIG.connect();
    const result = await ProductModel.fetchAllProduct({});
    expect(result[0]).toHaveProperty("product_id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("price");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("currency");
    expect(result[0]).toHaveProperty("views");
    await POSTGRES_CONFIG.destroy();
  });

  test("delete Record", async () => {
    const req = {
      productId: 1
    };
    await POSTGRES_CONFIG.connect();
    const result = await ProductModel.deleteProduct(req);
    expect(result[0]).toHaveProperty("product_id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("price");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("status");
    expect(result[0]).toHaveProperty("views");
    await POSTGRES_CONFIG.destroy();
  });

  test("Fetch Single, No Record", async () => {
    const req = {
      productId: 1
    };
    await POSTGRES_CONFIG.connect();
    const result = await ProductModel.fetchProduct(req);
    expect(result).toBe("No Record Found");
    await POSTGRES_CONFIG.destroy();
  });

  test("Fetch All, No Record", async () => {
    await POSTGRES_CONFIG.connect();
    const result = await ProductModel.fetchAllProduct({});
    expect(result).toBe("No Record Found");
    await POSTGRES_CONFIG.destroy();
  });
});
