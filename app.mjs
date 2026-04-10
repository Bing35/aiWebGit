import Koa from 'koa'
import {koaBody} from 'koa-body'
import { renderTemplate, serveStaticFiles, koaLog, koaPath, mdToHtml } from './helperFunctions.mjs'
import {log} from 'console'
import Anthropic from '@anthropic-ai/sdk';  


const app = new Koa()

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_KEY, // This is the default and can be omitted
});


app.use(koaLog)
app.use(koaBody())
app.use(serveStaticFiles)

app.use(await koaPath('/', async function(cont){
    if (cont.method == 'GET'){
        cont.body = await renderTemplate('index.html', {
            message: 'hello world',
            mode: '',
            placeholder: 'Ask anything...'
        })    
    }
    if (cont.method == 'POST'){
        const mode = cont.request.body.mode
        let systemPrompt
        if (mode === 'narrative') {
            systemPrompt = 'Write a nice narrative about '
        } else {
            systemPrompt = ''
        }
        const claudeContent = [
            {type: 'text', text: systemPrompt + cont.request.body.prompt}
        ]
        log('claude content', claudeContent)

        const claudeAnswer = await anthropic.messages.create({
            max_tokens: 4096,
            temperature: 0,
            messages: [{role:'user', content: claudeContent}],
            model: 'claude-haiku-4-5',
        })
            .catch(function(error){
                console.error(error)
                // message.reply(error)
                return undefined
            });
        
        if(!claudeAnswer) return
        
        const text = claudeAnswer.content[0].text    
        
        cont.body = await renderTemplate('aiResponse.html', {
            title: 'claude',
            answer: mdToHtml(text)
        })
    }
}))

app.use(await koaPath('/narrative', async function(cont){
    if (cont.method == 'GET'){
        cont.body = await renderTemplate('index.html', {
            message: 'hello world',
            mode: 'narrative',
            placeholder: 'Enter a subject for the narrative...'
        })
    }
}))



app.listen(50100, () => {
    log('Server listening on port 50100');
  });