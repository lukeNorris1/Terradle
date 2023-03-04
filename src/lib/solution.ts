import weaponData from "../assets/terrariaWeapons.json";
import { MAX_WORD_LENGTH } from "../constants/gameSettings";

export function makeSolution(){
    let tempChosen = Object.values(weaponData.weapons).filter(
      (e) => e.name.length <= MAX_WORD_LENGTH
    );
    return {solution:  tempChosen[Math.floor(Math.random() * tempChosen.length)].name}
  }


export let { solution, } = makeSolution()