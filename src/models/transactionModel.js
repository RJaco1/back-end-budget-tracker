const pgdb = require('../util/postgre-db');

const Transaction = {};

Transaction.fetchAll = (data) => {
    const bindings = [...data]
    const SQL_SELECT_TRANSACTIONS = `SELECT * FROM TRANSACTIONS WHERE USER_ID = $1`;
    return pgdb.query(SQL_SELECT_TRANSACTIONS, bindings);
};

Transaction.create = (data) => {
    const bindings = [...data]
    const SQL_CREATE_TRANSACTION = `INSERT INTO TRANSACTIONS (AMOUNT, TRANSACTION_DATE, CATEGORY_ID, ACCOUNT_ID, USER_ID)
                                    VALUES ($1, $2, $3, $4, $5)`;
    return pgdb.query(SQL_CREATE_TRANSACTION, bindings);
}

Transaction.createTransfer = (outcomeTransfer, incomeTransfer) => {
    const bindingOutcome = [...outcomeTransfer];
    const bindingIncome = [...incomeTransfer];
    return new Promise(async (resolve, reject) => {
        try {
            const SQL_CREATE_TRANSFEROUT_TRANSACTION = `INSERT INTO TRANSACTIONS (AMOUNT, TRANSACTION_DATE, CATEGORY_ID, ACCOUNT_ID, USER_ID)
                                    VALUES ($1, $2, $3, $4, $5)`;
            await pgdb.query(SQL_CREATE_TRANSFEROUT_TRANSACTION, bindingOutcome);
            const SQL_CREATE_TRANSFERIN_TRANSACTION = `INSERT INTO TRANSACTIONS (AMOUNT, TRANSACTION_DATE, CATEGORY_ID, ACCOUNT_ID, USER_ID)
                                    VALUES ($1, $2, $3, $4, $5)`;
            await pgdb.query(SQL_CREATE_TRANSFERIN_TRANSACTION, bindingIncome);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = Transaction;