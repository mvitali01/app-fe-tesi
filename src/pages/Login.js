import React from "react";
import ImageComponent from "./ImageComponent";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    //Funzione per andare alla pagina di caricamento dei file
    const gotoStart= ()=>{
        const username = document.getElementById("username").value;
        const pass = document.getElementById("pass").value;
        //Controlla se le credenziali vuote
        if((username === null || username ==="" ) || (pass===null || pass==="")){
            alert("per favore inserisci le credenziali");
        }
        //Controlla se le credenziali sono corrette: le credenziali sono fasulle
        else if (username !=="username@example.com" && pass!=="passowrd") {
            alert("Credenziali errate")
        }
        //Si prosegue alla pagina di caricamento dei file
        else{
            //Ogetto che vede se esiste un file
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    navigate('/menu')
                }else{
                    //console.log(xhr.responseText)
                    navigate('/start')
                }
            };
            xhr.open('GET','http:/<IP EC2>:3000/api/v1/file/generated');
            xhr.send()
        }
    }
    //Componente  del logo dell'università
    const logoLogin  = <ImageComponent align="middle" side="200" />
    return(
        <>
            <font face="Arial">
                    <h1 align="center">{logoLogin}</h1><hr/>
                    <h1 align="center" ><b>Autenticazione</b></h1>
                    <h2 align="center">
                    <table bgcolor="white" align="center" width="50%">
                        <tbody>
                            <tr>
                                <td>
                                    <b>Nome Utente:</b><br/><br/>
                                    <input placeholder="user" id="username" type="email" /><br/><br/>
                                    <b>Password:</b><br/><br/>
                                    <input id="pass" type="password" /><br/><br/>
                                    <button onClick={gotoStart}>Accedi</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </h2>
            </font>
        </>
    );
}
export default Login;