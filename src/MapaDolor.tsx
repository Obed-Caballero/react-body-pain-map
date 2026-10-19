import * as React from 'react';
import { SILUETAS_HOMBRE_BASE64, SILUETAS_MUJER_BASE64 } from './imagenBase64';
import { ZONAS_HOMBRE, ZONAS_MUJER, ZonaAnatomica } from './zonas';

export type TipoSilueta = 'hombre' | 'mujer' | 'general';

export interface MapaDolorProps {
  /**
   * Tipo de silueta anatómica a mostrar: 'hombre' (general) o 'mujer'.
   * @default "hombre"
   */
  silueta?: TipoSilueta;

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
   * Lista de zonas vectoriales personalizadas.
   * Por defecto, carga las zonas calibradas para la silueta seleccionada ('hombre' o 'mujer').
   */
  zonas?: ZonaAnatomica[];

  /**
   * URL o Data URI de la silueta base.
   * Por defecto usa la imagen anatómica integrada correspondiente a `silueta`.
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
 * Soporta siluetas masculinas y femeninas con calibración vectorial precisa.
 */
export function MapaDolor({
  silueta = 'hombre',
  valor = [],
  onChange,
  soloLectura = false,
  colorMarcado = '#FF0000',
  colorBordeMarcado = '#D32F2F',
  colorHover = 'rgba(255, 0, 0, 0.32)',
  zonas,
  imagenSrc,
  className,
  style,
  zoneClassName,
  zoneStyle
}: MapaDolorProps): React.JSX.Element {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const esMujer = silueta === 'mujer';
  const zonasEfectivas = zonas ?? (esMujer ? ZONAS_MUJER : ZONAS_HOMBRE);
  const imagenEfectiva = imagenSrc ?? (esMujer ? SILUETAS_MUJER_BASE64 : SILUETAS_HOMBRE_BASE64);

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
        src={imagenEfectiva}
        alt={`Siluetas anatómicas (${silueta})`}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      />

      {/* Capa vectorial SVG con las zonas calibradas */}
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
        {zonasEfectivas.map((zona) => {
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
