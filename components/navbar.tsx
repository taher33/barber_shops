import { NextPage } from "next";
import ThemeSwitch from "../components/themeSwitch";
import { supabase } from "../utils/supabase";
import Button from "./Button";

interface Props {}

const Navbar: NextPage<Props> = () => {
  async function signInWithGoogle() {
    await supabase.auth.signIn({
      provider: "google",
    });
  }
  async function signOut() {
    supabase.auth.signOut();
  }

  return (
    <div className="w-full dark:bg-slate-900 sticky bg-gray-50 p-2 flex justify-end items-center ">
      <ThemeSwitch />
      <>{supabase.auth.user() && supabase.auth.user()?.email}</>
      <Button onClickFn={signInWithGoogle} disable={!!supabase.auth.user()}>
        login
      </Button>

      <Button onClickFn={signOut} disable={!supabase.auth.user()}>
        sign out
      </Button>
    </div>
  );
};

export default Navbar;
