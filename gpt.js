// Alternar visibilidade da senha
document.getElementById('toggleSenha').addEventListener('click', () => {
  const senha = document.getElementById('senha');
  senha.type = senha.type === 'password' ? 'text' : 'password';
});

// Função para exibir mensagens (sucesso ou erro)
function showInfo(message, type = 'error') {
  const box = document.getElementById('infoBox');
  box.textContent = message;
  box.className = `info-box ${type}`;
  box.style.display = 'block';
}

// Clique no botão de login
document.getElementById('btnLogin').addEventListener('click', () => {
  const dominio = document.getElementById('dominio').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!dominio || !empresa || !usuario || !senha) {
    showInfo('⚠️ Por favor, preencha todos os campos.', 'error');
    return;
  }

  // Simulação de validação simples
  if (usuario === 'admin' && senha === '1234') {
    showInfo('✅ Login realizado com sucesso!', 'success');
  } else {
    showInfo('❌ Usuário ou senha incorretos.', 'error');
  }
});
