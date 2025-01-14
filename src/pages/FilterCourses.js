import React from "react";
import { useState } from "react";
import FilterDepartment from "./FilterDepartment";
const FilterCourses=()=>{
    const selection_degree_course=()=>{
        const department = sessionStorage.getItem('dep_scelto');
        var course_degree = sessionStorage.getItem('corsi_laurea').split("\n");
        var corsi_laurea = new Array();
        corsi_laurea.push("Seleziona Corso di Laurea")
        var value = ""
       switch(department){
           case "beni_culturali":
               value="Beni Culurali";
               break;
           case "ingegneria":
               value="Ingegneria dell'Innovazione";
               break;
           case "matematica_fisica":
               value="Matematica e Fisica";
               break;
           case "medicina":
               value="Medicina Sperimentale";
               break;
           case "economia":
               value="Scienze dell'Economia";
               break;
           case "scienze_ambientali":
               value="Scienze e Tecnologie Biologiche per l'Ambiente"
               break;
           case "scienze_umane":
               value="Scienze Umante e Sociali";
               break;
           case "studi_umanistici":
               value="Studi Umanistici";
               break;
           default:
               value="Seleziona corso";
               break;
       }
       if(value !== "Seleziona corso"){
            for(var i=0;i<course_degree.length;i++){
               var dep_degree = course_degree[i].split(",")[2]
               console.log(value)
               if( value === dep_degree){
                   var name_degreec = course_degree[i].split(",")[1];
                   corsi_laurea.push(name_degreec);
               }
            }
       }
       console.log(corsi_laurea);
       return corsi_laurea;
   }
   const courses_abilitation=()=>{
    const dipartimento_sel = sessionStorage.getItem("dep_scelto");
    const course_sel = document.getElementById("corso_laurea");
    if (dipartimento_sel === "selection_dip"){
        course_sel.getElementsByTagName("option")[0].selected = "selected"
        course_sel.disabled = true
        
    }else{
        course_sel.disabled = false
    }
}
const wrapp_all=()=>{
    courses_abilitation()
    selection_degree_course()
}
    const [val,setVal] = useState('');
    return(
        <>
            <tr onChange={wrapp_all}>
                <th onChange={e=>setVal(e.target.value)}>
                    <label for="dip">Filtra per Dipartimento:</label>
                    <FilterDepartment/>
                </th>
                <th>
                    <label for="corso">Filtra per Corso di Laurea:</label>
                    <select id="corso_laurea" disabled="1" value={val}>
                        {
                            selection_degree_course().map(opt=><option>{opt}</option>)
                        }
                    </select>
                </th>
            </tr>
        </>
    )
}
export default FilterCourses;