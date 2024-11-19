const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB (замените <username>, <password> и <dbname> на ваши данные)
mongoose.connect('mongodb+srv://baymuratovaalina:3TIcSsm2rRzWHddS@testprojectdatabase.upbpd.mongodb.net/?retryWrites=true&w=majority&appName=TestProjectDatabase&tlsInsecure=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Определение схемы и модели
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Обработка POST-запроса для сохранения данных
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.json({ message: 'Пользователь добавлен!' });
});

// Обработка GET-запроса для получения данных
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
