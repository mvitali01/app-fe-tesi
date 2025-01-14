import React from "react";
const FilterDepartment=()=>{
    const save_dep=()=>{
        const dipartimento = document.getElementById("dipartimento").value;
        sessionStorage.setItem('dep_scelto',dipartimento);
    }
    //const dipartimenti = ['Seleziona dipartimento','BENI CULTURALI','INGEGNERIA DELL\'INNOVAZIONE','MATEMATICA E FISICA','MEDICINA SPERIMENTALE','SCIENZE DELL\'ECONOMIA','SCIENZE E TECNOLOGIE BIOLOGICHE PER L\'AMBIENTE','SCIENZE UMANE E SOCIALI','STUDI UMANISTICI']
    return(
        <>
            <form>
                    <select id="dipartimento" name="dep" onChange={save_dep}>
                        <option value="selection_dip" selected >Seleziona dipartimento</option>
                        <option value="beni_culturali">BENI CULTURALI</option>
                        <option value="ingegneria">INGEGNERIA DELL'INNOVAZIONE</option>
                        <option value="matematica_fisica">MATEMATICA E FISICA</option>
                        <option value="medicina">MEDICINA SPERIMENTALE</option>
                        <option value="economia">SCIENZE DELL'ECONOMIA</option>
                        <option value="scienze_ambientali">SCIENZE E TECNOLOGIE BIOLOGICHE PER L'AMBIENTE</option>
                        <option value="scienze_umane">SCIENZE UMANE E SOCIALI</option>
                        <option value="studi_umanistici">STUDI UMANISTICI</option>
                    </select>
            </form>
        </>
    ) 
}
export default FilterDepartment;