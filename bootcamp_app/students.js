const { Pool } = require('pg');
const args = process.argv.slice(2)

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'labber'
});

const cohortName = args[0];
const limit = args[1] || 5;
const values = [`%${cohortName}%`, limit];

const queryString = `SELECT students.id as id, students.name as name, cohorts.name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`

pool.query(queryString, values)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));