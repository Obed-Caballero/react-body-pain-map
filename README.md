# React Body Pain Map (Mapa Anatómico de Dolor)

Componente interactivo y ligero para React de localización anatómica del dolor, diseñado para sistemas de urgencias, hojas de triage (formato OH-URG-F-02) y expedientes clínicos electrónicos.

Permite a los profesionales de la salud o pacientes seleccionar zonas corporales afectadas (frente, espalda y perfil) mediante un marcado visual que respeta los contornos anatómicos del cuerpo.

---

## 🚀 Características

- ⚡ **Sin dependencias pesadas:** Cero dependencias de UI (funciona nativamente con Tailwind, Material-UI, Bootstrap o CSS puro).
- 🖼️ **Auto-contenido:** Imagen base de alta resolución (1774 x 887 px) integrada en Base64, lista para usar sin configurar carpetas de assets.
- 🎨 **Trazado fiel:** Relleno de color con modo `mix-blend-mode: multiply` que conserva nítidos los detalles y contornos anatómicos originales.
- 📋 **Diseño clínico oficial:** Encabezado `Eva | Localización` y leyenda vertical `(Marca el área afectada)`.
- 🔒 **Modo solo lectura:** Ideal para consultar historiales clínicos o imprimir hojas de resumen.
- 📦 **TypeScript nativo:** Tipado completo y autocompletado en tu editor.

---

## 📦 Instalación

### Desde GitHub (Directo a tu proyecto):
```bash
npm install github:tu-usuario/react-body-pain-map
```
*(O agrega `"react-body-pain-map": "github:tu-usuario/react-body-pain-map"` en las dependencias de tu `package.json`)*.

---

## 💡 Uso Rápido

```tsx
import * as React from 'react';
import { MapaDolor } from 'react-body-pain-map';

export function MiFormularioTriage() {
  const [zonasDolor, setZonasDolor] = React.useState<string[]>(['torso', 'brazo-derecho']);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Evaluación de Urgencias</h2>
      
      <MapaDolor
        valor={zonasDolor}
        onChange={(nuevasZonas) => setZonasDolor(nuevasZonas)}
        colorMarcado="#FF0000"
      />

      <p>Zonas seleccionadas: {zonasDolor.join(', ') || 'Ninguna'}</p>
    </div>
  );
}
```

---

## ⚙️ Props (API)

| Prop | Tipo | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `valor` | `string[]` | `[]` | Arreglo de IDs de las zonas marcadas (ej. `['cabeza', 'torso']`). |
| `onChange` | `(zonas: string[]) => void` | `undefined` | Callback disparado al hacer clic en cualquier zona. |
| `soloLectura` | `boolean` | `false` | Desactiva los clics para modo visualización en consulta/PDF. |
| `colorMarcado` | `string` | `"#FF0000"` | Color de relleno al marcar una zona. |
| `colorBordeMarcado` | `string` | `"#D32F2F"` | Color del borde de la zona seleccionada. |
| `colorHover` | `string` | `"rgba(255, 0, 0, 0.32)"` | Color traslúcido al pasar el cursor sobre una zona. |
| `mostrarEncabezado` | `boolean` | `true` | Muestra u oculta la barra superior `Eva \| Localización`. |
| `textoEva` | `string` | `"Eva"` | Texto del recuadro izquierdo en el encabezado. |
| `textoTitulo` | `string` | `"Localización"` | Título en el encabezado. |
| `textoVertical` | `string` | `"(Marca el área afectada)"` | Leyenda vertical lateral izquierda. Cadena vacía para ocultar. |
| `anchoMaximo` | `number \| string` | `860` | Ancho máximo del contenedor en píxeles. |
| `imagenSrc` | `string` | *(Base64 integrado)* | Permite sustituir la imagen base por otra silueta personalizada. |
| `className` | `string` | `undefined` | Clase CSS opcional para el contenedor. |
| `style` | `React.CSSProperties` | `undefined` | Estilos en línea adicionales. |

---

## 🏷️ IDs de Zonas Disponibles

- `cabeza`
- `cuello`
- `torso`
- `pelvis`
- `brazo-derecho`
- `brazo-izquierdo`
- `mano-derecha`
- `mano-izquierda`
- `pierna-derecha`
- `pierna-izquierda`
- `espalda`
- `gluteos`

---

## 🛠️ Publicar en GitHub

1. Inicializa el repositorio Git dentro de la carpeta:
   ```bash
   git init
   git add .
   git commit -m "feat: release initial version of react-body-pain-map"
   ```
2. Crea el repositorio en tu cuenta de GitHub (ej. `react-body-pain-map`).
3. Sube el código:
   ```bash
   git remote add origin https://github.com/tu-usuario/react-body-pain-map.git
   git branch -M main
   git push -u origin main
   ```
4. ¡Listo! Ya podrás instalarla en cualquier proyecto con:
   ```bash
   npm install github:tu-usuario/react-body-pain-map
   ```

---

## 📄 Licencia

MIT © Obed Villegas
