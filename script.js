// Inicialização e Variáveis Globais
// Inicializção e configuração do servidor

document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "http://localhost:3001/transactions"; // URL da API json-server

  //Add elementos do DOM
  const totalBalanceElement = document.getElementById("totalBalance");
  const transactionsForm = document.getElementById("transactionsForm");
  const nameInput = document.getElementById("name");
  const valueInput = document.getElementById("value");
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const transactionsList = document.getElementById("transactionsList");
  const transactionIdInput = document.createElement("input");

  // isEditing e currentTransactionId controlam o estado da aplicação durante edições
  let isEditing = false; // Flag para verificar se estamos editando uma transação
  let currentTransactionId = null; // armazenar o ID da transação atual

  // Carregamento inicial e Event Listeners
  // Carregar transações ao carregar a página
  fetchTransactions();

  // Manipulador do formulário (submit)
  transactionsForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita carregar a página

    const transaction = {
      name: nameInput.value,
      value: parseFloat(valueInput.value),
    };

    if (isEditing) {
      // Se estamos editando, atualiza a transação
      updateTransaction(currentTransactionId, transaction);
    } else {
      // Caso contrário, cria uma nova transação
      createTransaction(transaction);
    }
  });

  cancelBtn.addEventListener("click", resetForm);

  // Funções CRUD (Create, Read, Update, Delete)
  // Cria nova transação
  function createTransaction(transaction) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then(() => {
        resetForm();
        fetchTransactions();
      })
      .catch((error) => console.error("Erro ao criar transação", error));
  }

  // Ler transações de servidor
  function fetchTransactions() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        renderTransactions(data); // Renderiza na tabela
        updateTotalBalance(data, totalBalance); // Atualiza o saldo total
      })
      .catch((error) => console.error("Erro ao atualizar tabela:", error));
  }

  // Atualiza transação existente
  function updateTransaction(id, transaction) {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchTransactions(); // Recarrega as transações após a atualização
      })
      .catch((error) => console.error("Erro ao atualizar transação:", error));
  }

  // Deletar transação
  function deleteTransaction(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTransactions(); // Recarrega as transações após a exclusão
      })
      .catch((error) => console.error("Erro ao deletar transação:", error));
  }

  // Renderiza transações na tabela
  function renderTransactions(transactions) {
    transactionsList.innerHTML = ""; // Limpa a tabela

    transactions.forEach((transaction) => {
      const row = document.createElement("tr");

      // Célula do nome
      const nameCell = document.createElement("td");
      nameCell.textContent = transaction.name;

      // Célula do valor (com classe CSS para positivo/negativo)
      const valueCell = document.createElement("td");
      valueCell.textContent = formatCurrency(transaction.value);
      valueCell.classList.add(transaction.value >= 0 ? "positive" : "negative");

      // Célula de ações (botões)
      const actionsCell = document.createElement("td");
      actionsCell.className = "actions";

      // Botão Editar
      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", () => prepareEditForm(transaction));

      // Botão Excluir (com confirmação)
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir esta transação?")) {
          deleteTransaction(transaction.id);
        }
      });

      // Monta a linha da tabela
      actionsCell.append(editBtn, deleteBtn);
      row.append(nameCell, valueCell, actionsCell);
      transactionsList.appendChild(row);
    });
  }

  // Calcula e exibe o saldo total
  function updateTotalBalance(transactions) {
    const total = transactions.reduce(
      (sum, transaction) => sum + transaction.value,
      0
    );
    totalBalanceElement.textContent = formatCurrency(total);
    totalBalanceElement.className = total >= 0 ? "positive" : "negative";
  }

  //Funções Auxiliares
  // Prepara o formulário para edição
  function prepareEditForm(transaction) {
    isEditing = true;
    currentTransactionId = transaction.id;

    // Preenche os campos
    nameInput.value = transaction.name;
    valueInput.value = transaction.value;
    transactionIdInput.value = transaction.id;

    // Altera o texto do botão e mostra cancelar
    submitBtn.textContent = "Atualizar";
    cancelBtn.style.display = "inline-block";
  }

  // Reseta o formulário
  function resetForm() {
    isEditing = false;
    currentTransactionId = null;

    transactionsForm.reset(); // Limpa os campos
    transactionIdInput.value = ""; // Limpa o ID oculto

    // Restaura botão original e esconde cancelar
    submitBtn.textContent = "Adicionar";
    cancelBtn.style.display = "none";
  }

  // Formata valor como moeda brasileira
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
});
