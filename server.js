const path = require('path'); 
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'You hit CK API...' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, () => (console.log(`Server started at ${PORT}`)));

