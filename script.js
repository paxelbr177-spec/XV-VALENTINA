// ========================================================
// VALENTINA XV - JAVASCRIPT PRINCIPAL & EFECTOS MÁGICOS
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initStardustCanvas();
  initTimelineSwiper();
  initGiftSection();
  initRsvpSection();
  initGuestbook();
  initPhotoMemories();
  initMagicAudio();
  initCountdown();
  initPhotoLightbox();
  initSupabaseSettingsModal();
});

// ==========================================
// 1. CANVAS DE POLVO DE HADAS (STARDUST PARTICLES)
// ==========================================
function initStardustCanvas() {
  const canvas = document.getElementById('stardust-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 65 : 35, 80);
  const colors = [
    'rgba(245, 192, 66, ',    // Disney gold
    'rgba(255, 235, 153, ',   // Light gold
    'rgba(192, 132, 252, ',   // Lavender
    'rgba(255, 255, 255, '    // Star white
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 0.8;
      this.baseAlpha = Math.random() * 0.7 + 0.3;
      this.alpha = this.baseAlpha;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.3;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.max(0.1, Math.min(1, this.alpha)) + ')';
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = '#f5c042';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Interactive mouse sparkles
  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) return;
    const p = new Particle();
    p.x = e.clientX + (Math.random() - 0.5) * 15;
    p.y = e.clientY + (Math.random() - 0.5) * 15;
    p.speedY = Math.random() * 1.5 + 0.5;
    p.size = Math.random() * 3 + 1;
    particles.push(p);
    if (particles.length > particleCount + 25) particles.splice(particleCount, 1);
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 2. CARRUSEL LÍNEA DEL TIEMPO 3D (SWIPER)
// ==========================================
let timelineSwiperInstance = null;

function initTimelineSwiper() {
  const swiperEl = document.querySelector('.timeline-swiper');
  if (!swiperEl) return;

  timelineSwiperInstance = new Swiper('.timeline-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 0,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 160,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
  });
}

// ==========================================
// 3. ESPACIO DE REGALOS & ALIAS
// ==========================================
function initGiftSection() {
  const alias = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.aliasRegalo) || "stefania.ortega061";
  const copyBtn = document.getElementById('btn-copy-alias');
  const aliasText = document.getElementById('alias-text');
  if (aliasText) aliasText.textContent = alias;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(alias).then(() => {
        showMagicToast('¡Alias copiado al portapapeles! 👑✨');
        triggerConfetti(copyBtn);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('input');
        temp.value = alias;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showMagicToast('¡Alias copiado al portapapeles! 👑✨');
      });
    });
  }

  // Botón "Ya Mandé Mi Regalo"
  const btnAlreadySent = document.getElementById('btn-already-sent-gift');
  const modalGift = document.getElementById('modal-gift-thanks');
  const closeModalGift = document.getElementById('close-modal-gift');
  const btnWhatsappGift = document.getElementById('btn-whatsapp-gift');

  if (btnAlreadySent && modalGift) {
    btnAlreadySent.addEventListener('click', () => {
      modalGift.classList.add('open');
      triggerConfetti();
    });
  }

  if (closeModalGift && modalGift) {
    closeModalGift.addEventListener('click', () => {
      modalGift.classList.remove('open');
    });
    modalGift.addEventListener('click', (e) => {
      if (e.target === modalGift) modalGift.classList.remove('open');
    });
  }

  if (btnWhatsappGift) {
    btnWhatsappGift.addEventListener('click', () => {
      const phone = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.telefonoRSVPClean) || "5493537303209";
      const msg = encodeURIComponent("¡Hola Stefania y Valen! 💖 Les aviso que ya mandé mi regalito para el cumple de 15 de Valentina. ¡Nos vemos en la fiesta! ✨👑");
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
      if (modalGift) modalGift.classList.remove('open');
    });
  }
}

