export class ServicoDePagamento {
    #pagamentos;

    constructor() {
        this.#pagamentos = [];
    }

    pagar(codigoBarras, empresa, valor) {
        const categoria = valor > 100.00 ? 'cara' : 'padrão';

        this.#pagamentos.push({
            codigoBarras,
            empresa,
            valor,
            categoria
        });
    }

    consultarUltimoPagamento() {
        return this.#pagamentos[this.#pagamentos.length - 1];
    }
}
