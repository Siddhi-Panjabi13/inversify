import dotenv from 'dotenv'
dotenv.config()
const mongodbURL={
    mongoURL:process.env.MONGODBURL||''
}
const port={
    PORT:process.env.PORT||3000
}
const secretKey={
    SECRETKEY:process.env.SECRETKEY||''
}

export {mongodbURL,port,secretKey}