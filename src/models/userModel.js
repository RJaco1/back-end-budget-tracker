const pgdb = require('../util/postgre-db');

const User = {};

User.create = (data) => {
    const userId = [];
    const bindings = [...data];
    return new Promise(async (resolve, reject) => {
        try {
            const SQL_CREATE_USER = `INSERT INTO USERS (USER_ID, EMAIL) VALUES ($1, $2)`;
            await pgdb.query(SQL_CREATE_USER, bindings);
            const SQL_DEFAULT_ACCOUNT = `INSERT INTO BANK_ACCOUNTS (ACCOUNT_NAME, USER_ID) VALUES ('Personal', $1)`;
            userId.push(bindings[0]);
            await pgdb.query(SQL_DEFAULT_ACCOUNT, userId);
            const SQL_DEFAULT_CATEGORIES = `INSERT INTO CATEGORIES (CATEGORY, CATEGORY_TYPE_ID, USER_ID)
                                            VALUES
                                            ('Salary', '1', $1),
                                            ('Clothes', '2', $1),
                                            ('Fuel', '2', $1),
                                            ('Entertainment', '2', $1),
                                            ('Gifts', '2', $1),
                                            ('Shopping', '2', $1),
                                            ('Travel', '2', $1),
                                            ('Eating out', '2', $1),
                                            ('Transfer Income', '1', $1),
                                            ('Transfer Outcome', '2', $1)`;
            await pgdb.query(SQL_DEFAULT_CATEGORIES, userId);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = User;