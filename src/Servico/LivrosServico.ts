import { 
    ILivro,
    buscaTodosLivrosRepositorio,
    adicionarLivro,
    buscaLivroId,
    deleteLivro,
    editarLivro,
} from "../Repositorio/LivrossRepositorio";

const buscaTodosLivrosServico = async () => {
    const livros = await buscaTodosLivrosRepositorio();
    return livros;
}

const buscaLivroIdServico = async (id: number) => {
    try {
        if (id === 0) {
            throw ('Passe um valor para busca')
        }

        const livros = await buscaLivroId(id);
        return livros;
    } catch (erro) {
        throw (erro)
    }
}

const adicionarLivroServico = async (livro: ILivro) => {
    const {
        qtdPaginas,
        autor,
        editora,
        isbn,
        titulo
    } = livro;
    try {
        if (qtdPaginas === null || 
            autor === null ||
            editora === null || 
            isbn === null || 
            titulo === null) {
            throw ('Verifique se nenhuma informação está vazia');
        }
        const resultado = await adicionarLivro(livro);
        return resultado;
    } catch(erro) {
        throw(erro);
    }
}

const deleteLivroServico = async (id: number) => {
    try {
        if (id === 0) {
            throw ('Passe um valor para busca')
        }

        const existeLivro = buscaLivroId(id);
        if (!existeLivro) {
            throw('Livro não encontrado.');
        }

        const livro = await deleteLivro(id);
        return livro;
    } catch (erro) {
        throw (erro)
    }
}

const editarLivroServico = async (id: number, livro: ILivro) => {
    const {
        qtdPaginas,
        autor,
        editora,
        isbn,
        titulo
    } = livro;

    try {
        if (id === 0) {
            throw ('Passe um valor para edição do aluno');
        }

        const existeLivro = await buscaLivroId(id);
        if (!existeLivro) {
            throw('Livro não encontrado.');
        }

        if (qtdPaginas === null || 
            autor === null ||
            editora === null || 
            isbn === null || 
            titulo === null) {
            throw ('Verifique se nenhuma informação está vazia');
        }
        const resultado = await editarLivro(id, livro);
        return resultado;
    } catch(erro) {
        throw(erro);
    }
}

export {
    buscaTodosLivrosServico,
    buscaLivroIdServico,
    adicionarLivroServico,
    deleteLivroServico,
    editarLivroServico
}