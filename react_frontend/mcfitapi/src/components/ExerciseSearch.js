import React, { useState } from "react";
import "./ExerciseSearch.css";
import SearchIcon from "@material-ui/icons/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
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

  //Search const is modified template from MUI
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

  return (

    <div className="search">
      <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Find Exercise"
            inputProps={{ "aria-label": "search" }}
            onChange={handleFilter}
            value={wordEntered}
          />
          <div style={{position: 'absolute'}}>{filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            
            return (
              <a className="dataItem" target="_blank" >
                <p onClick={e => onClick(e,value)}> {value.exercise_id,value.name} </p>
              </a>
            );
          })}
        </div>
      )}</div>
        </Search>

      
    </div>
  );
}

export default ExerciseSearch;