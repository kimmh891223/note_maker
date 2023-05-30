const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const notesData = require('/db/db.json');
const PORT = process.env.PORT || 3001;
const path = require("path");

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
  req.body.id= uuidv4();
  notesData.push(req.body)
  fs.writeFileSync('/db/db.json',JSON.stringify(notesData));
  console.info(`${req.method} request received to add a note`);
  res.json(notesData);
  console.log(uuidv4());
  });

app.delete('/api/notes/:id', (req, res) => {
  for (let i = 0; i < notesData.length; i++) {
    if (notesData[i].id == req.params.id) {
      const removeNote = notesData.splice(i,1)
    }
    
  }
  fs.writeFileSync('/db/db.json',JSON.stringify(notesData));
  console.info(`${req.method} request received to add a note`);
  res.json(notesData);
  })
    
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });


