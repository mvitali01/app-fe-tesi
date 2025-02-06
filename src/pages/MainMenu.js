import { useNavigate } from "react-router-dom"
import ImageComponent from "./ImageComponent"
import DataTable from "./DataTable"
 const MainMenu  = () =>{ 
    const apigClient = window.apigClientFactory.newClient();;
    //funzione che aggiorna la visualizzazione della pagina
    const refreshFunciton=()=>{
    var params = {};
    var body = {}; 
    var additionalParams = {};
    console.log("-----------Riparteza algoritmo-----------")
    apigClient.apiV1AlgorithmStartPost(params, body, additionalParams)
    .then(function(result){
        //This is where you would put a success callback
        console.log("Algoritmo avviato con successo\n"+JSON.stringify(result,'',2))
        var stato ='running';
        setInterval(getStatus(),5000)
        if(stato==='finished')
            console.log('L\'algoritmo ha finito')
        
    }).catch( function(result){
        //This is where you would put an error callback
        console.error("Errore partenza dell'APP:"+result)
    });
    apigClient.apiV1GenerationValidatePost(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log("Stato della sovrascrittura :\n"+JSON.stringify(result,'',2))
        }).catch( function(result){
            //This is where you would put an error callback
            console.error("Errore:\n"+JSON.stringify(result,'',2))
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
                    }
                }).catch( function(result){
                    //This is where you would put an error callback
                    console.error("Errore:\n"+JSON.stringify(result))
                });

    }

    //funzione che racchiude l'esecuzuine della funzione precedente
    const wrapp_refreshFunction=()=>{
        setTimeout(refreshFunciton,5000,true) 
    }
    const delete_docs=()=>{
        const docs = document.querySelectorAll("input[name=\"delete\"]:checked");
        if(docs.length===0)
            window.alert("Attenzione non hai selezionato nulla")
        else{
            const values = new Array()
            for(var i=0;i<docs.length; i++)
                values.push(docs[i].value)
            if(window.confirm("Sei sicuro di voler eliminare i docenti dalla lista? Quest'azione è irreversibile")){
                //window.setTimeout(check_consistance,5000)
            }var params = {};
            var body = {
                user_ids: values
            }; 
            var additionalParams = {};
            console.log("Rquest body:"+JSON.stringify(body,'',2))
            apigClient.apiV1UsersDeleteDelete(params, body, additionalParams)
                .then(function(result){
                    console.log("Rimozione docenti:\n"+JSON.stringify(result,'',2))
                    alert('Attenzione mancano docenti garanti')
                    //This is where you would put a success callback
                }).catch( function(result){
                    //This is where you would put an error callback
                    console.error("Errore:\n"+JSON.stringify(result,'',2))
                });
        }
    }
    //Navigazione dalla pagina del menù principale alla pagina di aggiunta docente
    const navigate = useNavigate();
    const backtoUpload=()=>{
        navigate('/start')
    }
    //Immagini da inserire nei pulsanti
    const refresh = {
        title: 'refresh button',
        path:  'https://cdn-icons-png.flaticon.com/128/724/724863.png'
    }
    /*const add = {
        title: 'add button',
        path: 'https://cdn-icons-png.flaticon.com/512/4677/4677490.png'
    }*/
    const rem = {
        title: 'delete button',
        path: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'
    }
    const logo = <ImageComponent align="left" side="100"/>
    return(
        <>
            <font face="Arial">
                {logo}
                <h1 align="center"><br/>Menu principale</h1>
                <br/>
                <hr width="150%"/>
                <table align="left" width="25%">
                    <tbody>
                        <tr>
                            <td><button  id="refresh_button" onClick={wrapp_refreshFunction}><img src={refresh.path} width="25" height="25" alt=""/></button></td>
                        </tr>
                    </tbody>
                </table>
                <DataTable />
                <table align="left" width="30%">
                    <tbody>
                    <tr>
                        <td><button onClick={delete_docs}><img align="left" align-text="center" src={rem.path} alt ="" width="25" height="35"/> <font align="center"> Elimina docente/i </font> </button></td>
                        <td><button onClick={backtoUpload}> Torna al caricamento dei file</button></td>
                    </tr>
                    </tbody>
                </table>
            </font>
        </>
    )

}
export default MainMenu;