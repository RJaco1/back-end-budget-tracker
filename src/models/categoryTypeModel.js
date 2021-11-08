const pgdb = require('../util/postgre-db');

const CategoryType = {};

CategoryType.fetchAll = () => {
    const SQL_SELECT_CATEGORIESTYPE = `SELECT CATEGORY_TYPE_ID AS "id", CATEGORY_TYPE FROM CATEGORIES_TYPE`;
    return pgdb.query(SQL_SELECT_CATEGORIESTYPE);
};

module.exports = CategoryType;