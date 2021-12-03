import React, { useState } from "react";
import "./ExerciseSearch.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
function ExerciseSearch(props) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const onClick = (e,value) => {
    setWordEntered(value.name)
    setFilteredData([]);
    props.setFormData({...props.formData,['exercise']: value.exercise_id});
    }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = props.data.filter((value) => {  
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (

    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder= "Find Exercise"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            
            return (
              <a className="dataItem" target="_blank" >
                <p onClick={e => onClick(e,value)}> {value.exercise_id,value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExerciseSearch;