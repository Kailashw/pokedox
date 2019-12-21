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
        let category = state.categories[action.payload].pokeIds
        let res = []
        for (let i = 0; i < category.length; i++) {
          let obj = state.pokemons.find(el => el.id == category[i])
          res.push(obj)
        }
        return { ...state, pokemons: res };
      }

    case types.DELETE_CATEGORY:
      // delete the category from redux
      return { ...state, categories: state.categories.filter(el => el.id !== action.payload), pokemons: state.allPokemons };
    case types.ADD_TO_CATEGORY:
      // add the cards to categories from redux
      let res = []
      state.categories.push(action.payload)
      for (let i = 0; i < action.payload.pokeIds.length; i++) {
        let obj = state.pokemons.find(el => el.id === action.payload.pokeIds[i])
        console.log(obj)
        res.push(obj)
      }
      return { ...state, categories: state.categories, pokemons: res }
    default:
      return state;
  }
}