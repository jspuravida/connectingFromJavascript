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






 // knex.select('id').from('nicknames')




//     console.log(`Found 1 person by the name ${input}: ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`);
//     client.end();
//   };
// });
