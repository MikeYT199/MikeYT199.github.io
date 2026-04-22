// ============================================================
// MAIN.JS — Likes, Favoritos y utilidades globales
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initLikes();
  initFavoritos();
  initNavbarScroll();
  initFadeIn();
});

// ─── NAVBAR SCROLL ─────────────────────────────────────────

function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(26,26,46,0.12)'
      : 'none';
  });
}

// ─── FADE IN ON SCROLL ─────────────────────────────────────

function initFadeIn() {
  const items = document.querySelectorAll('.album-card, .foto-item, .favorito-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

// ─── LIKES (AJAX) ──────────────────────────────────────────

function initLikes() {
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.stopPropagation();
      const tipo = this.dataset.tipo;       // 'album' o 'foto'
      const id   = this.dataset.id;
      const liked = this.dataset.liked === 'true';
      const accion = liked ? 'unlike' : 'like';

      try {
        const res = await fetch(`/api/like/${tipo}/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accion })
        });
        const data = await res.json();

        if (data.success) {
          this.dataset.liked = String(!liked);
          this.querySelector('.like-count').textContent = data.likes;
          this.classList.toggle('liked', !liked);

          if (!liked) {
            this.querySelector('.like-icon').style.color = '#e94560';
            mostrarToast('¡Me gusta! ❤️', 'danger');
          } else {
            this.querySelector('.like-icon').style.color = '';
            mostrarToast('Me gusta retirado', 'secondary');
          }
        }
      } catch (err) {
        console.error('Error al dar like:', err);
        mostrarToast('Error de conexión', 'danger');
      }
    });
  });
}

// ─── FAVORITOS (AJAX) ──────────────────────────────────────

function initFavoritos() {
  // Verificar estado inicial de favoritos en la página
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id   = parseInt(btn.dataset.id);
    const tipo = btn.dataset.tipo;

    fetch(`/api/favoritos/check/${id}/${tipo}`)
      .then(r => r.json())
      .then(data => {
        if (data.enFavoritos) {
          btn.classList.add('saved');
          const icon = btn.querySelector('.fav-icon');
          if (icon) icon.className = 'bi bi-bookmark-fill fav-icon';
        }
      })
      .catch(() => {});

    btn.addEventListener('click', async function (e) {
      e.stopPropagation();
      const saved = this.classList.contains('saved');

      try {
        let res, data;

        if (saved) {
          // Quitar de favoritos
          res = await fetch(`/api/favoritos/${this.dataset.id}/${this.dataset.tipo}`, {
            method: 'DELETE'
          });
        } else {
          // Agregar a favoritos
          res = await fetch('/api/favoritos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              itemId: parseInt(this.dataset.id),
              tipo:   this.dataset.tipo,
              titulo: this.dataset.titulo,
              url:    this.dataset.url,
              album:  this.dataset.album
            })
          });
        }

        data = await res.json();
        const icon = this.querySelector('.fav-icon');

        if (!saved && data.success) {
          this.classList.add('saved');
          if (icon) icon.className = 'bi bi-bookmark-fill fav-icon';
          mostrarToast('⭐ Guardado en favoritos', 'warning');
        } else if (saved && data.success) {
          this.classList.remove('saved');
          if (icon) icon.className = 'bi bi-bookmark fav-icon';
          mostrarToast('Eliminado de favoritos', 'secondary');
        } else if (!data.success && data.enFavoritos) {
          mostrarToast('Ya está en favoritos', 'info');
        }

      } catch (err) {
        console.error('Error favorito:', err);
        mostrarToast('Error de conexión', 'danger');
      }
    });
  });
}

// ─── TOAST ─────────────────────────────────────────────────

function mostrarToast(mensaje, tipo = 'success') {
  const toastEl  = document.getElementById('notifToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toastEl || !toastMsg) return;

  toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
  toastMsg.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl, { delay: 2800 });
  toast.show();
}

// Exportar para uso en otras páginas
window.mostrarToast = mostrarToast;
