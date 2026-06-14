# Trabalho de conclusão de disciplina  
# Integração Contínua para Automação de Testes

## 1. Introdução

Este projeto tem como objetivo demonstrar a implementação de uma estratégia de **Integração Contínua (Continuous Integration - CI)** utilizando **GitHub Actions** para execução automatizada de testes.

A pipeline foi configurada para executar testes automatizados desenvolvidos utilizando **Node.js e Mocha**, garantindo que a aplicação seja validada automaticamente.

A solução contempla:

- Execução automática através de alterações no código (**Push**);
- Execução manual através da interface do GitHub;
- Execução programada através de agendamento (**Schedule**);
- Geração e publicação de relatório dos testes executados.

---

## 2. Tecnologias utilizadas

| Tecnologia | Descrição |
|---|---|
| GitHub Actions | Plataforma de automação de workflows e integração contínua |
| Node.js | Ambiente de execução dos testes automatizados |
| Mocha | Framework utilizado para criação e execução dos testes |
| npm | Gerenciador de pacotes utilizado para instalação das dependências |
| dorny/test-reporter | Action utilizada para publicação dos resultados dos testes |

---

## 3. Estrutura da Integração Contínua

O workflow está localizado em:

```
.github/workflows/tests.yml
```

Fluxo de execução:

```
Commit/Execução manual/Agendamento
              |
              v
        GitHub Actions
              |
              v
      Checkout do código
              |
              v
      Configuração Node.js
              |
              v
      Instalação dependências
              |
              v
       Execução testes Mocha
              |
              v
       Publicação relatório
```

---

## 4. Configuração da Pipeline

### 4.1 Execução por Push

A pipeline é executada automaticamente quando ocorre um push na branch master.

```yaml
push:
  branches:
    - master
```

---

### 4.2 Execução Manual

Foi configurada a execução manual através do GitHub Actions:

```yaml
workflow_dispatch:
```

Essa opção permite iniciar a pipeline manualmente pela interface do GitHub.

---

### 4.3 Execução Agendada

A execução automática diária foi configurada utilizando cron:

```yaml
schedule:
  - cron: "0 22 * * *"
```

O GitHub Actions utiliza UTC, portanto:

- 22:00 UTC
- 19:00 horário de Brasília (UTC-3)

---

## 5. Permissões do Workflow

Foram adicionadas permissões para permitir a criação dos resultados dos testes:

```yaml
permissions:
  contents: read
  checks: write
```

Descrição:

- `contents: read`: permite acesso ao código do repositório.
- `checks: write`: permite que o workflow publique informações na área de Checks do GitHub.

---

## 6. Etapas da Pipeline

### Checkout do código

Responsável por obter o código do repositório.

```yaml
uses: actions/checkout@v4
```

---

### Configuração do Node.js

Define a versão utilizada durante a execução.

```yaml
uses: actions/setup-node@v4
with:
  node-version: 20
```

---

### Instalação das dependências

Executada utilizando:

```bash
npm ci
```

O comando garante uma instalação limpa baseada no arquivo `package-lock.json`.

---

### Execução dos testes

Os testes são executados através do comando:

```bash
npm test
```

A suíte de testes utiliza o framework Mocha.

---

### Publicação do relatório

Os resultados são publicados utilizando:

```yaml
uses: dorny/test-reporter@v1
```

Configuração:

```yaml
name: Mocha Tests
path: test-results.xml
reporter: java-junit
```

O parâmetro:

```yaml
if: always()
```

garante que o relatório seja gerado mesmo quando algum teste falhar.

---

## 7. Benefícios

A implementação proporciona:

- Execução automatizada dos testes;
- Maior confiabilidade nas alterações realizadas;
- Padronização do ambiente de testes;
- Histórico das execuções;
- Visualização dos resultados no GitHub Actions.

---

## 8. Conclusão

A implementação da pipeline demonstra como a Integração Contínua pode auxiliar no processo de desenvolvimento de software.

Com o GitHub Actions foi possível automatizar a execução dos testes utilizando Node.js e Mocha, garantindo validações automáticas a cada alteração realizada no projeto.

Requisitos atendidos:

✅ Execução por Push  
✅ Execução Manual  
✅ Execução Agendada  
✅ Geração de Relatório de Testes
