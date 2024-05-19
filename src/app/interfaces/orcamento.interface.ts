export interface IVeiculo {
    proprietario: string;
    placa: string;
    marca: string;
}

export interface IServico {
    tipo: string;
    descricao: string;
    valor: number;
}

export interface IServicos {
    veiculo: IVeiculo;
    servico: IServico[];
}
