import logo from './logo.svg';
import './App.css';
import MainComponent from "./component/MainComponent.js"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/Store.js";
function App() {
  return (
    <div>
<Provider store={Store}>
    <BrowserRouter>
<MainComponent />
</BrowserRouter>
</Provider>
    </div>
  );
}

export default App;
