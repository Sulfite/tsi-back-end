import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

import {
    adicionarAlunoControle,
    buscaAlunoIdControle,
    buscaTodosAlunos,
    deleteAlunoControle,
    editarAlunoControle,
    loginControle
} from "../Controle/AlunosControle";

const router = Router();

router.post("/login", loginControle);
router.get("/", buscaTodosAlunos);
router.post("/", adicionarAlunoControle);
router.put("/:id", editarAlunoControle);
router.delete("/:id", deleteAlunoControle);
router.get("/:id", buscaAlunoIdControle);

export default router;