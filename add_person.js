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

var inputFirst_name = process.argv[2];
var inputLast_name = process.argv[3];
var inputBirthdate = process.argv[4];

knex.insert([{first_name: inputFirst_name, last_name: inputLast_name, birthdate: inputBirthdate}]).into("famous_people").then(function(id) {
  console.log(id);
});

knex.destroy();

