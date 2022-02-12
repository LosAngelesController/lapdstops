import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';


import Nav from '../components/nav'

import React, {useEffect,  useState} from 'react';

import { uploadMapboxTrack } from '../components/mapboxtrack';
 
const councildistricts = require('./CouncilDistricts.json')
const citybounds = require('./citybounds.json')
import * as turf from '@turf/turf'

    // added the following 6 lines.
    import mapboxgl from 'mapbox-gl';

       import { assertDeclareExportAllDeclaration } from '@babel/types';


var raceoptions = [
  {
    code: 'h',
    title: "Hispanic/Latino",
    count: 212760
  }, {
    code: 'b',
    title: "Black/African American",
    count: 111714
  },
  {
    code: 'w',
    title: "White",
    count: 68181
  },
  {
    code: 'm',
    title: "Middle Eastern / South Asian",
    count: 17480
  },
  {
    code: 'a',
    title: "Asian",
    count:  12656
  },
  {
    code: 'p',
    title: "Pacific Islander",
    count: 866
  },
  {
    code: 'n',
    title: 'Native American',
    count: 260
  }
]
var total = 423917;

var mapglobal:any = null;

const Home: NextPage = () => {


  var [filterOpen,setFilterOpen] = useState(false)

  
  var [filterrace,setfilterrace] = useState('all')
  
  var [filtercount,setfiltercount] = useState(0)

  



  function filterraceaction (racecode:string)  {
    if (mapglobal) {
      console.log('filter by:"' + racecode + '"')
    mapglobal.setFilter('lapdstops-heat', [
      "all",
      [
        "match",
        ["get", "﻿race"],
        [racecode],
        true,
        false
      ]
    ]);
    }
  }
  
  function clearraceaction (racecode:string) {
    if (mapglobal) {
    mapglobal.setFilter('lapdstops-heat', ['!=', 'race', 'helloworld']);
    }
  }

  function pwnMapboxLogo() {
    var querylogo = document.querySelector('mapboxgl-ctrl-logo');

    if (querylogo) {
      querylogo.remove()
    }
  }

  function checkHideOrShowTopRightGeocoder() {
    var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right")
   if (toprightbox) {
    var toprightgeocoderbox:any = toprightbox.querySelector(".mapboxgl-ctrl-geocoder");
    if (toprightgeocoderbox) {
      if (window.innerWidth >= 768) {
        console.log('changing to block')
        toprightgeocoderbox.style.display = 'block'
      } else {
        toprightgeocoderbox.style.display = 'none'
        console.log('hiding')
      }
    }
   }
  }

  const handleResize = () => {
    checkHideOrShowTopRightGeocoder()

  
  }

  var population = {
    h: 1992409,
    w: 1129956,
    n: 6374,
    a: 454688,
    p: 5103,
    o: 1476
  }

  var totalpop = 3979537


  const divRef:any = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    

        console.log('map div', divRef)

        if (divRef.current) {
          console.log('app render')
        }

       // mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//import locations from './features.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiY29tcmFkZWt5bGVyIiwiYSI6ImNrdjBkOXNyeDdscnoycHE2cDk4aWJraTIifQ.77Gid9mgpEdLpFszO5n4oQ';
 
const formulaForZoom = () => {
  if (window.innerWidth > 700) {
    return 10
  } else { 
    return 9.1
  }
}


var mapset:any = {
  container: divRef.current, // container ID
 // style: 'mapbox://styles/comradekyler/ckyrsd7w30zm615lqzzpkrpbv', // style URL
 style: 'mapbox://styles/comradekyler/ckz3k4qyp000815osuyr0hdfx?optimize=true',
  center: [-118.41,34], // starting position [lng, lat]
  zoom: formulaForZoom() // starting zoom,
}

const map = new mapboxgl.Map(mapset);

mapglobal = map

 
var rtldone=false;

try {
if (rtldone  === false) {
  //multilingual support
//right to left allows arabic rendering
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js', (callbackinfo:any) => {
  console.log(callbackinfo);
  rtldone = true;
});
}

