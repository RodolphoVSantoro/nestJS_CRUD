import {FruitDTO} from "../DTO/FruitDTO";

export function validateFruit(fruit: FruitDTO){
    if (fruit._id && fruit.name && fruit.color) {
        if (
            fruit._id.length > 0 &&
            fruit.name.length > 0 &&
            fruit.color.length > 0
        ) {
            return true;
        }
    }
    return false;
}