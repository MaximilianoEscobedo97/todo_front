import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {Todo} from "./app/todo";
function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
      <Route
        to={"/"}
        component={Todo}
      />
      </BrowserRouter>
    </div>
  )
}

export default App;
