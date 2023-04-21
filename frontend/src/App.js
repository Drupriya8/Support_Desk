import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NewTicket from './pages/NewTicket'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoutes'
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="/ticket/:id" element={<PrivateRoute />}>
            <Route path="/ticket/:id" element={<Ticket />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
