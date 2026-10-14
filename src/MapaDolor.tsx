import * as React from 'react';
import { SILUETAS_BASE64 } from './imagenBase64';
import { ZONAS_DEFAULT, ZonaAnatomica } from './zonas';

export interface MapaDolorProps {
  /**
   * Arreglo con los IDs de las zonas seleccionadas. Ej: `['torso', 'brazo-derecho']`
   */
  valor?: string[];

  /**
   * Función callback ejecutada cada vez que el usuario selecciona o deselecciona una zona.
   */
  onChange?: (zonasIds: string[]) => void;

  /**
   * Si es `true`, el componente solo muestra las áreas marcadas sin permitir interacción de clic.
   * @default false
   */
  soloLectura?: boolean;

  /**
   * Color de relleno cuando una zona está seleccionada.
   * @default "#FF0000"
   */
  colorMarcado?: string;

  /**
   * Color del borde cuando una zona está seleccionada.
   * @default "#D32F2F"
   */
  colorBordeMarcado?: string;

  /**
   * Color semitransparente al pasar el cursor sobre una zona activa.
   * @default "rgba(255, 0, 0, 0.32)"
   */
  colorHover?: string;

  /**
   * Muestra u oculta la barra superior con el encabezado clínico.
   * @default true
   */
  mostrarEncabezado?: boolean;

  /**
   * Texto para la sección izquierda del encabezado.
   * @default "Eva"
   */
  textoEva?: string;

  /**
   * Título principal del encabezado.
   * @default "Localización"
   */
  textoTitulo?: string;

  /**
   * Texto rotado en el margen vertical izquierdo. Si es cadena vacía, no se renderiza.
   * @default "(Marca el área afectada)"
   */
  textoVertical?: string;

  /**
   * Lista de zonas vectoriales personalizadas. Si no se especifica, usa `ZONAS_DEFAULT`.
   */
  zonas?: ZonaAnatomica[];

  /**
   * URL o Data URI de la imagen anatómica de fondo. Por defecto incluye la silueta de 3 vistas.
   */
  imagenSrc?: string;

  /**
   * Ancho máximo del contenedor en píxeles o porcentaje.
   * @default 860
   */
  anchoMaximo?: number | string;

  /**
   * Clase CSS opcional para el contenedor principal.
   */
  className?: string;

  /**
   * Estilos CSS en línea para el contenedor principal.
   */
  style?: React.CSSProperties;
}

export function MapaDolor({
  valor = [],
  onChange,
  soloLectura = false,
  colorMarcado = '#FF0000',
  colorBordeMarcado = '#D32F2F',
  colorHover = 'rgba(255, 0, 0, 0.32)',
  mostrarEncabezado = true,
  textoEva = 'Eva',
  textoTitulo = 'Localización',
  textoVertical = '(Marca el área afectada)',
  zonas = ZONAS_DEFAULT,
  imagenSrc = SILUETAS_BASE64,
  anchoMaximo = 860,
  className,
  style
}: MapaDolorProps): React.JSX.Element {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (soloLectura) return;
    const existe = valor.includes(id);
    const nuevasZonas = existe
      ? valor.filter((item) => item !== id)
      : [...valor, id];

    onChange?.(nuevasZonas);
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: typeof anchoMaximo === 'number' ? `${anchoMaximo}px` : anchoMaximo,
        backgroundColor: '#FFFFFF',
        border: '2px solid #2D3748',
        borderRadius: '2px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        ...style
      }}
    >
      {/* Encabezado clínico opcional */}
      {mostrarEncabezado && (
        <div
          style={{
            backgroundColor: '#374151',
            color: '#FFFFFF',
            display: 'flex',
            height: '38px',
            alignItems: 'stretch',
            borderBottom: '2px solid #2D3748',
            userSelect: 'none'
          }}
        >
          {textoEva && (
            <div
              style={{
                width: '80px',
                minWidth: '80px',
                paddingLeft: '12px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.3px',
                borderRight: '1.5px solid rgba(255, 255, 255, 0.45)',
                boxSizing: 'border-box'
              }}
            >
              {textoEva}
            </div>
          )}
          <div
            style={{
              flex: 1,
              paddingLeft: '16px',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.3px',
              boxSizing: 'border-box'
            }}
          >
            {textoTitulo}
          </div>
        </div>
      )}

      {/* Cuerpo principal con siluetas y texto vertical */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#FFFFFF',
          minHeight: '380px',
          boxSizing: 'border-box'
        }}
      >
        {textoVertical && (
          <div
            style={{
              width: '50px',
              minWidth: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              boxSizing: 'border-box'
            }}
          >
            <span
              style={{
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
                color: '#4B5563',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.2px'
              }}
            >
              {textoVertical}
            </span>
          </div>
        )}

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 24px 18px 6px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '760px'
            }}
          >
            {/* Imagen anatómica de fondo */}
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

                return (
                  <path
                    key={zona.id}
                    id={zona.id}
                    d={zona.d}
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
                      transition: 'fill 0.12s ease-in-out, stroke 0.12s ease-in-out'
                    }}
                  >
                    <title>{zona.label}</title>
                  </path>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
