// Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Pages
import CreateEmployee from './pages/CreateEmployee'
import ManageEmployee from './pages/ManageEmployee'
import Error from './pages/Error'

function App() {
  return (
    <Router>
      <section>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/manage" element={<ManageEmployee />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
