import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import '../App.css'
const NavMenu = () =>{
    const [apigClient,setApigClient] = useState(null)
    useEffect(()=>{
        if(window.apigClientFactory){
            const client = window.apigClientFactory.newClient();
            setApigClient(client)
            console.log("Apig Client avviato")
        }else{
            console.error("non ho trovato l'apig client")
        }
    },[])
    return(
        <>
            <nav>
                <Link to="/"></Link>
                <Link to="/start"></Link>
                <Link to="/menu"></Link>
                <Link to="/addnewdocent"></Link>
            </nav>
            <Outlet/>
        </>
    )
}
export default NavMenu;