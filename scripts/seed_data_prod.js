import fs from 'fs';
import path from 'path';
import axios from 'axios';
import parse from 'csv-parse/lib/sync';
require('dotenv').config()

const csvPath  = path.resolve('scripts', 'goals.csv');
const goalsCsv = fs.readFileSync(csvPath, {encoding: 'utf8'});
const goals    = parse(goalsCsv, {columns: true});

const API = axios.create({
  baseURL: 'http://bia-backend.herokuapp.com/',
  auth: {
    username: process.env.AUTH_NAME,
    password: process.env.AUTH_PASS
  }
});

goals.forEach(goal => {
  const { name, category, created_at, completed_at } = goal;

  const body = {
    name,
    category,
    createdAt: created_at || Date.now(),
    complete: !!completed_at,
  };
  console.log('Creating for: ', body);

  axios({
    method: 'post',
    url: 'http://bia-backend.herokuapp.com/goals',
    auth: {
      username: process.env.AUTH_NAME,
      password: process.env.AUTH_PASS
    },
    responseType: 'json',
    data: body
  });
});
