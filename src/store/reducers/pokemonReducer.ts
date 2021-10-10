import {
  POKEMON_ACTION_START,
  POKEMON_ACTION_FAIL,
  ALL_POKEMON_FETCH_SUCCESS,
  POKEMON_FETCH_SUCCESS,
  CHANGE_CATCHED_POKEMON,
} from "./../actions/actionTypes";
import { AnyAction } from "redux";

const initialState = {
  pokemonList: null,
  pokemon: null,
  error: null,
  isLoading: false,
  catched: [],
};

const pokemonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case POKEMON_ACTION_START:
      return { ...state, isLoading: true };
    case POKEMON_ACTION_FAIL:
      return { ...state, isLoading: false };
    case ALL_POKEMON_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonList: [...action.payload.pokemon],
      };

    case POKEMON_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemon: { ...action.payload.pokemon },
      };
    case CHANGE_CATCHED_POKEMON:
      return { ...state, catched: [...action.payload.catched] };
    default:
      return state;
  }
};

export default pokemonReducer;
