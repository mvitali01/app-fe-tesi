import React from "react";
import {useNavigate} from "react-router-dom";
import ImageComponent from "./ImageComponent";
const Start = () => {
    const navigate = useNavigate();
    //const file1 = document.getElementById("bin1");
    //const file2 = document.getElementById("bin2");
    //const file3 = document.getElementById("bin3");
    //const upload_warning = alert("Per favore carica i file");
    const up_start=()=>{
        console.log(sessionStorage.length)
        if(sessionStorage.length !== 0){
            navigate("/login")
        }
    }
    const gotoLogin = () =>{
        upload_file()
        upload_file_2()
        upload_file_3()
        //console.log({file1}+" "+{file2}+" "+{file3});
        navigate('/login');
    }
    const  upload_file=()=>{
        var fileS = document.getElementById("garanti").files;
        var actF;
        for (var i=0;i<fileS.length;i++){
            actF = fileS[i];
            const date = new Date();
            const up_date = date.toLocaleString();
            console.log("Name:"+actF.name+" Size:"+actF.size+" Type:"+actF.type+" Upload date:"+up_date);
            var reader = new FileReader();
            reader.onload = function(event){
                var text = event.target.result;
                const csv = text.split();
                console.log(csv)
                //document.getElementById("garanti").innerHTML= text;
                sessionStorage.setItem("contentFile",csv)
                reader.onload = () =>{
                        const csvContent = reader.result;
                        console.log(csvContent);
    
                }
            }
        }
        reader.readAsText(actF)
        sessionStorage.setItem("file",actF)
           /*var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  // Il file è stato caricato correttamente
                  console.log("File caricato con successo!");
                }
              };
            xhr.open("POST", "https://drive.google.com/drive/folders/1w5F7N2SZQR8E-F2k5w0qHP5Of5GkQ6XU?usp=sharing", true);
            xhr.withCredentials = true
            //xhr.open("post","fileup.php")
            // Impostiamo l'header "Content-Type" su "multipart/form-data"
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // Creiamo un oggetto FormData e aggiungiamo il file selezionato
            const formData = new FormData();
            formData.append("file", actF);
            
            // Inviamo la richiesta al server con il metodo "send"
            xhr.send(formData);*/
            /*const formData = new FormData();
            formData.append("file",actF)
            fetch('upload',{method: "POST",  body: formData});*/
            //fileSystem = "file database"
            //fileSystem.root = "/Users/micheleviitali/Desktop/React/app-fe-tesi/src/dati"
            //console.log(fileSystem.name+" "+fileSystem.root)
            //const fs = require("fs")
            //fs.writeFile("/Users/micheleviitali/Desktop/React/app-fe-tesi/src/pages/upload",sessionStorage.getItem("contentFile"),(err)=>{if(err) throw err})
    }
    const upload_file_2=()=>{
        const fileS = document.getElementById("corso_laurea").files;
        var actF;
        for (var i=0;i<fileS.length;i++){
            actF = fileS[i];
            const date = new Date();
            const up_date = date.toLocaleString();
            console.log("Name:"+actF.name+" Size:"+actF.size+" Type:"+actF.type+" Upload date:"+up_date);
            var reader = new FileReader();
            reader.onload = function(event){
                var text = event.target.result;
                const csv = text.split();
                console.log(csv)
                //document.getElementById("corso_laurea").innerHTML= text;
                sessionStorage.setItem("corsi_laurea",csv)
                reader.onload = () =>{
                        const csvContent = reader.result;
                        console.log(csvContent);
                }
            }
        }
        reader.readAsText(actF)
        sessionStorage.setItem("file2",actF)

    }
    const upload_file_3=()=>{
        const fileS = document.getElementById("corsi").files;
        var actF;
        for (var i=0;i<fileS.length;i++){
            actF = fileS[i];
            const date = new Date();
            const up_date = date.toLocaleString();
            console.log("Name:"+actF.name+" Size:"+actF.size+" Type:"+actF.type+" Upload date:"+up_date);
            var reader = new FileReader();
            reader.onload = function(event){
                var text = event.target.result;
                const csv = text.split();
                console.log(csv)
                //document.getElementById("corsi").innerHTML= text;
                sessionStorage.setItem("corsi_cont",csv)
                reader.onload = () =>{
                        const csvContent = reader.result;
                        console.log(csvContent);
                }
            }
        }
        reader.readAsText(actF)
        sessionStorage.setItem("file3",actF)
    }
    const logo = <ImageComponent align="left" side="100"/>
    return(
        <>
            {up_start()}
            <font face="Arial">
                {logo}
                <h1 align="center"> <br/> Benvenuto nella tua nuova area di lavoro</h1>
                <br/>
                <hr/>
                <h2>
                    Prima di procedere con l'accesso con le credenziali fornite dal sistema<br/>
                    sarà necessario caricare 3 file di tipo binario.<br/>
                    Il contenuto per ciascun file deve esssere il seguente:<br/>
                    <form>
                    <ol>
                        <li>
                            Il file binario con l'elenco dei professori:<br/>
                            <input  id="garanti" name="fileP" type="file" accept=".csv" /><br/>
                        </li>
                        <li>
                            Il file binario con l'elenco dei corsi di laurea:<br/>
                            <input id="corso_laurea" type="file" accept=".csv"/><br/>
                        </li>
                        <li>
                            Il file binario con l'elenco dei singoli corsi per corso di laurea:<br/>
                            <input id="corsi" type="file" accept=".csv" /><br/>
                        </li>
                    </ol>
                    </form>
                    <button onClick={gotoLogin}>Procedi con il login</button>  
                </h2> 
            </font>
        </>
    );
}
export default Start;
