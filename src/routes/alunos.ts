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
import { validaToken } from "../Utils/criptografia";

const router = Router();

router.post("/login", loginControle);

router.get("/", validaToken, buscaTodosAlunos);
router.post("/", validaToken, adicionarAlunoControle);
router.put("/:id", validaToken, editarAlunoControle);
router.delete("/:id", validaToken, deleteAlunoControle);
router.get("/:id", validaToken, buscaAlunoIdControle);

export default router;