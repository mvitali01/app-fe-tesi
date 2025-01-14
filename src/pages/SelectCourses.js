import React, { useState } from "react";
const SelectCourses=()=>{
    var values_courses = new Array();
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
    const saveElement=()=>{
        const courses = Array.from(document.getElementById("corsi").options)
        const string_coursers="";
        const selectedC = new Array();
        for ( const corso of courses){
            if (corso.selected){
                selectedC.push(corso);
                string_coursers=string_coursers.concat(corso.value+"; ")
            }
        }console.log(string_coursers)
        sessionStorage.set("corsi_selezionati",string_coursers)
    }
    const [val,setVal] = useState('');
    return(
        <select id="corsi" name="corsi" multiple="1">
            {
               values_courses.map(opt=><option onSelect={saveElement} value={opt}>{opt}</option>)
            }
        </select>
    )

}
export default SelectCourses;