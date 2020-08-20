// Inicializando o banco de dados com o sqlite3
const sqlite3 = require("sqlite3").verbose()
// Criar o objeto que irá fazer alterações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// Sequência de comandos para fazer no objeto para mexer com o banco de dados
// db.serialize(() => {
//     // Usando comandos de SQL
//     // criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image, name, address, address2, state, city, items
//         ) VALUES (
//             ?, ?, ?, ?, ?, ?, ?
//         );
// `
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData (errors) {
//         if(errors) {
//             return console.log(errors)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)
//                         // Escrita sem parênteses para não chamar a função diretamente, mas sim que é passada pro referência para o callback


//     // consultar dados da tabela
//     // db.all(`SELECT * FROM places`,function(err,rows){
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seu registros")
//     //     console.log(rows)
//     // })

//     // deletar dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [8], function (err) {
    //     if(err) {
    //         console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })
// })