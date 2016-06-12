import fs from 'fs';
import path from 'path';
import parse from 'csv-parse/lib/sync';
import config from '../src/config';

const goalTable = config.db.get('goals');
goalTable.drop();

console.log('Seeding data...');
const csvPath  = path.resolve('scripts', 'goals.csv');
const goalsCsv = fs.readFileSync(csvPath, {encoding: 'utf8'});
const goals    = parse(goalsCsv, {columns: true});

goals.forEach(goal => {
  console.log('Inserting goals: ', goal);
  const { name, category, created_at, completed_at } = goal;

  goalTable.insert({
    name: name,
    category: category,
    created_at: created_at || Date.now(),
    complete: !!completed_at,
    timeFrame: 1,
  })
});

config.db.close();
