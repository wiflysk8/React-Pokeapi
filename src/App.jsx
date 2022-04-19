import { useState } from "react";
import "./App.scss";
import axios from "axios";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      setPokemon({
        name: pokemonName,
        number: res.data.id,
        species: res.data.species.name,
        image: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
        type: res.data.types[0].type.name,
      });
      setPokemonChosen(true);
    });
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokémon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img className="c-img" src={pokemon.image} alt={pokemon.name} />
            <h3 className="c-number">
              Number: <span>#{pokemon.number}</span>
            </h3>
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>
              Hp: <span>{pokemon.hp}</span>
            </h4>
            <h4 className="c-number">
              {" "}
              Attack: <span>{pokemon.attack}</span>
            </h4>
            <h4 className="c-number">
              Defense: <span>{pokemon.defense}</span>
            </h4>
            <h4 className="c-number">
              Speed:<span>{pokemon.speed}</span>{" "}
            </h4>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
