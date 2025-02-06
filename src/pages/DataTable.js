import React,{useEffect, useState} from "react";
import FilterCourses from "./FilterCourses";
const DataTable=()=>{
   const apigClient = window.apigClientFactory.newClient();
   const get_info_all=()=>{
        /*
            api/v1/metrics/logs
            API CHE RESTITUISCE LE METRICHE DI CONSUMO
            -------------------------------------------------------------
        */
        var params = {};
        var body = {};
        var additionalParams = {};
        apigClient.apiV1MetricsLogsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log("Metriche di consumo:\n"+JSON.stringify(result,'',2))
        }).catch( function(result){
            //This is where you would put an error callback
            console.error("Errore nel ritiro delle metrche di consumo")
        });
        /*
            api/v1/generation/errors
            API CHE RESTITUISCE GLI ERRORI CHE SI SONO VERIFICTI DURANTE L'ALGORITMO gateway
        */
        apigClient.apiV1GenerationErrorsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log("Lista errori:\n"+JSON.stringify(result,'',2));
            var errorlist=result.data.errors
            var num_errori=result.data.error_count
            localStorage.setItem("error",errorlist)
            localStorage.setItem("num_errori",num_errori)
        }).catch( function(result){
            //This is where you would put an error callback
            console.log("Errore nella ricezione degli errori\n"+result.data.jwt)
        });
        /*
            api/v1/file/generated/
            API CHE RESTITUISCE IL FILE GENERATO DALL'ALGORITMO GENETICO non gateway
            ed elabora i dati da stampare
            ------------------------------------------------------------
        */
        var xhr = new XMLHttpRequest();
        //const formData = new FormData();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("File ricevuto con successo")
                localStorage.setItem("contenuto",xhr.responseText)
            }
        };
        xhr.open('GET','http://34.225.255.18:3000/api/v1/file/generated');
        xhr.send()
        check_consistance()
    }
    //Funzione che controlla se i docenti garanti ci sono tutti
    const check_consistance=()=>{
        var errors = localStorage.getItem("error").split(',')
        var num_errori =localStorage.getItem("num_errori")
        for(var i=0;i<num_errori;i++){
            if(errors[i].startsWith('Non ho trovato associazioni per questo corso:'))
                window.alert("Attenzione mancano docenti garanti")
        }
    }
    const filter_data=()=>{
        var dep = sessionStorage.getItem('dep_scelto')
        var cor = sessionStorage.getItem('corso_scelto')
        var scelte =sessionStorage.getItem('scelte').split(';')
        var allD=get_doc()
        var filtered = new Array()
        //SITUAZIONE INIZIAçE
        if(dep==='selection_dip'){
            return docenti
        }
        //DIPARTIMENTO
        else{
           if(cor==='Seleziona Corso di Laurea'){
                for(var i=0;i<allD.length;i++){
                    var cd = allD[i]['course_study'].trim()
                    for(var j=0;j<scelte.length;j++){
                        var scelta=scelte[j]
                        if(cd===scelta)
                            filtered.push(allD[i])  
                        
                    }
                }
            return filtered
           }
           //DIPARTIMENTO E CORSO DI LAUREA
           else if(cor.endsWith('LM')){
                var clm =  cor.substring(0,cor.length-3).trim()
                for(var i=0;i<allD.length;i++){
                    var cd = allD[i]['course_study'].trim()
                    var td = allD[i]['type_degree']
                    if(cor.endsWith('LM')){
                        if(clm===cd){
                            if(td==='Laurea Magistrale')
                                filtered.push(allD[i])
                        }
                    }
                }
                return filtered;
           }else{
            //CORSI DI LAUREA OMONIMI
            for(var i=0;i<allD.length;i++){
                var cd = allD[i]['course_study'].trim()
                if(cor===cd){
                    var td = allD[i]['type_degree']
                    if(cor==='INGEGNERIA INFORMATICA' || cor==='INGEGNERIA BIOMEDICA' || cor==='INGEGNERIA CIVILE' || cor==='MATEMATICA' || cor==='FISICA'){
                        if(td==='Laurea Triennale')
                            filtered.push(allD[i])
                    }else
                        filtered.push(allD[i])
                }
            }
            return filtered
           }

        }
        
    }
    const filter_doc=()=>{
        docenti = filter_data()
       setRow(docenti)
    }
    const get_data=()=>{
        const testo = localStorage.getItem("contenuto")
        const rowsFile = testo.split("\n\n")
        var c=rowsFile.length-1
        rowsFile.reverse()
        while(rowsFile[c]!=='Risultato migliore:'){
            rowsFile.pop()
            c--
        }
        rowsFile.pop()
        rowsFile.reverse()
        for(var i=0;i<rowsFile.length;i++){
            rowsFile[i] = rowsFile[i].trimStart()
        }
        return rowsFile
    }
    const get_doc=()=>{
        const rowsFile = get_data()
        var count=0
        var docs = new Array();
        var stringd='';
        for(var i=0;i<rowsFile.length;i++){
            var course_study=''
            var code_corse = rowsFile[i].split(",")[0].split(':')[1]
            if(rowsFile[i].startsWith('Corso di laurea:')){
                if(rowsFile[i].split(',').length>3){
                    var l=rowsFile[i].split(',').length
                    type_degree = rowsFile[i].split(",")[l-1].split(':')[1]
                    var contentDoc = rowsFile[i].split(',')
                    contentDoc.pop()
                    contentDoc.shift()
                    for(var k=0;k<contentDoc.length;k++){
                        if(k===contentDoc.length-1){
                             course_study = course_study+contentDoc[k]
                        }else if(k===0){
                             course_study =contentDoc[k].substring(19)+','
                        }else{
                            course_study = course_study+contentDoc[k]+','
                        }
                    }

                }else{
                    var type_degree = rowsFile[i].split(",")[2].split(':')[1]
                    var course_study = rowsFile[i].split(",")[1].split(':')[1]
                }
                for(var j=i+1;j<rowsFile.length-1;j++){
                    if(rowsFile[j].startsWith('Corso di laurea'))
                        break
                    count++
                    stringd=stringd+(count)+"; "
                    var s=0
                    if(rowsFile[j].startsWith('Docenti garanti migliori:')){
                        s=1
                    }
                    stringd = stringd+rowsFile[j].split("\n")[s].split(':')[1]+'; '
                    stringd = stringd+rowsFile[j].split("\n")[s+1].split(':')[1]+'; '
                    stringd = stringd+rowsFile[j].split("\n")[s+3].split(':')[1]+'; '
                    stringd = stringd+rowsFile[j].split("\n")[s+2].split(':')[1]+'; '
                    stringd = stringd+code_corse+';'
                    stringd= stringd+course_study+';'
                    stringd = stringd+type_degree+'\n'
                }
            }
        }
        const keys=['id','docname','role_doc','retirement','rewardability','code_corse','course_study','type_degree']
        var csv_garanti = stringd.split('\n')
        for(var i =0;i<csv_garanti.length;i++){
            var docente = new Object()
            for(var j=0;j<keys.length;j++){
                var key = keys[j]
                docente[key] = csv_garanti[i].split(';')[j]
            }
            docs.push(docente)
        }
        docs.pop()
        for(var i=0;i<docs.length;i++){
            var tdd =docs[i]['type_degree'].substring(6)
            if(tdd==='MAGISTRALE')
                docs[i]['type_degree']='Laurea Magistrale'
            else if(tdd==='CORSO_DI_LAUREA')
                 docs[i]['type_degree']='Laurea Triennale'
            else if(tdd === 'MAGISTRALE_5_ANNI')
                docs[i]['type_degree']='Magistrale a Ciclo Unico di 5 Anni'
            else
                docs[i]['type_degree']='Magistrale a Ciclo Unico di 6 Anni'
            var ret =docs[i]['retirement']
            if(ret.toLowerCase().trim()==='nat')
                docs[i]['retirement']='Nessuna'
            var rew = docs[i]['rewardability']
            if(rew.trim()==='False')
                docs[i]['rewardability'] ='NO'
            else
                docs[i]['rewardability'] ='SI'
        }
        return docs;

    }
    var docenti = get_doc()
    useEffect(get_info_all,[])
  //Inizio creazione tabella dinamica
  //Creazione Riga: vale per ogni docente salvato all'interno dell'array
  //Premiabilità,IsNuovaAttivazione,SSD caratterizzante
  const Row = (props) =>{
          const {id,docname, course_study,  code_corse, type_degree,  role_doc, retirement,rewardability} = props
          return(
            <tbody bgcolor="white" align="center">
            <tr>
                <td>{id}</td>
                <td>{docname}</td>
                <td>{role_doc}</td>
                <td>{retirement}</td>
                <td>{rewardability}</td>
                <td>{course_study}</td>
                <td>{code_corse}</td>
                <td>{type_degree}</td>
                <td><input name="delete" type="checkbox" value={id} /></td>
            </tr>
            </tbody>
          )
  
      }
      //Creazione Colonna: restiutuisce la riga che contiene il nome del contenuto
      const Colum =()=>{
          return(
            <thead bgcolor="silver" align="center">
              <tr>
                  <th><b>ID</b></th>
                  <th><b>Docente</b></th>
                  <th><b>Ruolo</b></th>
                  <th><b>Scadenza</b></th>
                  <th><b>Premiabilità</b></th>
                  <th><b>Corso di Studio</b></th>
                  <th><b>Codice corso</b></th>
                  <th><b>Tipo di Laurea</b></th>
                  <th><b>Seleziona</b></th>
              </tr>
            </thead>
          )
      }
      //Creazione della Tabella: restituisce la tabella secondo le caratteristiche impostate in Row e Colum
      function Table (props){
          const {data} = props
          return(
              <table border="1" align="left" width="100%">
                <Colum />
                    {data.map(row=>
                        <Row id ={row.id}
                            docname = {row.docname}
                            title_course = {row.title_course}
                            course_study = {row.course_study}
                            role_doc = {row.role_doc}
                            retirement = {row.retirement}
                            rewardability = {row.rewardability}
                            code_corse = {row.code_corse}
                            type_degree = {row.type_degree}
                           />
                     )}
              </table>
          )
  
      }
      const [row,setRow] = useState(docenti);
      return(
        <>
            <div onChange={filter_doc}>
                <FilterCourses />
            </div>
            <Table id="tabedati" data ={row} />
        </>
      )
}
export default DataTable;