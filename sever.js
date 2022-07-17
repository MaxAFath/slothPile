const express = require('express');
const session = require('express-session');
const sequlize = require('./config/connection');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'buisness_db'
    },
    console.log('connected to buiseness_db')
);


