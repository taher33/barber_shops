import type { GetServerSideProps, NextPage } from "next";
import ThemeSwitch from "../components/themeSwitch";
import { supabase } from "../utils/supabase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

const Home: NextPage = () => {
  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  }
  return (
    <div className="flex flex-col p-6">
      <h2 className="text-5xl font-bold mb-8 dark:text-gray-100">
        barber shops or clients welcome
      </h2>

      <button
        onClick={signInWithGoogle}
        className="bg-gray-900 focus:outline-none focus:bg-slate-600 hover:bg-slate-600  rounded-lg font-medium text-white p-3 px-6 capitalize mb-2"
        disabled={!!supabase.auth.user()}
      >
        get started
      </button>
      <ThemeSwitch />
      {supabase.auth.user() && supabase.auth.user()?.email}
    </div>
  );
};

export default Home;
