import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "./ImageComponent";
import FilterDepartment from "./FilterDepartment";
const AddNewDocent =() => {
    //Navigazione dalla pagina di aggiunta docente alla pagine del menù principale con una richiesta di conferma
    const navigate = useNavigate();
    const returntoMainMenu=()=>{
        if(window.confirm("Sei sicuro di voler tornare al menù princiale? Le modifiche apportate andranno perse")){
            navigate('/menu');
        }
    }
    //Funzione che crea un nuovo docente
    const create_new_docent=()=>{
        //estrazione dei dati inseriti dall'utente
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const mail = document.getElementById("mail").value;
        const residenza = document.getElementById("residenza").value;
        const cap = document.getElementById("cap").value;
        const indirizzo = document.getElementById("address").value;
        const data_nascita = document.getElementById("data_nascita").value;
        const male_checked = document.getElementById("male").checked;
        const female_checked = document.getElementById("female").checked;
        const role = document.getElementById("ruolo").value;
        const dipartimento = sessionStorage.getItem("dep_scelto");
        const courses = Array.from(document.getElementById("corsi").options);
        const selectedC = new Array();
        var string_coursers=""
        for ( const corso of courses){
            if (corso.selected){
                selectedC.push(corso.value);
                string_coursers=string_coursers.concat(corso.value+"; ")
            }
        }
        //Caso di fallimento
        if((name ===null || name==="") || (surname===null || surname==="") || (mail===null || mail==="") || (residenza===null || residenza==="") || (cap===null || cap==="")||(indirizzo===null || indirizzo==="")|| (data_nascita===null || data_nascita==="")|| (male_checked===false && female_checked===false)|| (role==="select_role") || (dipartimento==="selection_dip" || dipartimento===null) || (string_coursers==="" || string_coursers===null)){
            alert("Per favore riempi tutti i campi");
        }
        //Caso di successo
        else{
            var sex=""
            if(male_checked)
                sex="M"
            else
                sex="F"
            console.log(cap)
            const new_docent = "4,"+name+","+surname+","+data_nascita+","+sex+","+mail+","+residenza+" "+cap+" "+indirizzo+","+role+","+dipartimento+","+string_coursers
            var doc_al_add = sessionStorage.getItem("new_doc")
            if(doc_al_add===null)
                sessionStorage.setItem("new_doc",new_docent)
            else{
                doc_al_add = doc_al_add.concat("\n"+new_docent)
                sessionStorage.removeItem("new_doc")
                sessionStorage.setItem("new_doc",doc_al_add)
            }
            alert("Docente creato con successo");
        }
    }
    const logo = <ImageComponent align="left" side="100"/>
    var values_courses = new Array();
    //Estrazione dei corsi dal file dei corsi semplici e dai corsi di laurea per creare una select dinamica
    const getCourses=()=>{
        const content = new Array();
        const courses = sessionStorage.getItem("corsi_cont").split("\n");
        const degree_course = sessionStorage.getItem("corsi_laurea").split("\n");
        for(var i=0;i<courses.length;i++){
            var id_dcfc = parseInt(courses[i].split(",")[2])
            for(var j=0;j<degree_course.length;j++){
                var id_dcfd = parseInt(degree_course[j].split(",")[0])
                if(id_dcfc === id_dcfd){
                    content.push(courses[i].split(",")[1]+"-"+degree_course[j].split(",")[1])
                }
            }
        }
        return content;
    }
    values_courses =getCourses();
    const [val,setVal] = useState('');
    return(
        <>
            <font face="Arial">
                {logo}
                <h1 align="center">
                    <br/>Aggiungi un nuovo docente
                </h1>
                <br/>
                <hr/>
                <h2>
                    In questa sezione sarà possibile aggiungere un nuovo docente.<br/>
                    Nella prima sezione si dovranno inserire tutti i dati anagrafici del nuovo docente <br/>
                    Nella seconda sezione verranno inseriti i dati riguardo al suo ruolo all'interno dell'università <br/>
                    <font color="red"><b>Si prega di riempire tutti i campi con * in quanto obbligatori</b></font>
                </h2>
                <h3>Sezione anagrafica</h3>
                <h4>
                    <table width="75%">
                        <tr>
                            <td> Nome:<b>*</b> </td>
                            <td> <input id="name" type="text" /></td>
                            <td> Email-personale:<b>*</b> </td>
                            <td> <input id="mail" type="email" /></td>
                            <td> Sesso:<b>*</b></td>
                            <td>
                                <input type="radio" id="male" name="sesso" value="Male"/>M
                                <input type="radio" id ="female" name="sesso" value="Female"/>F

                            </td>
                        </tr>
                        <tr>
                            <td> Cognome:<b>*</b> </td>
                            <td> <input id="surname" type="text" /></td>
                            <td>Luogo di residenza:<b>*</b></td>
                            <td> <input id="residenza" type="text" /></td>
                            <td>CAP:<b>*</b></td>
                            <td> <input id="cap" type="text" /></td>
                        </tr>
                        <tr>
                            <td>Data di Nascita:<b>*</b></td>
                            <td><input id="data_nascita" type="date"/></td>
                            <td>Indirizzo di residenza:<b>*</b></td>
                            <td> <input id="address" type="text" /></td>
                            
                        </tr>
                    </table>
                </h4>
                <h3>Sezione lavorativa</h3>
                <h4>
                    <table>
                        <tr>
                            <td>Ruolo da ricoprire:<b>*</b></td>
                            <td>
                                <select name="ruolo" id="ruolo">
                                    <option value="select_role">Seleziona ruolo</option>
                                    <option value="junior">Ricercatore Junior</option>
                                    <option value="contratto">Docente a Contratto</option>
                                    <option value="ricercatore">Ricercatore</option>
                                    <option value="fascia2">Professore associato di || Fascia</option>
                                    <option value="fascia1">Professore associato di | Fascia</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Seleziona dipartimento: <b>*</b></td>
                            <td>
                                <FilterDepartment/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Selziona i corsi:<b>*</b>
                            </td>
                            <td>
                            <select id="corsi" name="corsi" multiple="1">
                                {
                                values_courses.map(opt=><option value={opt} name={opt}>{opt}</option>)
                                }
                            </select>
                            </td>
                        </tr>
                    </table>
                    <h4 id="main-menu">

                    </h4>
                    <button onClick={create_new_docent}>Aggiungi nuovo docente</button>
                    <button onClick={returntoMainMenu}>Ritorna al menù principale</button>
                </h4>
            </font>
        </>
    )
}
export default AddNewDocent;