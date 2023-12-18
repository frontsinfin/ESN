"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const src = "http://localhost:8080/api";
  const [localData, setlocalData] = useState();
  const [isVisible, setisVisible] = useState(true);
  const [input, setinput] = useState({ name: "", surname: "" });

  useEffect(() => {
    axios.get(`${src}/user`).then(function (res) {
      setlocalData(res.data);
    });
  }, [localData]);

  const addUser = () => {
    axios.post(`${src}/user`, input).then(function (res) {
      console.log(res);
    });
    setinput({ name: "", surname: "" });
  };

  const deleteUser = (id) => {
    console.log(id);
    axios.delete(`${src}/user/${id}`).then(function (res) {
      console.log(res);
    });
  };

  const updateUser = (id) => {
    setisVisible(!isVisible);
  };
  const changeTarget = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  if (!localData) return null;
  return (
    <main className="flex min-h-screen flex-col  p-10">
      <h1 className="p-2 font-bold text-xl mx-auto">Список пользователей</h1>
      {localData ? (
        <>
          <div className="w-1/2 mx-auto">
            {localData.map((user, index) => (
              <div className="flex w-full justify-between " key={user.id}>
                {isVisible ? <div>1</div> : <div>2</div>}
                <span>{index + 1}.</span>
                <span>{user.name} </span>
                <span>{user.surname}</span>
                <button
                  className="inline border-2  ml-1 px-3 rounded-lg whitespace-nowrap"
                  onClick={() => deleteUser(user.id)}
                >
                  x
                </button>
                <button
                  className="inline border-2  ml-1 px-3 rounded-lg whitespace-nowrap"
                  onClick={() => updateUser(user.id)}
                >
                  ред.
                </button>
              </div>
            ))}
          </div>

          <section className="flex gap-4 p-4 mx-auto">
            <input
              className="border-2 px-5 rounded-lg"
              type="text"
              name="name"
              value={input.name}
              onChange={changeTarget}
              placeholder="введите имя"
            />
            <input
              className="border-2 px-5 rounded-lg"
              type="text"
              name="surname"
              value={input.surname}
              onChange={changeTarget}
              placeholder="введите фамилию"
            />

            <button
              onClick={addUser}
              className="inline border-2 px-5 rounded-lg whitespace-nowrap"
            >
              добавить
            </button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
}
