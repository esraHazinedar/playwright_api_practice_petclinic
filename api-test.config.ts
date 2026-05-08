const processENV = process.env.TEST_ENV
const env = processENV || 'dev'
console.log('Test environment is: ' + env)

const config = {
    apiUrl: 'https://petclinic-api.bondaracademy.com/petclinic/api',
    userEmail: process.env.USERNAME as string,
    userPassword: process.env.PASSWORD as string
}

if(env === 'qa'){
    config.userEmail = process.env.USERNAME as string,
    config.userPassword = process.env.PASSWORD as string
}
if(env === 'prod'){
    config.userEmail = '',
    config.userPassword = ''
}


export {config}