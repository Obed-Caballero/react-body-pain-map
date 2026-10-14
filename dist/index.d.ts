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
declare function MapaDolor({ valor, onChange, soloLectura, colorMarcado, colorBordeMarcado, colorHover, zonas, imagenSrc, className, style, zoneClassName, zoneStyle }: MapaDolorProps): React.JSX.Element;

declare const SILUETAS_BASE64: string;

export { MapaDolor, type MapaDolorProps, SILUETAS_BASE64, ZONAS_DEFAULT, type ZonaAnatomica };
