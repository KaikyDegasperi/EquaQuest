const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'eququest.sqlite'));
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0, coins INTEGER NOT NULL DEFAULT 0, hearts INTEGER NOT NULL DEFAULT 5,
  streak INTEGER NOT NULL DEFAULT 0, solved INTEGER NOT NULL DEFAULT 0, current_unit INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);
const app = express(); app.use(express.json());
app.post('/api/students', (req,res)=>{
  const name=String(req.body.name||'').trim(), email=String(req.body.email||'').trim().toLowerCase();
  if(!name||!email||!email.includes('@')) return res.status(400).json({error:'Nome e e-mail são obrigatórios.'});
  let student=db.prepare('SELECT * FROM students WHERE email=?').get(email);
  if(!student){ const r=db.prepare('INSERT INTO students (name,email,coins) VALUES (?,?,?)').run(name,email,230); student=db.prepare('SELECT * FROM students WHERE id=?').get(r.lastInsertRowid); }
  res.json(student);
});
app.get('/api/students/:id', (req,res)=>{const s=db.prepare('SELECT * FROM students WHERE id=?').get(req.params.id); s?res.json(s):res.status(404).json({error:'Aluno não encontrado.'});});
app.patch('/api/students/:id', (req,res)=>{const allowed=['xp','coins','hearts','streak','solved','current_unit']; const fields=allowed.filter(k=>Number.isInteger(req.body[k])); if(!fields.length)return res.status(400).json({error:'Nenhuma alteração.'}); const set=fields.map(k=>`${k}=@${k}`).join(','); db.prepare(`UPDATE students SET ${set},updated_at=CURRENT_TIMESTAMP WHERE id=@id`).run({...req.body,id:req.params.id}); res.json(db.prepare('SELECT * FROM students WHERE id=?').get(req.params.id));});
app.use(express.static(path.join(__dirname,'dist'))); app.use((req,res)=>res.sendFile(path.join(__dirname,'dist/index.html')));
app.listen(3000,()=>console.log('EquaQuest em http://localhost:3000'));
