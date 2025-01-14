import { Link, Outlet } from "react-router-dom"
import '../App.css'
const NavMenu = () =>{
    return(
        <>
            <nav>
                <font face="Arial">
                    <table align="center" width="100%">
                        <tr>
                            <th align="center"><Link to="/"></Link></th>
                            <th align="center"><Link to="/login"></Link></th>
                            <th align="center"><Link to="/menu"></Link></th>
                            <th align="center"><Link to="/addnewdocent"></Link></th>
                        </tr>
                </table>
                </font>
            </nav>
            <Outlet/>
        </>
    )
}
export default NavMenu;