// ==========================================
// 4. CONFIRMACIÓN DE ASISTENCIA (RSVP) & FOTOS
// ==========================================
function initRsvpSection() {
  const btnRsvp = document.getElementById('btn-rsvp-whatsapp');
  const inputRsvpName = document.getElementById('rsvp-guest-name');
  const phone = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.telefonoRSVPClean) || "5493537303209";

  if (btnRsvp) {
    btnRsvp.addEventListener('click', () => {
      const name = inputRsvpName && inputRsvpName.value.trim() ? inputRsvpName.value.trim() : "";
      let text = "¡Hola Valentina! 👑 Confirmo mi presencia con alegría para tus 15 años.";
      if (name) {
        text = `¡Hola Valentina! 👑 Soy ${name}. Confirmo mi asistencia a tu fiesta de 15 años. ¡Muchas felicidades! ✨`;
      }
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
      triggerConfetti(btnRsvp);
    });
  }

  // Compartir fotos de la fiesta
  const btnSharePhotos = document.getElementById('btn-share-photos');
  if (btnSharePhotos) {
    btnSharePhotos.addEventListener('click', () => {
      const msg = encodeURIComponent("¡Hola Valen! 📸✨ Te comparto estas fotos hermosas que sacamos en tu fiesta de 15:");
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
  }
}

// ==========================================
// 5. RINCÓN DE LOS BUENOS DESEOS (SUPABASE & LOCAL)
// ==========================================
let supabaseClient = null;

function initGuestbook() {
  setupSupabaseClient();
  loadWishes();

  const form = document.getElementById('form-wishes');
  if (!form) return;

  // Selección de emoji/icono
  let selectedIcon = '👑';
  const iconBtns = document.querySelectorAll('.wish-icon-btn');
  iconBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      iconBtns.forEach(b => b.classList.remove('border-gold-glow-strong', 'scale-110'));
      btn.classList.add('border-gold-glow-strong', 'scale-110');
      selectedIcon = btn.dataset.icon || '👑';
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('wish-name');
    const msgInput = document.getElementById('wish-message');
    const submitBtn = document.getElementById('wish-submit-btn');

    const nombre = nameInput.value.trim();
    const mensaje = msgInput.value.trim();

    if (!nombre || !mensaje) {
      showMagicToast('Por favor completa tu nombre y mensaje ✨');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando deseo mágico... ✨</span>';
    }

    const newWish = {
      nombre,
      mensaje,
      icono: selectedIcon,
      fecha: new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
    };

    // 1. Guardar en Supabase si está disponible
    if (supabaseClient) {
      try {
        const table = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseTable) || 'buenos_deseos';
        const { error } = await supabaseClient
          .from(table)
          .insert([{ nombre, mensaje, icono: selectedIcon }]);
        
        if (error) {
          console.warn('Supabase insert error, saving locally:', error);
          saveWishLocally(newWish);
        } else {
          showMagicToast('¡Tu deseo ha sido guardado con éxito! 💖👑');
        }
      } catch (err) {
        console.warn('Supabase error:', err);
        saveWishLocally(newWish);
      }
    } else {
      // Guardar localmente
      saveWishLocally(newWish);
      showMagicToast('¡Tu deseo ha sido publicado! 💖👑');
    }

    // Renderizar de inmediato
    renderWishCard(newWish, true);

    // Limpiar formulario
    nameInput.value = '';
    msgInput.value = '';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Dejar mi deseo mágico ✨</span>';
    }

    triggerConfetti(submitBtn);
  });
}

function setupSupabaseClient() {
  const savedUrl = localStorage.getItem('valentina_sb_url') || (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseUrl);
  const savedKey = localStorage.getItem('valentina_sb_key') || (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseAnonKey);

  if (savedUrl && savedKey && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(savedUrl, savedKey);
      const indicator = document.getElementById('supabase-status-badge');
      if (indicator) {
        indicator.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Sincronizado con Supabase';
        indicator.classList.remove('hidden');
      }
    } catch (e) {
      console.error('Error al inicializar Supabase:', e);
    }
  }
}

