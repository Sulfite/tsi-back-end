import { Request, Response } from "express";
import { 
    adicionarAlunoServico,
    buscaAlunoIdServico,
    buscaTodosAlunosServico,
    deleteAlunoServico,
    editarAlunoServico,
    ILoginAluno,
    loginAluno
} from "../Servico/AlunosServico";
import { IAluno } from "../Repositorio/AlunosRepositorio";

const buscaTodosAlunos = async (req: Request, res: Response) => {
    try {
        const alunos = await buscaTodosAlunosServico();
        res.status(200).json(alunos);
    } catch(erro) {
        res.status(500).json({ error:"Erro ao consultar todos os Alunos" })
    }
}


const buscaAlunoIdControle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const aluno = await buscaAlunoIdServico(Number(id));
        return res.status(200).json({
            'sucesso': true,
            'mensagem': 'Aluno encontrado com Sucesso',
            'Aluno': aluno
        })
    } catch(erro) {
        res.status(500).json({
            'sucesso': false,
            'mensagem': 'Erro ao consultar o Aluno',
            'Aluno': null
        })
    }
}

const adicionarAlunoControle = async (req: Request, res: Response) => {
    const alunoRequest: IAluno = req.body;
    try {
        const aluno = await adicionarAlunoServico(alunoRequest);
        return res.status(201).json({
            'sucesso': aluno.id > 0,
            'mensagem': 'Aluno adicionado com Sucesso',
            'idAluno': aluno.id
        })
    } catch (error) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Falha ao adicionar o aluno.',
            'idAluno': null
        });
    }
}

const deleteAlunoControle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const aluno = await deleteAlunoServico(Number(id));
        return res.status(200).json({
            'sucesso': true,
            'mensagem': 'Aluno excluído com Sucesso',
            'Aluno': aluno
        })
    } catch(erro) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Erro ao excluír o Aluno',
            'Aluno': null
        })
    }
}

const editarAlunoControle = async (req: Request, res: Response) => {
    const alunoRequest: IAluno = req.body;
    const { id } = req.params;
    try {
        const aluno = await editarAlunoServico(Number(id), alunoRequest);
        return res.status(201).json({
            'sucesso': aluno.id > 0,
            'mensagem': 'Aluno atualizado com Sucesso',
            'idAluno': aluno.id
        })
    } catch (error) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Falha ao atualizar o aluno.',
            'idAluno': null
        });
    }
}

const loginControle = async (req: Request, res: Response) => {
    const login: ILoginAluno = req.body;
    try {
        const aluno = await loginAluno(login);

        return res.status(200).json(aluno);
    } catch (erro) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': erro,
            'idAluno': null
        });
    }
}

export {
    buscaTodosAlunos,
    adicionarAlunoControle,
    buscaAlunoIdControle,
    deleteAlunoControle,
    editarAlunoControle,
    loginControle
}