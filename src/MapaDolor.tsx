import * as React from 'react';
import { SILUETAS_BASE64 } from './imagenBase64';
import { ZONAS_DEFAULT, ZonaAnatomica } from './zonas';

export interface MapaDolorProps {
  /**
   * Arreglo con los IDs de las zonas seleccionadas. Ej: `['torso', 'brazo-derecho']`
   */
  valor?: string[];

  /**
   * Callback ejecutado al seleccionar o deseleccionar una zona.
   */
  onChange?: (zonasIds: string[]) => void;

  /**
   * Desactiva la interacción de clic (modo solo lectura).
   * @default false
   */
  soloLectura?: boolean;

  /**
   * Color de relleno para zonas seleccionadas.
   * @default "#FF0000"
   */
  colorMarcado?: string;

  /**
   * Color del borde de zonas seleccionadas.
   * @default "#D32F2F"
   */
  colorBordeMarcado?: string;

  /**
   * Color de relleno en hover.
   * @default "rgba(255, 0, 0, 0.32)"
   */
  colorHover?: string;

  /**
   * Lista de zonas vectoriales (por defecto las 12 zonas anatómicas calibradas).
   */
  zonas?: ZonaAnatomica[];

  /**
   * URL o Data URI de la silueta base. Por defecto usa la imagen anatómica integrada.
   */
  imagenSrc?: string;

  /**
   * Clase CSS opcional para el contenedor principal.
   */
  className?: string;

  /**
   * Estilos CSS en línea para el contenedor principal.
   */
  style?: React.CSSProperties;

  /**
   * Clase CSS opcional para cada elemento <path> de las zonas corporales.
   * Puede ser un string o una función que recibe el id de la zona y si está seleccionada.
   */
  zoneClassName?: string | ((id: string, isSelected: boolean) => string);

  /**
   * Estilos CSS en línea personalizados para cada <path>.
   */
  zoneStyle?: (id: string, isSelected: boolean) => React.CSSProperties;
}

/**
 * Componente interactivo y headless de mapa corporal anatómico.
 * Renderiza exclusivamente la silueta y las zonas vectoriales interactivas,
 * permitiendo que quien lo consuma defina sus propios estilos, tarjetas o contenedores.
 */
export function MapaDolor({
  valor = [],
  onChange,
  soloLectura = false,
  colorMarcado = '#FF0000',
  colorBordeMarcado = '#D32F2F',
  colorHover = 'rgba(255, 0, 0, 0.32)',
  zonas = ZONAS_DEFAULT,
  imagenSrc = SILUETAS_BASE64,
  className,
  style,
  zoneClassName,
  zoneStyle
}: MapaDolorProps): React.JSX.Element {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (soloLectura) return;
    const existe = valor.includes(id);
    const nuevas = existe ? valor.filter((item) => item !== id) : [...valor, id];
    onChange?.(nuevas);
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {/* Silueta anatómica de fondo */}
      <img
        src={imagenSrc}
        alt="Siluetas anatómicas"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      />

      {/* Capa vectorial SVG con las zonas */}
      <svg
        viewBox="0 0 1774 887"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {zonas.map((zona) => {
          const isSelected = valor.includes(zona.id);
          const isHovered = !soloLectura && hoveredId === zona.id;

          let fill = 'transparent';
          let stroke = 'transparent';
          let strokeWidth = 0;

          if (isSelected) {
            fill = colorMarcado;
            stroke = colorBordeMarcado;
            strokeWidth = 1.8;
          } else if (isHovered) {
            fill = colorHover;
            stroke = colorMarcado;
            strokeWidth = 1.4;
          }

          const customStyle = zoneStyle ? zoneStyle(zona.id, isSelected) : {};
          const customClass = typeof zoneClassName === 'function'
            ? zoneClassName(zona.id, isSelected)
            : zoneClassName;

          return (
            <path
              key={zona.id}
              id={zona.id}
              d={zona.d}
              className={customClass}
              onClick={() => handleToggle(zona.id)}
              onMouseEnter={() => setHoveredId(zona.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                cursor: soloLectura ? 'default' : 'pointer',
                fill,
                stroke,
                strokeWidth,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
                mixBlendMode: 'multiply',
                transition: 'fill 0.12s ease-in-out, stroke 0.12s ease-in-out',
                ...customStyle
              }}
            >
              <title>{zona.label}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
}
