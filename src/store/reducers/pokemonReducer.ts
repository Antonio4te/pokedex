import {
  POKEMON_ACTION_START,
  POKEMON_ACTION_FAIL,
  ALL_POKEMON_FETCH_SUCCESS,
  POKEMON_FETCH_SUCCESS,
} from "./../actions/actionTypes";
import { AnyAction } from "redux";
const initialState = {
  pokemonList: null,
  pokemon: null,
  error: null,
  isLoading: false,
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
    default:
      return state;
  }
};

export default pokemonReducer;
