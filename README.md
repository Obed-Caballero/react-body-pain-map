# React Body Pain Map

[![npm version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/Obed-Caballero/react-body-pain-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Componente interactivo y *headless* (sin estilos impuestos) para **React**, diseñado para la localización y mapeo anatómico del dolor en aplicaciones médicas, sistemas de urgencias, hojas de triage y expedientes clínicos electrónicos.

Soporta siluetas anatómicas **masculinas (general)** y **femeninas** calibradas milimétricamente con gráficos vectoriales SVG interactivos extraídos directamente de trazados clínicos profesionales.

---

## 🌟 Características

- 🚻 **Soporte Femenino y Masculino:** Selector de silueta (`silueta="hombre" | "mujer"`). La silueta femenina cuenta con 21 zonas detalladas (incluyendo pecho y abdomen diferenciados) y la masculina con 20 zonas.
- 🎨 **Headless / Unstyled:** Cero estilos bloqueantes. No impone tarjetas, colores ni marcos predeterminados.
- 🩸 **Marcado Anatómico Fiel:** Utiliza composición gráfica (`mix-blend-mode: multiply`) para teñir las regiones anatómicas manteniendo 100% nítidos los trazos negros y detalles del dibujo subyacente.
- ⚡ **Sin dependencias pesadas:** Construido exclusivamente sobre React, ligero y optimizado.
- 🖼️ **Auto-contenido:** Ambas imágenes base de alta resolución (1774 x 887 px) integradas en Base64, sin necesidad de configurar carpetas públicas o loaders de assets.
- 🔒 **Modo Solo Lectura:** Soporte para deshabilitar la interacción al consultar historiales o generar vistas de impresión.
- 📐 **TypeScript Nativo:** Tipado estricto con autocompletado en VS Code y otros editores.

---

## 📦 Instalación

Puedes instalar la librería directamente desde el repositorio de GitHub:

```bash
npm install git+https://github.com/Obed-Caballero/react-body-pain-map.git
```

O utilizando Yarn / PNPM:

```bash
# Con Yarn
yarn add git+https://github.com/Obed-Caballero/react-body-pain-map.git

# Con PNPM
pnpm add git+https://github.com/Obed-Caballero/react-body-pain-map.git
```

---

## 🚀 Uso Rápido

### Silueta Predeterminada (General / Masculina)

```tsx
import * as React from 'react';
import { MapaDolor } from 'react-body-pain-map';

export function FormularioDolor() {
  const [zonasSeleccionadas, setZonasSeleccionadas] = React.useState<string[]>(['torso']);

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '16px' }}>
      <h3>Localización del Dolor</h3>

      <MapaDolor
        valor={zonasSeleccionadas}
        onChange={(nuevasZonas) => setZonasSeleccionadas(nuevasZonas)}
        colorMarcado="#FF0000"
      />

      <p>
        Zonas afectadas: <strong>{zonasSeleccionadas.join(', ') || 'Ninguna'}</strong>
      </p>
    </div>
  );
}
```

### Silueta Femenina con Selector de Género

```tsx
import * as React from 'react';
import { MapaDolor, TipoSilueta } from 'react-body-pain-map';

export function FormularioClinico() {
  const [silueta, setSilueta] = React.useState<TipoSilueta>('mujer');
  const [zonas, setZonas] = React.useState<string[]>(['pecho']);

  return (
    <div>
      <div>
        <button onClick={() => setSilueta('hombre')}>Masculino</button>
        <button onClick={() => setSilueta('mujer')}>Femenino</button>
      </div>

      <MapaDolor
        silueta={silueta}
        valor={zonas}
        onChange={setZonas}
        colorMarcado="#DC2626"
      />
    </div>
  );
}
```

---

## ⚙️ Propiedades (API)

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `silueta` | `'hombre' \| 'mujer' \| 'general'` | `'hombre'` | Silueta anatómica base a utilizar. Selecciona automáticamente los vectores e imagen correspondientes. |
| `valor` | `string[]` | `[]` | Arreglo de IDs de las zonas marcadas (ej. `['cabeza', 'torso', 'pecho']`). |
| `onChange` | `(zonas: string[]) => void` | `undefined` | Callback ejecutado cuando el usuario hace clic en una zona para marcarla o desmarcarla. |
| `soloLectura` | `boolean` | `false` | Deshabilita los eventos de clic para visualización pasiva o impresión. |
| `colorMarcado` | `string` | `"#FF0000"` | Color de relleno para las zonas seleccionadas. |
| `colorBordeMarcado` | `string` | `"#D32F2F"` | Color del trazo/borde de las zonas seleccionadas. |
| `colorHover` | `string` | `"rgba(255, 0, 0, 0.32)"` | Color translúcido al pasar el cursor sobre una zona. |
| `className` | `string` | `undefined` | Clase CSS aplicada al contenedor raíz. |
| `style` | `React.CSSProperties` | `undefined` | Estilos en línea aplicados al contenedor raíz. |
| `zoneClassName` | `string \| ((id, isSelected) => string)` | `undefined` | Clase CSS personalizada para los elementos `<path>` de cada zona. |
| `zoneStyle` | `((id, isSelected) => React.CSSProperties)` | `undefined` | Estilos en línea para los elementos `<path>` de cada zona. |
| `zonas` | `ZonaAnatomica[]` | *(Según silueta)* | Permite reemplazar o extender las zonas corporales disponibles (`ZONAS_HOMBRE` o `ZONAS_MUJER`). |
| `imagenSrc` | `string` | *(Base64 según silueta)* | Permite suministrar una imagen de fondo alternativa. |

---

## 🏷️ IDs de Zonas Anatómicas Calibradas

### 1. Silueta Masculina / General (`silueta="hombre"`) — 20 Zonas
* **Frente:** `cabeza`, `cuello`, `torso`, `pelvis`, `brazo-derecho`, `brazo-izquierdo`, `mano-derecha`, `mano-izquierda`, `pierna-derecha`, `pierna-izquierda`.
* **Posterior (Espalda):** `cabeza-posterior`, `cuello-posterior`, `espalda`, `gluteos`, `brazo-derecho-posterior`, `brazo-izquierdo-posterior`, `mano-derecha-posterior`, `mano-izquierda-posterior`, `pierna-derecha-posterior`, `pierna-izquierda-posterior`.

### 2. Silueta Femenina (`silueta="mujer"`) — 21 Zonas
* **Frente:** `cabeza`, `cuello`, `pecho`, `torso` (abdomen), `pelvis`, `brazo-derecho`, `brazo-izquierdo`, `mano-derecha`, `mano-izquierda`, `pierna-derecha`, `pierna-izquierda`.
* **Posterior (Espalda):** `cabeza-posterior`, `cuello-posterior`, `espalda`, `gluteos`, `brazo-derecho-posterior`, `brazo-izquierdo-posterior`, `mano-derecha-posterior`, `mano-izquierda-posterior`, `pierna-derecha-posterior`, `pierna-izquierda-posterior`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.
