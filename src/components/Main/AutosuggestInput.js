import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setOptions } from "../../redux/slice/autoSuggestionSlice";
import Options from "./Options";

const AutosuggestInput = () => {
  const hotelsData = useSelector((state) => state.hotelReducer.data);
  const options = useSelector(
    (state) => state.autoSuggestionReducer.inputOptions
  );
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(false);

  /*
   * preparing dropdown options
   **/
  function suggestions(searchQuery, hotelsData) {
    dispatch(setOptions({ loading: true }));
    // preparing title and id list
    const names = hotelsData.hotels.map((hotel) => ({
      name: hotel.title,
      id: hotel.hotelID,
    }));

    // filtering out hotel elements matching with search query
    const filteredNames = names.filter((hotel) => {
      const name = hotel.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    });

    // getting places from google places api
    axios
      .get(process.env.API_BASE_URL + "/searchPlace", {
        params: {
          query: searchQuery,
        },
      })
      .then(function (response) {
        const locationList = response.data.map((location) => ({
          name: location.name,
          id: location.place_id,
        }));
        const data = { locations: locationList, hotels: filteredNames };
        dispatch(setOptions({ loading: false, ...data }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  React.useEffect(() => {
    if (value !== "") {
      setShow(true);
      suggestions(value, hotelsData);
    } else {
      setShow(false);
    }
  }, [value]);

  return (
    <section className="autosuggest-input">
      <input
        type="text"
        placeholder="Autosuggest"
        value={value}
        style={{ width: "100%" }}
        onChange={(e) => setValue(e.target.value)}
        className="text-input"
      />
      {show && (
        <div className="autosuggest-options">
          {!options.loading ? (
            <>
              {options.locations.length > 0 && (
                <Options
                  list={options.locations}
                  title={"Locations"}
                  setShow={setShow}
                  setValue={setValue}
                />
              )}
              {options.hotels.length > 0 && (
                <Options
                  list={options.hotels}
                  title={"Hotels"}
                  setShow={setShow}
                  setValue={setValue}
                />
              )}
            </>
          ) : (
            "...loading"
          )}
        </div>
      )}
    </section>
  );
};

export default AutosuggestInput;
