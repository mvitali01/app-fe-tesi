import React from "react";
import ImageComponent from "./ImageComponent";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    //Funzione per andare alla pagina del menù principale
    const navigate = useNavigate();
    const gotoMainMenu= ()=>{
        const username = document.getElementById("username").value;
        const pass = document.getElementById("pass").value;
        //Controlla se le credenziali vuote
        if((username === null || username ==="" ) || (pass===null || pass==="")){
            alert("per favore inserisci le credenziali");
            navigate('/login')
        }
        //Controlla se le credenziali sono corrette: le credenziali sono fasulle
        else if (username !=="michelevitali@gmail.com" && pass!=="vitali") {
            alert("Credenziali errate")
        }
        //Si prosegue al menù principale
        else{
            navigate('/menu')
        }
    }
    //Componente  del logo dell'università
    const logoLogin  = <ImageComponent align="middle" side="200" />
    return(
        <>
            <font face="Arial">
                <p align="center">
                    {logoLogin}<hr/>
                    <h1><b>Autenticazione</b></h1>
                    <table bgcolor="white" align="center" width="50%">
                        <th>
                            <h2 align="center">
                                <b>Nome Utente:</b><br/><br/>
                                <input id="username" type="email" /><br/><br/>
                                <b>Password:</b><br/><br/>
                                <input id="pass" type="password" /><br/><br/>
                                <button onClick={gotoMainMenu}>Accedi</button>
                            </h2>
                        </th>
                    </table>
                </p>
            </font>
        </>
    );
}
export default Login;