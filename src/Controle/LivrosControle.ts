import { Request, Response } from "express";
import { 
    buscaTodosLivrosServico,
    buscaLivroIdServico,
    adicionarLivroServico,
    deleteLivroServico,
    editarLivroServico
} from "../Servico/LivrosServico";
import { ILivro } from "../Repositorio/LivrossRepositorio";

const buscaTodosLivros = async (req: Request, res: Response) => {
    try {
        const livros = await buscaTodosLivrosServico();
        res.status(200).json(livros);
    } catch(erro) {
        res.status(500).json({ error:"Erro ao consultar todos os livros" })
    }
}

const buscaLivroIdControle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const livro = await buscaLivroIdServico(Number(id));
        return res.status(200).json({
            'sucesso': true,
            'mensagem': 'Livro encontrado com Sucesso',
            'Livro': livro
        })
    } catch(erro) {
        res.status(500).json({
            'sucesso': false,
            'mensagem': 'Erro ao consultar o livro',
            'Livro': null
        })
    }
}

const adicionarLivroControle = async (req: Request, res: Response) => {
    const LivroRequest: ILivro = req.body;
    try {
        const livro = await adicionarLivroServico(LivroRequest);
        return res.status(201).json({
            'sucesso': livro,
            'mensagem': 'Livro adicionado com Sucesso',
            'idLivro': livro
        })
    } catch (error) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Falha ao adicionar o Livro.',
            'idLivro': null
        });
    }
}

const deleteLivroControle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Livro = await deleteLivroServico(Number(id));
        return res.status(200).json({
            'sucesso': true,
            'mensagem': 'Livro excluído com Sucesso',
            'Livro': Livro
        })
    } catch(erro) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Erro ao excluír o Livro',
            'Livro': null
        })
    }
}

const editarLivroControle = async (req: Request, res: Response) => {
    const LivroRequest: ILivro = req.body;
    const { id } = req.params;
    try {
        const livro = await editarLivroServico(Number(id), LivroRequest);
        return res.status(200).json({
            'sucesso': true,
            'mensagem': 'Livro atualizado com Sucesso',
            'idLivro': livro
        })
    } catch (error) {
        return res.status(500).json({
            'sucesso': false,
            'mensagem': 'Falha ao atualizar o Livro.',
            'idLivro': null
        });
    }
}

export {
    buscaTodosLivros,
    adicionarLivroControle,
    buscaLivroIdControle,
    deleteLivroControle,
    editarLivroControle,
}