import * as types from './actionTypes';
import axios from 'axios';

// @TODO: change below API to python code once it is up and ready 
const API = 'https://5dfb223138678a00145fa952.mockapi.io/pokemons';

export const loading = (bool) => {
  return {
    type: types.LOADING,
    payload: bool
  };
};

export const setAllPokemonsData = (payload) => {
  return {
    type: types.GET_ALL_POKEMONS,
    payload: payload
  };
};

export const setAllCategoriesData = (payload) => {
  return {
    type: types.GET_CATEGORIES,
    payload: payload
  };
};

export function fetchPokemons() {
  return function (dispatch) {
    try {
      return axios.get(`${API}/pokemons`)
        .then(({ data }) => {
          dispatch(setAllPokemonsData(data));
          dispatch(loading(false));
        });
    } catch (error) {
      dispatch(loading(false));
      throw error;
    }
  };
}

export function fetchCategories() {
  return function (dispatch) {
    try {
      return axios.get(`${API}/categories`)
        .then(({ data }) => {
          dispatch(setAllCategoriesData(data));
          dispatch(loading(false));
        });
    } catch (error) {
      dispatch(loading(false));
      throw error;
    }
  };
}

export const fetchCategory = ( id )=> {
  return function (dispatch) {
    return dispatch({
      type: types.GET_CATEGORY_DETAILS,
      payload: id
    })
  }
};

export const deleteCategory = ( id )=> {
  return function (dispatch) {
    return dispatch({
      type: types.DELETE_CATEGORY,
      payload: id
    })
  }
};

export const addNewCategoryToRedux = ( payload )=> {
  return {
      type: types.ADD_NEW_CATEGORY,
      payload: payload
    }
};

export const addNewCategory = ( payload )=> {
  return function (dispatch) {
    try {
      return axios.post(`${API}/categories`,{ id: payload.id, name : payload.name, pokeIds : payload.pokeIds })
        .then(({ data }) => {
          dispatch(addNewCategoryToRedux(payload));
          dispatch(loading(false));
        });
    } catch (error) {
      dispatch(loading(false));
      throw error;
    }
  }
};


export const deleteCategoryDetail = ( id )=> {
  return function (dispatch) {
    try {
      return axios.delete(`${API}/categories/${id}`)
        .then(({ data }) => {
          dispatch(deleteCategory(id));
          dispatch(loading(false));
        });
    } catch (error) {
      dispatch(loading(false));
      throw error;
    }
  }
};
