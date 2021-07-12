import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/face.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 5]
  })

  export default mapIcon;