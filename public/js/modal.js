function openModal() {
    document.getElementById('modal').style.display = 'flex'; // Só assima pra pegar
  }
  
  function closeModal() {
    document.getElementById('modal').style.display = 'none'; 
  }
  
  function formatarCep(input) {
    let cep = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (cep.length > 5) {
      cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`; // Adiciona o hífen
    }
    input.value = cep;
  }
  
  async function buscarCep() {
    const cep = document.getElementById('cep').value.replace('-', ''); // Remove o hífen para busca
    const resultDiv = document.getElementById('result');
    const welcomeMessage = document.getElementById('welcome');
    const cepInfo = document.getElementById('cep-info');
  
    if (!cep) {
      resultDiv.innerHTML = "<p style='color: red;'>Por favor, digite um CEP.</p>";
      return;
    }
  
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('Erro ao buscar o CEP');
      const data = await response.json();
  
      if (data.erro) {
        resultDiv.innerHTML = "<p style='color: red;'>CEP não encontrado.</p>";
        return;
      }
  
      localStorage.setItem('userCep', JSON.stringify(data));
  
      welcomeMessage.classList.add('hidden');
      cepInfo.classList.remove('hidden');
      cepInfo.textContent = `${data.localidade || 'N/A'} - ${data.uf || 'N/A'}`;
      closeModal(); 
    } catch (error) {
      resultDiv.innerHTML = `<p style='color: red;'>Erro: ${error.message}</p>`;
    }
  }
  
  function carregarCepSalvo() {
    const savedCep = localStorage.getItem('userCep');
    if (savedCep) {
      const data = JSON.parse(savedCep);
      const welcomeMessage = document.getElementById('welcome');
      const cepInfo = document.getElementById('cep-info');
      
      welcomeMessage.classList.add('hidden');
      cepInfo.classList.remove('hidden');
      cepInfo.textContent = `${data.localidade || 'N/A'} - ${data.uf || 'N/A'}`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarCepSalvo);  