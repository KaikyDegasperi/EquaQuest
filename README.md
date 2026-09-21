# EquaQuest

Plataforma gamificada para aprendizagem de equações do primeiro grau.

## Executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. O banco SQLite é `eququest.sqlite`.

## Professor de demonstração

Na tela inicial, clique em **Login do professor**:

```text
Nome: Professor Demo
E-mail: professor.demo@eququest.local
```

Também existe o botão **Entrar com professor de demonstração**.

## Dados mockados

Clique em **Carregar dados de demonstração** para criar ou manter:

- Turma: `Turma demonstração`
- Professor: `Professor Demo`
- Trilhas: unidades 1 a 4
- Alunos vinculados:

```text
Ana Demo       — ana.demo@eququest.local
Bruno Demo     — bruno.demo@eququest.local
Carla Demo     — carla.demo@eququest.local
```

Alunos disponíveis para adicionar em outras turmas:

```text
lucas.teste@eququest.local
marina.teste@eququest.local
joao.teste@eququest.local
sofia.teste@eququest.local
ravi.teste@eququest.local
bia.teste@eququest.local
pedro.teste@eququest.local
lia.teste@eququest.local
davi.teste@eququest.local
nina.teste@eququest.local
```

## Testar uma turma

1. Entre como professor.
2. Crie uma turma, por exemplo `7º ano A`.
3. Clique em **Abrir painel**.
4. Adicione um aluno usando um dos e-mails mockados.
5. Atribua uma unidade no seletor de trilhas.
6. Crie uma atividade com título, unidade e prazo.
7. Confira o resumo e o desempenho dos alunos.

## Testar como aluno

Use **Entrar como aluno de teste**:

```text
Nome: Aluno de teste
E-mail: teste@eququest.local
```

O aluno pode acessar a trilha, resolver questões, usar a balança interativa, receber feedback, ganhar XP e visualizar suas dificuldades e trilhas atribuídas.

## Principais APIs

```text
GET  /api/questions
GET  /api/questions?unit=2
POST /api/students
GET  /api/students/:id/classes
GET  /api/students/:id/performance
GET  /api/classes
POST /api/classes
GET  /api/classes/:id/overview
GET  /api/classes/:id/members
POST /api/classes/:id/members
POST /api/classes/:id/assignments
GET  /api/classes/:id/activities
POST /api/classes/:id/activities
POST /api/attempts
POST /api/mock
```

## Resetar o aluno de teste

```bash
node - <<'NODE'
const Database = require('better-sqlite3');
const db = new Database('eququest.sqlite');
db.prepare(`UPDATE students SET xp=0, coins=230, hearts=5, streak=0, solved=0, current_unit=1 WHERE email=?`).run('teste@eququest.local');
console.log('Aluno de teste resetado.');
NODE
```

## Validar o build

```bash
npm run build
```
