function openModalCEP() {
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
  const cepInfo = document.getElementById('cep-info');

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response => response.json());
  const data = response;

  if (data.erro) {
    cepInfo.innerHTML = 'CEP não encontrado'
  }
  else {
    localStorage.setItem('userCep', JSON.stringify(data));

    cepInfo.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.localidade} - ${data.uf}`;
  }
  closeModal();
}