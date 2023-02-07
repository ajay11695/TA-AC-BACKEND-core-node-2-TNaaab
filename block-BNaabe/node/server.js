// path

var path = require('path')

console.log(__dirname)

console.log(__filename)

console.log(path.join(__dirname, 'app.js'))

console.log('index.html')

console.log(path.join(__dirname, 'index.html'))

// capture data on Server

// const { createServer } = require('http')

// var server=createServer(handleRequest)
// function handleRequest(req,res){
//   if(req.method==='POST' && req.url==='/'){
//      let store=''
//      req.on('data',(chunk)=>{
//         store=store+chunk
//       })
//      req.on('end',()=>{
//             console.log(store)
//             res.statusCode=201
//             res.end(store)
//        })
//   }
// }
// server.listen(7000,()=>{
//     console.log('sever listening on port 7k')
// })




// const { createServer } = require('http')
// const qs=require('querystring')

// var server=createServer(handleRequest)
// function handleRequest(req,res){
//     let store=''
//     req.on('data',(chunk)=>{
//         store=store+chunk
//     })
//     req.on('end',()=>{

//         if(req.method==='POST' && req.url==='/){
//             let parsedData=qs.parse(store)
//             console.log(parsedData)
//             res.statusCode=201
//             res.end(JSON.stringify(parsedData))
//         }

//     })
// }
// server.listen(7000,()=>{
//     console.log('sever listening on port 7k')
// })



/*Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.*/

// const { createServer } = require('http')

// var server=createServer(handleRequest)
// function handleRequest(req,res){
//     let dataformate=req.headers['content-type']
//     let store=''
//     req.on('data',(chunk)=>{
//         store=store+chunk
//     })
//     req.on('end',()=>{
//         if(dataformate==='application/json'){
//             console.log(store)
//             let jsonData=JSON.parse(store)
//             console.log(jsonData)
//             res.setHeader('Content-Type','text/html')
//             res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}<p>`)
//         }
//     })
// }
// server.listen(9000,()=>{
//     console.log('sever listening on port 9k')
// })




const { createServer } = require('http')
const qs = require('querystring')

var server = createServer(handleRequest)
function handleRequest(req, res) {
    let dataformate = req.headers['content-type']
    console.log(dataformate)
    let store = ''
    req.on('data', (chunk) => {
        store = store + chunk
    })
    req.on('end', () => {
        if (dataformate === 'application/x-www-form-urlencoded') {
            let parsedData = qs.parse(store)
            console.log(parsedData)
            res.setHeader('Content-Type','text/html')
            res.end(`<h2>${parsedData.email}</h2>`)
        }

    })
}
server.listen(9000, () => {
    console.log('sever listening on port 9k')
})

