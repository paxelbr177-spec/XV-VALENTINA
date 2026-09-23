# 🏰 Valentina Aylin Pereyra - Mis 15 Años ✨

Web interactiva de 15 años inspirada en la magia de Disney para **Valentina Aylin Pereyra**.

## 🌟 Características
- **Portada de Ensueño**: Foto de portada de Valentina como princesa Disney frente al castillo con resplandor dorado y partículas de polvo de hadas (pixie dust).
- **Cuenta Regresiva Oficial**: Reloj en vivo hacia el **3 de Noviembre a las 21:00 hs** (día de la fiesta).
- **Música de Ensueño**: Melodía ambiental de cuento de hadas con control de activación/pausa.
- **Video de la Quinceañera**: Reproductor de video integrado con marco dorado de castillo real.
- **Línea del Tiempo ("Era una vez...")**: Carrusel 3D Coverflow interactivo con las 14 fotos de su crecimiento y visor en alta definición.
- **Rincón de los Buenos Deseos**: Libro de firmas en tiempo real conectado a **Supabase** y almacenamiento local.
- **Espacio de Regalos**: Alias `stefania.ortega061` con botón de un toque para copiar y botón interactivo *"Ya Mandé Mi Regalo"* vinculado a WhatsApp.
- **Muro de Fotos Compartidas**: Los invitados pueden subir sus fotos tomadas durante la fiesta (o tomarlas directamente con la cámara del celular) para formar parte de la galería comunitaria.
- **Confirmación de Asistencia (RSVP)**: Botón directo a WhatsApp para confirmar presencia al número **3537303209**.

## 🛠️ Tecnologías
- HTML5, CSS3, Tailwind CSS
- Swiper.js (Carrusel 3D)
- Canvas Pixie Dust & Confetti
- Supabase JS Client v2 (Base de datos en tiempo real)
- Web Audio API (Melodía de arpa de cuento de hadas)

## 🗄️ Base de Datos (Supabase)
El archivo `supabase_setup.sql` contiene las instrucciones y tablas necesarias (`buenos_deseos` y `fotos_recuerdos`) con políticas públicas de lectura e inserción (RLS).
