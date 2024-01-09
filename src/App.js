// Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
// Pages
import CreateEmployeePage from './pages/CreateEmployeePage'
import ManageEmployeePage from './pages/ManageEmployeePage'
import Error from './pages/Error'
// Store
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section>
          <Routes>
            <Route path="/" element={<CreateEmployeePage />} />
            <Route path="/manage" element={<ManageEmployeePage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
