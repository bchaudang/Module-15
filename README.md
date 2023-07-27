# Module-15
HTML/JavaScript Challenge
------
## Part 1: Create the Earthquake Visualization
1. Get your dataset. To do so, follow these steps:
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. 
- When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.
2. Import and visualize the data by doing the following:
- Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
- Include popups that provide additional information about the earthquake when its associated marker is clicked.
- Create a legend that will provide context for your map data.
-----

Resources:
- All Class Activities: primarily used activities from day 1/10, day 3/2
- [leaflet](https://leafletjs.com/examples/geojson/)
- [colours](https://www.w3schools.com/colors/colors_picker.asp)
- [leaflet](https://leafletjs.com/examples/choropleth/)
- [USGS GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)