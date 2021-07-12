import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import markerMapImg from '../images/face.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

import api from '../services/api';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

function OrphanagesMap() {

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    function getOrphanages() {
        api.get('listOrphanages/').then( res => {
            setOrphanages(res.data)
        })
    }

    useEffect(() => {
        getOrphanages();
    }, [])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={markerMapImg} alt="Happy"></img>
                    
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                   <strong>Rio de Janeiro,</strong>
                   <span>RJ</span>
                </footer>
            </aside>

            <MapContainer 
                center={[-22.9694925,-43.2192887]}
                zoom={15}
                style={{width:'100%', height:'100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                {
                    orphanages.map( orphanage => {
                        return(
                            <Marker 
                                key={orphanage.id}
                                icon={mapIcon}
                                position={[orphanage.latitude,orphanage.longitude]}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })
                }

            </MapContainer>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color='#fff'/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;