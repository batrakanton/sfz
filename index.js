const config = require('./config/config');
const routes = require('./routes/routes');
const express = require('express');
const app = express();
const path = require('path');


// //для управления доступом к ресурсам на других доменах
// const cors = require('cors');
// //для защиты веб-приложений от атак, связанных с безопасностью
// const helmet = require('helmet');

// // Разрешить доступ только с указанного домена
// const corsOptions = {
//     origin: config.Website
// };
// app.use(cors(corsOptions));
//
// app.use(helmet());
// //чтобы ограничить информацию о реферере при переходе с других сайтов
// app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
// //чтобы предотвратить интерпретацию файлов с неправильным MIME типом
// app.use(helmet.noSniff());
// //чтобы защитить ваше приложение от атак типа "человек посередине" (MITM)
// app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
//
// //все ресурсы (такие как скрипты, стили, шрифты, изображения и т.д.)
// //должны быть загружены только с сайта cdn.example.com или с вашего собственного сайта.
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.example.com'],
//             styleSrc: ["'self'", "'unsafe-inline'", 'cdn.example.com'],
//             fontSrc: ["'self'", 'fonts.gstatic.com'],
//             imgSrc: ["'self'", 'cdn.example.com'],
//             connectSrc: ["'self'", 'cdn.example.com'],
//             objectSrc: ["'none'"]
//         }
//     },
//     dnsPrefetchControl: false
// }));
// // для добавления заголовка X-XSS-Protection к HTTP-ответам.
// // Этот заголовок предназначен для защиты от атак типа "межсайтовый скриптинг" (XSS).
// app.use(helmet.xssFilter());


// настройка заголовков CORS - закрыть это для продакшена
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Роутер API
app.use('/api', routes);

//Вывод приложения
app.use(express.static(__dirname + '/app/dist'));
app.use(express.static(__dirname + '/app/dist/assets'));
app.route('/*')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname + '/app/dist/index.html'));
    });



//Запуск сервера
const httpServer = app.listen(8080, () => {
    console.log('Сайт запущен на 8080 порту');
});

