import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem("todolists"));
    if (lists) {
      setLists(lists);
    }
  }, []);

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLists([...lists, input]);
    localStorage.setItem("todolists", JSON.stringify(lists));
    setInput("");
  };

  const handleDeleteTasks = (index) => {
    const updatedList = [...lists.slice(0, index), ...lists.slice(index + 1)];
    setLists(updatedList);
    localStorage.setItem("todolists", JSON.stringify(updatedList));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="add to do"
          onChange={inputChangeHandler}
        />
        <button type="submit"> submit </button>
      </form>
      <ul>
        {lists.map((el, i) => {
          return (
            <li key={i}>
              {el} <button onClick={() => handleDeleteTasks(i)}> Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
