import { adicionarEmprestimoRepositorio, buscaEmprestimoIdRepositorio, buscaTodosEmprestimosRepositorio, devolucaoEmprestimoRepositorio, editarEmprestimoRepositorio, IEmprestimo } from "../Repositorio/EmprestimosRepositorio";
import { AppError } from "../Utils/erroGlobal";
import { buscaAlunoId } from "../Repositorio/AlunosRepositorio";
import { buscaLivroId } from "../Repositorio/LivrossRepositorio";

const buscaTodosEmprestimosServico = async () => {
    try {
        const emprestimos = await buscaTodosEmprestimosRepositorio();

        if (!emprestimos) {
            throw new AppError('Nenhum emprestimo não encontrado', 404);
        }

        return emprestimos;
    } catch (erro) {
        throw erro;
    }
}

const buscaEmprestimoIdServico = async (idEmprestimo: number) => {  
    try {
        const emprestimo = await buscaEmprestimoIdRepositorio(idEmprestimo);

        if (!emprestimo) {
            throw new AppError('Nenhum emprestimo encontrado.', 404);
        }

        return emprestimo;
    } catch (erro) {
        throw erro;
    }
}

const adicionarEmprestimoServico = async (emprestimo: IEmprestimo) => {
    try {
        const {
            idAluno,
            idLivro
        } = emprestimo;

        if (idAluno === 0 || idLivro === 0) {
           throw new AppError('Verifique os parâmetros passados.', 422);
        }

        const existeAluno = await buscaAlunoId(idAluno);
        if (!existeAluno) {
           throw new AppError('Aluno não encontrado.', 404);
        }

        const existeLivro = await buscaLivroId(idLivro);
        if (!existeLivro) {
           throw new AppError('Livro não encontrado.', 404);
        }

        const resultado = await adicionarEmprestimoRepositorio(emprestimo);
        return resultado.ID_Emprestimo;
    } catch (erro) {
        throw erro;
    }
}

const devolucaoEmprestimoServico = async (idEmprestimo: number) => {
    try {

        const existeEmprestimo = await buscaEmprestimoIdServico(idEmprestimo);
        if (!existeEmprestimo) {
            throw new AppError('Emprestimo não encontrado', 404);
        }

        const emprestimo = await devolucaoEmprestimoRepositorio(idEmprestimo);
        return emprestimo.ID_Emprestimo;
    } catch (erro) {
        throw erro;
    }
}

const editarEmprestimoServico = async (emprestimo: IEmprestimo) => {
    try {
        const {
            idEmprestimo,
            idAluno,
            idLivro,
        } = emprestimo;

        if (idEmprestimo || idEmprestimo === null) {
            throw new AppError('Passe um valor para o idEmprestimo.', 422);
        }

        const existeEmprestimo = await buscaEmprestimoIdServico(idEmprestimo);
        if (!existeEmprestimo) {
            throw new AppError('Emprestimo não encontrado', 404);
        }

        if (idAluno === null || idLivro === null) {
            throw new AppError('Verifique os valores para edição do emprestimo', 422);
        }

        const resultado = await editarEmprestimoRepositorio(emprestimo);
        return resultado.ID_Emprestimo;
    } catch (erro) {
        throw erro;
    }
}

export {
    buscaTodosEmprestimosServico,
    buscaEmprestimoIdServico,
    adicionarEmprestimoServico,
    devolucaoEmprestimoServico,
    editarEmprestimoServico
}
