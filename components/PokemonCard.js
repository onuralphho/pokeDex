import { useEffect, useState } from "react";
import Image from "next/image";
import { sleep } from "../utils/sleep";
import PokemonDetail from "./PokemonDetails";
import { useRouter } from "next/router";
const PokemonCard = (props) => {
  const [details, setDetails] = useState();
  const [isModal, setIsModal] = useState(false);
  const [evolution, setEvolution] = useState();
  
  const getDetails = async () => {
    const res = await fetch(props.pokemon.url);
    const data = await res.json();

    setDetails(data);
  };

  // const getEvos = async () => {
  //   const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${details.id}`)
  //   const data = await res.json()
  //   setEvolution(data)
  //   console.log(details);
  // };

  return (
    <>
      <div
        onClick={async () => {
          await getDetails();
         
         
          setIsModal(!isModal);
        }}
        className=" text-center font-bold text-white capitalize max-sm:mx-8 w-full sm:w-5/12  md:w-3/12 lg:w-/12 xl:w-2/12  rounded-xl cursor-pointer bg-gradient-to-tr shadow-md shadow-orange-500 from-yellow-400 to-red-600 p-2  hover:-translate-y-2  transition-all  text-xl max-h-12  "
      >
        {props.pokemon.name}
      </div>

      {isModal && (
        <PokemonDetail isModal={isModal} setIsModal={setIsModal} details ={details} />
       
      )}
    </>
  );
};

export default PokemonCard;
