import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router} from "react-router-dom";

const App = () =>
{
  const [count, setCount] = useState(0);

  const increment = useCallback(()=> {
    setCount(c => c + 1);
  }, [setCount])

  const name = 'John';
  const isNameShowing = true;

  return (
    <Router>
      <div className="App">
        <Hello increment={increment} />
        <h1>Hello {isNameShowing ? name : 'someone'}!</h1>
      </div>
    </Router>
  );
}

export default App;
