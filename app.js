const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();

const { server } = require('./src/config/config');
const guard = require('./src/guard/guard');

const categoryType = require('./src/routes/categoryTypeRouter');
const user = require('./src/routes/userRouter');
const category = require('./src/routes/categoryRouter');
const account = require('./src/routes/accountRouter');
const transaction = require('./src/routes/transactionRouter');

//CORS
app.use(cors);

app.use(guard);
app.use(express.json());

app.use(categoryType);
app.use(user);
app.use(category);
app.use(account);
app.use(transaction);

app.listen(server.port, () => {
    console.log(`Server running in port: ${server.port}`);
});