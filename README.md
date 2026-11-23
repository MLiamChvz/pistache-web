# PISTACHÉ — Landing page

Página web responsive del proyecto académico **PISTACHÉ**, con los renders originales de Blender del packaging primario, secundario y terciario.

## Verla en tu computadora

Abre `index.html` con Google Chrome, Edge o Firefox. No se necesita instalar nada ni descargar bibliotecas.

## Publicarla gratuitamente en GitHub Pages

1. Entra a https://github.com/new e inicia sesión.
2. Crea un repositorio **Public** llamado, por ejemplo, `pistache-web`.
3. Entra al repositorio y usa **Add file → Upload files**. Sube `index.html`, `styles.css`, `script.js`, `.nojekyll` y la carpeta completa `assets` (sin alterar las rutas). Si tu navegador no admite subir carpetas, arrastra todos los archivos desde la carpeta local; asegúrate de conservar `assets/`.
4. Pulsa **Commit changes**.
5. Abre **Settings → Pages**.
6. En **Build and deployment** elige **Deploy from a branch**, selecciona **main** y **/(root)**, y guarda.
7. La dirección será del tipo `https://TU-USUARIO.github.io/pistache-web/` (sustituye TU-USUARIO por tu usuario de GitHub).
8. Prueba la página desde el celular y comparte ese enlace con la licenciada.

> Si GitHub tarda en habilitar la dirección, revisa **Settings → Pages** y las acciones de publicación en **Actions**. No cambies las rutas `assets/...` por rutas absolutas.

## Estructura

```text
PISTACHE_Landing_GitHub/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
└── assets/
    ├── primario.webp
    ├── secundario.webp
    ├── terciario.webp
    ├── isotipo.webp
    ├── marca-completa.webp
    └── favicon.png
```

## Funciones

- Diseño responsive para escritorio, tablet y móvil.
- Navegación por secciones y menú móvil.
- Galería ampliable de los renders 3D (con flechas de navegación y cierre con Esc).
- Preguntas frecuentes desplegables.
- Desplazamiento suave, indicador de lectura y botón para volver arriba.
- Accesibilidad básica y respeto por la preferencia de movimiento reducido.
- Sin formularios falsos, compra ficticia ni datos sanitarios inventados.

## Datos del proyecto

- Paleta: bosque `#173D2D`, pistacho `#809654`, crema `#F4F0E5` y dorado `#BE965A`.
- Primario: 15 × 15 × 4,5 cm (concepto).
- Secundario: 18 × 18 × 30 cm, seis primarios.
- Terciario: 48 × 33 × 12 cm, doce primarios en dos niveles de seis.
- Esta es una propuesta académica; materiales, capacidad y resistencia necesitan validación antes de comercializarse.

Los archivos de imagen provienen del diseño de marca y de los renders 3D proporcionados en el proyecto.
