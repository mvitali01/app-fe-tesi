import React from "react";
import { useState } from "react";
import FilterDepartment from "./FilterDepartment";
const FilterCourses=()=>{
    var scelte = new Array() //Array che conterrà i corsi da scegliere
    //Array che contengono tutti i corsi di laurea di ogni dipartimento
    const engineering = ['INGEGNERIA BIOMEDICA','INGEGNERIA CIVILE','INGEGNERIA DELL\' INFORMAZIONE: ELETTRONICA, INFORMATICA E TELECOMUNICAZIONI','INGEGNERIA INDUSTRIALE','INGEGNERIA INFORMATICA','INGEGNERIA PER L\'INDUSTRIA SOSTENIBILE','ENGINEERING FOR SAFETY  OF  CRITICAL INDUSTRIAL AND CIVIL INFRASTRUCTURES','INGEGNERIA AEROSPAZIALE','INGEGNERIA BIOMEDICA LM','INGEGNERIA CIVILE LM','INGEGNERIA DELLE TELECOMUNICAZIONI E DELLE TECNOLOGIE ELETTRONICHE','INGEGNERIA INFORMATICA LM','INGEGNERIA MECCANICA','MANAGEMENT ENGINEERING - INGEGNERIA GESTIONALE', 'MATERIALS ENGINEERING AND NANOTECHNOLOGY-INGEGNERIA DEI MATERIALI E NANOTECNOLOGIE']
    const  culural_heritage=['BENI CULTURALI','DISCIPLINE DELLE ARTI, DELLA MUSICA E DELLO SPETTACOLO (DAMS)','ARCHEOLOGIA','SCIENZE DELLO SPETTACOLO E DELLA PRODUZIONE AUDIOVISIVA','STORIA DELL\'ARTE']
    const math_phis=['FISICA','MATEMATICA','OTTICA E OPTOMETRIA','FISICA LM','MATEMATICA LM']
    const economy =['ECONOMIA AZIENDALE','ECONOMIA E FINANZA','MANAGEMENT DELLE ORGANIZZAZIONI TURISTICHE','MANAGEMENT DIGITALE','Economia finanza e assicurazioni','GESTIONE DELLE ATTIVITA\' TURISTICHE E CULTURALI','MANAGEMENT AZIENDALE']
    const ambience = ['BIOTECNOLOGIE','INFERMIERISTICA (ABILITANTE ALLA PROFESSIONE SANITARIA DI INFERMIERE)','SCIENZE BIOLOGICHE','SCIENZE E TECNOLOGIE PER L\'AMBIENTE','SCIENZE MOTORIE E DELLO SPORT','SVILUPPO SOSTENIBILE E CAMBIAMENTI CLIMATICI','VITICOLTURA ED ENOLOGIA','BIOLOGIA SPERIMENTALE ED APPLICATA','BIOTECNOLOGIE MEDICHE E NANOBIOTECNOLOGIE','COASTAL AND MARINE BIOLOGY AND ECOLOGY (BIOLOGIA ED ECOLOGIA COSTIERA E MARINA)','SCIENZE AMBIENTALI','SCIENZE E TECNICHE DELLE ATTIVITA\' MOTORIE PREVENTIVE E ADATTATE','MEDICINA E CHIRURGIA']
    const legal_science =['DIRITTO E MANAGEMENT DELLO SPORT','DIRITTO E POLITICHE PER LE PUBBLICHE AMMINISTRAZIONI','GOVERNANCE EURO-MEDITERRANEA DELLE POLITICHE MIGRATORIE','GIURISPRUDENZA']
    const human_science=['EDUCAZIONE SOCIALE E TECNICHE DELL\'INTERVENTO EDUCATIVO','SCIENZA E TECNICHE PSICOLOGICHE','SCIENZE POLITICHE E DELLE RELAZIONI INTERNAZIONALI','SERVIZIO SOCIALE','SOCIOLOGIA','CONSULENZA PEDAGOGICA E PROGETTAZIONE DEI PROCESSI FORMATIVI','DATA SCIENCE PER LE SCIENZE UMANE E SOCIALI','PROGETTAZIONE E GESTIONE DELLE POLITICHE  E DEI SERVIZI SOCIALI','PSICOLOGIA DELL\'INTERVENTO NEI CONTESTI RELAZIONALI E SOCIALI', 'SCIENZE PER LA COOPERAZIONE INTERNAZIONALE','SOCIOLOGIA E RICERCA SOCIALE','STUDI GEOPOLITICI E INTERNAZIONALI','SCIENZE DELLA FORMAZIONE PRIMARIA']
    const humanistic =['FILOSOFIA','LETTERE','LINGUE, CULTURE E LETTERATURE STRANIERE','SCIENZA E TECNICA DELLA MEDIAZIONE LINGUISTICA','SCIENZE DELLA COMUNICAZIONE','COMUNICAZIONE, MEDIA DIGITALI, GIORNALISMO','LETTERE CLASSICHE','LETTERE MODERNE','LINGUE MODERNE, LETTERATURE E TRADUZIONE', 'SCIENZE FILOSOFICHE','TRADUZIONE TECNICO-SCIENTIFICA E INTERPRETARIATO']
    
    const selection_degree_course=()=>{
        const department = sessionStorage.getItem('dep_scelto'); //Preleva il dipartimento scelto
        var corsi_laurea = new Array();
        corsi_laurea.push("Seleziona Corso di Laurea") //Questo elemento è il primo di ogni scelta  
       //Salva i corsi di laurea in base al dipartimento scelto concatenandoli all'array dichiarato precedentemente
        switch(department){
           case "BENI CULTURALI":
                corsi_laurea = corsi_laurea.concat(culural_heritage)
                break
           case "INGEGNERIA INNOVAZIONE":
                corsi_laurea = corsi_laurea.concat(engineering)
                break
           case "MATEMATICA E FISICA":
                corsi_laurea = corsi_laurea.concat(math_phis)
                break
           case "MEDICINA SPERIMENTALE":
                corsi_laurea = corsi_laurea.concat(ambience)
                break
           case "SCIENZE ECONOMIA":
                corsi_laurea = corsi_laurea.concat(economy)
                break
           case "DISTEBA":
                corsi_laurea = corsi_laurea.concat(ambience)
                break
           case "SCIENZE UMANE E SOCIALI":
                corsi_laurea = corsi_laurea.concat(human_science)
               break
           case "STUDI UMANISTICI":
                corsi_laurea = corsi_laurea.concat(humanistic)
                break
            case "SCIENZE GIURIDICHE":
                corsi_laurea = corsi_laurea.concat(legal_science)
                break; 
       }
       var stringCL=''
       for(var i=1;i<corsi_laurea.length;i++)
            stringCL = stringCL+corsi_laurea[i]+";"
      sessionStorage.setItem('scelte',stringCL)
       return corsi_laurea    
}
scelte=selection_degree_course() 
//Abilita il secondo filtro a seconda del dipartimento scelto
const courses_abilitation=()=>{
    const department = sessionStorage.getItem('dep_scelto');
    if(department!=='selection_dip'){
        document.getElementById('corso_laurea').disabled = false //Abilita il  filtro
    }else{
        document.getElementById('corso_laurea').disabled = true //Disabilita il filtro
    }
    scelte=selection_degree_course() //Aggiorna i corsi all'interno
}
//Cambia i corsi quando l'utente cambia dipartmento
const change_course=()=>{
    if(scelte.length!==0){
        scelte.splice(0,scelte.length)   //Rimuove i corsi che c'erano prima del cambiamento
        scelte=selection_degree_course()   //Aggiorna i corsi all'interno
    }
    sessionStorage.setItem('corso_scelto','Seleziona Corso di Laurea') //Imposta il corso scelto al valore seleziona corso di laurea
}
//Salva il valore del corso di laurea scelto
const save_course=()=>{
    const course = document.getElementById("corso_laurea").value
    sessionStorage.setItem("corso_scelto",course)
}
    //Serve per cambiare in modo dinamico l'array dei corsi di laurea passandogli una variavile e un metodo
    const [val,setVal] = useState('');
    return(
        <>
            <table>
            <tbody onChange={courses_abilitation}>
                <tr onChange={e=>setVal(e.target.value)}>
                    <td onChange={change_course}>
                        <label>Filtra per Dipartimento:</label><br/>
                        <FilterDepartment/>
                    </td>
                    <td onChange={save_course}>
                        <label>Filtra per Corso di Laurea:</label><br/>
                        <select id="corso_laurea" disabled='1'  value={val}>
                        {
                            scelte.map(opt=><option value={opt}>{opt}</option>)
                        }
                        </select>
                    </td>
                </tr>
            </tbody>
            </table>
        </>
    )
}
export default FilterCourses;
