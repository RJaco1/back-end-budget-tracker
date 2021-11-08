const pgdb = require('../util/postgre-db');

const Account = {};

Account.fetchAll = (data) => {
    const bindings = [...data]
    const SQL_SELECT_ACCOUNTS = `SELECT * FROM BANK_ACCOUNTS WHERE USER_ID = $1`;
    return pgdb.query(SQL_SELECT_ACCOUNTS, bindings);
};

Account.create = (data) => {
    const bindings = [...data];
    SQL_INSERT_ACCOUNT = `INSERT INTO BANK_ACCOUNTS (ACCOUNT_NAME, USER_ID)
                            VALUES ($1, $2)`;
    return pgdb.query(SQL_INSERT_ACCOUNT, bindings);
};

Account.update = (data) => {
    const bindings = [...data]
    SQL_UPDATE_ACCOUNT = `UPDATE BANK_ACCOUNTS SET ACCOUNT_NAME = $1
                            WHERE ACCOUNT_ID = $2 AND USER_ID = $3`;
    return pgdb.query(SQL_UPDATE_ACCOUNT, bindings);
};

module.exports = Account;