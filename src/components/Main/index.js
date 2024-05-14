import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import AutosuggestInput from "./AutosuggestInput";
import HotelDetail from "./detailPage/HotelDetail";
import LocationDetail from "./detailPage/LocationDetail";

import "../../styles/main.scss";

const Main = () => {
  const [details, setDetails] = React.useState({ loading: false, data: null });

  const hotelsData = useSelector((state) => state.hotelReducer.data);
  const selectedOption = useSelector(
    (state) => state.autoSuggestionReducer.selectedOption
  );

  React.useEffect(() => {
    if (selectedOption.id !== "") {
      if (selectedOption.type === "Locations") {
        setDetails((prev) => ({ ...prev, loading: true }));
        axios
          .get(process.env.API_BASE_URL + "/getPlaceDetail", {
            params: {
              placeId: selectedOption.id,
            },
          })
          .then((response) => {
            setDetails({ loading: false, data: response.data });
          });
      } else if (selectedOption.type === "Hotels") {
        const detail = hotelsData.hotels.find(
          (hotel) => hotel.hotelID === selectedOption.id
        );
        setDetails({ loading: false, data: detail });
      }
    }
  }, [selectedOption.id]);

  return (
    <main className="main-container">
      <AutosuggestInput />
      {!details.loading &&
        details.data !== null &&
        selectedOption.type === "Hotels" && (
          <HotelDetail detail={details.data} />
        )}
      {!details.loading &&
        details.data !== null &&
        selectedOption.type === "Locations" && (
          <LocationDetail detail={details.data} />
        )}
      {details.loading && details.data === null && <>{"...loading"}</>}
    </main>
  );
};

export default Main;
