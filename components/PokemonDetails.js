import Image from "next/image";
import { useEffect, useState } from "react";
import { sleep } from "../utils/sleep";
import { FaHeart } from "react-icons/fa";
import {
  GiBroadsword,
  GiFlamedLeaf,
  GiSlashedShield,
  GiBorderedShield,
  GiRunningNinja,
} from "react-icons/gi";

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

      <div className="fixed mx-auto my-auto max-sm:-mt-[160px] w-full p-4 sm:w-11/12  md:w-9/12  lg:w-7/12   xl:w-6/12  2xl:w-5/12 px-5  z-20 bg-white rounded-xl">
        <div className="flex flex-row w-full h-auto   justify-between">
          <span className="text-gray-400 text-xl self-center ">
            #{props.details.id}
          </span>
          <button
            onClick={() => {
              props.setIsModal(false);
            }}
            className="btn btn-ghost text-red-500  text-xl font-bold"
          >
            X
          </button>
        </div>
        <div className="flex pb-10  sm:flex-col-reverse max-md:justify-center flex-wrap gap-5   border-b-2  text-stone-900 ">
          <div className="flex flex-col sm:flex-row sm:justify-center gap-5 sm:gap-20">
            <div className="flex-col">
              <div className="flex justify-center">
              <Image
                className="justify-center w-auto max-w-[200px] min-h-[200px] max-h-[200px]"
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
                  "https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="pokemon picture"
              />
              </div>
              <h1 className="capitalize text-5xl w-full font-semibold text-center ">
                {props.details.name}
              </h1>
            </div>
            <div className="flex flex-col sm:self-center space-y-3">
              <div className="flex items-end gap-2">
                <span className=" sm:text-2xl font-bold">Weight:</span>
                <span className="font-semibold sm:text-2xl ">
                  {props.details.weight} kg
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className=" sm:text-2xl font-bold">Height:</span>{" "}
                <span className="font-semibold sm:text-2xl ">
                  {" "}
                  {props.details.height} m
                </span>
              </div>
              <div className="flex gap-2 ">
                {props.details.types.map((type) => (
                  <span
                    key={Math.random()}
                    className={`pokemon-type h-8 align flex items-center px-4 py-1 rounded capitalize text-gray-100 font-semibold  ${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex pt-5 flex-wrap max-sm:w-5 mx-auto  gap-x-5 justify-center p-2 h-fit ">
            <div className="flex min-w-[70px] justify-center border p-1 rounded-2xl items-center gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <FaHeart fill="red" className="w-6 h-6" />
              <span className=" text-xl font-bold">
                {props.details.stats[0].base_stat}
              </span>
            </div>
            <div className="flex min-w-[70px] justify-center border p-1 rounded-2xl items-center  gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <GiBroadsword className="w-6 h-6" />
              <span className=" text-xl font-bold">
                {props.details.stats[1].base_stat}
              </span>
            </div>

            <div className=" flex min-w-[70px] justify-center border p-1 rounded-2xl items-center gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <GiSlashedShield className="w-6 h-6 text-blue-900" />
              <span className=" text-xl font-bold">
                {props.details.stats[2].base_stat}
              </span>
            </div>

            <div className=" flex min-w-[70px] justify-center  border p-1 rounded-2xl items-center gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <GiFlamedLeaf className="w-6 h-6 text-red-600" />
              <span className=" text-xl font-bold">
                {props.details.stats[3].base_stat}
              </span>
            </div>

            <div className=" flex  min-w-[70px] justify-center border p-1 rounded-2xl items-center gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <GiBorderedShield className="w-6 h-6 text-teal-600" />
              <span className=" text-xl font-bold">
                {props.details.stats[4].base_stat}
              </span>
            </div>

            <div className="flex min-w-[70px] justify-center  border p-1 rounded-2xl items-center gap-1 mb-2 hover:scale-110 transition-all duration-300">
              <GiRunningNinja className="w-6 h-6 text-slate-600" />
              <span className=" text-xl font-bold">
                {props.details.stats[5].base_stat}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-10 h-6">
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
