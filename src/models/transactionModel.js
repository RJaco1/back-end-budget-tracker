const pgdb = require('../util/postgre-db');

const Transaction = {};

Transaction.fetchAll = (data) => {
    const bindings = [...data]
    const SQL_SELECT_TRANSACTIONS = `SELECT TRANSACTIONS.TRANSACTION_ID, 
                                        CASE
                                        WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                        THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                        ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                        END AS AMOUNT, CATEGORIES.CATEGORY, 
                                        CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                        TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                    FROM TRANSACTIONS
                                    INNER JOIN CATEGORIES
                                        ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                    INNER JOIN CATEGORIES_TYPE
                                        ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                    INNER JOIN BANK_ACCOUNTS
                                        ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                    WHERE TRANSACTIONS.USER_ID = $1`;
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

Transaction.filterbyAccountorCategory = (data) => {
    const bindings = [...data];
    const SQL_SELECT_ACCOUNTORCATEGORY = `SELECT TRANSACTIONS.TRANSACTION_ID,
                                            CASE
                                            WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                            THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                            ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                            END AS AMOUNT, CATEGORIES.CATEGORY,
                                            CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                            TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                        FROM TRANSACTIONS
                                        INNER JOIN CATEGORIES
                                            ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                        INNER JOIN CATEGORIES_TYPE
                                            ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                        INNER JOIN BANK_ACCOUNTS
                                            ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                        WHERE (TRANSACTIONS.ACCOUNT_ID = $1
                                            OR TRANSACTIONS.CATEGORY_ID = $2)
                                        AND TRANSACTIONS.USER_ID = $3`;
    return pgdb.query(SQL_SELECT_ACCOUNTORCATEGORY, bindings);
}

Transaction.filterbyAccountandCategory = (data) => {
    const bindings = [...data];
    const SQL_SELECT_ACCOUNTANDCATEGORY = `SELECT TRANSACTIONS.TRANSACTION_ID,
                                            CASE
                                            WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                            THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                            ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                            END AS AMOUNT, CATEGORIES.CATEGORY,
                                            CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                            TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                        FROM TRANSACTIONS
                                        INNER JOIN CATEGORIES
                                            ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                        INNER JOIN CATEGORIES_TYPE
                                            ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                        INNER JOIN BANK_ACCOUNTS
                                            ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                        WHERE TRANSACTIONS.ACCOUNT_ID = $1
                                        AND TRANSACTIONS.CATEGORY_ID = $2
                                        AND TRANSACTIONS.USER_ID = $3`;
    return pgdb.query(SQL_SELECT_ACCOUNTANDCATEGORY, bindings);
}

Transaction.filterdate = (data) => {
    const bindings = [...data];
    const SQL_SELECT_ACCOUNTANDCATEGORYANDDATE = `SELECT TRANSACTIONS.TRANSACTION_ID,
                                                    CASE
                                                    WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                                    THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                                    ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                                    END AS AMOUNT, CATEGORIES.CATEGORY,
                                                    CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                                    TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                                FROM TRANSACTIONS
                                                INNER JOIN CATEGORIES
                                                    ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                                INNER JOIN CATEGORIES_TYPE
                                                    ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                                INNER JOIN BANK_ACCOUNTS
                                                    ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                                WHERE TRANSACTIONS.ACCOUNT_ID = $1
                                                AND TRANSACTIONS.CATEGORY_ID = $2
                                                AND TRANSACTIONS.TRANSACTION_DATE = $3
                                                AND TRANSACTIONS.USER_ID = $4`;
    return pgdb.query(SQL_SELECT_ACCOUNTANDCATEGORYANDDATE, bindings);
}

Transaction.filterAccountorCategoryandDate = (data) => {
    const bindings = [...data];
    const SQL_SELECT_ACCOUNTORCATEGORYANDDATE = `SELECT TRANSACTIONS.TRANSACTION_ID,
                                                    CASE
                                                    WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                                    THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                                    ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                                    END AS AMOUNT, CATEGORIES.CATEGORY,
                                                    CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                                    TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                                FROM TRANSACTIONS
                                                INNER JOIN CATEGORIES
                                                    ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                                INNER JOIN CATEGORIES_TYPE
                                                    ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                                INNER JOIN BANK_ACCOUNTS
                                                    ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                                WHERE (TRANSACTIONS.ACCOUNT_ID = $1
                                                    OR TRANSACTIONS.CATEGORY_ID = $2)
                                                AND TRANSACTIONS.TRANSACTION_DATE = $3
                                                AND TRANSACTIONS.USER_ID = $4`;
    return pgdb.query(SQL_SELECT_ACCOUNTORCATEGORYANDDATE, bindings);
}

Transaction.filterbyDate = (data) => {
    const bindings = [...data];
    const SQL_SELECT_DATE = `SELECT TRANSACTIONS.TRANSACTION_ID,
                                                    CASE
                                                    WHEN (CATEGORIES.CATEGORY = 'Transfer Outcome')
                                                    THEN CONCAT('$ ','-',TRANSACTIONS.AMOUNT)
                                                    ELSE CONCAT('$',TRANSACTIONS.AMOUNT)
                                                    END AS AMOUNT, CATEGORIES.CATEGORY,
                                                    CATEGORIES_TYPE.CATEGORY_TYPE, BANK_ACCOUNTS.ACCOUNT_NAME,
                                                    TO_CHAR(TRANSACTIONS.TRANSACTION_DATE, 'mm/dd/yyyy') AS TRANSACTION_DATE
                                                FROM TRANSACTIONS
                                                INNER JOIN CATEGORIES
                                                    ON TRANSACTIONS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
                                                INNER JOIN CATEGORIES_TYPE
                                                    ON CATEGORIES.CATEGORY_TYPE_ID = CATEGORIES_TYPE.CATEGORY_TYPE_ID
                                                INNER JOIN BANK_ACCOUNTS
                                                    ON TRANSACTIONS.ACCOUNT_ID = BANK_ACCOUNTS.ACCOUNT_ID
                                                WHERE TRANSACTIONS.TRANSACTION_DATE = $1
                                                AND TRANSACTIONS.USER_ID = $2`;
    return pgdb.query(SQL_SELECT_DATE, bindings);
}

module.exports = Transaction;