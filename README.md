# USGS: Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## The Task

### Data Sets

For Longitude & Latitude:<br>
This was retrieved from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. From there, I picked the 'All Earthquakes from the Past 7 Days' JSON.

For Tectonic Plates:<br>
The data set was retrieved [here](https://github.com/fraxen/tectonicplates).

### Step 1: Basic Visualization

**Import & Visualize the Data**

My first task was to visualize an earthquake data set. I created a map using Leaflet that plots all of the earthquakes from my data set based on their longitude and latitude. The goals were to:

   * Make data markers reflect the magnitude of the earthquake in their size and color so that earthquakes with higher magnitudes appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

Visual:
- - -

### Step 2: More Data

The USGS also wanted me to plot a second data set on my map to illustrate the relationship between tectonic plates and seismic activity. I will need to pull in the tectonic plates data set and visualize it along side my original set of data. The goals were to: 

   * Plot a second data set on my map.

   * Add a number of base maps to choose from as well as separate out my two different data sets into overlays that can be turned on and off independently.

   * Add layer controls to my map.
   
Visual:
- - -

### Copyright

Trilogy Education Services © 2019. All Rights Reserved.
