export type IServicoResumo = { [key: string]: Array<{ title: string; jobs: IServico }> };
export type TipoServico = 'funilaria' | 'pintura' | 'peca' | 'maoDeObra';
export type TipoServicos = { [key: string]: Array<IServico> };

export interface IVeiculo {
    proprietario: string;
    placa: string;
    marca: string;
}

export interface IServico {
    id: string;
    descricao: string;
    valor: string;
}

export interface IServicos {
    veiculo: IVeiculo;
    servico: IServico[];
}
