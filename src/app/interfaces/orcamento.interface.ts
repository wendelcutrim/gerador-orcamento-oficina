export interface IVeiculo {
    proprietario: string;
    placa: string;
    marca: string;
}

export interface IServico {
    tipo: string;
    descricao: string;
    valor: string;
}

export interface IServicos {
    veiculo: IVeiculo;
    servico: IServico[];
}

export type IServicoResumo = { [key: string]: Array<{ title: string; jobs: IServico }> };
