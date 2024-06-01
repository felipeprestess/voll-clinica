import IEndereco from "./IEndereco"

export default interface IProfissional {
    imagem: string,
    nome: string,
    crm: string,
    especialidade: string,
    atendePorPlano: boolean,
    planoSaude: string[],
    estaAtivo: boolean,
    email: string,
    telefone: string,
    endereco: IEndereco,
    senha: string
}