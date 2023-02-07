var { createServer }=require('http')
var fs=require('fs')
var qs=require('querystring')

let server=createServer(handleRequest)
function handleRequest(req,res){
    let store=''
  req.on('data',(chunk)=>{
    store=store+chunk
  })

  req.on('end',()=>{
    if (req.method==='GET' && req.url==='/form'){
        fs.readFile('form.html','utf8',(err,content)=>{
            res.setHeader('Content-Type',"text/html")
            res.end(content)
        })
    }
    if (req.method==='POST' && req.url==='/form'){
       let parsedData=qs.parse(store)
       console.log(parsedData)
       res.setHeader('Content-Type','text/html')
       res.write(`<h2>${parsedData.name}</h2>`)
       res.write(`<h3>${parsedData.email}</h3>`)
       res.write(`<p>${parsedData.age}</p>`)
       res.end()
    }
  })

}
server.listen(5678,()=>{
    console.log('server listening on port 5678')
})