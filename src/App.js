import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carts from "./pages/Carts";
import Address from "./pages/Address";
import Account from "./pages/Account";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/user/account" element={<Account />} />
            <Route path="/user/carts" element={<Carts />} />
            <Route path="/user/address" element={<Address />} />
            <Route path="/user/invoice/:id" element={<Invoice />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
