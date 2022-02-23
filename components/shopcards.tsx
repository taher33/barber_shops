import { NextPage } from "next";
import Router, { useRouter } from "next/router";

interface Props {}
const Shopcards: NextPage<Props> = () => {
  const shops = [1, 2];
  const router = useRouter();
  return (
    <div className="flex flex-nowrap mt-4">
      {shops.map((el, i) => (
        <div
          onClick={() => router.push(`/shop/${el}`)}
          key={el}
          className={`
          w-52 h-64 bg-cover mr-4 text-white cursor-pointer bg-center bg-no-repeat shadow-sm rounded-lg bg-[url("/barber${el}.jpg")]     
          `}
        >
          <div className="bg-gradient-to-t p-2 from-black   pt-44 w-full h-full rounded-lg">
            <h3 className="capitalize font-semibold">james carter</h3>
            <p className="text-gray-100">rating...</p>
            <button> checkout</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shopcards;
