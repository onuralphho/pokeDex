import { useEffect, useState } from "react";
import Image from "next/image";
import { sleep } from "../utils/sleep";
import PokemonDetail from "./PokemonDetails";
import { useRouter } from "next/router";
const PokemonCard = (props) => {
  const [details, setDetails] = useState();
  const [isModal, setIsModal] = useState(false);
  const [evolution, setEvolution] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getDetails = async () => {
    setIsLoading(true);
   
    const res = await fetch(props.pokemon.url);

    const data = await res.json();
    
    setDetails(data);
    setIsLoading(false);
  };

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

      {isLoading ? (
        <>
          <div className="fixed top-0 w-screen h-screen bg-black bg-opacity-60 z-10"></div>
          <div className="fixed flex justify-items-center items-center max-sm:-mt-[160px] w-full p-4 sm:w-11/12  md:w-9/12  lg:w-7/12   xl:w-6/12  2xl:w-5/12 px-5  z-20 bg-white rounded-xl h-[518px] sm:h-[488px]">
            <div className="animate-ping relative flex justify-center items-center mx-auto my-auto h-24 w-24 bg-gradient-to-r to-orange-500 from-blue-600 rounded-full">
              <div className="h-20 w-20 bg-white rounded-full"></div>
            </div>
          </div>
        </>
      ) : (
        isModal && (
          <PokemonDetail
            isModal={isModal}
            setIsModal={setIsModal}
            details={details}
            isLoading={isLoading}
          />
        )
      )}
    </>
  );
};

export default PokemonCard;
