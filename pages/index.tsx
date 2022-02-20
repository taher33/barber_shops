import type { NextPage } from "next";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useTheme } from "next-themes";

const Home: NextPage = () => {
  const [enabeld, setEnabeld] = useState(true);
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    return setEnabeld(!enabeld);
  };

  return (
    <div className="">
      <h2 className="text-5xl font-bold mb-8 dark:text-gray-500">
        barber shops or clients welcome
      </h2>

      <button className="bg-gray-900 rounded text-white p-2 px-6 capitalize">
        get started
      </button>
      <Switch
        checked={enabeld}
        onChange={() => changeTheme()}
        className={`${enabeld ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabeld ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default Home;
