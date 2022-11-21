import "./App.css";

import Form from "./components/Form";
import { FetchData } from "./components/fetchData";

function App() {
    return (
        <div className="App">
            <Form />
            <FetchData />
        </div>
    );
}

export default App;
