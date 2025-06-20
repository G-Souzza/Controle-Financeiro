## **📌 Visão Geral**

Aplicação web de página única para gerenciamento de finanças pessoais, com funcionalidades CRUD completas e integração com um backend simulado usando json-server.

## **✨ Funcionalidades**

- **Cadastro de transações** (entradas e saídas)
- **Visualização em tempo real** do saldo total
- **Edição e exclusão** de transações existentes
- **Atualização automática** do saldo após cada operação
- **Formatação monetária** no padrão brasileiro (R$)
- **Interface intuitiva** com feedback visual claro

## **🛠️ Tecnologias Utilizadas**

- **Frontend**:
    - HTML5
    - CSS3
    - JavaScript Vanilla (ES6+)
- **Backend Simulado**:
    - json-server (REST API fake)
    

## **🚀 Como Executar o Projeto**

### **Pré-requisitos**

- Node.js instalado (v14+)
- NPM ou Yarn

### **Passo a Passo**

**Clone o repositório**:

```
git clone https://github.com/G-Souzza/Controle-Financeiro.git
```

**Instale as dependências**:

```
npm install -g json-server
```

**Inicie o servidor backend** (em um terminal):

```
npx json-server --watch db.json --port 3001
```

**Abra a aplicação**:

- Abra o arquivo **`index.html`** no seu navegador preferido
- Ou utilize um servidor local como:
    
```
npx serve
```
    
E acesse: [http://localhost:3001](http://localhost:3001/)

## **🎨 Interface**

![Image](https://github.com/user-attachments/assets/15a1de4a-ae68-4f8c-8cc4-f7efbf6f01b1)

## **📂 Estrutura de Arquivos**

controle-financeiro/

├── index.html          # Página principal

├── style.css           # Estilos da aplicação

├── script.js           # Lógica principal

├── db.json             # Banco de dados simulado

└── [README.md](http://readme.md/)           # Este arquivo

## **🤝 Como Contribuir**

1. Faça um fork do projeto
2. Crie sua branch (**`git checkout -b feature/nova-funcionalidade`**)
3. Commit suas mudanças (**`git commit -m 'Adiciona nova funcionalidade'`**)
4. Push para a branch (**`git push origin feature/nova-funcionalidade`**)
5. Abra um Pull Request

## **📄 Licença**

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/G-Souzza/Controle-Financeiro?tab=MIT-1-ov-file#) para detalhes.

## **✉️ Contato**

Gabriel Souza - gsouza8083@gmail.com

Link do Projeto: https://github.com/G-Souzza/Controle-Financeiro.git
