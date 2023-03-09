import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListUser from "./pages/list/ListUser";
import DetailUser from "./components/datatable/user/DetailUser";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ListProduct from "./pages/list/ListProduct";
import ListPlant from "./pages/list/ListPlant";
import ListOther from "./pages/list/ListOther";
import ListDelivery from "./pages/list/ListDelivery";
import ProductDetails from "./components/datatable/product/ProductDetails";
import PlantDetails from "./components/datatable/plant/PlantDetails";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/">
            <Route index element={ <RequireAuth> <Home /> </RequireAuth> }/>

            <Route path="users">
              <Route index element={ <RequireAuth> <ListUser /> </RequireAuth>}/>
              <Route path=":userId" element={ <RequireAuth> <DetailUser /> </RequireAuth> }/>
              <Route path="new" element={<RequireAuth> <New inputs={userInputs} title="Add New User" /></RequireAuth>}/>
            </Route>

            <Route path="products">
              <Route index element={<RequireAuth> <ListProduct/> </RequireAuth>}/>
              <Route path=":productId" element={<RequireAuth> <ProductDetails /> </RequireAuth>}/>
              <Route path="new" element={<RequireAuth> <New inputs={productInputs} title="Add New Product" /></RequireAuth>}/>
            </Route>

            <Route path="plants">
              <Route index element={<RequireAuth> <ListPlant /> </RequireAuth>}/>
              <Route path=":plantId" element={<RequireAuth> <PlantDetails /> </RequireAuth>}/>
              <Route path="new" element={<RequireAuth> <New inputs={productInputs} title="Add New Product" /></RequireAuth>}/>
            </Route>

            <Route path="orders">
              <Route index element={<RequireAuth> <ListProduct /> </RequireAuth>}/>
              <Route path=":orderId" element={<RequireAuth> <DetailUser /> </RequireAuth>}/>
              <Route path="new" element={<RequireAuth> <New inputs={productInputs} title="Add New Product" /></RequireAuth>}/>
            </Route>

            <Route path="delivery">
              <Route index element={<RequireAuth> <ListDelivery /> </RequireAuth>}/>
              <Route path=":deliveryId" element={<RequireAuth> <DetailUser /> </RequireAuth>}/>
              <Route path="new" element={<RequireAuth> <New inputs={productInputs} title="Add New Product" /></RequireAuth>}/>
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
