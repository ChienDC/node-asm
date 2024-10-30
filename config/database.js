const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
