import "./style/App.scss";
import Header from './components/Header';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import Home from './components/Home';
import { store } from "./store";
import Login from './components/Login';
import Register from './components/Register';
import AskQuestion from "./components/AskQuestion";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <div className="py-3">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/ask_question" component={AskQuestion} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
