import { useNavigate } from "react-router-dom"
import ImageComponent from "./ImageComponent"
import FilterCourses from "./FilterCourses"
import DataTable from "./DataTable"
 const MainMenu  = () =>{ 
    //funzione che aggiorna la visualizzazione della pagina
    const refreshFunciton=()=>{
        window.location.reload(true)
    }
    //funzione che racchiude l'esecuzuine della funzione precedente
    const wrapp_refreshFunction=()=>{
        setTimeout(refreshFunciton,5000)
    }
    const delete_docs=()=>{
        const docs = document.querySelectorAll("input[name=\"delete\"]:checked")
        if(docs.length===0)
            window.alert("Attenzione non hai selezionato nulla")
        else{
            if(window.confirm("Sei sicuro di voler eliminare i docenti dalla lista? Quest'azione è irreversibile")){
                window.setTimeout(check_consistance,5000)
            }
        }
    }
    //Navigazione dalla pagina del menù principale alla pagina di aggiunta docente
    const navigate = useNavigate();
    const gotoAddNewDocent=()=>{
        sessionStorage.removeItem("dep_scelto")
        navigate('/addnewdocent')
    }
    //Immagini da inserire nei pulsanti
    const refresh = {
        title: 'refresh button',
        path:  'https://cdn-icons-png.flaticon.com/128/724/724863.png'
    }
    const add = {
        title: 'add button',
        path: 'https://cdn-icons-png.flaticon.com/512/4677/4677490.png'
    }
    const rem = {
        title: 'delete button',
        path: 'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'
    }
    const logo = <ImageComponent align="left" side="100"/>
    const ncorsi = 400;
    //Funzione che controlla se i docenti garanti ci sono tutti
    const check_consistance=()=>{
        const docenti = sessionStorage.getItem("contentFile").split("\n")
        if(docenti.length < ncorsi )
            window.alert("Attenzione mancano docenti garanti")
    }
    return(
        <>
            {check_consistance()}
            <font face="Arial" id="ciao">
                {logo}
                <h1 align="center"><br/>Menu principale</h1>
                <br/>
                <hr/>
                <table align="left" width="25%">
                    <tr>
                        <th><button  id="refresh_button" onClick={wrapp_refreshFunction}><img src={refresh.path} width="25" height="25" alt=""/></button></th>
                        <FilterCourses/>
                    </tr>
                </table>
                <DataTable />
                <table align="left" width="30%">
                    <tr>
                        <th><button onClick={delete_docs}><img align="left" align-text="center" src={rem.path} alt ="" width="25" height="35"/> <font align="center"> Elimina docente/i </font> </button></th>
                        <th><button onClick={gotoAddNewDocent}><img align="left" src={add.path} width="35" height="35" alt="" /> Aggiungi un nuovo docente</button></th>
                    </tr>
                </table>
            </font>
        </>
    )

}
export default MainMenu;