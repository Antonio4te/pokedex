type PokemonState = {
  pokemonList: any[] | null;
  pokemon: any | null;
  isLoading: boolean;
  error: string | null;
  catched: string[] | null;
};

type RootState = {
  pokemon: PokemonState;
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
