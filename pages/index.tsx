import type { GetServerSideProps, NextPage } from "next";
import Navbar from "../components/navbar";
import Shopcards from "../components/shopcards";
import { supabase } from "../utils/supabase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col p-2">
        <h2 className="text-5xl font-bold mt-8 dark:text-gray-100">
          barber shops or clients welcome
        </h2>
        <h2 className="text-2xl font-bold mt-8 dark:text-gray-100">
          barber shops or clients welcome
        </h2>
        <Shopcards />
      </main>
    </div>
  );
};

export default Home;
