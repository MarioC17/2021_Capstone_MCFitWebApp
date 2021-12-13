import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./ExerciseSearch.css";


    /*
    PURPOSE: Search field for finding exercises based on user search
    PARAMS: None
    RETURNS: A filtered list pertaining to the searched item
    PRE: None
    */
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
      <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <input
          type="text"
          placeholder= "Find Exercise"
          value={wordEntered}
          onChange={handleFilter}
        />
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