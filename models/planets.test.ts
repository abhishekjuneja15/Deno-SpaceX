import {assertEquals,assertNotEquals} from "https://deno.land/std@0.60.0/testing/asserts.ts";

import{filterHabitablePlanets} from "./planets.ts";

const HABITABLE_PLANET={
    koi_disposition:"CONFIRMED",
    koi_prad:"1",
    koi_srad:"1",
    koi_smass:"1",
};

const NOT_CONFIRMED={
    koi_disposition:"FALSE POSTIVE",
};

const TOO_LARGE_PLANETARY_RADIUS={
    koi_disposition:"CONFIRMED",
    koi_prad:"1.5",
    koi_srad:"1",
    koi_smass:"1",
};

const TOO_LARGE_SOLAR_RADIUS={
    koi_disposition:"CONFIRMED",
    koi_prad:"1",
    koi_srad:"1.01",
    koi_smass:"1",
};

const TOO_LARGE_SOLAR_MASS={
    koi_disposition:"CONFIRMED",
    koi_prad:"1",
    koi_srad:"1",
    koi_smass:"1.04",
};

Deno.test("filter only habitable planets", ()=>{
    const filtered=filterHabitablePlanets([
        HABITABLE_PLANET,
        NOT_CONFIRMED,
        TOO_LARGE_PLANETARY_RADIUS,
        TOO_LARGE_SOLAR_MASS,
        TOO_LARGE_SOLAR_RADIUS
    ]);
    assertEquals(filtered,[HABITABLE_PLANET]);
    // assertNotEquals({
    //     runtime:"deno",
    // },{
    //     runtime:"node",
    // });
});

Deno.test({
    name:"long example test",
    ignore:true,
    fn(){
       // console.log("hello from tests");
       assertEquals("deno","deno");
       assertNotEquals({
           runtime:"deno",
       },{
           runtime:"node",
       });
       
    },
});
Deno.test({
    name:"ops leak",
    sanitizeOps:false,
    fn(){
       setTimeout(console.log,10000);
    },
});
Deno.test({
    name:"resource leak",
    sanitizeResources:false,
    async fn(){
        await Deno.open("./models/planets.ts");
    },
});