const language = new MapboxLanguage();
map.addControl(language);

}

catch (error) {
  console.error(error)
}
const geocoder:any = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: map,
  proximity: {
    longitude: -118.41,
    latitude: 34
  },
  marker: true
  });

  var colormarker = new mapboxgl.Marker({
    color: '#41ffca'
  });

  const geocoderopt:any = 
    {
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {
        color: '#41ffca'
      }
      }
  

  const geocoder2 = new MapboxGeocoder(geocoderopt);
  const geocoder3 = new MapboxGeocoder(geocoderopt);


 
     
geocoder.on('result', (event:any) => {
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(event.result.geometry);
  console.log('event.result.geometry',event.result.geometry)
  console.log('geocoderesult', event)
});

geocoder.on('select', function(object:any){
  var coord = object.feature.geometry.coordinates;
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(object.feature.geometry);
});

var geocoderId = document.getElementById('geocoder')



if (geocoderId) {
  console.log(
  'geocoder div found'
  )

  if (!document.querySelector(".geocoder input")) {
    geocoderId.appendChild(geocoder3.onAdd(map));

    var inputMobile = document.querySelector(".geocoder input");

    try {
      var loadboi =  document.querySelector('.mapboxgl-ctrl-geocoder--icon-loading')
      if (loadboi) {
        var brightspin:any = loadboi.firstChild;
     if (brightspin) {
      brightspin.setAttribute('style', 'fill: #e2e8f0');
     }
     var darkspin:any = loadboi.lastChild;
     if (darkspin) {
      darkspin.setAttribute('style', 'fill: #94a3b8');
     }
      }
     
    } catch (err) {
      console.error(err)
    }
  
    if (inputMobile) {
      inputMobile.addEventListener("focus", () => {
        //make the box below go away
       
        });
    }
  }


geocoder.on('result', (event:any) => {
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(event.result.geometry);
  console.log('event.result.geometry',event.result.geometry)
  console.log('geocoderesult', event)
});

geocoder.on('select', function(object:any){
  var coord = object.feature.geometry.coordinates;
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(object.feature.geometry);
});
}


window.addEventListener('resize',  handleResize);  

  var parkingmapcolor:any =  [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(0, 0, 255, 0)",
    0.1,
    "royalblue",
    0.3,
    "cyan",
    0.67,
    "hsl(60, 100%, 50%)",
    1,
    "red"
  ]

  var lakerscolor: any = [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(0, 0, 255, 0)",
    0.1,
    "rgba(254, 253, 55, 30)",
    0.4,
    "#faed27",
    0.75,
    "#b026ff"
  ]
map.on('load', () => {

  pwnMapboxLogo()

  const layers = map.getStyle().layers;
 // console.log('layers', layers)

    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.

    map.addSource('lapdstops', {
      'type': 'vector',
      'url': 'mapbox://comradekyler.5nspav9m'
      });
    map.addLayer(
      {
      'id': 'lapdstops-heat',
      'type': 'heatmap',
      'source': 'lapdstops',
'source-layer': 'byracelapdstops2021min-0qnui2',
      'paint': {
      // Increase the heatmap weight based on frequency and property magnitude
      'heatmap-weight': [
        "/",
        [
          "sqrt",
          [
            "to-number",
            ["get", "stops"]
          ]
        ],
        20
      ],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      'heatmap-intensity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0.05,
        7.74,
        0.2,
        9.17,
        0.5,
        11.55,
        1.5,
        12.75,
        1.8,
        16.19,
        2,
        22,
        2
      ],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      'heatmap-color': parkingmapcolor,
      // Adjust the heatmap radius by zoom level
      'heatmap-radius': [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        5.2,
        1,
        10.01,
        5,
        11.59,
        8,
        13.7,
        15,
        16.02,
        50,
        16.76,
        50,
        22,
        80
      ],
      // Transition from heatmap to circle layer by zoom level
      'heatmap-opacity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0.69,
        12.11,
        0.7,
        15,
        0.64,
        22,
        0.52
      ]
      }
      },
      'building-outline'
      );



