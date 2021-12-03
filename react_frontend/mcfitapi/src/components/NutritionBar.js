import React, { Component } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

//Search const is modified template from MUI
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: '100%',
    },
  }));

export class NutritionSearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        calories: 0,
        carbs: 0,
        fats: 0,
        protiens: 0,
      };
    }
    render() {
      
        return (
          <div className="meal-row">
            <div className="meal-input"><Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="type any food, drink, snack, etc"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search></div>
            <div className="meal-count">
              <TextField
                id="outlined-number"
                label="Count"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
              />
            </div>
            <div className="meal-stats">
              <FilledInput
                id="calories"
                sx={{ m: 1, width: '15ch' }}
                // value={values.weight}
                // onChange={handleChange('weight')}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />

              <FilledInput
                id="carbs"
                sx={{ m: 1, width: '15ch' }}
                // value={values.weight}
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />

              <FilledInput
                id="fats"
                sx={{ m: 1, width: '15ch' }}
                // value={values.weight}
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />

              <FilledInput
                id="protiens"
                sx={{ m: 1, width: '15ch' }}
                // value={values.weight}
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </div>
          </div>
        )
    }
}

export default NutritionSearchBar
