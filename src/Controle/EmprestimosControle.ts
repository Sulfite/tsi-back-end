import { Request, Response } from "express";
import { adicionarEmprestimoServico, buscaEmprestimoIdServico, buscaTodosEmprestimosServico, devolucaoEmprestimoServico, editarEmprestimoServico } from "../Servico/EmprestimosServico";
import { IEmprestimo } from "../Repositorio/EmprestimosRepositorio";
import { AppError } from "../Utils/erroGlobal";

const buscaTodosEmprestimos = async (req: Request, res: Response) => {
    const emprestimos = await buscaTodosEmprestimosServico();
    return res.status(200).json({
        'sucesso': true,
        'mensagem': 'Emprestimos encontrados com Sucesso',
        'empretismos': emprestimos
    })
}

const buscaEmprestimoIdControle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const emprestimos = await buscaEmprestimoIdServico(Number(id));
    return res.status(200).json({
        'sucesso': true,
        'mensagem': 'Emprestimos encontrados com Sucesso',
        'empretismos': emprestimos
    });
}

const adicionarEmprestimoControle = async (req: Request, res: Response) => {
    const emprestimoRequest: IEmprestimo = req.body;
    const emprestimo = await adicionarEmprestimoServico(emprestimoRequest);
    return res.status(201).json({
        'sucesso': emprestimo,
        'mensagem': 'Emprestimo adicionado com Sucesso',
        'idEmprestimo': emprestimo
    });
}

const devolucaoEmprestimoControle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const emprestimo = await devolucaoEmprestimoServico(Number(id));
    return res.status(200).json({
        'sucesso': true,
        'mensagem': 'Livro devolvido com Sucesso',
        'idEmprestimo': emprestimo
    })

}

const editarEmprestimoControle = async (req: Request, res: Response) => {
    const emprestimoRequest: IEmprestimo = req.body;

    const emprestimo = await editarEmprestimoServico(emprestimoRequest);
    return res.status(200).json({
        'sucesso': true,
        'mensagem': 'Livro atualizado com Sucesso',
        'idEmprestimo': emprestimo
    })

}

export {
    adicionarEmprestimoControle,
    buscaEmprestimoIdControle,
    buscaTodosEmprestimos,
    devolucaoEmprestimoControle,
    editarEmprestimoControle,
}