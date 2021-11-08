const pgdb = require('../util/postgre-db');

const Category = {};

Category.fetchAll = (data) => {
    const bindings = [...data]
    const SQL_SELECT_CATEGORIES = `SELECT * FROM CATEGORIES WHERE USER_ID = $1`;
    return pgdb.query(SQL_SELECT_CATEGORIES, bindings);
};

Category.create = (data) => {
    const bindings = [...data];
    SQL_INSERT_CATEGORY = `INSERT INTO CATEGORIES (CATEGORY, CATEGORY_TYPE_ID, USER_ID)
                            VALUES ($1, $2, $3)`;
    return pgdb.query(SQL_INSERT_CATEGORY, bindings);
};

Category.update = (data) => {
    const bindings = [...data]
    SQL_UPDATE_CATEGORY = `UPDATE CATEGORIES SET CATEGORY = $1, CATEGORY_TYPE_ID = $2
                            WHERE CATEGORY_ID = $3 AND USER_ID = $4`;
    return pgdb.query(SQL_UPDATE_CATEGORY, bindings);
};

module.exports = Category