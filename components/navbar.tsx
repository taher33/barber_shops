import { NextPage } from "next";
import ThemeSwitch from "../components/themeSwitch";
import { supabase } from "../utils/supabase";

interface Props {}

const Navbar: NextPage<Props> = () => {
  async function signInWithGoogle() {
    await supabase.auth.signIn({
      provider: "google",
    });
  }

  return (
    <div className="w-full dark:bg-slate-900 sticky bg-gray-50 p-2 flex justify-end items-center ">
      <ThemeSwitch />
      {supabase.auth.user() && (
        <>
          {supabase.auth.user()?.email}
          <button
            onClick={signInWithGoogle}
            className="bg-gray-900 disabled:bg-gray-300 focus:outline-none focus:bg-slate-600 hover:bg-slate-600  rounded-lg font-medium text-white px-5 py-2  capitalize "
            disabled={!!supabase.auth.user()}
          >
            login
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
