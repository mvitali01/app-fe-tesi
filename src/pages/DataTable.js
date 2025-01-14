import React,{useState} from "react";
const DataTable=()=>{
    const get_colonne=()=>{
        const doc_file = sessionStorage.getItem("contentFile").split("\n")[0].split(",")
        const colums = new Array();
        for(var i=0;i<doc_file.length;i++){
            colums.push(doc_file[i])
        }
        colums.push("Corso/i")
        return colums;
    }
    const get_data=()=>{
        //corrispondeze per ogni attributo
        const keys = ["id","name","surname","birth","sex","email","address","role","department","courses"];
        //Contenuto dei 3 file
        const data = sessionStorage.getItem("contentFile").split("\n");
        const data_courses = sessionStorage.getItem("corsi_cont").split("\n");
        const data_degree = sessionStorage.getItem("corsi_laurea").split("\n");
        //rimozione riga  di intestazione
        data_courses.reverse()
        data_courses.pop()
        data_courses.reverse()
        data_degree.reverse()
        data_degree.pop()
        data_degree.reverse()
        var l = data.length-1;
        //Controllo dei docenti creati durante la sessione
        const new_doc = sessionStorage.getItem("new_doc");
        var docs_add = new String();
        if(new_doc !==null && new_doc!==""){
            docs_add = new_doc.split("\n")
            l = l+docs_add.length;
        }
        //Salvataggio dei docenti contenuti nel file dei docenti garanti
        const docenti= new Array(l);
        var c=0
        for( var i=1; i<data.length;i++){
            const elements = data[i].split(",")
            const docente = new Object();
            for (var j=0;j<keys.length;j++){
                const key = keys[j]
                docente[key] = elements[j];
            }
            docenti[c] =docente;
            c++
        }
        for( var i=0; i<docs_add.length;i++){
            const elements = docs_add[i].split(",")
            console.log(elements)
            const docente = new Object();
            for (var j=0;j<keys.length;j++){
                const key = keys[j];
                docente[key] = elements[j];
            }
            docenti[c] =docente;
            c++
        }
        const firstKey = keys[0]
        const lastKey = keys[keys.length-1];
        for(var i=0;i<data.length-1;i++){
            docenti[i][lastKey]="";
        }
        //Salvataggio dei corsi di cui i docenti sono garanti con il rispettivo corso di laurea
        for(var i=0;i<data_courses.length;i++){
            var name_c = data_courses[i].split(",")[1]
            var id_docC= parseInt(data_courses[i].split(",")[3])
            for(var j=0;j<docenti.length;j++){
                var id_docd = parseInt(docenti[j][firstKey])
                console.log(id_docd)
                if(id_docC === id_docd){
                    var id_dc = parseInt(data_courses[i].split(",")[2])
                    for(var k=0;k<data_degree.length;k++){
                        var id_cl = parseInt(data_degree[k].split(",")[0])
                            if(id_dc === id_cl){
                                var name_cl = data_degree[k].split(",")[1]
                                docenti[j][lastKey]= docenti[j][lastKey]+name_c+"-"+name_cl+";\n";
                            }
                        }
                    }
                }
            }
        console.log(docenti)  
        return docenti;
    }
  const cols = get_colonne();
  var docenti = new Array();
  docenti = get_data();
  //Inizio creazione tabella dinamica
  //Creazione Riga: vale per ogni docente salvato all'interno dell'array
  const Row = (props) =>{
          const {id, name, surname, birth, sex, email, address, role, department, courses} = props
          return(
              <tr>
                  <th>{id}</th>
                  <th>{name}</th>
                  <th>{surname}</th>
                  <th>{birth}</th>
                  <th>{sex}</th>
                  <th>{email}</th>
                  <th>{address}</th>
                  <th>{role}</th>
                  <th>{department}</th>
                  <th>{courses}</th>
                  <th><input name="delete" type="checkbox"/></th>
              </tr>
          )
  
      }
      //Creazione Colonna: restiutuisce la riga che contiene il nome del contenuto
      const Colum =(props)=>{
          const {data} = props
          return(
              <tr>
                  <td><b>ID</b></td>
                  <td><b>Nome</b></td>
                  <td><b>Cognome</b></td>
                  <td><b>Data di Nascita</b></td>
                  <td><b>Sesso</b></td>
                  <td><b>Email personale</b></td>
                  <td><b>Indirizzo</b></td>
                  <td><b>Ruolo</b></td>
                  <td><b>Dipartimento</b></td>
                  <td><b>Corso/i</b></td>
                  <td><b>Seleziona</b></td>
              </tr>
          )
      }
      //Creazione della Tabella: restituisce la tabella secondo le caratteristiche impostate in Row e Colum
      const Table = (props)=>{
          const {data} = props
          return(
              <table border="1" align="center" width="100%" >
                  <thead bgcolor="silver" align="center">
                      <Colum />
                  </thead>
                  <tbody bgcolor="white" align="center">
                      {data.map(row=>
                          <Row id = {row.id}
                              name = {row.name}
                              surname = {row.surname}
                              birth = {row.birth}
                              sex = {row.sex}
                              email = {row.email}
                              address = {row.address}
                              role = {row.role}
                              department = {row.department}
                              courses = {row.courses} />
                      )}
                  </tbody>
              </table>
          )
  
      }
      const [row,setRow] = useState(docenti);
      const [colum,setColums] = useState(cols)
      sessionStorage.setItem("docenti",JSON.stringify(docenti))
      return(
        <Table data ={row} />
      )
}
export default DataTable;