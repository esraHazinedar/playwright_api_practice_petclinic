const processENV = process.env.TEST_ENV
const env = processENV || 'dev'
console.log('Test environment is: ' + env)

const config = {
    apiUrl: 'https://petclinic-api.bondaracademy.com/petclinic/api',
    userEmail: process.env.USERNAME,
    userPassword: process.env.PASSWORD
}

if(env === 'qa'){
    config.userEmail = '',
    config.userPassword = ''
}
if(env === 'prod'){
    config.userEmail = '',
    config.userPassword = ''
}


export {config}