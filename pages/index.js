import PokemonCard from "../components/PokemonCard";
import Image from "next/image";
import Logo from "../assets/pokemon-logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
export default function Home({ data: pokemons, data2: allTypes }) {
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState();
  const [allPokemons, setAllPokemons] = useState();
  const [filtredPokemonsByCategory, setFilteredPokemonsByCategory] = useState(
    []
  );

  const filteredData = pokemons.results.filter((item) =>
    item.name.includes(searchInput)
  );

  let filteredCategoryBySearch

  if (filtredPokemonsByCategory) {
    filteredCategoryBySearch = filtredPokemonsByCategory.filter((item) =>
      item.name.includes(searchInput)
    );
  }
  
  useEffect(() => {
    if (categoryInput === undefined || categoryInput === "clear") {
      
      setAllPokemons(pokemons.results);
      console.log(allPokemons);
    }

    if (categoryInput !== undefined && categoryInput !== "clear") {
      const getDataByType = async () => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/type/${categoryInput}`
        );
        const data = await res.json();
        let dummy = [];
        data.pokemon.map((pokemon) => dummy.push(pokemon.pokemon));

        setFilteredPokemonsByCategory(dummy);
      };
      console.log(categoryInput);
      getDataByType();
    }
  }, [categoryInput, searchInput]);

  const searchInputHandler = (e) => {
    if (e.target.value.startsWith(" ")) {
      return;
    }
    setSearchInput(e.target.value.toLowerCase());
  };

  const categoryInputHandler = (e) => {
    setCategoryInput(e.target.value);
  };

  // const filteredByCategory = filteredData.filter(()=> )

  return (
    <>
      <div className="h-screen w-auto  bg-gradient-to-tr from-green-300 to-blue-500 ">
        <nav className="container mx-auto  ">
          <div className="flex ">
            <Logo className="w-[200px] h-[100px]"></Logo>
          </div>
        </nav>
        <div className="container  mx-auto overflow-hidden max-sm::h-[790px] h-[900px] ">
          <div className="flex flex-wrap gap-5 mb-5  m-2 ">
            <select
              onChange={categoryInputHandler}
              className="text-xl max-sm:w-full grow bg-white rounded-lg p-2 shadow-lg capitalize flex-nowrap cursor-pointer"
              name="Category"
              value={categoryInput}
            >
              <option className="cursor-pointer" value="clear">
                All
              </option>
              {allTypes.results.map((category) => (
                <option
                  className="cursor-pointer  "
                  key={Math.random()}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              onChange={searchInputHandler}
              placeholder="Search a Pokemon!"
              className="input grow bg-white"
            />
          </div>
          <ul className="flex  gap-4   content-start  flex-wrap pt-2 scrollbar-hide  justify-center  h-full  overflow-auto">
            {categoryInput !== "clear" && categoryInput !== undefined
              ? filteredCategoryBySearch.map((pokemon) => (
                  <PokemonCard
                    key={Math.random()}
                    pokemon={pokemon}
                  ></PokemonCard>
                ))
              : filteredData.map((pokemon) => (
                  <PokemonCard
                    key={Math.random()}
                    pokemon={pokemon}
                  ></PokemonCard>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154"
  );
  const data = await res.json();

  const res2 = await fetch("https://pokeapi.co/api/v2/type");
  const data2 = await res2.json();
  return { props: { data, data2 } };
}
