const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./services/connectdb');
const app = express();

const PORT = process.env.PORT || 3000;
const uri = 'mongodb://localhost:27017/bloggr';

app.use(cors());
app.use(express.json());
app.use(router);


connectDB(uri);
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

