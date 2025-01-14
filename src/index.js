import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import AddNewDocent from "./pages/AddNewDocent";
import NavMenu from "./pages/NavMenu";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavMenu/>}>
                    <Route index element={<Start/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="menu" element={<MainMenu/>}/>
                    <Route path="addnewdocent" element={<AddNewDocent/>}/>
                </Route> 
            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);