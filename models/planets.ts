import {join} from "../deps.ts";
import {BufReader} from "../deps.ts";
import{parse} from "../deps.ts";
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js";

interface Planet{
    [key: string] : string
}

// type Planet=Record<string,string>;

let planets : Array<Planet>;

export function filterHabitablePlanets(planets: Array<Planet>){
return planets.filter((planet) =>{
    const planataryRadius=Number(planet["koi_prad"]);
    const stellarMass=Number(planet["koi_smass"]);
    const stellarRadius=Number(planet["koi_srad"]);

    return planet["koi_disposition"]==="CONFIRMED"
    && planataryRadius>0.5 && planataryRadius<1.5
    && stellarMass>0.78 && stellarMass<1.04
    && stellarRadius>0.99 && stellarRadius<1.01;
});    
}

async function loadPlanetsData(){
    const path=join("data","kepler_exoplanets_nasa.csv");
    
    const file = await Deno.open(path);
  
    const bufReader=new BufReader(file);
    const result=await parse(bufReader,{
        header:true,
        comment:"#",
    });
    Deno.close(file.rid);
    const planets=filterHabitablePlanets(result as Array<Planet>)
  
    return planets.map((planet)=>{
        return _.pick(planet, [
          "koi_prad",
          "koi_smass",
          "koi_srad",
          "kepler_name",
          "koi_count",
          "koi_steff"

        ])
    });
}
planets=await loadPlanetsData();
console.log(`${planets.length} habitable planets found!`);

// for(const planet of newEarths)
// {
//     console.log(planet);
// }

export function getAllPlanets(){
    return planets;
}