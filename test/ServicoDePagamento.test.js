import assert from 'node:assert';
import { ServicoDePagamento } from '../src/ServicoDePagamento.js';

describe('ServicoDePagamento', () => {
    let servico;

    beforeEach(() => {
        servico = new ServicoDePagamento();
    });

    it('deve registrar um pagamento com categoria "cara" para valor maior que 100', () => {
        servico.pagar('0987-7656-3475', 'Samar', 156.87);
        const ultimoPagamento = servico.consultarUltimoPagamento();

        assert.strictEqual(ultimoPagamento.codigoBarras, '0987-7656-3475');
        assert.strictEqual(ultimoPagamento.empresa, 'Samar');
        assert.strictEqual(ultimoPagamento.valor, 156.87);
        assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it('deve registrar um pagamento com categoria "padrão" para valor menor ou igual a 100', () => {
        servico.pagar('1234-5678-9012', 'Energia', 100.00);
        const ultimoPagamento = servico.consultarUltimoPagamento();

        assert.strictEqual(ultimoPagamento.valor, 100.00);
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });
});