var http=require('http')
var qs=require('querystring')

var server=http.createServer(handleRequest)
function handleRequest(req,res){
    console.log(req.headers)

    var store=''
    
    req.on('data',(chunk)=>{
        store=store+chunk
    })

    req.on('end',()=>{
        if(req.method==='POST' && req.url==='/json'){
            res.setHeader('Content-Type','application/json')
            res.end(store)
        }
        if(req.method==='POST' && req.url==='/form'){
            console.log(store)
            var parsedData=qs.parse(store)
            res.end(JSON.stringify(parsedData))
        }
    })
}

server.listen(7000,()=>{
    console.log('server listening on port 7k')
})