async function loadWishes() {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  if (supabaseClient) {
    try {
      const table = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseTable) || 'buenos_deseos';
      const { data, error } = await supabaseClient
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        container.innerHTML = '';
        data.forEach(item => {
          renderWishCard({
            nombre: item.nombre,
            mensaje: item.mensaje,
            icono: item.icono || '👑',
            fecha: new Date(item.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
          });
        });
        return;
      }
    } catch (err) {
      console.warn('Error cargando deseos de Supabase:', err);
    }
  }

  // Cargar de LocalStorage
  const localData = JSON.parse(localStorage.getItem('valentina_wishes') || '[]');
  container.innerHTML = '';
  if (localData.length > 0) {
    localData.forEach(item => renderWishCard(item));
  } else {
    container.innerHTML = `
      <div id="wishes-empty-msg" class="col-span-full royal-card p-8 text-center border-gold-glow">
        <span class="text-3xl block mb-2">💌✨</span>
        <p class="font-script text-2xl sm:text-3xl text-amber-200">
          Aún no hay mensajes... ¡Sé el primero en dejar un deseo mágico para Valentina! 👑
        </p>
      </div>
    `;
  }
}

function saveWishLocally(wish) {
  const localData = JSON.parse(localStorage.getItem('valentina_wishes') || '[]');
  localData.unshift(wish);
  localStorage.setItem('valentina_wishes', JSON.stringify(localData));
}

