const parseBody = (req)=>{
  return new Promise((resolve,reject)=>{
let body = '';

req.on('data',chunk=>{
  body += chunk.toString()
})

req.on('end',()=>{
  const parsed = JSON.parse(body)
  console.log(parsed)
  resolve(parsed)
})

req.on('error',err=>{
  reject(`Error hit :${err}`);
})
})}

const handelRequest=async(req, res)=>{
  if(req.url == `/` && req.method === 'GET'){
    res.end(`Welcome to the homepage`)
  }else if(req.url ==='/test' && req.method ==='POST')
  {
    const body = await parseBody(req);
    res.on('end',()=>{
      try {
        const parsed = body? JSON.parse(body) : {}
        resolve(parsed)
      } catch (error) {
        resolve({})
      }
    })
  }
}

module.exports = handelRequest