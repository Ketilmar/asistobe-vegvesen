import "./App.css";

import Form from "./components/Form";
import { FetchData } from "./components/sortedFetch";

function App() {
  return (
    <div className="App">
      <Form />
      <FetchData />
    </div>
  );
}

export default App;
