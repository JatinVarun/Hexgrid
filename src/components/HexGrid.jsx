import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./HexGrid.css";

const hexWidth = 80;
const s = hexWidth / 2;
const hexHeight = Math.sqrt(3) * s;  

// ----- Color Gradient Utilities -----
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r, g, b) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

const generateUniqueShades = (startHex, endHex, count) => {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const shades = [];
  for (let i = 0; i < count; i++) {
    const ratio = i / (count - 1);
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    shades.push(rgbToHex(r, g, b));
  }
  return shades;
};
const initialColors = [
  "blue", "red", "green", "yellow", "purple", "orange",
  "cyan", "pink", "magenta", "lime", "teal", "indigo",
  "violet", "brown", "maroon", "navy", "olive", "coral",
  "turquoise", "gold", "silver", "beige", "lavender",
  "salmon", "mint", "peach", "plum", "charcoal", "copper",
  "crimson", "sienna", "khaki", "orchid", "chocolate", "tomato",
  "dodgerblue", "springgreen", "aqua", "periwinkle",
  "scarlet", "amber", "cerulean", "burgundy", "emerald", "sapphire",
  "ruby", "amethyst", "jade", "mustard", "rose", "tan",
  "violetred", "apricot", "coffee", "fuchsia", "olivedrab", "ochre",
  "peacock", "rust", "chartreuse"
];

const colorMap = {
  blue: ["#001F3F", "#0080FF"],
  red: ["#7D0000", "#FF6666"],
  green: ["#003300", "#66FF66"],
  yellow: ["#665500", "#FFFF66"],
  purple: ["#3D0066", "#E066FF"],
  orange: ["#662200", "#FFAA33"],
  cyan: ["#003333", "#66FFFF"],
  pink: ["#660033", "#FF66CC"],
  magenta: ["#8B008B", "#FF00FF"],
  lime: ["#556B2F", "#BFFF00"],
  teal: ["#006D5B", "#66CDAA"],
  indigo: ["#4B0082", "#8A2BE2"],
  violet: ["#9400D3", "#EE82EE"],
  brown: ["#654321", "#D2B48C"],
  maroon: ["#800000", "#B22222"],
  navy: ["#000080", "#4169E1"],
  olive: ["#556B2F", "#9ACD32"],
  coral: ["#CD5B45", "#FFA07A"],
  turquoise: ["#00CED1", "#AFEEEE"],
  gold: ["#B8860B", "#FFD700"],
  silver: ["#A9A9A9", "#C0C0C0"],
  beige: ["#C2B280", "#F5F5DC"],
  lavender: ["#7C73D2", "#E6E6FA"],
  salmon: ["#E9967A", "#FF8C69"],
  mint: ["#3EB489", "#98FF98"],
  peach: ["#FFCC99", "#FFDAB9"],
  plum: ["#8E4585", "#DDA0DD"],
  charcoal: ["#36454F", "#708090"],
  copper: ["#B87333", "#FFB347"],
  crimson: ["#DC143C", "#FF6347"],
  sienna: ["#A0522D", "#CD853F"],
  khaki: ["#F0E68C", "#BDB76B"],
  orchid: ["#DA70D6", "#BA55D3"],
  chocolate: ["#D2691E", "#8B4513"],
  tomato: ["#FF6347", "#FF4500"],
  dodgerblue: ["#1E90FF", "#6495ED"],
  springgreen: ["#00FF7F", "#3CB371"],
  aqua: ["#00FFFF", "#00CED1"],
  periwinkle: ["#CCCCFF", "#9999FF"],
  scarlet: ["#FF2400", "#FF6347"],
  amber: ["#FFBF00", "#FFCC33"],
  cerulean: ["#007BA7", "#00BFFF"],
  burgundy: ["#800020", "#C71585"],
  emerald: ["#50C878", "#2E8B57"],
  sapphire: ["#0F52BA", "#1E90FF"],
  ruby: ["#E0115F", "#FF007F"],
  amethyst: ["#9966CC", "#B19CD9"],
  jade: ["#00A86B", "#00FA9A"],
  mustard: ["#FFDB58", "#FFB300"],
  rose: ["#FF007F", "#FF66CC"],
  tan: ["#D2B48C", "#F0E68C"],
  violetred: ["#D02090", "#FF1493"],
  apricot: ["#FBCEB1", "#FFDAB9"],
  coffee: ["#6F4E37", "#B87333"],
  fuchsia: ["#FF00FF", "#FF77FF"],
  olivedrab: ["#6B8E23", "#556B2F"],
  ochre: ["#CC7722", "#FF9933"],
  peacock: ["#33A1C9", "#0077BE"],
  rust: ["#B7410E", "#CD5C5C"],
  chartreuse: ["#7FFF00", "#ADFF2F"]
};


