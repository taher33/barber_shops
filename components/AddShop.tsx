import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Button from "./Button";
import MyModal from "./mymodal";

type Props = {
  setPoints: Dispatch<SetStateAction<number[][]>>;
};

function AddShop({ setPoints }: Props) {
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const changeCb = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const getShopLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setPoints((prev) => {
          prev.push([data.coords.latitude, data.coords.longitude]);
          return prev;
        });
      },
      (err) => setIsOpen(true)
    );
  };

  return (
    <>
      <MyModal
        data={{
          action: "I understand",
          body: "sorry but for this we must use your current loaction to put your shop on the map",
          header: "location is needed",
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="my-5 text-lg flex flex-col items-start"
      >
        <label htmlFor="name">name of the shop</label>
        <input
          type="text"
          name="name"
          id="name"
          className="text-base px-4 py-2 focus-within:outline-indigo-500 my-2 bg-indigo-200 rounded-lg font-5"
          value={name}
          onChange={changeCb}
        />
        <Button
          classname="mb-4"
          secondery
          onClickFn={getShopLocation}
          type="button"
        >
          add shop location
        </Button>
        <Button type="submit">create your shop</Button>
      </form>
    </>
  );
}

export default AddShop;
