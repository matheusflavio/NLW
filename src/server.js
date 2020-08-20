const express = require("express")
const server = express()

const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

//Habilitar o req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos para a aplicação
// Página Inicial
// req -> requisição
//res -> resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {

    // req.query quety strings da URL
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint",(req,res) => {
    // req.body => corpo do formulário
    // console.log(req.body);

    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            name
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.name
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search-results", (req, res) => {

    const search = req.query.search
    if (search == "") {
        // Pesquisa vazio
        return res.render("search-results.html", { total: 0})
    }



    //pegar dadso do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows) {
        if(err) {
            console.log(err)
            res.send("Erro no cadastro")
        }

        const total = rows.length
        // Mostrar HTML com dados do banco de dados
        return res.render("search-results.html", { places: rows, total})
    })
})

// Ligar o servidor e colocar na porta 3000
server.listen(3000)