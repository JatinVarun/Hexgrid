# Hexagon Grid

Hexagon Grid is a React project that creates an interactive grid of hexagons. Each hexagon displays a different or unique shades that can change when you click on any particular hexagon color. The project uses simple geometry and CSS to create the grid, along with Framer Motion for smooth animations.

## Features

- Dynamic Hexagon Grid: Generates a hexagon grid based on a configurable radius.
- Color Shades: Converts colors and creates different shades for each hexagon.
- User Interactions: 
  - Click: Apply a uniform color effect across the grid based on the clicked hexagon.  
  - Hover: Display the hex color code on each hexagon.
- Smooth Animations: Uses Framer Motion for subtle and pleasant transitions.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JatinVarun/Hexgrid.git
   cd Hexgrid

2.   **Install dependencies:**
npm install

**Run the development server:**
npm start or npm run dev

Project Structure:

honeycomb-hexagon/
├── public/
│   └── index.html         # Main HTML file
├── src/
│   ├── components/
│   │   └── HexGrid.jsx     # Main code
│   │   └── HexGrid.css     # CSS for grid and hexagons
│   ├── App.jsx             # Main app component
│   └── index.jsx           # Entry point of the application
├── .gitignore
├── package.json
└── README.md              

**Images and Working:**
1) ![Image](https://github.com/user-attachments/assets/055025bd-e838-407e-9f03-415d4775e752)
   
   Working:
1) Hexagonal Grid Formation – Multiple small hexagons are arranged in a staggered grid to form a large hexagon.
2) Hexagon Alignment – Each hexagon is positioned precisely using CSS to maintain a seamless tiling effect.
3) Color Assignment – Different colors are assigned to each hexagon from a predefined palette for a vibrant look.
4) Final Structure – The combined hexagons create a visually appealing large hexagonal shape.

2) ![Image](https://github.com/user-attachments/assets/725dee99-eded-41d7-8cee-0f101a198d00)

   Working:
   When the user hover over any hexagon, its color code appears on it, allowing user to see the exact hex value of that color. In this case, user hovering over a dark blue hexagon, and its hex code (#00509f) is 
   displayed. This feature helps user easily identify and use specific colors from the hexagonal grid.
   
3) ![Image](https://github.com/user-attachments/assets/4673c53c-a9bf-4f1d-b60a-c7717d8e3a53)

   Working:
   When user click on a dark blue hexagon, it generates a grid of hexagons displaying various unique shades of that color. Each shade is represented with its corresponding hex code, allowing us to explore subtle 
   variations in tone and saturation. This feature helps in selecting the perfect shade from a gradient of similar colors.

4) ![Image](https://github.com/user-attachments/assets/7d5a5db3-bab8-47eb-bc47-9bc80140885a)

   Working:
   When the user double-click on a particular hexagon, the grid refreshes, reverting to the previous hexagon set. This allows seamless toggling between different color palettes, making it easy to switch back and 
   forth between variations and their original state.
   

   
## Usage
Viewing the Grid:
When the app runs, you will see a grid of hexagons, each with its own color.

Interacting with the Grid:

Click on a hexagon: The selected hexagon's color is applied to all hexagons, with a gradient effect based on the distance from the clicked hexagon.
Hover over a hexagon: The hex color code appears over the hexagon.
Customization:
You can adjust the colors, grid size, and hexagon dimensions by editing the settings in the colorUtils.js and gridUtils.js files.

Technologies Used
React: For building the user interface.
Framer Motion: For smooth animations.
CSS (clip-path): To create the hexagon shape.
JavaScript: For calculations and dynamic styling.
