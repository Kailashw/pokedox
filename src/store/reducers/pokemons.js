import * as types from '../actions/actionTypes';

const initialState = {
  pokemons: [],
  categories: [],
  categoryDetail: [],
  allPokemons: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_POKEMONS:
      return { ...state, allPokemons: action.payload, pokemons: action.payload };
    case types.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case types.GET_CATEGORY_DETAILS:
      if (parseInt(action.payload) === 0) {
        return { ...state, pokemons: state.allPokemons };
      } else {
        let pokeIds = state.categories.find(el=> el.id === String(action.payload)).pokeIds
        let res = []
        for (let i = 0; i < pokeIds.length; i++) {
          let obj = state.allPokemons.find(el => el.id === parseInt(pokeIds[i]))
          res.push(obj)
        }
        return { ...state, pokemons: res };
      }

    case types.DELETE_CATEGORY:
      return { ...state, categories: state.categories.filter(el => el.id !== action.payload), pokemons: state.allPokemons };
    case types.ADD_NEW_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload),
        pokemons: state.allPokemons
      }
    default:
      return state;
  }
}