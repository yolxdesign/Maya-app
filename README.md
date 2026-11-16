# Maya · Entreno

App para seguir el adiestramiento de Maya: rutina diaria, ejercicios guiados, niveles y progreso.
Se instala en el móvil como app (PWA) y funciona sin conexión.

**Abrir:** https://yolxdesign.github.io/Maya-app/

## Cómo está organizada

```
index.html              Página base de la app instalable
css/styles.css          Estilos (tokens de color, componentes y vistas)
js/data.js              Contenido: ejercicios, niveles, tipos, rutina y vocabulario
js/app.js               Lógica: guardado, niveles, vistas, modo guiado y copias
js/pwa.js               Registro del service worker
sw.js                   Funcionamiento sin conexión
manifest.webmanifest    Nombre, icono y colores de la app instalada
icons/                  Iconos de la app
tools/build-artifact.mjs  Genera la versión de un solo archivo para Claude
tests/e2e.mjs           Pruebas automáticas (móvil, escritorio, sin conexión, accesibilidad)
```

## Editar ejercicios

Todo el contenido está en `js/data.js`. Cada ejercicio tiene:

- `type`: tipo (vinculo, comun, llamada, auto, pos, paseo, trucos, manejo).
- `program`: `true` si forma parte del programa de la educadora y cuenta para subir de nivel.
- `levels`: 3 niveles con su objetivo. Si el objetivo es de tiempo, `time` indica los segundos y si hay que aguantar (`hold`, mínimo) o conseguirlo en menos de ese tiempo (`under`, máximo). Solo los niveles con `time` muestran el cronómetro.
- `pyramid` (opcional): desglose fácil–difícil–fácil.
- `missingInfo` (opcional): dato pendiente de confirmar con la educadora.

## Reglas de niveles

- Un nivel se supera con **2 sesiones** que cumplan su objetivo.
- El objetivo se marca solo con **4 de 5 aciertos (80 %)** o al alcanzar el **tiempo** del nivel. También se puede marcar o desmarcar a mano.
- El **nivel global** no sube hasta que todos los ejercicios del programa superan el actual. Los extra no bloquean.

## Datos

En la app instalada los datos se guardan solo en ese dispositivo. Haz una copia desde
**Progreso → Descargar copia** y recupérala con **Restaurar copia**.

## Comandos

```bash
npm install            # herramientas de desarrollo (no hacen falta para usar la app)
npm run lint           # revisión del código
npm run build:artifact # genera dist/maya-artifact.html
npm test               # pruebas automáticas (requiere el build anterior)
```

Al cambiar archivos de la app, sube `VERSION` en `sw.js` para que los móviles descarguen la versión nueva.
