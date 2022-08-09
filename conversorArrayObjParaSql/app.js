const express = require('express');
const app = express();
const { hashPwd } = require('./src/bcrypt');
const { jsonReader } = require('./src/fsStudy')
const fs = require('fs');

app.get('/', async (req, res) => {
  let sqlFile = ``;
  try {
    jsonReader("./src/arrayOfObj.json", ( error, data ) => {
      if ( error || !data ) return res.status(400).json({ message: 'Reading file error!' });
      data.map( ( element ) => {
        element.password = hashPwd(element.password);
        sqlFile += `insert into accounts (username, password, university) values ('${element.username}', '${element.password}', '${element.university}');\n`
      });
      fs.writeFile('./src/arrayOfObj_convertido.sql', sqlFile, (error)  => {
        if (error) {
          console.error({ error: error });
          res.status(400).json({ message: 'File error!' })
        } else {
          res.status(200).json({ message: 'Everything worked well!' });
        };
      });
    });
  } catch (error) {
    console.error({ error: error });
  }
});

app.listen(8080, console.log("Ouvindo a porta: " + 8080))