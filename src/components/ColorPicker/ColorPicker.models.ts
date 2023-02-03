export type ColorPickerProps = { selectedColor: HEXColor; colors: Color[]; onChange: (color: HEXColor) => void };

export type ColorIconProps = { color: Color };

export type HEXColor = `#${string}`;

export type Color = { hex: HEXColor; label?: string };
