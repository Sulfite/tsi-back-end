import { Router } from "express";
import { adicionarEmprestimoControle, buscaEmprestimoIdControle, buscaTodosEmprestimos, devolucaoEmprestimoControle, editarEmprestimoControle } from "../Controle/EmprestimosControle";

const route = Router();

route.post('/',  adicionarEmprestimoControle);
route.put('/devolucao',  devolucaoEmprestimoControle);
route.put('/:id',  editarEmprestimoControle);
route.get('/',  buscaTodosEmprestimos);
route.get('/:id',  buscaEmprestimoIdControle);

export default route;