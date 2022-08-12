const EXPRESS = require('express');
const router = EXPRESS.Router();
const path = require('path');
const fs = require('fs');

const { hashPwd } = require('../utils/bcrypt');
const { jsonReader, writerSql } = require('../utils/fsStudy');

router.post('/', (req, res) => {
  const { name, tempFilePath } = req.files.jsonFile;
  const { tableName } = req.body;

  let sqlFile = ``;
  const convertedFileName = `${ name.split(".")[0] }.sql`;
  const convertedFilePath = path.join(__dirname + `../../tmp/${convertedFileName}`);

  try {
    jsonReader(tempFilePath, ( error, data ) => {
      if ( error || !data ) return res.status(400).json({ message: 'Reading file error!' });
      data.slice(0,10).map( ( element )  => {
        element.password = hashPwd(element.password);
        const elementKeys = Object.keys(element).map( keys =>  keys = ` ${keys}`);
        const elementValues = Object.values(element).map( values =>  values = ` '${values}'` );
        sqlFile += `insert into ${ tableName } (${ elementKeys } ) values (${ elementValues } );\n`;
      });
      writerSql(convertedFilePath, sqlFile);
      return res.download(convertedFilePath);
    });
  } catch (error) {
    return console.error({ error: error });
  }
});

module.exports = router;