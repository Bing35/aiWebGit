import * as fs from 'fs/promises'
import * as path from 'path'
import mustache from 'mustache'
import pino from 'pino'
import { fileURLToPath } from "url";
import pg from 'pg'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'



const cwd = path.dirname(fileURLToPath(import.meta.url))
// const logger = pino(pinoPretty({
//     colorize: true
// }))
const logger = pino()

async function renderTemplate(filename, templateDict={}){
    const headStr = await fs.readFile(path.join(cwd, 'view/head.html'), 'utf-8').then(str=>mustache.render(str, templateDict))
    const bodyStr = await fs.readFile(path.join(cwd, `view/${filename}`), 'utf-8')
        .catch(function(e){
            console.log(e);
            return 'html file not found'
        })
        .then(str=>mustache.render(str, templateDict))
    const footStr = await fs.readFile(path.join(cwd, 'view/foot.html'), 'utf-8').then(str=>mustache.render(str, templateDict))

    return headStr+bodyStr+footStr
}

async function serveStaticFiles(cont,next){
    // const re = new RegExp(`^/static`)
    // if(cont.request.path.search(re) === -1){
	// 	await next()
	// 	return
    // }

    if(cont.request.path.includes('..') || !cont.request.path.startsWith('/static')){await next();return}


    const filePath = path.join(cwd, 'view', cont.request.path)
    // check the file type and send appropriate http header
    // if(filePath.search(/\.css$/) > -1){
    //     cont.response.type = 'text/css'
    // }
    // else if(filePath.search(/\.m?js$/ > -1)){
    //     cont.response.type = 'application/javascript'
    // }
    if(filePath.endsWith('.css')){
        cont.response.type = 'text/css'
    }
    else if(filePath.endsWith('.js') || filePath.endsWith('.mjs')){
        cont.response.type = 'application/javascript'
    }

    cont.response.body = await fs.open(filePath, 'r').then(fileHandle=>fileHandle.createReadStream())
}


async function koaLog(cont,next){
    const startTime = Date.now()
    await next()
    logger.info({
        request:{
            path: cont.path,
            ip: cont.ip,
            ip2: cont.header['x-real-ip'],
            // header: {
            //     host: cont.header.host,
            //     'user-agent': cont.header['user-agent']
            // },
            method: cont.method
        },
        // response: {
        //     status: cont.status,
        //     header: cont.response.headers
        // },
        responseTime: Date.now()-startTime
    })
}

async function koaPath(path, pathFunction){
    return async function(cont,next){
        if (cont.path != path) {await next(); return}

        await pathFunction(cont)
    }
}

const { Pool } = pg
const dbPool = new Pool({
    user: 'helloworld',
    password: 'abcdr',
    host: '123.456.789.012',
    port: 1234,
    database: 'db_game_survivor',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


function mdToHtml(md){
    return sanitizeHtml(marked.parse(md))
}



export {renderTemplate, serveStaticFiles, koaLog, koaPath, dbPool, mdToHtml}
