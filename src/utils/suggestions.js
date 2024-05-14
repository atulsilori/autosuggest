import axios from "axios";

function suggestions(searchQuery, hotelsData) {
  const names = hotelsData.hotels.map((hotel) => ({
    title: hotel.title,
    id: hotel.hotelID,
  }));
  console.log("hotelsData names -- ", names);
  const filteredNames = names.filter((name) =>
    name.title.includes(searchQuery)
  );

  axios
    .get("http://localhost:3000/searchPlace", {
      params: {
        query: searchQuery,
      },
    })
    .then(function (response) {
      const data = { locations: response.data, hotels: filteredNames };
      console.log("suggestions data -- ", data);
      return data.json();
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
      return [];
    });
}

export default suggestions;
