var input = process.argv[2];

const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    ssl      : true
  }
});

knex.select('id', 'first_name', 'last_name', 'birthdate')
.from('famous_people')
.where({first_name: input})
.orWhere({last_name: input})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  let row = rows[0];

  console.log("-" + row.id + " " + row.first_name + " " + row.last_name + " " + row.birthdate);
});
