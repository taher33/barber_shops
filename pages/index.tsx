import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Button from "../components/Button";
import Navbar from "../components/navbar";
import Shopcards from "../components/shopcards";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col p-2">
        <h2 className="text-5xl font-bold mt-8 dark:text-gray-100">raouf</h2>
        <h2 className="text-2xl font-bold mt-8">
          barber shops or clients welcome
        </h2>
        <Shopcards />
        <Map />
      </main>
    </div>
  );
};

export default Home;
