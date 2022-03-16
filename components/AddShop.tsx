import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Button from "./Button";

type Props = {
  setPoints: Dispatch<SetStateAction<number[][]>>;
};

function AddShop({ setPoints }: Props) {
  const [name, setName] = useState<string>("");
  const changeCb = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleSubmit = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        console.log("here");
        setPoints((prev) => {
          prev.push([data.coords.latitude, data.coords.longitude]);
          return prev;
        });
      },
      (err) => console.log(err)
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="my-5 flex flex-col items-start"
    >
      <label htmlFor="name">name of the shop</label>
      <input
        type="text"
        name="name"
        id="name"
        className="px-2 py-1 focus-within:outline-indigo-500 my-2"
        value={name}
        onChange={changeCb}
      />
      <Button onClickFn={handleSubmit} type="submit">
        create a new shop
      </Button>
    </form>
  );
}

export default AddShop;
