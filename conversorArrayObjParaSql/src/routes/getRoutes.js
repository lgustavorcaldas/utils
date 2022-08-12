const EXPRESS = require('express');
const router = EXPRESS.Router();

const { hashPwd } = require('../utils/bcrypt');
const { jsonReader, writerSql } = require('../utils/fsStudy');

router.post('/', (req, res) => {
  console.log("🚀 ~ file: getRoutes.js ~ line 9 ~ router.post ~ req.files", req.files)
  const filePath = req.files.foo.tempFilePath;
  const { tableName } = req.body;
  console.log("🚀 ~ file: getRoutes.js ~ line 9 ~ router.get ~ filePath", filePath)
  let sqlFile = ``;
  try {
    jsonReader(filePath, ( error, data ) => {
      if ( error || !data ) return res.status(400).json({ message: 'Reading file error!' });
      data.map( ( element, index )  => {
        console.log("🚀 ~ file: app.js ~ line 17 ~ data.slice ~ index", index)
        element.password = hashPwd(element.password);
        const elementKeys = Object.keys(element).map( keys =>  keys = ` ${keys}`);
        const elementValues = Object.values(element).map( values =>  values = ` '${values}'` );
        sqlFile += `insert into ${ tableName } (${ elementKeys } ) values (${ elementValues } );\n`;
      });
      writerSql(`${ filePath.split(".")[0] }.sql`, sqlFile);
      return res.status(200).json({ message: 'Everything worked well' });
    });
  } catch (error) {
    return console.error({ error: error });
  }
});

module.exports = router;