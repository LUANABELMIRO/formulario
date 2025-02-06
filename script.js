document.getElementById('product-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Captura os valores dos campos
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value).toFixed(2);
  const available = document.getElementById('available').value;

  // Seleciona o corpo da tabela correta
  const tableBody = document.querySelector('#product-list tbody');

  // Adiciona o produto na tabela
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${name}</td>
    <td>R$ ${price}</td>
  `;
  tableBody.appendChild(newRow);

  // Limpa o formulário
  document.getElementById('product-form').reset();

  // Ordena os produtos pelo valor (menor para o maior)
  sortTableByPrice();

  // Abre a listagem automaticamente
  abrirModal();
});

// Função para ordenar os produtos pelo preço
function sortTableByPrice() {
  const table = document.querySelector('#product-list tbody');
  const rows = Array.from(table.rows);

  rows.sort((a, b) => {
    const priceA = parseFloat(a.cells[1].innerText.replace('R$', '').trim());
    const priceB = parseFloat(b.cells[1].innerText.replace('R$', '').trim());
    return priceA - priceB;
  });

  rows.forEach(row => table.appendChild(row));
}

// Função para abrir o modal
function abrirModal() {
  const modal = document.getElementById('janela-modal');
  modal.classList.add('abrir');

  modal.addEventListener('click', (e) => {
    if (e.target.id === 'fechar' || e.target.id === 'janela-modal') {
      modal.classList.remove('abrir');
    }
  });

  feather.replace();
}

// Função para pesquisar produtos
function searchProduct() {
  const searchValue = document.getElementById('searchProductByName').value.toLowerCase();
  const tableRows = document.querySelectorAll('#product-list tbody tr');

  tableRows.forEach(row => {
    const productName = row.cells[0].innerText.toLowerCase();
    if (productName.includes(searchValue)) {
      row.style.display = ''; // Mostra a linha
    } else {
      row.style.display = 'none'; // Esconde a linha
    }
  });
}

// Função para fechar a pesquisa e resetar o campo
function closeSearch() {
  document.getElementById('searchProductByName').value = '';
  searchProduct(); // Reseta a busca e mostra todas as linhas
}

// Adicionando evento ao botão de pesquisa
document.getElementById('searchProductByName').addEventListener('input', searchProduct);
document.getElementById('btnSearchClose').addEventListener('click', closeSearch);

// Função para criar o botão "Cadastrar Novo Produto"
function adicionarBotaoCadastrar() {
  const modalContent = document.querySelector('.modal');

  const newButton = document.createElement('button');
  newButton.textContent = 'Cadastrar Novo Produto';
  newButton.classList.add('btn-cadastrar');
  newButton.addEventListener('click', () => {
    document.getElementById('janela-modal').classList.remove('abrir');
    document.getElementById('name').focus(); // Coloca o foco no campo Nome do Produto
  });

  modalContent.appendChild(newButton);
}

// Adiciona o botão ao carregar a página
adicionarBotaoCadastrar();
