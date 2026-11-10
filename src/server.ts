import express from "express";
import { Request, Response, NextFunction } from "express";

import { AppError } from "./Utils/erroGlobal";

// npm i --save-dev @types/express
import alunosRouter from "./routes/alunos";
import livrosRouter from "./routes/livros";
import emprestimosRouter from "./routes/emprestimos";
import { validaToken } from "./Utils/criptografia";

const app = express();
const PORT = 3000;

app.use(express.json());    

app.use("/alunos", alunosRouter);
app.use("/livros", livrosRouter);
app.use("/emprestimos", emprestimosRouter);


app.use(validaToken);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.code).json({
            error: err.message
        });
    }

    return res.status(500).json({
        error: "Erro interno do servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor executando em localhost:${PORT}`)
});