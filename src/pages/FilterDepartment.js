import React from "react";
const FilterDepartment=()=>{
    const save_dep=()=>{
        const dipartimento = document.getElementById("dipartimento").value;
        sessionStorage.setItem('dep_scelto',dipartimento)
    }
    return(
        <>
            <form>
                    <select id="dipartimento" name="dep" onChange={save_dep}>
                        <option value="selection_dip" selected >Seleziona dipartimento</option>
                        <option value="BENI CULTURALI">BENI CULTURALI</option>
                        <option value="INGEGNERIA INNOVAZIONE">INGEGNERIA DELL'INNOVAZIONE</option>
                        <option value="MATEMATICA E FISICA">MATEMATICA E FISICA</option>
                        <option value="MEDICINA SPERIMENTALE">MEDICINA SPERIMENTALE</option>
                        <option value="SCIENZE ECONOMIA">SCIENZE DELL'ECONOMIA</option>
                        <option value="DISTEBA">SCIENZE E TECNOLOGIE BIOLOGICHE PER L'AMBIENTE</option>
                        <option value="SCIENZE UMANE E SOCIALI">SCIENZE UMANE E SOCIALI</option>
                        <option value="STUDI UMANISTICI">STUDI UMANISTICI</option>
                        <option value="SCIENZE GIURIDICHE">SCIENZE GIURIDICHE</option>
                    </select>
            </form>
        </>
    ) 
}
export default FilterDepartment;