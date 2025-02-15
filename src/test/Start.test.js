import React from "react";
import {render} from "@testing-library/react"; 
test("Test start:dovrebbe essere presente il place holder:inputFile1",()=>{
    const {getByPlaceholderText} = render(<font face="Arial">
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
                    <input placeholder="inputFile1" id="excel_doc" name="fileP" type="file" accept=".xls, .xlsx" /><br/>
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
            <button>Procedi al menù principale</button>  
        </h2> 
    </font>
)
    const testo =  getByPlaceholderText('inputFile1')
    expect(testo).toBeInTheDocument()
})