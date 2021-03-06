import {
  POKEMON_ACTION_START,
  POKEMON_ACTION_FAIL,
  ALL_POKEMON_FETCH_SUCCESS,
  POKEMON_FETCH_SUCCESS,
  CHANGE_CATCHED_POKEMON,
} from "./actionTypes";
import axios from "../../utils/axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";

const pokemonActionStart = () => {
  return {
    type: POKEMON_ACTION_START,
  };
};

const pokemonActionFail = () => {
  return {
    type: POKEMON_ACTION_FAIL,
  };
};

const pokemonFetchAllSuccess = (pokemon: any[]) => {
  return {
    type: ALL_POKEMON_FETCH_SUCCESS,
    payload: {
      pokemon,
    },
  };
};

const pokemonFetchSuccess = (pokemon: any) => {
  return {
    type: POKEMON_FETCH_SUCCESS,
    payload: {
      pokemon,
    },
  };
};

export const changeCatchedPokemon = (catched: string[]) => {
  localStorage.setItem("catched", JSON.stringify(catched));

  return {
    type: CHANGE_CATCHED_POKEMON,
    payload: {
      catched,
    },
  };
};

export const fetchAllPokemon =
  (): AppThunk => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(pokemonActionStart());
    try {
      const pokemon = await getPokemonList();
      dispatch(pokemonFetchAllSuccess(pokemon));
    } catch (err) {
      dispatch(pokemonActionFail());
    }
  };

export const fetchPokemon =
  (id: string): AppThunk =>
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch(pokemonActionStart());
    try {
      const pokemon = await getPokemon(id);
      dispatch(pokemonFetchSuccess(pokemon));
    } catch (err) {
      dispatch(pokemonActionFail());
    }
  };

const getPokemonList = async () => {
  const res: any = await axios.get("pokemon?limit=1200");
  return [...res.data.results];
};

const getPokemon = async (id: string) => {
  const res: any = await axios.get(`pokemon/${id}`);
  return { ...res.data };
};
