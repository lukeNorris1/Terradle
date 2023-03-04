import weaponData from "../assets/terrariaWeapons.json";
import { MAX_WORD_LENGTH } from "../constants/gameSettings";

export function findWeapon(){
    const tempChosen = Object.values(weaponData.weapons).filter(
      (e) => e.name.length <= MAX_WORD_LENGTH
    );
    return tempChosen[Math.floor(Math.random() * tempChosen.length)].name
  }

