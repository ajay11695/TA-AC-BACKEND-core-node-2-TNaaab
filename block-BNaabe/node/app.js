/*Q. Create server which can handle both json/form data without specifying which format of data is being received.*/

const { createServer } = require('http')
const qs=require('querystring')

var server=createServer(handleRequest)
function handleRequest(req,res){
    console.log(req.headers)
    let dataformate=req.headers['content-type']
    console.log(dataformate)
    let store=''
    req.on('data',(chunk)=>{
        store=store+chunk
    })
    req.on('end',()=>{
        if(dataformate==='application/json'){
            console.log(store)
            res.end(store)
        }
        
        if(dataformate==='application/x-www-form-urlencoded'){
            let parsedData=qs.parse(store)
            console.log(parsedData)
            res.end(JSON.stringify(parsedData))
        }
        
    })
}
server.listen(9000,()=>{
    console.log('sever listening on port 9k')
})