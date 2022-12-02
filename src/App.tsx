import './App.css'
import BoardComponent from "./components/BoardComponent";
import {Provider} from "react-redux";
import store from "./store";

function App() {

    return <Provider store={store}><BoardComponent/></Provider>
}

export default App