const colorShades = {};
initialColors.forEach((color) => {
  if (colorMap[color]) {
    colorShades[color] = generateUniqueShades(
      colorMap[color][0],
      colorMap[color][1],
      1
    );
  }
});

const generateHexagonGrid = (radius) => {
  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      const centerX = s * 1.5 * q;
      const centerY = hexHeight * (r + q / 2);
      hexes.push({
        index: hexes.length,
        q,
        r,
        centerX,
        centerY,
      });
    }
  }
  return hexes;
};

const gridRadius = 4;
let hexagons = generateHexagonGrid(gridRadius);
const gridCount = hexagons.length;

// ----- Centering the Grid -----
const minX = Math.min(...hexagons.map((h) => h.centerX));
const minY = Math.min(...hexagons.map((h) => h.centerY));
hexagons = hexagons.map((hex) => ({
  ...hex,
  centerX: hex.centerX - minX + hexWidth / 2,
  centerY: hex.centerY - minY + hexHeight / 2,
}));

// Update each color’s gradient to match the number of hexagons
Object.keys(colorShades).forEach((color) => {
  colorShades[color] = generateUniqueShades(
    colorMap[color][0],
    colorMap[color][1],
    gridCount
  );
});

// ----- HexGrid Component with Absolute Positioning (No Gaps) -----
const HexGrid = () => {
  const [uniformColor, setUniformColor] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  // <-- ADDED: State for tracking hovered hexagon index
  const [hoveredHex, setHoveredHex] = useState(null);

  const handleHexClick = useCallback(
    (color, index) => {
      if (uniformColor === null) {
        setUniformColor(color);
        setClickedIndex(index);
      }
    },
    [uniformColor]
  );

  // Handling for double-click events to reset the grid
  const handleHexDoubleClick = useCallback(() => {
    setUniformColor(null);
    setClickedIndex(null);
  }, []);

  // Calculate uniform shade mapping based on distance from the clicked hexagon
  let uniformShadeMapping = [];
  if (uniformColor !== null && clickedIndex !== null) {
    const clickedHex = hexagons.find((h) => h.index === clickedIndex);
    const hexesWithDistance = hexagons.map((hex) => ({
      ...hex,
      distance: Math.hypot(
        hex.centerX - clickedHex.centerX,
        hex.centerY - clickedHex.centerY
      ),
    }));
    const sortedHexes = [...hexesWithDistance].sort((a, b) => {
      if (a.distance === b.distance) return a.index - b.index;
      return a.distance - b.distance;
    });
    const mapping = {};
    sortedHexes.forEach((hex, pos) => {
      mapping[hex.index] = pos;
    });
    uniformShadeMapping = hexagons.map(
      (hex) =>
        (mapping[hex.index] - mapping[clickedIndex] +
          Math.floor(gridCount / 2) +
          gridCount) % gridCount
    );
  }

  return (
    <div
      className="hex-grid"
      style={{
        width: Math.ceil(
          Math.max(...hexagons.map((h) => h.centerX)) + hexWidth / 2
        ),
        height: Math.ceil(
          Math.max(...hexagons.map((h) => h.centerY)) + hexHeight / 2
        ),
        position: "relative",
      }}
    >
      {hexagons.map((hex) => {
        const baseColor = uniformColor
          ? uniformColor
          : initialColors[hex.index % initialColors.length];
        const shadeIndex = uniformColor
          ? uniformShadeMapping[hex.index]
          : Math.floor(gridCount / 2);
        return (
          <motion.div
            key={hex.index}
            className="hexagon"
            style={{
              backgroundColor: colorShades[baseColor][shadeIndex],
              position: "absolute",
              left: `${Math.round(hex.centerX - hexWidth / 2)}px`,
              top: `${Math.round(hex.centerY - hexHeight / 2)}px`,
              transform: "translateZ(0)",
            }}
            onClick={() =>
              handleHexClick(
                initialColors[hex.index % initialColors.length],
                hex.index
              )
            }
            onDoubleClick={handleHexDoubleClick}
            // <-- ADDED: Hover event handlers to track the hex being hovered
            onMouseEnter={() => setHoveredHex(hex.index)}
            onMouseLeave={() => setHoveredHex(null)}
          >
            {/* SVG overlay to draw a thin outline on each of the 6 edges */}
            <svg
              className="hexagon-outline"
              viewBox="0 0 80 69"
              preserveAspectRatio="none"
            >
              <polygon
                points="20,0 60,0 80,34.5 60,69 20,69 0,34.5"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            {/* Show hex code overlay if uniform color is applied OR on hover */}
            {(uniformColor || hoveredHex === hex.index) && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "0 0 3px rgba(0,0,0,0.7)",
                  fontSize: "10px",
                  pointerEvents: "none",
                }}
              >
                {colorShades[baseColor][shadeIndex]}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default HexGrid;
