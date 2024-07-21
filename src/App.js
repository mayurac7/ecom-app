import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/signin/signin.component";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home />}/>
        <Route path="/shop" element={<h1>Shop</h1>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Route>
    </Routes>
  );
}

export default App;
