"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const src = "http://localhost:8080/api";
  const [localData, setlocalData] = useState();
  const [isVisible, setisVisible] = useState(null);
  const [input, setinput] = useState({ name: "", surname: "" });
  const [inputUpdate, setinputUpdate] = useState({
    name: "",
    surname: "",
  });

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
    axios.delete(`${src}/user/${id}`).then(function (res) {
      console.log(res);
    });
  };

  const updateUser = (id) => {
    console.log(inputUpdate);
    axios.put(`${src}/user/`, { ...inputUpdate, id }).then(function (res) {
      console.log(res);
    });
    setisVisible(null);
    setinputUpdate({ name: "", surname: "" });
  };
  const changeTarget = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeUpdate = (e) => {
    setinputUpdate({ ...inputUpdate, [e.target.name]: e.target.value });
    console.log(inputUpdate);
  };

  const changeId = (id) => {
    setisVisible(id);
  };
  if (!localData) return null;
  return (
    <main className="flex min-h-screen flex-col  p-10">
      <h1 className="p-2 font-bold text-xl mx-auto">Список пользователей</h1>
      {localData ? (
        <>
          <div className="w-3/4 mx-auto">
            {localData.map((user, index) => (
              <div
                className="grid grid-cols-5 w-full justify-between "
                key={user.id}
              >
                {isVisible === user.id ? (
                  <>
                    <span>{index + 1}.</span>
                    <input
                      className="border-2 px-5 rounded-lg "
                      type="text"
                      name="name"
                      value={inputUpdate.name}
                      onChange={changeUpdate}
                      placeholder={user.name}
                    />
                    <input
                      type="text"
                      name="surname"
                      value={inputUpdate.surname}
                      onChange={changeUpdate}
                      className="border-2 px-5 rounded-lg"
                      placeholder={user.surname}
                    />
                    <button
                      className="inline border-2  ml-1 px-3 rounded-lg whitespace-nowrap"
                      onClick={() => updateUser(user.id)}
                    >
                      сохранить
                    </button>
                  </>
                ) : (
                  <>
                    <span>{index + 1}.</span>
                    <span>{user.name} </span>
                    <span>{user.surname}</span>
                    <button
                      className="inline border-2  ml-1 px-3 rounded-lg whitespace-nowrap"
                      onClick={() => changeId(user.id)}
                    >
                      редактировать
                    </button>
                  </>
                )}
                <button
                  className="inline border-2  ml-1 px-3 rounded-lg whitespace-nowrap"
                  onClick={() => deleteUser(user.id)}
                >
                  x
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
