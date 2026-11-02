import { prisma } from "../prisma";

interface ILivro {
  idLivro:    number | null
  qtdPaginas: number
  autor:       string
  editora:     string
  isbn:        string
  titulo:      string
}

const buscaTodosLivrosRepositorio = async () => {
    const livros = await prisma.livros.findMany();
    return livros;
}

const adicionarLivro = async (data: ILivro) => {
    const livro = await prisma.livros.create({
        data: {
            Titulo: data.titulo,
            Autor: data.autor,
            QTD_Paginas: data.qtdPaginas,
            Editora: data.editora,     
            ISBN: data.isbn,
        }
    });
    return livro;
}

const buscaLivroId = async (id: number) => {
    const livro = await prisma.livros.findUnique({
        where: { ID_Livro: id },
    });
    return livro;
}

const deleteLivro = async (id: number) => {
    const livro = await prisma.livros.delete({
        where: { ID_Livro: id },
    });
    return livro;
}

const editarLivro = async (id: number, livro: ILivro) => {
    const editarLivro = await prisma.livros.update({
        where: { ID_Livro: id },
        data: { 
            Titulo: livro.titulo,
            Autor: livro.autor,
            QTD_Paginas: livro.qtdPaginas,
            Editora: livro.editora,     
            ISBN: livro.isbn,
        },
    });
    return editarLivro;
}

export {
    ILivro,
    buscaTodosLivrosRepositorio,
    adicionarLivro,
    buscaLivroId,
    deleteLivro,
    editarLivro,
}