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
          console.log()
         
          setIsModal(!isModal);
        }}
        className=" text-center font-bold text-white capitalize max-sm:mx-8 w-full sm:w-5/12  md:w-3/12 lg:w-/12 xl:w-2/12  rounded-xl cursor-pointer bg-gradient-to-tr shadow-md shadow-orange-500 from-yellow-400 to-red-600 p-2  hover:-translate-y-2  transition-all  text-xl max-h-12  "
      >
        {props.pokemon.name}
      </div>

      {isModal && (
        <PokemonDetail isModal={isModal} setIsModal={setIsModal} details ={details} />
        // <>
        //   <div
        //     onClick={() => {
        //       setIsModal(false);
        //     }}
        //     className="fixed top-0 w-screen h-screen bg-black bg-opacity-60 z-10 "
        //   ></div>
        //   <div className="fixed mx-auto my-auto w-[340px] p-2   md:w-[900px] sm:p-10  z-20 bg-white rounded-xl">
        //     <div className="flex flex-row w-full  justify-end">
        //       <button
        //         onClick={() => {
        //           setIsModal(false);
        //         }}
        //         className="btn btn-ghost text-red-500  text-3xl font-bold"
        //       >
        //         X
        //       </button>
        //     </div>
        //     <div className="flex max-md:justify-center flex-wrap    border-b-2 pb-2 text-stone-900 ">
        //       <div className="flex flex-col gap-2">
        //         <Image
        //           className="ml-5 w-auto max-w-[200px]"
        //           src={details.sprites.other.dream_world.front_default}
        //           width={150}
        //           height={150}
        //           placeholder="blur"
        //           blurDataURL={details.sprites.front_default}
        //           alt="pokemon picture"
        //         />
        //         <h1 className="capitalize text-5xl w-full font-semibold te ">
        //           {details.name}
        //         </h1>
        //         <span className=" ">
        //           <span className="font-bold">Weight:</span> {details.weight} kg
        //         </span>
        //         <span className="">
        //           <span className="font-bold">Height:</span> {details.height} m
        //         </span>
        //         <div className="flex gap-2 ">
        //           {details.types.map((type) => (
        //             <span
        //               key={Math.random()}
        //               className={`pokemon-type px-4 py-1 rounded capitalize text-gray-100 font-semibold  ${type.type.name}`}
        //             >
        //               {type.type.name}
        //             </span>
        //           ))}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </>
      )}
    </>
  );
};

export default PokemonCard;
