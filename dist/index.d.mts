import * as React from 'react';

interface ZonaAnatomica {
    id: string;
    label: string;
    d: string;
    vista?: 'frente' | 'espalda' | 'perfil';
}
/**
 * Zonas anatómicas predeterminadas calibradas para la silueta estándar de 3 vistas (1774 x 887 px).
 */
declare const ZONAS_DEFAULT: ZonaAnatomica[];

interface MapaDolorProps {
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
declare function MapaDolor({ valor, onChange, soloLectura, colorMarcado, colorBordeMarcado, colorHover, mostrarEncabezado, textoEva, textoTitulo, textoVertical, zonas, imagenSrc, anchoMaximo, className, style }: MapaDolorProps): React.JSX.Element;

declare const SILUETAS_BASE64: string;

export { MapaDolor, type MapaDolorProps, SILUETAS_BASE64, ZONAS_DEFAULT, type ZonaAnatomica };
