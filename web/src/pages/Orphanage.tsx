import React, { useEffect, useState } from "react";
import { FaImages, FaOilCan, FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    url: string,
    id: number,
  }>,
}

interface Params {
  id: string,
}

export default function Orphanage() {
  const params = useParams<Params>();
  const [ orphanage, setOrphanage ] = useState<Orphanage>();
  const [ activeImageIndex, setActiveImageIndex ] = useState(0);
  
  function getOrphanage() {
    api.get(`showOrphanage/${params.id}`).then( res => {
      setOrphanage(res.data)
    })
  }
  
  useEffect(() => {
    getOrphanage();
  }, [params.id])
  
  if(!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {
              orphanage.images.map( (image, index) => {
                return(
                  <div key={image.id}>
                    {
                      activeImageIndex == index ?
                      <button className="active" type="button">
                        <img src={image.url} alt={orphanage.name} />
                      </button> :
                      <button type="button" onClick={() => setActiveImageIndex(index)}>
                        <img src={image.url} alt={orphanage.name} />
                      </button>
                    }
                  </div>
                );
              })
            }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com.br/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instru????es para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
                {
                  orphanage.open_on_weekends ? 
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div> :
                  <div className="close-on-weekends">
                    <FiInfo size={32} color="#cc3945" />
                    N??o atendemos <br />
                    fim de semana
                  </div>
                }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}