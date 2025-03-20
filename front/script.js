document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('exibir').addEventListener('click', () => {
    const personagemId = document.getElementById('personagem').value;
    console.log('ID do personagem selecionado:', personagemId); // Verifique se o ID está sendo selecionado corretamente

    fetch(`/dados?id=${personagemId}`)
      .then(response => response.json())
      .then(data => {
        // Verificando os dados retornados
        console.log('Dados recebidos:', data);

        document.getElementById('name').textContent = `Nome: ${data.nome}`;
        document.getElementById('race').textContent = `Raça: ${data.raca}`;
        document.getElementById('power').textContent = `Gênero: ${data.genero}`;
        
        // Exibindo a imagem
        const imgElement = document.createElement('img');
        imgElement.src = data.imagem;
        imgElement.alt = data.nome;
        imgElement.title = `Imagem de ${data.nome}`;
        
        const imageContainer = document.getElementById('character-image');
        imageContainer.innerHTML = ''; // Limpar qualquer imagem anterior
        imageContainer.appendChild(imgElement);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar os dados');
      });
  });
});
