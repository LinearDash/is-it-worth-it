const params = new URLSearchParams(window.location.search)

const token = params.get('token')

if(token){
localStorage.setItem('token', token)
window.location.href = '/'
}else{
window.location.href = '/pages/login.html'
}

