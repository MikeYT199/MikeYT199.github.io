// ============================================================
// CONTACTOS.JS — AJAX completo para gestión de contactos
// ============================================================

let timerBusqueda = null;

document.addEventListener('DOMContentLoaded', () => {
  cargarContactos();
  initBusqueda();
  initFiltroTipo();
  initAgregarContacto();
  initNavbarScroll();
});

// ─── NAVBAR ────────────────────────────────────────────────

function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(26,26,46,0.12)' : 'none';
  });
}

// ─── CARGAR CONTACTOS ──────────────────────────────────────

async function cargarContactos(buscar = '', tipo = 'todos') {
  const grid = document.getElementById('contactosGrid');
  const totalEl = document.getElementById('totalContactos');

  // Mostrar loader
  grid.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border" style="color:var(--accent)" role="status"></div>
      <p class="mt-2 text-muted" style="font-size:0.9rem">Buscando contactos...</p>
    </div>`;

  try {
    const params = new URLSearchParams();
    if (buscar) params.append('buscar', buscar);
    if (tipo && tipo !== 'todos') params.append('tipo', tipo);

    const res  = await fetch(`/api/contactos?${params.toString()}`);
    const data = await res.json();

    if (!data.success) throw new Error('Error en la respuesta');

    totalEl.textContent = `${data.total} contacto${data.total !== 1 ? 's' : ''} encontrado${data.total !== 1 ? 's' : ''}`;

    if (data.contactos.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div style="font-size:3rem;opacity:0.2"><i class="bi bi-people"></i></div>
          <p class="mt-3 text-muted">No se encontraron contactos</p>
          ${buscar ? `<button class="btn btn-sm btn-outline-secondary mt-2" onclick="limpiarBusqueda()">Limpiar búsqueda</button>` : ''}
        </div>`;
      return;
    }

    grid.innerHTML = data.contactos.map(c => renderContacto(c)).join('');

    // Animar entrada
    const cards = grid.querySelectorAll('.col-md-6');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });

    // Asignar eventos de eliminar
    grid.querySelectorAll('.btn-delete-contacto').forEach(btn => {
      btn.addEventListener('click', () => eliminarContacto(parseInt(btn.dataset.id)));
    });

  } catch (err) {
    console.error('Error cargando contactos:', err);
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-danger"><i class="bi bi-exclamation-circle me-2"></i>Error al cargar contactos</p>
        <button class="btn btn-sm btn-primary-custom mt-2" onclick="cargarContactos()">Reintentar</button>
      </div>`;
  }
}

// ─── RENDER CONTACTO HTML ──────────────────────────────────

function renderContacto(c) {
  const tipoColors = {
    'Amiga': '#ffd5dc',
    'Colega': '#c0aede',
    'Cliente': '#d1f7c4',
    'Familiar': '#ffdfbf',
    'Otro': '#e5e7eb'
  };
  const bg = tipoColors[c.tipo] || '#e5e7eb';

  return `
    <div class="col-md-6 col-lg-4">
      <div class="contacto-card">
        <img src="${c.avatar}" alt="${c.nombre}" class="contacto-avatar"
          onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(c.nombre)}'">
        <div class="contacto-info">
          <p class="contacto-nombre">${escapeHtml(c.nombre)}</p>
          <p class="contacto-email" title="${escapeHtml(c.email)}">
            <i class="bi bi-envelope me-1"></i>${escapeHtml(c.email)}
          </p>
          <p class="contacto-tel">
            <i class="bi bi-telephone me-1"></i>${escapeHtml(c.telefono)}
          </p>
          <span class="tipo-badge mt-1" style="background:${bg}20;color:${bg === '#e5e7eb' ? '#374151' : '#374151'};border:1px solid ${bg}">
            ${escapeHtml(c.tipo)}
          </span>
        </div>
        <div class="ms-auto d-flex flex-column gap-2 align-items-end">
          <button class="btn-delete-contacto" data-id="${c.id}" title="Eliminar contacto">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ─── BÚSQUEDA EN TIEMPO REAL ──────────────────────────────

function initBusqueda() {
  const input = document.getElementById('buscarContacto');
  if (!input) return;
  input.addEventListener('input', function () {
    clearTimeout(timerBusqueda);
    timerBusqueda = setTimeout(() => {
      const tipo = document.getElementById('filtroTipo').value;
      cargarContactos(this.value.trim(), tipo);
    }, 350);
  });
}

function initFiltroTipo() {
  const select = document.getElementById('filtroTipo');
  if (!select) return;
  select.addEventListener('change', function () {
    const buscar = document.getElementById('buscarContacto').value.trim();
    cargarContactos(buscar, this.value);
  });
}

function limpiarBusqueda() {
  document.getElementById('buscarContacto').value = '';
  document.getElementById('filtroTipo').value = 'todos';
  cargarContactos();
}

// ─── AGREGAR CONTACTO ──────────────────────────────────────

function initAgregarContacto() {
  const btn = document.getElementById('btnGuardarContacto');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const nombre   = document.getElementById('inputNombre').value.trim();
    const email    = document.getElementById('inputEmail').value.trim();
    const telefono = document.getElementById('inputTelefono').value.trim();
    const tipo     = document.getElementById('inputTipo').value;

    const msgEl = document.getElementById('formMensaje');

    if (!nombre || !email) {
      msgEl.className = 'alert alert-danger';
      msgEl.textContent = '⚠️ El nombre y email son obligatorios';
      msgEl.classList.remove('d-none');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Guardando...';

    try {
      const res  = await fetch('/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, telefono, tipo })
      });
      const data = await res.json();

      if (data.success) {
        // Cerrar modal y recargar
        bootstrap.Modal.getInstance(document.getElementById('modalNuevoContacto')).hide();
        limpiarFormulario();
        await cargarContactos();
        mostrarToast('✅ Contacto agregado exitosamente', 'success');
      } else {
        msgEl.className = 'alert alert-danger';
        msgEl.textContent = data.mensaje || 'Error al guardar';
        msgEl.classList.remove('d-none');
      }

    } catch (err) {
      msgEl.className = 'alert alert-danger';
      msgEl.textContent = 'Error de conexión. Intente nuevamente.';
      msgEl.classList.remove('d-none');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-save me-1"></i>Guardar Contacto';
    }
  });

  // Limpiar form al abrir modal
  document.getElementById('modalNuevoContacto').addEventListener('shown.bs.modal', limpiarFormulario);
}

function limpiarFormulario() {
  ['inputNombre','inputEmail','inputTelefono'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const msg = document.getElementById('formMensaje');
  if (msg) { msg.className = 'alert d-none'; msg.textContent = ''; }
}

// ─── ELIMINAR CONTACTO ─────────────────────────────────────

async function eliminarContacto(id) {
  if (!confirm('¿Estás seguro de eliminar este contacto?')) return;

  try {
    const res  = await fetch(`/api/contactos/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (data.success) {
      await cargarContactos(
        document.getElementById('buscarContacto').value.trim(),
        document.getElementById('filtroTipo').value
      );
      mostrarToast('Contacto eliminado', 'warning');
    }
  } catch (err) {
    mostrarToast('Error al eliminar', 'danger');
  }
}

// ─── UTILIDADES ────────────────────────────────────────────

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function mostrarToast(mensaje, tipo = 'success') {
  const toastEl  = document.getElementById('notifToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toastEl || !toastMsg) return;
  toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
  toastMsg.textContent = mensaje;
  new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}
