import fs from 'fs';
import path from 'path';
import axios from 'axios';
import parse from 'csv-parse/lib/sync';

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
  console.log('Inserting goals: ', goal);
  const { name, category, created_at, completed_at } = goal;

  API.post('/goals', {
    name,
    category,
    created_at: created_at || Date.now(),
    complete: !!completed_at,
    timeFrame: 1,
  }).then(resp => {
    console.log(resp);
  });
});
