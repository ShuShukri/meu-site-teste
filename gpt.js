function createInfoBox(options = {}) {
  const {
    title = 'Informação',
    html = '',
    type = 'info',
    dismissible = true,
    collapsible = true,
    copyable = true
  } = options;

  const box = document.createElement('article');
  box.className = `info-box type-${type}`;
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', title);

  const header = document.createElement('div');
  header.className = 'info-header';

  const titleEl = document.createElement('div');
  titleEl.className = 'info-title';
  titleEl.textContent = title;

  const meta = document.createElement('span');
  meta.className = 'info-meta muted';
  meta.textContent = new Date().toLocaleString();

  const actions = document.createElement('div');
  actions.className = 'info-actions';

  if (collapsible) {
    const btnToggle = document.createElement('button');
    btnToggle.className = 'btn-icon';
    btnToggle.title = 'Expandir / recolher';
    btnToggle.innerHTML = '▾';
    btnToggle.addEventListener('click', () => {
      body.classList.toggle('collapsed');
      btnToggle.innerHTML = body.classList.contains('collapsed') ? '▸' : '▾';
    });
    actions.appendChild(btnToggle);
  }

  if (copyable) {
    const btnCopy = document.createElement('button');
    btnCopy.className = 'btn-icon';
    btnCopy.title = 'Copiar conteúdo';
    btnCopy.innerHTML = '📋';
    btnCopy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(stripHtml(body.innerHTML));
        btnCopy.innerHTML = '✓';
        setTimeout(() => btnCopy.innerHTML = '📋', 1200);
      } catch (e) {
        console.warn('Clipboard fail', e);
      }
    });
    actions.appendChild(btnCopy);
  }

  if (dismissible) {
    const btnClose = document.createElement('button');
    btnClose.className = 'btn-icon';
    btnClose.title = 'Fechar';
    btnClose.setAttribute('aria-label','Fechar caixa de informação');
    btnClose.innerHTML = '✕';
    btnClose.addEventListener('click', () => {
      box.style.transition = 'opacity .16s ease, transform .18s ease';
      box.style.opacity = 0;
      box.style.transform = 'scale(.98)';
      setTimeout(() => box.remove(), 180);
    });
    actions.appendChild(btnClose);
  }

  header.appendChild(titleEl);
  header.appendChild(meta);
  header.appendChild(actions);

  const body = document.createElement('div');
  body.className = 'info-body';
  body.innerHTML = `<div class="info-content">${html}</div>`;

  function stripHtml(htmlString){
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlString;
    return tmp.textContent || tmp.innerText || '';
  }

  box.appendChild(header);
  box.appendChild(body);

  box.collapse = () => body.classList.add('collapsed');
  box.expand = () => body.classList.remove('collapsed');
  box.toggle = () => body.classList.toggle('collapsed');
  box.update = ({ title: t, html: h }) => {
    if (t !== undefined) titleEl.textContent = t;
    if (h !== undefined) body.querySelector('.info-content').innerHTML = h;
  };

  document.getElementById('infoContainer').prepend(box);

  return box;
}

document.addEventListener('DOMContentLoaded', () => {
  createInfoBox({
    title: 'Bem-vindo(a)!',
    html: `<p>Esta é uma <strong>caixa interativa</strong>. Clique no ícone de 📋 para copiar ou em ▾ para recolher.</p>
           <pre class="code">const x = 42; // exemplo</pre>`,
    type: 'info'
  });

  document.getElementById('addDemo').addEventListener('click', () => {
    createInfoBox({
      title: 'Atualização disponível',
      html: `<p>Nova versão do sistema pronta. <a href="#">Ver detalhes</a></p>`,
      type: 'success'
    });
  });

  document.getElementById('addToast').addEventListener('click', () => {
    const toast = createInfoBox({
      title: 'Notificação rápida',
      html: `<p>Operação concluída com sucesso.</p>`,
      type: 'success',
      dismissible: true,
      collapsible: false,
      copyable: false
    });
    Object.assign(toast.style, {
      position: 'fixed',
      right: '18px',
      top: '18px',
      width: '320px',
      zIndex: 9999
    });
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(()=> toast.remove(), 350);
    }, 3000);
  });
});
