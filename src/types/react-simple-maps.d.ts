declare module "react-simple-maps" {
  import * as React from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    viewBox?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: Geography[] }) => React.ReactNode;
  }
  export const Geographies: React.FC<GeographiesProps>;

  export interface Geography {
    rsmKey: string;
    id: number | string;
    properties: Record<string, string>;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
    [key: string]: unknown;
  }
  export const Geography: React.FC<GeographyProps>;
}
