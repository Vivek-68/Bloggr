const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./services/connectdb');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 3000;
const uri = 'mongodb://localhost:27017/bloggr';

dotenv.config();
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use(router);


connectDB(uri);
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

