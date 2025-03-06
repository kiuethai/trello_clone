let apiRoot = ''
console.log('import.meta.env', import.meta.env)
console.log('process.env', process.env)
// eslint-disable-next-line no-constant-condition
if (process.env.BUILD_MODE = 'dev') {
  apiRoot = 'http://localhost:8017'
}
// eslint-disable-next-line no-constant-condition
if (process.env.BUILD_MODE = 'production') {
  apiRoot = 'https://trello-api-1-3f5m.onrender.com'

}
console.log('🚀 ~ apiRoot:', apiRoot)
export const API_ROOT = apiRoot

// export const API_ROOT = 'https://trello-api-1-3f5m.onrender.com'
