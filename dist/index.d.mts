import * as React from 'react';

interface ZonaAnatomica {
    id: string;
    label: string;
    d: string;
    vista?: 'frente' | 'espalda' | 'perfil';
}
/**
 * Zonas anatómicas calibradas para silueta masculina / general (20 zonas).
 */
declare const ZONAS_HOMBRE: ZonaAnatomica[];
/**
 * Zonas anatómicas calibradas para silueta femenina (21 zonas, incluye diferenciación de pecho y abdomen).
 */
declare const ZONAS_MUJER: ZonaAnatomica[];
/**
 * Alias de silueta general para retrocompatibilidad (masculina).
 */
declare const ZONAS_GENERAL: ZonaAnatomica[];
/**
 * Zonas anatómicas predeterminadas (retrocompatibilidad).
 */
declare const ZONAS_DEFAULT: ZonaAnatomica[];

type TipoSilueta = 'hombre' | 'mujer' | 'general';
interface MapaDolorProps {
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
declare function MapaDolor({ silueta, valor, onChange, soloLectura, colorMarcado, colorBordeMarcado, colorHover, zonas, imagenSrc, className, style, zoneClassName, zoneStyle }: MapaDolorProps): React.JSX.Element;

declare const SILUETAS_HOMBRE_BASE64: string;
declare const SILUETAS_MUJER_BASE64: string;
/**
 * Silueta predeterminada (masculina / general) para retrocompatibilidad.
 */
declare const SILUETAS_BASE64: string;

export { MapaDolor, type MapaDolorProps, SILUETAS_BASE64, SILUETAS_HOMBRE_BASE64, SILUETAS_MUJER_BASE64, type TipoSilueta, ZONAS_DEFAULT, ZONAS_GENERAL, ZONAS_HOMBRE, ZONAS_MUJER, type ZonaAnatomica };
