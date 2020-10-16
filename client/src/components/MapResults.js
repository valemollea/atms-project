import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={15}
      initialCenter={{
        lat: props.currentLocation.lat,
        lng: props.currentLocation.long
      }}
    >
      {props.results.map(atm => {
          return (
            <Marker
              title={atm.banco}
              name={atm.banco}
              key={atm.id}
              position={{ lat: atm.lat, lng: atm.long }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )
        })
      }
      <Marker
        title={'Usted está aquí'}
        name={'SOMA'}
        position={{ lat: props.currentLocation.lat, lng: props.currentLocation.long }}
        icon={{
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        }}
      />
    </Map>
  );
}

const MapContainerWrapper = GoogleApiWrapper({
  apiKey: ('') //Add your api key
})(MapContainer);

export default MapContainerWrapper;