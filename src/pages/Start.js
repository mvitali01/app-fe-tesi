import React from "react";
import {useNavigate} from "react-router-dom";
import ImageComponent from "./ImageComponent";
const Start = () => {
    const apigClient = window.apigClientFactory.newClient();
    const navigate = useNavigate();
    const gotoMainMenu = () =>{
        upload_file_1()
        upload_file_2()
        upload_file_3()
        var params = {};
        var body = {}; 
        var additionalParams = {};
        apigClient.apiV1AlgorithmStartPost(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log("Algoritmo avviato con successo\n"+JSON.stringify(result,'',2))   
            setInterval(getStatus(),10000)
        }).catch( function(result){
            //This is where you would put an error callback
            console.error("Errore partenza dell'APP:"+result)
        });
    }
    const getStatus=()=>{
        var stato='running'
        var params = {};
        var body = {}; 
        var additionalParams = {};
        apigClient.apiV1AlgorithmStatusGet(params, body, additionalParams)
                .then(function(result){
                    //This is where you would put a success callback
                    console.log("Stato algoritmo:\n"+JSON.stringify(result,'',2))
                    stato =result.data.status
                    localStorage.setItem("status",stato)
                    if(stato !=='finished'){
                        console.log('L\'algoritmo sta ancora lavorando')
                    }else{
                         console.log("finito")
                         navigate('/menu')
                         
                    }
                }).catch( function(result){
                    //This is where you would put an error callback
                    console.error("Errore:\n"+JSON.stringify(result))
                });

    }
    const  upload_file_1=()=>{
        var file1 = document.getElementById("excel_doc");
        var file = file1.files[0];
        const date = new Date();
        const up_date = date.toLocaleString();
        //Stampa su console le caratteristiche del file e la data di caricamento
        console.log("Name:"+file.name+" Size:"+file.size+" Type:"+file.type+" Upload date:"+up_date);
        //Ogetto che conterrà il file da inviare
        const formData = new FormData();
        formData.append("file",file,file.name)
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Il file è stato caricato correttamente
              console.log("File caricato con successo!\n"+xhr.response);
            }
        };
        //Richiesta al server
        xhr.open('POST','http://34.225.255.18:3000/api/v1/files/upload1',true)
        xhr.send(formData); //Invio dei dati
    }
    const upload_file_2=()=>{
        var file2 = document.getElementById("excel_degree");
        var file = file2.files[0];
        const date = new Date();
        const up_date = date.toLocaleString();
        //Stampa su console le caratteristiche del file e la data di caricamento
        console.log("Name:"+file.name+" Size:"+file.size+" Type:"+file.type+" Upload date:"+up_date);
         //Ogetto che conterrà il file da inviare
        const formData = new FormData();
        formData.append("file2",file,file.name)
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Il file è stato caricato correttamente
              console.log("File caricato con successo!\n"+xhr.response);
            }
        };
        //Richiesta al server
        xhr.open('POST','http://34.225.255.18:3000/api/v1/files/upload2',true)
        xhr.send(formData); //Invio dei dati
    }
    const upload_file_3=()=>{
        var file3 = document.getElementById("excel_courses");
        var file = file3.files[0];
        const date = new Date();
        const up_date = date.toLocaleString();
        //Stampa su console le caratteristiche del file e la data di caricamento
        console.log("Name:"+file.name+" Size:"+file.size+" Type:"+file.type+" Upload date:"+up_date);
        const formData = new FormData();
        const xhr = new XMLHttpRequest();
        //Ogetto che conterrà il file da inviare
        formData.append("file3",file,file.name)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // Il file è stato caricato correttamente
              console.log("File caricato con successo!\n"+xhr.response);
            }
        };
        //Richiesta al server
        xhr.open('POST','http://34.225.255.18:3000/api/v1/files/upload3',true)
        xhr.send(formData); //Invio dei dati
    }
    const logo = <ImageComponent align="left" side="100"/>
    return(
        <>
            <font face="Arial">
                {logo}
                <h1 align="center"> <br/> Benvenuto nella tua nuova area di lavoro</h1>
                <br/>
                <hr/>
                <h2>
                    Prima di procedere al menù princiaple e visualizzare i docenti garanti<br/>
                    sarà necessario caricare 3 file excel.<br/>
                    Il contenuto per ciascun file deve esssere il seguente:<br/>
                    <form encType="multipart\form-data">
                    <ol>
                        <li>
                            Il file excel con l'elenco dei professori:<br/>
                            <input  id="excel_doc" name="fileP" type="file" accept=".xls, .xlsx" /><br/>
                        </li>
                        <li>
                            Il file excel con l'elenco dei corsi di laurea:<br/>
                            <input id="excel_degree" type="file" accept=".xls, .xlsx"/><br/>
                        </li>
                        <li>
                            Il file exel con l'elenco dei corsi offerti dall'università:<br/>
                            <input id='excel_courses' type='file' accept=".xls, .xlsx"/>
                        </li>
                    </ol>
                    </form>
                    <button onClick={gotoMainMenu}>Procedi al menù principale</button>  
                </h2> 
            </font>
        </>
    );
}
export default Start;
