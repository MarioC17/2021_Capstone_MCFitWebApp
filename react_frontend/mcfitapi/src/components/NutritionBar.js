import SearchIcon from "@mui/icons-material/Search";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { foodSearch } from "../actions/fat-secret";
//Stylesheet
import "./NutritionBar.css";


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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const NutritionSearchBar = (props) => {
  // main data
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [foodId, setFoodId] = useState(null);

  // auto complete
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // reset input values
  const updateInputValue = (value) => {
    setSearchTerm(value);
    if (!startTyping) {
      setInput(value);

      setCount(0);
      setCalories(0);
      setCarbs(0);
      setFats(0);
      setProteins(0);
    }
  };

  useEffect(() => {
    setCalories(setFixedValue(props.itemData.calories));
    setCarbs(setFixedValue(props.itemData.carbs));
    setFats(setFixedValue(props.itemData.fats));
    setProteins(setFixedValue(props.itemData.proteins));
    setInput(props.itemData.input);
    setCount(props.itemData.count);
    setFoodId(props.itemData.foodId);
  }, [props.nutritionsLoading]);

  // start searching
  useEffect(() => {
    setFilteredSuggestions([]);
    setStartTyping(true);

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        props.foodSearch(searchTerm);
        setStartTyping(false);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      }
    }, 500); //wait for 0.5 seconds

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // set suggestions
  useEffect(() => {
    if (!props.loading && props.searchResult) {
      let suggestions = [];
      if (props.searchResult.food) {
        suggestions = props.searchResult.food;
      }

      setFilteredSuggestions(suggestions);
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);
    }
  }, [props.loading]);

  // pass nutrition Bar data to parent component
  useEffect(() => {
    if (foodId && input) {
      props.passNutritionBarData({
        foodId: foodId,
        input: input,
        count: count,
        calories: calories,
        carbs: carbs,
        fats: fats,
        proteins: proteins,
      });
    }
  }, [count]);

  // update values on count change
  const updateNutritionalValues = (value) => {
    if (foodId && input) {
      let nutritionalValues;

      if (props.itemData.foodId != 0) {
        nutritionalValues = getNutritionalItemValues();
      } else if (props.searchResult) {
        nutritionalValues = getNutritionalValues(
          props.searchResult.food[activeSuggestionIndex].food_description
        );
      }

      if (value >= 0 && nutritionalValues) {
        setCount(value);
        setCalories(setFixedValue(value * nutritionalValues.calories));
        setCarbs(setFixedValue(value * nutritionalValues.carbs));
        setFats(setFixedValue(value * nutritionalValues.fats));
        setProteins(setFixedValue(value * nutritionalValues.proteins));
      }
    }
  };

  const getNutritionalItemValues = () => {
    return {
      calories: setFixedValue(props.itemData.calories / props.itemData.count),
      carbs: setFixedValue(props.itemData.carbs / props.itemData.count),
      fats: setFixedValue(props.itemData.fats / props.itemData.count),
      proteins: setFixedValue(props.itemData.proteins / props.itemData.count),
    };
  };

  // get values from description
  const getNutritionalValues = (food_description) => {
    let nutritionalDesc = food_description.split("-")[1];
    let nutritionalValues = nutritionalDesc.split("|");
    let calories = nutritionalValues[0].split(":")[1].trim().slice(0, -4);
    let carbs = nutritionalValues[1].split(":")[1].trim().slice(0, -1);
    let fats = nutritionalValues[2].split(":")[1].trim().slice(0, -1);
    let proteins = nutritionalValues[3].split(":")[1].trim().slice(0, -1);
    return {
      calories: setFixedValue(calories),
      carbs: setFixedValue(carbs),
      fats: setFixedValue(fats),
      proteins: setFixedValue(proteins),
    };
  };

  // set to 2 fixed decimal
  const setFixedValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  // on search option click
  const onOptionClick = (e, suggestion, index) => {
    let nutritionalValues = getNutritionalValues(suggestion.food_description);
    setFoodId(suggestion.food_id);
    setCount(1);
    setCalories(nutritionalValues.calories);
    setCarbs(nutritionalValues.carbs);
    setFats(nutritionalValues.fats);
    setProteins(nutritionalValues.proteins);

    setFilteredSuggestions([]);
    setActiveSuggestionIndex(index);
    setShowSuggestions(false);

    setInput(e.target.innerText);
    setSearchTerm("");
  };

  // auto complete dropdown
  const SuggestionsListComponent = () => {
    if (!props.loading && !startTyping) {
      if (filteredSuggestions.length) {
        return (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              // Flag the active suggestion with a class
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }
              return (
                <li
                  className={className}
                  key={suggestion.food_id}
                  onClick={(e) => onOptionClick(e, suggestion, index)}
                >
                  {suggestion.food_name + " (" + suggestion.food_type + ")"}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    } else {
      return (
        <div class="no-suggestions">
          <em>Searching</em>
        </div>
      );
    }
  };

  return (
    <div class="meal-row">
      <div class="meal-input">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="type any food, drink, snack, etc"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => updateInputValue(e.target.value)}
            value={searchTerm || input}
          />
          {showSuggestions && searchTerm && <SuggestionsListComponent />}
        </Search>
      </div>
      <div class="meal-count">
        <TextField
          id="outlined-number"
          label="Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={count}
          onChange={(e) => updateNutritionalValues(e.target.value)}
        />
      </div>
      <div class="meal-stats">
        <FilledInput
          id="calories"
          sx={{ m: 1, width: "15ch" }}
          // value={values.weight}
          // onChange={handleChange('weight')}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={calories}
        />

        <FilledInput
          id="carbs"
          sx={{ m: 1, width: "15ch" }}
          // value={values.weight}
          // onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">g</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={carbs}
        />

        <FilledInput
          id="fats"
          sx={{ m: 1, width: "15ch" }}
          // value={values.weight}
          // onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">g</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={fats}
        />

        <FilledInput
          id="proteins"
          sx={{ m: 1, width: "15ch" }}
          // value={values.weight}
          // onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">g</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={proteins}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.fatSecret.searchResult,
    loading: state.fatSecret.loading,
    nutritionsLoading: state.fatSecret.nutritionsLoading,
  };
};
export default connect(mapStateToProps, { foodSearch })(NutritionSearchBar);
