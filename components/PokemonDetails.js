import Image from "next/image";
import { useEffect, useState } from "react";
import { sleep } from "../utils/sleep";

const PokemonDetail = (props) => {
  const [evos, setEvos] = useState();
  const [evoChain, setEvoChain] = useState();
  useEffect(() => {
    const getEvos = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${props.details.id}`
      );
      const data = await res.json();
      setEvos(data);
    };

    getEvos();

   



  }, []);
 
  return (
    <>
      <div
        onClick={() => {
          props.setIsModal(false);
        }}
        className="fixed top-0 w-screen h-screen bg-black bg-opacity-60 z-10 "
      ></div>
      <div className="fixed mx-auto my-auto max-sm:-mt-[100px] w-full p-4 sm:w-10/12   xl:w-8/12  2xl:w-5/12 px-5  z-20 bg-white rounded-xl">
        <div className="flex flex-row w-full h-auto   justify-between">
        <span className="text-gray-400 text-xl self-center ">#{props.details.id}</span>
          <button
            onClick={() => {
              props.setIsModal(false);
            }}
            className="btn btn-ghost text-red-500  text-xl font-bold"
          >
            X
          </button>
        </div>
        <div className="flex max-md:justify-center flex-wrap    border-b-2 pb-2 text-stone-900 ">
          <div className="flex flex-col gap-2">
            
            <Image
              className="ml-5 p-4 w-auto max-w-[200px]"
              src={
                props.details.sprites.other.dream_world.front_default
                  ? props.details.sprites.other.dream_world.front_default
                  : props.details.sprites.other.home.front_default
                  ? props.details.sprites.other.home.front_default
                  : props.details.sprites.versions.generation -
                    viii.icons.front_default
              }
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL={
                props.details.sprites.other.dream_world.front_default
                  ? props.details.sprites.other.dream_world.front_default
                  : props.details.sprites.other.home.front_default
                  ? props.details.sprites.other.home.front_default
                  : props.details.sprites.versions.generation -
                    viii.icons.front_default
              }
              alt="pokemon picture"
            />
            <h1 className="capitalize text-5xl w-full font-semibold te ">
              {props.details.name}
            </h1>
            <span className=" ">
              <span className="font-bold">Weight:</span> {props.details.weight}{" "}
              kg
            </span>
            <span className="">
              <span className="font-bold">Height:</span> {props.details.height}{" "}
              m
            </span>
            <div className="flex gap-2 ">
              {props.details.types.map((type) => (
                <span
                  key={Math.random()}
                  className={`pokemon-type px-4 py-1 rounded capitalize text-gray-100 font-semibold  ${type.type.name}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <span>
            {evos &&
              evos.evolves_from_species &&
              evos.evolves_from_species.name}
          </span>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;

