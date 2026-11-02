import { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import { request } from "node:http";
import { adicionarLivroControle, buscaLivroIdControle, buscaTodosLivros, deleteLivroControle, editarLivroControle } from "../Controle/LivrosControle";

const router = Router();

router.post("/", adicionarLivroControle);
router.get('/get' , buscaTodosLivros);
router.put("/:id", editarLivroControle);
router.get('/:id', buscaLivroIdControle);
router.delete("/:id", deleteLivroControle);

export default router;