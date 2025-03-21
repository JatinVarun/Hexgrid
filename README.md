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
   git clone https://github.com/yourusername/hexagon-grid.git
   cd hexagon-grid-visualizer
   
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
