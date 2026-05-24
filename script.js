let carrinho = [];

function alternarCarrinho() {
  const janela = document.getElementById("janela-carrinho");
  const overlay = document.getElementById("overlay-carrinho");

  janela.classList.toggle("ativo");
  overlay.classList.toggle("ativo");
}

function fecharCarrinho() {
  document.getElementById("janela-carrinho").classList.remove("ativo");
  document.getElementById("overlay-carrinho").classList.remove("ativo");
}

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome: nome,
      preco: preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
  document.getElementById("janela-carrinho").classList.add("ativo");
  document.getElementById("overlay-carrinho").classList.add("ativo");
}

function aumentarQuantidade(nome) {
  const item = carrinho.find(item => item.nome === nome);
  if (item) {
    item.quantidade += 1;
    atualizarCarrinho();
  }
}

function diminuirQuantidade(nome) {
  const item = carrinho.find(item => item.nome === nome);

  if (!item) return;

  if (item.quantidade > 1) {
    item.quantidade -= 1;
  } else {
    carrinho = carrinho.filter(produto => produto.nome !== nome);
  }

  atualizarCarrinho();
}

function removerItem(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const quantidadeItens = document.getElementById("quantidade-itens");
  const contadorCarrinho = document.getElementById("contador-carrinho");

  listaCarrinho.innerHTML = "";

  let total = 0;
  let totalItens = 0;

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `<li class="vazio">Seu carrinho está vazio.</li>`;
  } else {
    carrinho.forEach((item) => {
      const totalItem = item.preco * item.quantidade;
      total += totalItem;
      totalItens += item.quantidade;

      const li = document.createElement("li");
      li.className = "item-carrinho";

      li.innerHTML = `
        <div class="item-info">
          <strong>${item.nome}</strong>
          <span>R$ ${item.preco.toFixed(2).replace(".", ",")} cada</span>
          <span>Total do item: R$ ${totalItem.toFixed(2).replace(".", ",")}</span>
        </div>

        <div class="item-controles">
          <button class="btn-menos" onclick="diminuirQuantidade('${item.nome}')">-</button>
          <span class="quantidade">${item.quantidade}</span>
          <button class="btn-mais" onclick="aumentarQuantidade('${item.nome}')">+</button>
          <button class="btn-remover" onclick="removerItem('${item.nome}')">Remover</button>
        </div>
      `;

      listaCarrinho.appendChild(li);
    });
  }

  totalCarrinho.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  quantidadeItens.textContent = totalItens;
  contadorCarrinho.textContent = totalItens;
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let mensagem = "Olá, quero finalizar meu pedido:%0A%0A";
  let total = 0;

  carrinho.forEach((item) => {
    const totalItem = item.preco * item.quantidade;
    mensagem += `- ${item.nome}%0A`;
    mensagem += `  Quantidade: ${item.quantidade}%0A`;
    mensagem += `  Valor unitário: R$ ${item.preco.toFixed(2).replace(".", ",")}%0A`;
    mensagem += `  Total do item: R$ ${totalItem.toFixed(2).replace(".", ",")}%0A%0A`;
    total += totalItem;
  });

  mensagem += `Total do pedido: R$ ${total.toFixed(2).replace(".", ",")}`;

  const link = `https://wa.me/5512981880220?text=${mensagem}`;
  window.open(link, "_blank");
}

atualizarCarrinho();