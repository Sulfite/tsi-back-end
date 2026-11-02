import { prisma } from "../prisma";

interface IAluno {
  idUsuario:   number | null
  nome:        string
  email:       string
  codUsuario: string 
  senha:       string 
  idade:       number
  criadoEm?:    Date
}

const buscaAlunoLogin = async (email: string, codUsuario: string) => {
    const aluno = await prisma.alunos.findFirst({
        where: {
            OR: [
                {email: email},
                {cod_usuario: codUsuario}
            ]
        }
    });
    return aluno;
}

const buscaTodosAlunosRepositorio = async () => {
    const alunos = await prisma.alunos.findMany();
    return alunos;
}

const adicionarAluno = async (data: IAluno) => {
    const aluno = await prisma.alunos.create({
        data: {
            nome: data.nome,
            email: data.email,
            cod_usuario: data.codUsuario,
            senha: data.senha,
            idade: data.idade
        }
    });

    return aluno;
}

const buscaAlunoId = async (id: number) => {
    const aluno = await prisma.alunos.findUnique({
        where: { id },
    });
    return aluno;
}

const deleteAluno = async (id: number) => {
    const aluno = await prisma.alunos.delete({
        where: { id: id },
    });

    return aluno;
}

const editarAluno = async (id: number, aluno: IAluno) => {
    const editarAluno = await prisma.alunos.update({
        where: { id },
        data: { 
            nome: aluno.nome,
            email: aluno.email,
            idade: aluno.idade,
            cod_usuario: aluno.codUsuario,
            senha: aluno.senha
        },
    });
    return editarAluno;
}

export {
    IAluno,
    buscaTodosAlunosRepositorio,
    adicionarAluno,
    buscaAlunoId,
    deleteAluno,
    editarAluno,
    buscaAlunoLogin
}