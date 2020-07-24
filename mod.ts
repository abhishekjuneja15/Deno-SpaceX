import {log, Application , send} from "./deps.ts";
import api from "./api.ts";
// import { next } from "c:/users/abhishekjuneja/appdata/local/deno/deps/https/raw.githubusercontent.com/895640902b28edc36af13040a6dde6a8b4bd0e0b173ebaf0d0253244402525f9";

const app=new Application();
const PORT=8000;

await log.setup({
    handlers:{
        console:new log.handlers.ConsoleHandler("INFO"),
    },
    loggers:{
        default:{
            level:"INFO",
            handlers:["console"],
        },
    },
});
app.addEventListener("error",(event)=>{
    log.error(event.error);
});
app.use(async(ctx,next)=>{
    try{await next();
    }
    catch(err){
        ctx.response.body="Internal server error";
        throw err;
    }
})

app.use(async(ctx,next)=>{
await next();
const time=ctx.response.headers.get("X-Response-Time");
console.log(`${ctx.request.method} ${ctx.request.url}:${time}`);
});

app.use(async(ctx,next)=>{
    const start=Date.now();
    await next();
    const delta=Date.now()-start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

app.use(api.routes());
app.use(api.allowedMethods());


app.use(async (ctx)=>{
    const filePath = ctx.request.url.pathname;
    const fileWhitelist=[
        
        "/index.html",
        "/javascripts/script.js",
        "/images/favicon.png",
        "/stylesheets/style.css"
    ];
    if(fileWhitelist.includes(filePath)){
    await send(ctx,filePath, {
        root:`${Deno.cwd()}/public`,
    } );
}

})



if(import.meta.main){
    console.log(`Starting Server on port ${PORT}....`);
await app.listen({
    port:PORT,
});
}