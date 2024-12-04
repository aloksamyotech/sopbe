import 'dotenv/config'
export const database_urls = Object.freeze({
    connection : process.env.DB_URL || 'mongodb://127.0.0.1:27017/' ,
    db_name : process.env.DB_NAME || 'Sop'
})