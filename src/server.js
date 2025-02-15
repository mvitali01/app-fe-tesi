//Codice server remoto su macchina EC2
// npm install express multer
const express = require('express');
const multer = require('multer');
// npm install cors --save
const cors = require('cors')
// Configurazione multer per il salvataggio dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Cartella dove salvare i file
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null,file.fieldname);  // Rinomina il file con il valore specificato nel formData
  }
});
const upload = multer({ storage: storage });
//Crea l'applicazione express
const app = express();
app.use(cors())
//const port = 3000;
// Creazione della cartella per i file se non esiste
const fs = require('fs');
const path = require('path');
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//api per l'upload del primo file
app.post('/api/v1/files/upload1', upload.single('file'), (req, res) => { //file è fieldname preso dal formData
  if (!req.file) {
    return res.status(400).json({ message: 'Nessun file caricato' });
  }
  res.status(200).json({ message: 'File caricato con successo', file_id:""+req.file.originalname+"-"+Date.now(), file_url:"~/uploads/"+req.file.fieldname });
});
//api per l'upload del secondo file
 app.post('/api/v1/files/upload2',upload.single('file2'),(req,res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'Nessun file caricato' });
  }
  res.status(200).json({ message: 'File caricato con successo', file_id:""+req.file.originalname+"-"+Date.now(), file_url:"~/uploads/"+req.file.fieldname});
 })
 //api per l'upload del tezo file
 app.post('/api/v1/files/upload3',upload.single('file3'),(req,res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'Nessun file caricato' });
  }
  res.status(200).json({ message: 'File caricato con successo', file_id:""+req.file.originalname+"-"+Date.now(), file_url:"~/uploads/"+req.file.fieldname});
 })
 //Comunica lo stato 404
 /*app.use((req, res) => {
  res.status(404).send('Risorsa non trovata');
});*/

//api per la restituzione del file finale
 app.get('/api/v1/file/generated',(req,res)=>{
  const pathF = path.join(__dirname,'risultati_generazioni 13.txt');
  res.sendFile(pathF),(err)=>{
    if(err){
      res.status(500).send("Errore risorsa non trovata")
    }
  };
 })
// Avvio del server
app.listen(3000, () => {
  console.log(`Server in ascolto su http://localhost:3000`);
})