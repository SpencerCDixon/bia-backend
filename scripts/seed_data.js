import fs from 'fs';
import path from 'path';
import parse from 'csv-parse/lib/sync';
import config from '../src/config';
import chalk from 'chalk';
import { compose } from 'scd-fp-util';

const log = console.log.bind(console);
const logInfo = compose(log, chalk.blue);

const goalTable = config.db.get('goals');
goalTable.drop();

logInfo('Seeding data...');
const csvPath  = path.resolve('scripts', 'goals.csv');
const goalsCsv = fs.readFileSync(csvPath, {encoding: 'utf8'});
const goals    = parse(goalsCsv, {columns: true});

const displayGoal = compose(
  chalk.gray, goal => `${goal.name} - ${goal.category}`
);


goals.forEach(goal => {
  logInfo(`Inserting goal: ${displayGoal(goal)}`);
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
