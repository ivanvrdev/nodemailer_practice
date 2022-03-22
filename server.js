const http = require("http")
const fs = require("fs").promises
const nodemailer = require("nodemailer")

const host = "localhost"
const port = 3000


// let htmlFile
//El html se carga una sola vez
// fs.readFile(__dirname + "/public/index.html")
// .then(contents => {
//     htmlFile = contents
    //El servidor comienza a funcionar cuando se encuenta el html
//     server.listen(port, host, ()=>console.log(`Server's running on http://${host}:${port}`))
// })
// .catch(err => console.log(`Could not read public/index.html file: ${err}`))

const requestListener = (req, res) =>{

    if(req.url === "/"){
        // res.setHeader("Content-Type", "text/html")
        // res.writeHead(200)
        // res.end(htmlFile)
        // return

        fs.readFile(__dirname + "/public/index.html")
        .then(content => {
            res.setHeader("Content-Type", "text/html")
            res.writeHead(200)
            res.end(content)
        })
        .catch(err => {
            res.setHeader("Content-Type", "text/html")
            res.writeHead(404)
            res.end("<h1>Error 404<h1>")
        })

        return
    }

    if(req.url === "/file"){

        //crear archivo txt
        fs.appendFile(__dirname + "/public/file.txt", "Hola Mundo!")
        .then(()=>{
            res.setHeader("Content-Type", "application/json")
            res.writeHead(200)
            res.end(`{"fileCreated": true}`)
        })
        .catch(err => {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.end(`{"fileCreated": false}`)
            console.log(err)
        })

        return
    }

    if(req.url === "mail"){

        

    }

    res.writeHead(404)
    res.end("<h1>Error 404</h1>")
    return
}

const server = http.createServer(requestListener)

server.listen(port, host, ()=>console.log(`Server's running on http://${host}:${port}`))
