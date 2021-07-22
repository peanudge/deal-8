import AbstractProductStore from "../AbstractProductStore.js";
import mysqlConnection from "../../../config/mysql.js";
import Product from "../Product.js";

export default class MySQLProductStore extends AbstractProductStore {
  async createProduct(product) {
    const {
      author,
      category,
      title,
      content,
      cost,
      status,
      location,
      thumbnail,
      images,
      createdAt,
      updatedAt,
    } = product;

    const addProductQuery = `
    INSERT INTO product
    (author, category, title, content, cost, status, location, thumbnail, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const params = [
      author,
      category,
      title,
      content,
      cost,
      status,
      location,
      thumbnail,
      createdAt,
      updatedAt,
    ];

    try {
      const result = await mysqlConnection
        .promise()
        .query(addProductQuery, params);
      const isSuccess = result[0]?.affectedRows === 1;
      if (isSuccess) {
        product.id = result[0].insertId;
        await this.createProductImages(product.id, images);
        return product;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async createProductImages(id, images = []) {
    const createImageQuery = `
      INSERT INTO product_image(id, image) VALUES (?, ?)
    `;
    for (const image of images) {
      await mysqlConnection.promise().query(createImageQuery, [id, image]);
    }
  }

  async getProducts({ location = null, category = null, username = null }) {
    const isLocationCondition = location && location !== "";
    const isCategoryCondition = category !== null;
    const params = [];

    let retrieveProductsQuery = `
    SELECT 
    p.id AS id,p.category AS category, p.author AS author, p.title AS title, 
    p.content AS content, p.cost AS cost, p.status AS status, p.location AS location,
    p.thumbnail AS thumbnail, p.createdAt AS createdAt, p.updatedAt AS updatedAt, p.countOfView AS countOfView,
    CASE WHEN my_ip.username IS NULL THEN FALSE ELSE TRUE END as isInterested,
    COUNT(ip.username) as countOfInterest, COUNT(DISTINCT cr.roomId) as countOfChat
    FROM product AS p 
    LEFT JOIN (SELECT username, id FROM interest_product WHERE username = ?) AS my_ip ON my_ip.id = p.id
    LEFT JOIN interest_product AS ip ON ip.id = p.id 
    LEFT JOIN chatroom AS cr ON cr.productId = p.id
    `;
    params.push(username);

    if (isLocationCondition && isCategoryCondition) {
      retrieveProductsQuery += " WHERE category = ? AND location = ?";
      params.push(category, location);
    } else if (isCategoryCondition && !isLocationCondition) {
      retrieveProductsQuery += " WHERE category = ?";
      params.push(category);
    } else if (isLocationCondition && !isCategoryCondition) {
      retrieveProductsQuery += " WHERE location = ?";
      params.push(location);
    }

    retrieveProductsQuery += "GROUP BY p.id";

    try {
      const result = await mysqlConnection
        .promise()
        .query(retrieveProductsQuery, params);
      const rows = result[0];
      return rows.map(
        (row) =>
          new Product({
            id: row.id,
            category: row.category,
            author: row.author,
            title: row.title,
            content: row.content,
            cost: row.cost,
            status: row.status,
            location: row.location,
            thumbnail: row.thumbnail,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            countOfView: row.countOfView,
            countOfInterest: row.countOfInterest,
            countOfChat: row.countOfChat,
            isInterested: !!row.isInterested,
          })
      );
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id, username = "") {
    const params = [username, id];
    const retrieveProductQuery = `
    SELECT 
    p.id AS id,p.category AS category, p.author AS author, p.title AS title, 
    p.content AS content, p.cost AS cost, p.status AS status, p.location AS location,
    p.thumbnail AS thumbnail, p.createdAt AS createdAt, p.updatedAt AS updatedAt, p.countOfView AS countOfView,
    CASE WHEN my_ip.username IS NULL THEN FALSE ELSE TRUE END as isInterested,
    COUNT(ip.username) as countOfInterest, COUNT(cr.roomId) as countOfChat
    FROM product AS p 
    LEFT JOIN (SELECT username, id FROM interest_product WHERE username = ?) AS my_ip ON my_ip.id = p.id
    LEFT JOIN interest_product AS ip ON ip.id = p.id
    LEFT JOIN chatroom AS cr ON cr.productId = p.id
    WHERE p.id = ?
    `;
    try {
      const retrieveQueryResult = await mysqlConnection
        .promise()
        .query(retrieveProductQuery, params);

      const rows = retrieveQueryResult[0];
      if (rows.length >= 1) {
        const row = rows[0];
        await this._addCountOfViewProduct(row.id, row.countOfView);

        const images = await this._getProductImages(row.id);
        return new Product({
          id: row.id,
          author: row.author,
          category: row.category,
          title: row.title,
          content: row.content,
          cost: row.cost,
          status: row.status,
          location: row.location,
          thumbnail: row.thumbnail,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          countOfChat: row.countOfChat,
          countOfView: row.countOfView,
          isInterested: !!row.isInterested,
          countOfInterest: row.countOfInterest,
          images: images,
        });
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  async _addCountOfViewProduct(id, previsousCount) {
    const updateCountOfViewQuery = `
    UPDATE product SET countOfView=? WHERE id=?;
    `;
    const params = [previsousCount + 1, id];
    const result = await mysqlConnection
      .promise()
      .query(updateCountOfViewQuery, params);
    return result[0].affectedRows.length > 0;
  }

  async _getProductImages(id) {
    const retrieveProductImage = `
      SELECT id, image FROM product_image WHERE id = ?
    `;
    const result = await mysqlConnection
      .promise()
      .query(retrieveProductImage, [id]);
    const rows = result[0];
    return rows.map((row) => row.image);
  }

  async getInterestProducts(username) {
    const interestProductQuery = `
    SELECT 
    p.id AS id,p.category AS category, p.author AS author, p.title AS title, 
    p.content AS content, p.cost AS cost, p.status AS status, p.location AS location,
    p.thumbnail AS thumbnail, p.createdAt AS createdAt, p.updatedAt AS updatedAt, p.countOfView AS countOfView,
    CASE WHEN ip.username IS NULL THEN FALSE ELSE TRUE END as isInterested
    FROM product AS p LEFT JOIN interest_product AS ip ON ip.id = p.id WHERE ip.username = ?
    `;
    const params = [username];
    try {
      const result = await mysqlConnection
        .promise()
        .query(interestProductQuery, params);

      const rows = result[0];
      return rows.map(
        (row) =>
          new Product({
            id: row.id,
            category: row.category,
            author: row.author,
            title: row.title,
            content: row.content,
            cost: row.cost,
            status: row.status,
            location: row.location,
            thumbnail: row.thumbnail,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            countOfView: row.countOfView,
            isInterested: !!row.isInterested,
          })
      );
    } catch (err) {
      throw err;
    }
  }

  async getOwnProducts(username) {
    const interestProductQuery = `
    SELECT 
    id, category, author, title, 
    content,cost, status,location,
    thumbnail, createdAt, updatedAt,countOfView
    FROM product WHERE author = ?
    `;
    const params = [username];
    try {
      const result = await mysqlConnection
        .promise()
        .query(interestProductQuery, params);

      const rows = result[0];
      return rows.map(
        (row) =>
          new Product({
            id: row.id,
            category: row.category,
            author: row.author,
            title: row.title,
            content: row.content,
            cost: row.cost,
            status: row.status,
            location: row.location,
            thumbnail: row.thumbnail,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            countOfView: row.countOfView,
          })
      );
    } catch (err) {
      throw err;
    }
  }

  async isInterestProduct(username, productId) {
    const query = `
      SELECT * FROM interest_product WHERE username = ? AND id = ?
    `;
    const params = [username, productId];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      return rows.length > 0;
    } catch (err) {
      throw err;
    }
  }

  async addInterestProduct(username, productId) {
    const query = `
    INSERT INTO interest_product(username, id)
      VALUES(?, ?);
    `;
    const params = [username, productId];

    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isSuccess = result[0]?.affectedRows === 1;
      return isSuccess;
    } catch (err) {
      throw err;
    }
  }

  async removeInterestProduct(username, productId) {
    const query = `
    DELETE FROM interest_product WHERE username = ? AND id =?;
    `;
    const params = [username, productId];

    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isSuccess = result[0]?.affectedRows === 1;
      return isSuccess;
    } catch (err) {
      throw err;
    }
  }

  async updateProductStatus(id, status) {
    const params = [status, id];
    const query = `
    UPDATE product SET status=? WHERE id = ?;
    `;

    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isSuccess = result[0]?.affectedRows === 1;
      return isSuccess;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(product) {
    // TODO: Implement
  }

  async deleteProductById(id) {
    const query = `
      DELETE FROM product WHERE id=?
    `;
    const params = [id];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isDeleted = result[0]?.affectedRows >= 1;

      if (isDeleted) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }
}
