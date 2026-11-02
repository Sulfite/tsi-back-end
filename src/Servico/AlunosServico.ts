import { 
    adicionarAluno,
    buscaAlunoId,
    buscaAlunoLogin,
    buscaTodosAlunosRepositorio, 
    deleteAluno, 
    editarAluno, 
    IAluno
} from "../Repositorio/AlunosRepositorio";
import { gerarToken, hash } from "../Utils/criptografia";

interface ILoginAluno {
    usuario: string,
    senha: string
}

const loginAluno = async (data: ILoginAluno) => {
    try {
        const {usuario, senha} = data;
        const aluno = await buscaAlunoLogin(usuario, usuario);

        if (aluno?.senha !== hash(senha)) {
            throw('Usuário ou senha Invalidos');
        }
        const token = gerarToken(aluno.id);
        const resultado = {
            "Sucesso": aluno.id > 0,
            "mensagem": 'Login realizado com Sucesso',
            "token": token
        }
        return resultado;
    } catch (erro) {
        throw(erro)
    }
}

const buscaTodosAlunosServico = async () => {
    const alunos = await buscaTodosAlunosRepositorio();
    return alunos;
}

const buscaAlunoIdServico = async (id: number) => {
    try {
        if (id === 0) {
            throw ('Passe um valor para busca')
        }

        const alunos = await buscaAlunoId(id);
        return alunos;
    } catch (erro) {
        throw (erro)
    }
}

const adicionarAlunoServico = async (aluno: IAluno) => {
    const {
        codUsuario,
        email,
        senha,
        nome,
        idade
    } = aluno;
    try {
        if (codUsuario === null || 
            email === null ||
            senha === null || 
            nome === null || 
            idade === null) {
            throw ('Verifique se nenhuma informação está vazia');
        }

        const novoAluno: IAluno = {
            idUsuario: aluno.idUsuario,
            codUsuario: aluno.codUsuario,
            email: aluno.email,
            senha: hash(aluno.senha),
            nome: aluno.nome,
            idade: aluno.idade
        }

        const resultado = await adicionarAluno(novoAluno);
        return resultado;

    } catch(erro) {
        throw(erro);
    }
}

const deleteAlunoServico = async (id: number) => {
    try {
        if (id === 0) {
            throw ('Passe um valor para busca')
        }

        const existeAluno = buscaAlunoId(id);
        if (!existeAluno) {
            throw('Aluno não encontrado.');
        }

        const alunos = await deleteAluno(id);
        return alunos;
    } catch (erro) {
        throw (erro)
    }
}

const editarAlunoServico = async (id: number, aluno: IAluno) => {
    const {
        codUsuario,
        email,
        senha,
        nome,
        idade
    } = aluno;

    try {
        if (id === 0) {
            throw ('Passe um valor para edição do aluno');
        }

        const existeAluno = await buscaAlunoId(id);
        if (!existeAluno) {
            throw('Aluno não encontrado.');
        }

        if (codUsuario === null || 
            email === null ||
            senha === null || 
            nome === null || 
            idade === null) {
            throw ('Verifique se nenhuma informação está vazia');
        }

        const editarDadosAluno: IAluno = {
            idUsuario: aluno.idUsuario,
            codUsuario: aluno.codUsuario,
            email: aluno.email,
            senha: hash(aluno.senha),
            nome: aluno.nome,
            idade: aluno.idade
        }

        const resultado = await editarAluno(id, editarDadosAluno);
        return resultado;
    } catch(erro) {
        throw(erro);
    }
}

export {
    ILoginAluno,
    buscaTodosAlunosServico,
    adicionarAlunoServico,
    buscaAlunoIdServico,
    deleteAlunoServico,
    editarAlunoServico,
    loginAluno
}