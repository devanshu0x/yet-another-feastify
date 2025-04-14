import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import OrderPage from "./pages/Order"
import SuccessPage from "./pages/SuccessPage"
import MyOrdersPage from "./pages/MyOrders"



function App() {
  

  return (
    <div className="font-openSans">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/login" element={<SignIn/>} ></Route>
      <Route path="/register" element={<SignUp/>} ></Route>
      <Route path="/menu" element={<Menu/>} ></Route>
      <Route path="/cart" element={<Cart/>} ></Route>
      <Route path="/order" element={<OrderPage/>} ></Route>
      <Route path="/order/success" element={<SuccessPage/>} ></Route>
      <Route path="/myorders" element={<MyOrdersPage/>} ></Route>

      </Routes>
    </div>
  )
}

export default App
