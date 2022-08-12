const fs = require('fs');

module.exports = {
  jsonReader: (filePath, callBack) => {
    if( !fs.existsSync(filePath) ) return callBack({ errorMessage: 'filePath doesnt exist!' }) && console.error({ errorMessage: 'filePath doesnt exist!' });
    fs.readFile(filePath, 'utf-8', ( error , fileData ) => {
      if ( error || !fileData ) return callBack(error) && console.error({ errorMessage: 'fileData doesnt exist!' });
      try {
        const data = JSON.parse(fileData);
        console.log({ successMessage: 'Everything worked well!' });
        return callBack(null, data) 
      } catch (error) {
        return callBack(error) && console.error({ errorMessage: error });
      }
    });
  },
  writerSql: (filePath, data)  => {
    fs.writeFileSync(filePath, data, (error)  => {
      if (error) return error && console.error({ errorMessage: 'File error!', error });
      console.log({ successMessage: 'Everything worked well!!' });
    });
  }
};

// // write a JSON jile
// const newObj = {
//     fname: "luiz",
//     lname: "gustavo",
// };
// fs.writeFile('./teste02.json', JSON.stringify(newObj, null, 4), err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Escreveu");
//     }
// })


// // func to ascyn read
// function jsonReader(filePath, callBack) {
//     fs.readFile(filePath, 'utf-8', (err , fileData) => {
//         if (err) {
//             return callBack && err;
//         } else {
//             try {
//                 const data = JSON.parse(fileData)
//                 return callBack && callBack(null, data)
//             } catch (err) {
//                 return callBack && err;
//             }
//         }
//     });
// };

// jsonReader('./token.json', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.login);
//     }
// });

// // Async
// fs.readFile('./token.json', 'utf-8', (err , jsonString) => {
//     if (err) {
//         console.log(err);
//     } else {
//         try {
//             const data = JSON.parse(jsonString)
//             console.log(jsonString);
//         } catch (err) {
//             console.log(err);
//         }
//     }
// });

// //  // Sync
// try {
//     const jsonString = fs.readFileSync('./token.json', 'utf-8');
//     const data = JSON.parse(jsonString);
//     console.log(data.login);
// } catch (err) {
//     console.log(err);
// }