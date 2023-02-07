var http = require('http')
var fs = require('fs')
var url = require('url')

var server = http.createServer(handleRequest)

var userPath = __dirname + '/users/'

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true)

    var store = ''
    req.on('data', (chunk) => {
        store = store + chunk
    })

    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/users') {
            console.log(store)
            var username = JSON.parse(store).username
            fs.open(userPath + username + '.json', 'wx', (err, fd) => {
                if (err) return console.log(err)
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err)
                    fs.close(fd, () => {
                       return res.end(`${username} created successfully`)
                    })
                })
            })
        }

       else if (req.method === 'GET' && parsedUrl.pathname === '/users') {
            console.log(parsedUrl)
            var username = parsedUrl.query.username
            fs.readFile(userPath + username + '.json', (err, content) => {
                console.log(err, content)
                res.setHeader('Content-Type', 'application/json')
                return res.end(content)
            })
        }

        else if (req.method === 'PUT' && parsedUrl.pathname === '/users') {
            var username = parsedUrl.query.username
            fs.open(userPath + username + '.json', 'r+', (err, fd) => {
                if (err) return console.log(err)
                fs.ftruncate(fd, (err) => {
                    if (err) return console.log(err)
                    fs.writeFile(fd, store, (err) => {
                        if (err) return console.log(err)
                        fs.close(fd,() => {
                           return res.end(`${username} updated successfully`)
                        })
                    })
                })
            })
        }

        else if(req.method==='DELETE' && parsedUrl.pathname==='/users'){
            var username=parsedUrl.query.username
            fs.unlink(userPath + username + '.json',(err)=>{
                if(err) return console.log(err)
                   return res.end(`${username} is deleted`)
            })
        }

       else{
        res.statusCode=404
        res.end('page Not found')
       }
    })
}

server.listen(3000, () => {
    console.log('server listening on port 3k')
})