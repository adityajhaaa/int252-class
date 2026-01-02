import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";

function App() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [pass, setPass] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    axios
      .get("https://6932a508e5a9e342d270339c.mockapi.io/Resource")
      .then((res) => setFetchData(res.data))
      .catch((err) => console.log(err));
  }, []);

 
  const handleDelete = useCallback(
    (id) => {
      axios
        .delete(
          `https://6932a508e5a9e342d270339c.mockapi.io/Resource/${id}`
        )
        .then(() => {
          setFetchData((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => console.log(err));
    },
    [setFetchData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputName || !inputEmail || !inputPhone || !pass) {
      alert("Fill all required fields");
      return;
    }

    const formData = {
      name: inputName,
      email: inputEmail,
      phone: inputPhone,
      password: pass,
    };

    axios
      .post(
        "https://6932a508e5a9e342d270339c.mockapi.io/Resource",
        formData
      )
      .then((res) => {
        setFetchData((prev) => [...prev, res.data]);
        setInputName("");
        setInputEmail("");
        setInputPhone("");
        setPass("");
      });
  };

  const filteredData = useMemo(() => {
    return fetchData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fetchData]);


  const renderedList = useMemo(() => {
    return filteredData.map((item) => (
      <div
        key={item.id}
        className="flex justify-between bg-slate-800 p-3 rounded-lg shadow-md"
      >
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.phone}</p>
        <p>{item.password}</p>

        <div className="flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
            Edit
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [filteredData, handleDelete]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-5">


      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 p-5 bg-slate-800 rounded-xl shadow-lg"
      >
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter name"
          className="p-2 text-black rounded bg-white"
        />

        <input
          type="text"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="Enter email"
          className="p-2 text-black rounded bg-white"
        />

        <input
          type="text"
          value={inputPhone}
          onChange={(e) => setInputPhone(e.target.value)}
          placeholder="Enter phone number"
          className="p-2 text-black rounded bg-white"
        />

        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter password"
          className="p-2 text-black rounded bg-white"
        />

        <input
          type="submit"
          value="Submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded cursor-pointer"
        />
      </form>


      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full mt-4 bg-white text-black"
      />
      <div className="space-y-3 mt-6">{renderedList}</div>
    </div>
  );
}

export default App;
