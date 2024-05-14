import React from "react";

const HotelDetail = ({ detail }) => {
  return (
    <section className="page-detail hotel-page">
      <h1>{detail.title}</h1>
      <p>{detail.description}</p>
      <address>Address: {detail.address}</address>
    </section>
  );
};

export default HotelDetail;
