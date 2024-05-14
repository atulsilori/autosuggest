import React from "react";

const LocationDetail = ({ detail }) => {
  return (
    <section className="page-detail hotel-page">
      <h1>{detail.name}</h1>
      <iframe
        title="Map"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        src={
          "https://www.google.com/maps/embed/v1/place?key=" +
          process.env.GOOGLE_MAP_API_KEY +
          "&q=place_id:" +
          detail.place_id
        }
      ></iframe>
      <address>Address: {detail.formatted_address}</address>
    </section>
  );
};

export default LocationDetail;
