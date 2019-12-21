import { combineReducers } from "redux";
import pokemons from "./pokemons";
import loading from "./loading";

const rootReducer = combineReducers({
    pokemons,
    loading
});

export default rootReducer;