const express = require('express');

const app = express();

app.use(express.json());

app.get(`/usuarios`, (req, res) => {
    res.json({ message: 'API funcionando' });
});

// app.delete(`/usuarios/${id}`, (req, res) => {
//     res.json({ message: 'API funcionando' });
// });

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));