# React Body Pain Map (Mapa Anatómico de Dolor)

Componente **headless y sin estilos forzados (unstyled)** para React de localización anatómica del dolor.

Renderiza exclusivamente las siluetas del cuerpo humano (frente, espalda y perfil) junto con su capa vectorial interactiva y la lógica de selección, permitiendo que **cada desarrollador le aplique su propio diseño, CSS, clases o contenedores**.

---

## 🚀 Características

- 🎨 **100% Sin estilos impuestos (Unstyled / Headless):** No te obliga a usar bordes, tarjetas ni encabezados predeterminados. Solo la imagen y la interacción de marcado.
- ⚡ **Sin dependencias de UI:** Compatible con Tailwind CSS, Material UI, Bootstrap, CSS Modules o estilos en línea.
- 🖼️ **Auto-contenido:** Imagen base de alta resolución (1774 x 887 px) integrada en Base64; no requiere configurar carpetas de assets ni loaders de imágenes.
- 🩸 **Trazado anatómico nítido:** Utiliza `mix-blend-mode: multiply` para que el color de marcado (`#FF0000` o tu color elegido) preserve las líneas negras del dibujo anatómico original debajo.
- 🔒 **Modo solo lectura:** Prop `soloLectura` para visualización estática en consultas médicas o previsualizaciones.
- 📦 **TypeScript nativo:** Tipado completo y autocompletado en tu editor.

---

## 📦 Instalación

### Desde GitHub (Directo a tu proyecto):
```bash
npm install github:TU_USUARIO/react-body-pain-map
```
*(O agrega `"react-body-pain-map": "github:TU_USUARIO/react-body-pain-map"` en las dependencias de tu `package.json`)*.

---

## 💡 Uso Básico (Dale tu propio estilo)

```tsx
import * as React from 'react';
import { MapaDolor } from 'react-body-pain-map';

export function FormularioTriage() {
  const [zonasDolor, setZonasDolor] = React.useState<string[]>(['torso', 'brazo-derecho']);

  return (
    {/* Contenedor con tus propios estilos o clases (ej: Tailwind) */}
    <div className="max-w-2xl mx-auto p-4 bg-white border border-gray-300 rounded shadow">
      <h3 className="font-bold text-gray-800 mb-2">Localización del Dolor</h3>

      <MapaDolor
        valor={zonasDolor}
        onChange={(nuevas) => setZonasDolor(nuevas)}
        colorMarcado="#FF0000"
        className="w-full"
      />

      <p className="mt-3 text-sm text-gray-600">
        Zonas marcadas: {zonasDolor.join(', ') || 'Ninguna'}
      </p>
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
| `soloLectura` | `boolean` | `false` | Desactiva los clics para modo solo lectura. |
| `colorMarcado` | `string` | `"#FF0000"` | Color de relleno al seleccionar una zona. |
| `colorBordeMarcado` | `string` | `"#D32F2F"` | Color del borde de la zona seleccionada. |
| `colorHover` | `string` | `"rgba(255, 0, 0, 0.32)"` | Color traslúcido al pasar el cursor sobre una zona. |
| `className` | `string` | `undefined` | Clase CSS para el contenedor principal de la silueta. |
| `style` | `React.CSSProperties` | `undefined` | Estilos en línea para el contenedor principal. |
| `zoneClassName` | `string \| ((id, isSelected) => string)` | `undefined` | Permite inyectar clases CSS personalizadas a cada `<path>` vectorial. |
| `zoneStyle` | `((id, isSelected) => React.CSSProperties)` | `undefined` | Permite inyectar estilos en línea a cada `<path>` vectorial. |
| `zonas` | `ZonaAnatomica[]` | `ZONAS_DEFAULT` | Permite sobrescribir o extender la lista de zonas vectoriales. |
| `imagenSrc` | `string` | *(Base64 integrado)* | Permite sustituir la imagen base por otra silueta personalizada. |

---

## 🏷️ IDs de Zonas Anatómicas Disponibles

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

1. Dentro de la carpeta:
   ```bash
   git add .
   git commit -m "feat: make component unstyled and headless"
   ```
2. Crea el repositorio en tu cuenta de GitHub (ej. `react-body-pain-map`).
3. Sube el código:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/react-body-pain-map.git
   git push -u origin main
   ```
4. ¡Listo! Ya podrás instalarla en cualquier proyecto con:
   ```bash
   npm install github:TU_USUARIO/react-body-pain-map
   ```

---

## 📄 Licencia

MIT © Obed Villegas
