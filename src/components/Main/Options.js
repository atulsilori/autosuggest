import React from "react";
import { useDispatch } from "react-redux";

import { setSelectedOptions } from "../../redux/slice/autoSuggestionSlice";

const Options = ({ list, title, setShow, setValue }) => {
  const dispatch = useDispatch();

  return (
    <div className="option-container">
      <div className="option-group-title">{title}</div>
      <div className="option-group-options">
        {list.map((option) => {
          return (
            <div
              className="option"
              onClick={() => {
                dispatch(setSelectedOptions({ type: title, id: option.id }));
                setShow(false);
                setValue("");
              }}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