function renderWishCard(wish, prepend = false) {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  const emptyMsg = document.getElementById('wishes-empty-msg');
  if (emptyMsg) emptyMsg.remove();

  const card = document.createElement('div');
  card.className = 'royal-card p-6 relative flex flex-col justify-between border-gold-glow animate-fade-in transition-all duration-300';
  card.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <span class="text-2xl p-2 rounded-xl bg-purple-900/60 border border-amber-400/30">${escapeHtml(wish.icono || '👑')}</span>
          <h4 class="font-serif font-bold text-amber-200 text-lg">${escapeHtml(wish.nombre)}</h4>
        </div>
        <span class="text-xs text-purple-300/70 font-mono">${escapeHtml(wish.fecha || 'Reciente')}</span>
      </div>
      <p class="text-purple-100/90 leading-relaxed font-normal text-sm md:text-base italic">"${escapeHtml(wish.mensaje)}"</p>
    </div>
    <div class="mt-4 pt-3 border-t border-amber-400/15 flex justify-end">
      <span class="text-amber-400/60 text-xs">✨ Deseo para Valentina</span>
    </div>
  `;

  if (prepend && container.firstChild) {
    container.insertBefore(card, container.firstChild);
  } else {
    container.appendChild(card);
  }
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

// ==========================================
// 6. MURO DE RECUERDOS Y FOTOS DE LA FIESTA
// ==========================================
let selectedPhotoBase64 = null;

function initPhotoMemories() {
  const form = document.getElementById('form-upload-memory');
  const fileInput = document.getElementById('photo-file-input');
  const dropzone = document.getElementById('photo-upload-dropzone');
  const emptyState = document.getElementById('dropzone-empty-state');
  const previewState = document.getElementById('dropzone-preview-state');
  const previewImg = document.getElementById('photo-preview-img');
  const removeBtn = document.getElementById('btn-remove-photo-preview');
  const submitBtn = document.getElementById('btn-submit-photo-memory');
  const btnShareWA = document.getElementById('btn-share-photos-wa');

  if (!form || !fileInput) return;

  // Cargar fotos existentes
  loadPhotoMemories();

  // Click en dropzone abre el selector de fotos o cámara
  dropzone.addEventListener('click', (e) => {
    if (e.target === removeBtn || e.target.closest('#btn-remove-photo-preview')) return;
    fileInput.click();
  });

  // Eventos Drag & Drop
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      handleSelectedPhoto(files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      handleSelectedPhoto(fileInput.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearPhotoPreview();
    });
  }

  function handleSelectedPhoto(file) {
    if (!file.type.startsWith('image/')) {
      showMagicToast('Por favor selecciona un archivo de imagen válido 📷');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Redimensionar inteligentemente para que sea liviano y de máxima calidad
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;

        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        selectedPhotoBase64 = canvas.toDataURL('image/jpeg', 0.82);

        if (previewImg && emptyState && previewState) {
          previewImg.src = selectedPhotoBase64;
          emptyState.classList.add('hidden');
          previewState.classList.remove('hidden');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function clearPhotoPreview() {
    selectedPhotoBase64 = null;
    if (fileInput) fileInput.value = '';
    if (emptyState && previewState) {
      emptyState.classList.remove('hidden');
      previewState.classList.add('hidden');
      if (previewImg) previewImg.src = '';
    }
  }

  // Envío del recuerdo fotográfico
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('photo-uploader-name');
    const captionInput = document.getElementById('photo-uploader-caption');

    const nombre = nameInput.value.trim();
    const mensaje = captionInput.value.trim();

    if (!nombre) {
      showMagicToast('Por favor ingresa tu nombre ✨');
      return;
    }

    if (!selectedPhotoBase64) {
      showMagicToast('¡Selecciona una foto para subir al muro! 📷✨');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Guardando recuerdo mágico... ✨</span>';
    }

    const newPhotoItem = {
      nombre,
      mensaje: mensaje || '¡Un recuerdo inolvidable en los 15 de Valentina! 👑',
      fotoUrl: selectedPhotoBase64,
      fecha: new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
    };

    // 1. Guardar en Supabase si está disponible
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('fotos_recuerdos')
          .insert([{ nombre, mensaje: newPhotoItem.mensaje, foto_url: selectedPhotoBase64 }]);

        if (error) {
          console.warn('Supabase photo insert error, saving locally:', error);
          savePhotoLocally(newPhotoItem);
        } else {
          showMagicToast('¡Foto subida con éxito a Supabase! 💖📸');
        }
      } catch (err) {
        console.warn('Supabase error:', err);
        savePhotoLocally(newPhotoItem);
      }
    } else {
      savePhotoLocally(newPhotoItem);
      showMagicToast('¡Tu foto ha sido publicada en el muro! 💖📸');
    }

    // Renderizar al inicio de la galería
    renderPhotoCard(newPhotoItem, true);

    // Limpiar formulario
    nameInput.value = '';
    captionInput.value = '';
    clearPhotoPreview();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>✨ Publicar Recuerdo en el Muro ✨</span>';
    }

    triggerConfetti(submitBtn);
  });

  // Botón secundario para enviar por WhatsApp
  if (btnShareWA) {
    btnShareWA.addEventListener('click', () => {
      const phone = (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.telefonoRSVPClean) || "5493537303209";
      const msg = encodeURIComponent("¡Hola Valen! 📸✨ Te comparto esta foto de tu fiesta de 15:");
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
  }
}

async function loadPhotoMemories() {
  const container = document.getElementById('photos-gallery-container');
  if (!container) return;

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('fotos_recuerdos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        container.innerHTML = '';
        data.forEach(item => {
          renderPhotoCard({
            nombre: item.nombre,
            mensaje: item.mensaje,
            fotoUrl: item.foto_url,
            fecha: new Date(item.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
          });
        });
        return;
      }
    } catch (err) {
      console.warn('Error cargando fotos de Supabase:', err);
    }
  }

  // Cargar de LocalStorage
  const localPhotos = JSON.parse(localStorage.getItem('valentina_photos') || '[]');
  container.innerHTML = '';
  if (localPhotos.length > 0) {
    localPhotos.forEach(p => renderPhotoCard(p));
  } else {
    container.innerHTML = `
      <div id="photos-empty-msg" class="col-span-full royal-card p-8 text-center border-gold-glow">
        <span class="text-3xl block mb-2">📸✨</span>
        <p class="font-script text-2xl sm:text-3xl text-amber-200">
          Aún no hay fotos compartidas... ¡Sé el primero en subir un recuerdo de la fiesta! 👑
        </p>
      </div>
    `;
  }
}

function savePhotoLocally(photo) {
  try {
    const localPhotos = JSON.parse(localStorage.getItem('valentina_photos') || '[]');
    localPhotos.unshift(photo);
    if (localPhotos.length > 20) localPhotos.pop();
    localStorage.setItem('valentina_photos', JSON.stringify(localPhotos));
  } catch (e) {
    console.warn('Storage limit reached, keeping newest:', e);
  }
}

function renderPhotoCard(item, prepend = false) {
  const container = document.getElementById('photos-gallery-container');
  if (!container) return;

  const emptyMsg = document.getElementById('photos-empty-msg');
  if (emptyMsg) emptyMsg.remove();

  const card = document.createElement('div');
  card.className = 'photo-memory-card group photo-card-trigger cursor-pointer relative';
  card.dataset.src = item.fotoUrl;
  card.dataset.title = `${escapeHtml(item.nombre)}: "${escapeHtml(item.mensaje || '')}"`;

  card.innerHTML = `
    <div class="relative w-full aspect-[4/3] bg-purple-950/70 overflow-hidden">
      <img src="${item.fotoUrl}" alt="Recuerdo de ${escapeHtml(item.nombre)}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
      <div class="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
        <span class="btn-gold text-[10px] py-1.5 px-3">🔍 Ver en grande</span>
      </div>
      <span class="absolute top-2 right-2 bg-purple-950/80 backdrop-blur-md border border-amber-400/40 rounded-full px-2 py-0.5 text-[10px] font-mono text-purple-200">
        ${escapeHtml(item.fecha || 'Reciente')}
      </span>
    </div>
    <div class="p-4 flex flex-col justify-between flex-grow">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-amber-400 text-sm">👑</span>
          <h4 class="font-serif font-bold text-amber-200 text-sm truncate">${escapeHtml(item.nombre)}</h4>
        </div>
        <p class="text-xs text-purple-100/90 italic font-serif leading-relaxed line-clamp-2">
          "${escapeHtml(item.mensaje || '¡Hermosa noche mágica!')}"
        </p>
      </div>
      <div class="mt-3 pt-2 border-t border-amber-400/15 flex justify-end">
        <span class="text-[10px] text-amber-300/70 font-serif">✨ Recuerdo para Valentina</span>
      </div>
    </div>
  `;

  if (prepend && container.firstChild) {
    container.insertBefore(card, container.firstChild);
  } else {
    container.appendChild(card);
  }
}

// ==========================================
// 7. MODAL LIGHTBOX PARA LAS FOTOS
// ==========================================
function initPhotoLightbox() {
  const modal = document.getElementById('modal-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('close-lightbox');

  // Event delegation en document para fotos actuales y agregadas dinámicamente
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.photo-card-trigger');
    if (card) {
      const src = card.dataset.src;
      const title = card.dataset.title || '';
      if (imgEl && modal) {
        imgEl.src = src;
        if (titleEl) {
          titleEl.textContent = title;
          if (title) titleEl.classList.remove('hidden');
          else titleEl.classList.add('hidden');
        }
        modal.classList.add('open');
      }
    }
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

// ==========================================
// 7. CUENTA REGRESIVA MAGICA (COUNTDOWN AL 3 DE NOVIEMBRE)
// ==========================================
function initCountdown() {
  // Fecha oficial de la fiesta: 3 de Noviembre a las 21:00 hs
  const now = new Date();
  let partyYear = now.getFullYear();
  // Noviembre es el mes 10 (0-indexed: Enero=0, Noviembre=10)
  let targetDate = new Date(partyYear, 10, 3, 21, 0, 0);

  // Si la fecha configurada en config.js existe, usarla
  if (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.fechaFiesta) {
    const parsed = new Date(window.VALENTINA_CONFIG.fechaFiesta);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  }

  // Si ya pasó en este año, proyectar al próximo año
  if (now.getTime() > targetDate.getTime()) {
    targetDate.setFullYear(partyYear + 1);
  }

  function update() {
    const currentTime = new Date().getTime();
    const diff = targetDate.getTime() - currentTime;

    const elDays = document.getElementById('timer-days');
    const elHours = document.getElementById('timer-hours');
    const elMinutes = document.getElementById('timer-minutes');
    const elSeconds = document.getElementById('timer-seconds');

    if (diff <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      const label = document.getElementById('countdown-label');
      if (label) label.textContent = '👑 ¡HOY ES EL GRAN DÍA! ¡A BRILLAR! ✨';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(update, 1000);
  update();
}

// ==========================================
// 8. AMBIENTE MUSICAL DISNEY & EFECTOS DE SONIDO
// ==========================================
let audioContext = null;
let isAudioPlaying = false;
let melodyInterval = null;

function initMagicAudio() {
  const toggleBtn = document.getElementById('btn-audio-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (!isAudioPlaying) {
      startFairytaleMelody();
      isAudioPlaying = true;
      toggleBtn.classList.add('border-gold-glow-strong');
      toggleBtn.innerHTML = `
        <span class="animate-spin text-amber-400">✨</span>
        <span class="text-xs uppercase tracking-widest text-amber-300 font-serif">Música Encantada: ON</span>
      `;
      showMagicToast('Música mágica de ensueño activada 🎶✨');
    } else {
      stopFairytaleMelody();
      isAudioPlaying = false;
      toggleBtn.classList.remove('border-gold-glow-strong');
      toggleBtn.innerHTML = `
        <span class="text-amber-400/70">🎵</span>
        <span class="text-xs uppercase tracking-widest text-purple-200/80 font-serif">Música de Ensueño</span>
      `;
    }
  });
}

function playHarpNote(freq, time, duration = 1.2) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(0.08, time + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(time);
  osc.stop(time + duration);
}

function startFairytaleMelody() {
  if (!audioContext) return;
  // Disney castle dream arpeggio notes (F# minor / A major pentatonic fairytale chime)
  const notes = [
    554.37, 659.25, 830.61, 880.00, 1108.73, 1318.51, 880.00, 659.25,
    587.33, 739.99, 880.00, 1174.66, 1479.98, 1174.66, 880.00, 739.99
  ];
  let noteIndex = 0;

  function tick() {
    if (!isAudioPlaying || !audioContext) return;
    const now = audioContext.currentTime;
    playHarpNote(notes[noteIndex % notes.length], now, 1.4);
    noteIndex++;
  }

  tick();
  melodyInterval = setInterval(tick, 550);
}

function stopFairytaleMelody() {
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
}

// ==========================================
// 9. CONFIGURACIÓN MODAL DE SUPABASE
// ==========================================
function initSupabaseSettingsModal() {
  const triggerBtn = document.getElementById('btn-open-supabase-modal');
  const modal = document.getElementById('modal-supabase-config');
  const closeBtn = document.getElementById('close-supabase-modal');
  const saveBtn = document.getElementById('btn-save-supabase-config');
  const urlInput = document.getElementById('input-sb-url');
  const keyInput = document.getElementById('input-sb-key');

  if (!modal) return;

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      if (urlInput) urlInput.value = localStorage.getItem('valentina_sb_url') || (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseUrl) || '';
      if (keyInput) keyInput.value = localStorage.getItem('valentina_sb_key') || (window.VALENTINA_CONFIG && window.VALENTINA_CONFIG.supabaseAnonKey) || '';
      modal.classList.add('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      const key = keyInput.value.trim();

      if (url) localStorage.setItem('valentina_sb_url', url);
      else localStorage.removeItem('valentina_sb_url');

      if (key) localStorage.setItem('valentina_sb_key', key);
      else localStorage.removeItem('valentina_sb_key');

      modal.classList.remove('open');
      showMagicToast('Configuración guardada. Recargando conexión... 🏰✨');
      setTimeout(() => {
        setupSupabaseClient();
        loadWishes();
        loadPhotoMemories();
      }, 500);
    });
  }
}

// ==========================================
// 10. UTILIDADES: TOAST Y CONFETTI
// ==========================================
function showMagicToast(msg) {
  let toast = document.getElementById('magic-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'magic-toast';
    document.body.appendChild(toast);
  }

  toast.className = 'royal-card px-6 py-4 flex items-center gap-3 border-gold-glow-strong text-amber-200 font-medium shadow-2xl show';
  toast.innerHTML = `
    <span class="text-xl">✨</span>
    <span>${escapeHtml(msg)}</span>
  `;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function triggerConfetti(elem = null) {
  if (window.confetti) {
    window.confetti({
      particleCount: 70,
      spread: 70,
      origin: elem ? {
        x: elem.getBoundingClientRect().left / window.innerWidth,
        y: elem.getBoundingClientRect().top / window.innerHeight
      } : { y: 0.6 },
      colors: ['#f5c042', '#ffd768', '#c084fc', '#ffffff', '#e879f9']
    });
  }
}
