# React Body Pain Map

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Obed-Caballero/react-body-pain-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Componente interactivo y *headless* (sin estilos impuestos) para **React**, diseñado para la localización y mapeo anatómico del dolor en aplicaciones médicas, sistemas de urgencias, hojas de triage y expedientes clínicos electrónicos.

Proporciona una vista anatómica tripartita (frente, espalda y perfil) con zonas interactivas vectoriales que se adaptan a los contornos naturales del cuerpo, permitiendo a los desarrolladores integrar su propio diseño y sistema de estilos (Tailwind CSS, Material UI, Bootstrap o CSS puro).

---

## 🌟 Características

- 🎨 **Headless / Unstyled:** Cero estilos bloqueantes. No impone tarjetas, colores ni marcos predeterminados.
- 🩸 **Marcado Anatómico Fiel:** Utiliza composición gráfica (`mix-blend-mode: multiply`) para teñir las regiones anatómicas manteniendo 100% nítidos los trazos negros y detalles del dibujo subyacente.
- ⚡ **Sin dependencias pesadas:** Construido exclusivamente sobre React, ligero y optimizado.
- 🖼️ **Auto-contenido:** Imagen base de alta resolución (1774 x 887 px) integrada, sin necesidad de configurar carpetas públicas o loaders de assets.
- 🔒 **Modo Solo Lectura:** Soporte para deshabilitar la interacción al consultar historiales o generar vistas de impresión.
- 📐 **TypeScript Nativo:** Tipado estricto con autocompletado en VS Code y otros editores.

---

## 📦 Instalación

Puedes instalar la librería directamente desde el repositorio de GitHub:

```bash
npm install github:Obed-Caballero/react-body-pain-map
```

O utilizando Yarn / PNPM:

```bash
# Con Yarn
yarn add github:Obed-Caballero/react-body-pain-map

# Con PNPM
pnpm add github:Obed-Caballero/react-body-pain-map
```

---

## 🚀 Uso Rápido

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

---

## 🎨 Personalización con CSS o Tailwind

Dado que el componente no fuerza estilos en el contenedor, puedes envolverlo y personalizarlo con total libertad:

```tsx
<div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-6">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">Mapeo Anatómico</h2>

  <MapaDolor
    valor={zonas}
    onChange={setZonas}
    colorMarcado="#DC2626"
    colorHover="rgba(220, 38, 38, 0.25)"
    className="w-full transition-all"
  />
</div>
```

---

## ⚙️ Propiedades (API)

| Propiedad | Tipo | Valor por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `valor` | `string[]` | `[]` | Arreglo de IDs de las zonas marcadas (ej. `['cabeza', 'torso']`). |
| `onChange` | `(zonas: string[]) => void` | `undefined` | Callback ejecutado cuando el usuario hace clic en una zona. |
| `soloLectura` | `boolean` | `false` | Deshabilita los eventos de clic para visualización pasiva. |
| `colorMarcado` | `string` | `"#FF0000"` | Color de relleno para las zonas seleccionadas. |
| `colorBordeMarcado` | `string` | `"#D32F2F"` | Color del trazo/borde de las zonas seleccionadas. |
| `colorHover` | `string` | `"rgba(255, 0, 0, 0.32)"` | Color translúcido al pasar el cursor sobre una zona. |
| `className` | `string` | `undefined` | Clase CSS aplicada al contenedor raíz. |
| `style` | `React.CSSProperties` | `undefined` | Estilos en línea aplicados al contenedor raíz. |
| `zoneClassName` | `string \| ((id, isSelected) => string)` | `undefined` | Clase CSS personalizada para los elementos `<path>` de cada zona. |
| `zoneStyle` | `((id, isSelected) => React.CSSProperties)` | `undefined` | Estilos en línea para los elementos `<path>` de cada zona. |
| `zonas` | `ZonaAnatomica[]` | `ZONAS_DEFAULT` | Permite reemplazar o extender las zonas corporales disponibles. |
| `imagenSrc` | `string` | *(Base64 integrado)* | Permite suministrar una imagen de fondo alternativa. |

---

## 🏷️ IDs de Zonas Corporales Predeterminadas

Las siguientes zonas vienen calibradas de forma nativa en `ZONAS_DEFAULT`:

| ID | Región | Vista |
| :--- | :--- | :--- |
| `cabeza` | Cabeza / Cráneo | Frontal |
| `cuello` | Cuello anterior | Frontal |
| `torso` | Tórax y Abdomen | Frontal |
| `pelvis` | Región pélvica | Frontal |
| `brazo-derecho` | Brazo y Antebrazo derecho | Frontal |
| `brazo-izquierdo` | Brazo y Antebrazo izquierdo | Frontal |
| `mano-derecha` | Mano y muñeca derecha | Frontal |
| `mano-izquierda` | Mano y muñeca izquierda | Frontal |
| `pierna-derecha` | Muslo, pierna y pie derecho | Frontal |
| `pierna-izquierda` | Muslo, pierna y pie izquierdo | Frontal |
| `espalda` | Espalda superior e inferior | Posterior |
| `gluteos` | Glúteos y Zona sacra | Posterior |

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.
