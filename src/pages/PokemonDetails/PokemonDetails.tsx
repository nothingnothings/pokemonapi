////REACT
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

///AXIOS
import axios, { AxiosError } from 'axios';

///COMPONENTS
import PokedexWrapper from '../../components/hocs/PokedexWrapper/PokedexWrapper';
import PokemonDetailsCard from '../../components/PokemonDetailsCard/PokemonDetailsCard';

///MODELS
import { Pokemon } from '../../models/pokemon.model';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const PokemonDetails: React.FC<Pokemon> = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [detailsLoading, setDetailsLoading] = useState<boolean>(true);
  const [detailsIsError, setDetailsIsError] = useState<boolean>(false);
  const [detailsErrorMessage, setDetailsErrorMessage] = useState<string>('');

  const params = useParams();
  const pokemonId = params.pokemonId;

  let content;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => {
        return res.data;
      })
      .then((pokemonData: Pokemon) => {
        setDetailsLoading(false);
        setPokemon((_prevState) => {
          return pokemonData;
        });
      })
      .catch((err: AxiosError | Error) => {
        console.log(err);
        setDetailsIsError(true);
        setDetailsErrorMessage(err.message);
      });
  }, []);

  if (!pokemon && detailsLoading) {
    content = (
      <PokedexWrapper message="Quem é esse Pokemon?" isDetails={true}>
        <Spinner></Spinner>
      </PokedexWrapper>
    );
  } else {
    content = (
      <PokedexWrapper message="Quem é esse Pokemon?" isDetails={true}>
        <PokemonDetailsCard pokemon={pokemon!}></PokemonDetailsCard>
      </PokedexWrapper>
    );
  }

  if (detailsIsError) {
    content = (
      <ErrorComponent errorMessage={detailsErrorMessage}></ErrorComponent>
    );
  }

  return content;
};

export default PokemonDetails;
