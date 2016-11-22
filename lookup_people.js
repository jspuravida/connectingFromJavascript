var input = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT id, first_name, last_name, birthdate FROM famous_people WHERE (first_name = $1::varchar OR last_name = $1::varchar)', [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...')
    console.log(`Found 1 person by the name ${input}: ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`);
    client.end();
  });
});