if (! document.querySelector(".mapboxgl-ctrl-top-right > .mapboxgl-ctrl-geocoder")) {
  map.addControl(
    geocoder2
    );
}




 checkHideOrShowTopRightGeocoder()

 if (true) {
  map.addLayer({
    id: 'citybound',
    type: 'line',
    source: {
      type: 'geojson',
      data:  citybounds
    },
    paint: {
      "line-color": '#41ffca',
      'line-opacity': 1,
      'line-width': 3
    }
  })

 




  map.addLayer({
    id: 'cityboundfill',
    type: 'fill',
    source: {
      type: 'geojson',
      data:  citybounds
    },
    paint: {
      'fill-color': '#dddddd',
      'fill-opacity': 0.02
    }
  })
}

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
     
  // Add geolocate control to the map.
  map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
  );

  checkHideOrShowTopRightGeocoder()
});

map.on('dragstart', (e) => {
uploadMapboxTrack({
  mapname: 'lapdstops',
  eventtype: 'dragstart',
  globallng: map.getCenter().lng,
  globallat: map.getCenter().lat,
  globalzoom: map.getZoom()
})
})

map.on('dragend', (e) => {
  uploadMapboxTrack({
    mapname: 'lapdstops',
    eventtype: 'dragend',
    globallng: map.getCenter().lng,
    globallat: map.getCenter().lat,
    globalzoom: map.getZoom()
  })
  })

  map.on('zoomstart', (e) => {
    uploadMapboxTrack({
      mapname: 'lapdstops',
      eventtype: 'dragstart',
      globallng: map.getCenter().lng,
      globallat: map.getCenter().lat,
      globalzoom: map.getZoom()
    })
    })

    map.on('zoomend', (e) => {
      uploadMapboxTrack({
        mapname: 'lapdstops',
        eventtype: 'zoomend',
        globallng: map.getCenter().lng,
        globallat: map.getCenter().lat,
        globalzoom: map.getZoom()
      })
      })
       

  }, [])

  return (
  
  <div className='flex flex-col h-full w-screen absolute'>
      <Head>
     <meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
<meta
name="description"
content="Heatmap of LAPD stops in 2021, with Filter options by Race."
/>
<title>LAPD 2021 Stops Los Angeles Interactive Map - Mejia For Controller</title>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@kennethmejiala"/>
<meta name="twitter:creator" content="@kennethmejiala"/>
<meta name="twitter:title" content="LAPD 2021 Stops Los Angeles Interactive Map"/>
<meta name="twitter:description" content="Heatmap of LAPD stops in 2021, Filter stops by Race."/>
<meta name="description" content="Heatmap of LAPD stops in 2021, filter stops by Race." />
<meta name="twitter:image" content="https://dev.lapdstops.mejiaforcontroller.com/previewmin.png"/>
<link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-32x32.png" sizes="32x32"/>
<link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-192x192.png" sizes="192x192"/>
<link rel="apple-touch-icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-180x180.png"/> 
<meta name="msapplication-TileImage" content="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-270x270.png"/>


<meta property="og:url"                content="https://lapdstops.mejiaforcontroller.com" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="LAPD 2021 Stops Los Angeles Interactive Map" />
<meta property="og:description"        content="Heatmap of LAPD stops in 2021, Filter stops by Race." />
<meta property="og:image"              content="https://dev.lapdstops.mejiaforcontroller.com/previewmin.png" />

<script defer={true} src="https://helianthus.mejiaforcontroller.com/index.js"></script>
      </Head>
   
  <div className='flex-none'>
    <Nav/>
  </div>
           
  <div
      className='flex-initial h-content outsideTitle flex-col flex z-50'
    >
<div className='titleBox  fixed mt-[3.5em] ml-1.5 md:mt-[3.7em] md:ml-3 break-words
text-lg px-2 py-1  bg-opacity-90 text-base md:text-md font-bold
'><span>
  LAPD Stops 2021</span></div>

  <div
  onClick={e => {
    setFilterOpen(false)
  }}
    className={`geocoder -ml-0.5 md:hidden  mt-[6.7em] sm:mt-[5.5em] md:mt-[6.6em] xs:text-sm sm:text-base md:text-lg`} id='geocoder'></div>
</div>



{
  filterOpen === false && (
    <div className='mt-[9.4em] md:mt-[3em] fixed z-50'>
  <button
  style={{
    background: '#212128dd',
    color: '#efefef'
  }}

  onClick={e => {
    setFilterOpen(true)
  }}
  className='border-2 border-truegray-100 rounded-full z-20 ml-2 md:mt-[3.6em]  md:ml-3 px-2 py-1 md:px-3 bg-opacity-100'>Filter by Race</button>
</div>
  )
}

{
  filterOpen === true && (
    <div className='mt-[9.4em] md:mt-[3em] fixed z-50 md:ml-0'>
      <div 
       style={{
        color: '#efefef',
        borderColor: '#d1d5db'
      }}
      className='bg-truegray-900 font-semibold rounded-none border-t-2 md:border-t-1 md:border-b-2 md:border-x-2 rounded-full z-20 
      fixed bottom-0 md:max-w-screen-sm md:static md:max-w-16 md:block md:mt-[3.6em] md:ml-3 px-2 py-1 md:bg-opacity-90'>
        
       <div className='flex flex-row h-6'>

    <div className='grow'>
    {
        filterrace === 'all' && (
        <span>
           423,917 Total Stops
        </span>
        )
      }




{
        filterrace !== 'all' && (
        <span>
         {filtercount.toLocaleString()} of 423,917 Stops ({((filtercount/total)  * 100).toFixed(2) + '%'})
        </span>
        )
      }
    </div>

    <div className=''
    onClick={e => {
      setFilterOpen(false)
    }}
    >
<svg className='w-8 h-8 text-white' viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
</svg>

</div>

      </div>


 

  <span className='font-semibold'>Filter by Race</span>
<br/>
      <div className='flex flex-row flex-wrap gap-1 md:gap-1.5
      '>
      <button className={`text-sm md:text-base px-2 rounded-xl border-white  ${filterrace === 'all' ? 'border-mejito border-2' : "border"}`}
           onClick={e => {
             setfilterrace('all')
             clearraceaction('hi')
           }}
           >
             {
               <span>All</span>
             }
           </button>

      {
        raceoptions.map((eachItem) => (
           <button
           key={eachItem.code}
           className={`text-sm md:text-base px-2 rounded-xl border-white  ${filterrace === eachItem.code ? 'border-mejito border-2' : "border"}`}
           onClick={e => {
             setfilterrace(eachItem.code)
             setfiltercount(eachItem.count)

             filterraceaction(eachItem.code)
           }}
           >
             {
               eachItem.title
             }
           </button>
  ))
      }

      </div>

      </div>
</div>
  )
}

<div ref={divRef} style={{

}} className="map-container w-full h-full " />
        
     
     <div className={`absolute md:mx-auto z-9 bottom-2 left-1 md:left-1/2 md:transform md:-translate-x-1/2`}>
<a href='https://MejiaForController.com/' target="_blank" rel="noreferrer">
    
  
                  <img src='/mejia-watermark-smol.png' className='h-9 md:h-10' alt="Kenneth Mejia for LA City Controller Logo"/>
                  
    </a>
  
                </div>

    </div>
  )
}

export default Home;
