# Plate Planner

A web application for planning 96-well plate experiments with label management and configuration saving capabilities.

## Quick Start

### Using Command Prompt:
```cmd
start.bat
```

### Using PowerShell:
```powershell
.\start.bat
```

The application will:
1. Check for and install dependencies if needed
2. Start the development server
3. Open automatically in your default browser

## Features

### Well Plate Management
- Interactive 96-well plate grid (8 rows A-H × 12 columns)
- Drag to select multiple wells
- Visual feedback for selected wells
- Label names displayed within wells

### Label Management
- Create labels with custom names and colors
- Edit label names (double-click to edit)
- Change label colors
- Delete labels
- Select labels to apply to wells

### Configuration Saving
- Save complete plate configurations as JSON files
- Files are saved to your downloads folder
- Configurations include:
  * Label definitions (names and colors)
  * Well assignments
  * Creation date and metadata
- Load configurations from saved files
- Easy to share configurations with others
- Backup your configurations by copying the JSON files

## Usage Tips

1. **Creating Labels**
   - Enter a label name
   - Choose a color
   - Click "Add Label"

2. **Applying Labels**
   - Select a label from the list
   - Click and drag across wells to apply
   - Double-click label names to edit them

3. **Saving Configurations**
   - Enter a configuration name
   - Click "Save Configuration to File"
   - The file will be saved to your downloads folder as `[configuration_name]_plate_config.json`

4. **Loading Configurations**
   - Click "Load Configuration from File"
   - Select a previously saved configuration file
   - Confirm to replace current setup

## File Management

### Configuration Files
- Format: JSON
- Location: Your downloads folder
- Filename format: `[configuration_name]_plate_config.json`
- Portable: Can be moved, shared, or backed up
- Contains:
  * Label definitions
  * Well assignments
  * Creation date
  * Configuration name

### Sharing Configurations
You can share your plate configurations with others by:
1. Sending them the JSON configuration file
2. Having them use the "Load Configuration from File" option
3. All label and well data will be exactly reproduced

## Technical Requirements

- Node.js installed on your system
- Modern web browser (Chrome, Firefox, Edge recommended)
- Write access to downloads folder

## Development

To manually start the application:
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser to `http://localhost:5173`

## Troubleshooting

### Starting the Application
- In Command Prompt, use: `start.bat`
- In PowerShell, use: `.\start.bat`
- Make sure you're in the correct directory
- Ensure Node.js is installed and in your PATH

### Configuration Files
- Check your downloads folder for saved configurations
- Look for files ending in `_plate_config.json`
- Make sure your browser is set to save downloads to the correct location

### Common Issues
- If dependencies fail to install, try running `npm install` manually
- If the browser doesn't open automatically, navigate to `http://localhost:5173`
- If the port is in use, check the terminal for the alternate port number
