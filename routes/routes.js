const config = require('../config/config');
const express = require('express');
const routes = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const url = require('url');
const myCrypto = require("../function/myCrypto.js");
const mysql = require('mysql');
const crypto = require("crypto");


// const secretKey = '113af72a619ecc257eb87e95cf659f22';
// const iv = crypto.randomBytes(16);
// const data = 'Батрак';
// const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
// let encrypted = cipher.update(data, 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log(iv.toString('hex'));
// console.log(secretKey.toString('hex'));
// console.log('encrypted: '+encrypted);



// const ivs = 'b218552276a1c422680924058ed6522e';
// const secretKeys = '113af72a619ecc257eb87e95cf659f22';
// const encrypteds = '0c249210800cbc6d5bf1eb5ede906335';
// const decry = myCrypto.decrypt(encrypteds, ivs.toString('hex'), secretKeys.toString('hex'));
// console.log(decry);
// console.log('-------------------');
//
// const data = '39163';
// const algorithm = 'aes-256-cbc';
// const iv = Buffer.from('b218552276a1c422680924058ed6522e', 'hex');
// const secretKey = '113af72a619ecc257eb87e95cf659f22'.padEnd(32, '\0');
// const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
// let encrypted = cipher.update(data, 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log('IV: ', iv.toString('hex'));
// console.log('secretKey: ', secretKey.toString('hex'));
// console.log('Зашифрованные данные: ', encrypted);


// Создаем подключение к базе данных
const connection = mysql.createConnection({
    host: config.sqlHost,
    user: config.sqlUser,
    password: config.sqlPass,
    database: config.sqlTable
});

// Подключаемся к базе данных
connection.connect((err) => {
    if (err) throw err;
    console.log('Успешное подключение к базе данных');
});

function disconnectDb(){
    //Закрываем подключение к базе данных
    connection.end((err) => {
        if (err) throw err;
        //console.log('Подключение к базе данных закрыто');
    });
}

routes.use(bodyParser.json());

//Авторизация
routes.get('/login',  (req, res) => {
    res.send('---');
});

//Список персонала
routes.get('/personal',  (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    if(queryObject.token) {
        try {
            if(!queryObject.limit){
                queryObject.limit = '0';
            }
            // Выполняем запрос к базе данных
            connection.query('SELECT *  FROM personal ORDER BY id ASC LIMIT '+queryObject.limit+'', (err, rows) => {
                if (err) throw err;
                // const datas = { rows, data }; //Обьединить два параметра в один
                if (rows.length > 0) {
                    const data = rows.map((row) => {
                        if (row.last_name && queryObject.iv && queryObject.key) {
                            row.last_name = myCrypto.decrypt(row.last_name, queryObject.iv.toString('hex'), queryObject.key.toString('hex'));
                        } else {
                            row.last_name = '';
                        }
                        if (row.tab && queryObject.iv && queryObject.key) {
                            row.tab = myCrypto.decrypt(row.tab, queryObject.iv.toString('hex'), queryObject.key.toString('hex'));
                        } else {
                            row.tab = '';
                        }
                        if (row.first_name && queryObject.iv && queryObject.key) {
                            row.first_name = myCrypto.decrypt(row.first_name, queryObject.iv.toString('hex'), queryObject.key.toString('hex'));
                        } else {
                            row.first_name = '';
                        }
                        if (row.middle_name && queryObject.iv && queryObject.key) {
                            row.middle_name = myCrypto.decrypt(row.middle_name, queryObject.iv.toString('hex'), queryObject.key.toString('hex'));
                        } else {
                            row.middle_name = '';
                        }
                        return {
                            id: row.id,
                            tab: row.tab,
                            last_name: row.last_name,
                            first_name: row.first_name,
                            middle_name: row.middle_name
                        };
                    });
                    res.status(200).send(JSON.stringify(data));
                } else {
                    res.status(404).send('Нет данных');
                }
            });

        } catch (error) {
            const jsonData = JSON.stringify(error);
            res.status(200).send(jsonData);
            disconnectDb();
        }
    } else {
        res.status(404).send(JSON.stringify({'error':'error connect'}));
    }
}).post('/', (req, res) => {

});



module.exports = routes;



