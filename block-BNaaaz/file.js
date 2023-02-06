var http=require('http')
var fs=require('fs')

let server=http.createServer(handleRequest)
function handleRequest(req,res){
    res.setHeader('Content-Type','text/plain')
    fs.createReadStream('readme.txt').pipe(res)
}
server.listen(4000,()=>{
    console.log('server listening on port 4k')
})
