import {Router} from "https://deno.land/x/oak@v5.4.0/mod.ts";

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

 router.delete("/launches/:id",(ctx)=>{
if(ctx.params?.id){
   const result=launches.removeOne(Number(ctx.params.id));
   ctx.response.body={ success : result};
}
 });

 router.post("/launches",async (ctx)=>{
     const body=await ctx.request.body();
     launches.addOne(body.value);

     ctx.response.body={
         success:true
     };
     ctx.response.status=201;
 })
export default router;