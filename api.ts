import {Router} from "https://deno.land/x/oak@v5.0.0/mod.ts";

import * as planets from "./models/planets.ts";

import * as launches from "./models/launches.ts";

const router=new Router();

router.get("/",(ctx)=>{
    ctx.response.body=`NASA`;
});

router.get("/planets",(ctx)=>{
   // ctx.throw(501,"Sorry Planets are not available");
    ctx.response.body=planets.getAllPlanets();
});
router.get("/launches",(ctx)=>{
    // ctx.throw(501,"Sorry Planets are not available");
     ctx.response.body=launches.getAll();
 });

 router.get("/launches/:id",(ctx)=>{
    // ctx.throw(501,"Sorry Planets are not available");
    if(ctx.params?.id){
        const launcheslist=launches.getOne(Number(ctx.params.id));
        if(launcheslist)
        {
            ctx.response.body=launcheslist;
        }
        else{
            ctx.throw(400,"Launch with that ID does not exist");
        }

    }
 });

export default router;