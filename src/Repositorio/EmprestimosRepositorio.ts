import { prisma } from "../prisma";
import { AppError } from "../Utils/erroGlobal";

export interface IEmprestimo {
  idEmprestimo: number | null
  idLivro: number
  idAluno: number
  dtIncio: Date | null
  dtFim: Date | null
  observacao: string
}

const buscaTodosEmprestimosRepositorio = async () => {
    const emprestimos = await prisma.emprestimos.findMany();
    return emprestimos;
}

const buscaEmprestimoIdRepositorio = async (idEmprestimo: number) => {
    const emprestimo = await prisma.emprestimos.findUnique({
        where: { ID_Emprestimo: idEmprestimo } 
    });
    return emprestimo;
}

const adicionarEmprestimoRepositorio = async (novoEmprestimo: IEmprestimo) => {
    try {
        const emprestimo = await prisma.emprestimos.create({
            data: {
                ID_Aluno: novoEmprestimo.idAluno,
                ID_Livro: novoEmprestimo.idLivro,
                Observacao: novoEmprestimo.observacao
            }
        });
        return emprestimo;
    } catch (erro) {
        throw (erro);
    }
}

const devolucaoEmprestimoRepositorio = async (idEmprestimo: number) => {
    const emprestimo = await prisma.emprestimos.update({
        where: { ID_Emprestimo: idEmprestimo },
        data: {
            DT_Fim: new Date(),
        }
    });
    return emprestimo;
}

const editarEmprestimoRepositorio = async (editarEmprestimo: IEmprestimo) => {
     const emprestimo = await prisma.emprestimos.update({
        where: { ID_Emprestimo: editarEmprestimo.idEmprestimo || 0 },
        data: {
            ID_Aluno: editarEmprestimo.idAluno,
            ID_Livro: editarEmprestimo.idLivro,
            Observacao: editarEmprestimo.observacao,
            DT_Incio: editarEmprestimo.dtIncio || '',
            DT_Fim: editarEmprestimo.dtFim || '',
        }
    });
    return emprestimo;
}

export {
    buscaTodosEmprestimosRepositorio,
    buscaEmprestimoIdRepositorio,
    adicionarEmprestimoRepositorio,
    devolucaoEmprestimoRepositorio,
    editarEmprestimoRepositorio
}