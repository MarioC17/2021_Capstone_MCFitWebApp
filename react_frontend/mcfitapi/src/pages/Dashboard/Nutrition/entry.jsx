import CheckIcon from '@mui/icons-material/Check';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button } from '@mui/material';
import { Box, Modal, TextField, Typography } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchFood, foodSave, load_token, updateBreakfast, updateDinnerData, updateLunchData, updateMacroNutrients, updateSnackData } from '../../../actions/fat-secret';
import NutritionBar from '../../../components/NutritionBar';
import Sidebar from '../../../components/Sidebar';
//Stylesheet
import './entry.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const Entry = (props) => {

    const history = useHistory();

    const [value, setValue] = React.useState(props.selectedDate);

    const updateSelectedDate = (value) => {
        setValue(value);
        props.fetchFood(value.toISOString().split("T")[0]);
    }
    
    const breakfastComponent = {
        calories: 0,
        carbs: 0,
        count: 0,
        fats: 0,
        foodId: 0,
        foodType: "breakfast",
        input: "",
        proteins: 0,
    };

    const snackComponent = {
        calories: 0,
        carbs: 0,
        count: 0,
        fats: 0,
        foodId: 0,
        foodType: "snack",
        input: "",
        proteins: 0,
    };

    const lunchComponent = {
        calories: 0,
        carbs: 0,
        count: 0,
        fats: 0,
        foodId: 0,
        foodType: "lunch",
        input: "",
        proteins: 0,
    };

    const dinnerComponent = {
        calories: 0,
        carbs: 0,
        count: 0,
        fats: 0,
        foodId: 0,
        foodType: "dinner",
        input: "",
        proteins: 0,
    };

    useEffect(() => {
        props.load_token();
        props.fetchFood(props.selectedDate);
    }, []);

    useEffect(() => {
        props.updateMacroNutrients([...props.breakfastData, ...props.snackData, ...props.lunchData, ...props.dinnerData]);
    }, [props.breakfastData, props.snackData, props.lunchData, props.dinnerData]);

    const updateBreakfastData = (data) => { 
        let breakfastData = {
            ...data,
            foodType: "breakfast",
        };
        const index = props.breakfastData.findIndex((e) => e.foodId === breakfastData.foodId);
        if (index === -1) {
            props.updateBreakfast([...props.breakfastData, breakfastData]);
        } else {
            const updatedData = [...props.breakfastData];
            updatedData[index] = breakfastData;
            props.updateBreakfast(updatedData);
        }
    }

    const updateSnackData = (data) => { 
        let snackData = {
            ...data,
            foodType: "snack",
        };
        const index = props.snackData.findIndex((e) => e.foodId === snackData.foodId);
        if (index === -1) {
            props.updateSnackData([...props.snackData, snackData]);
        } else {
            const updatedData = [...props.snackData];
            updatedData[index] = snackData;
            props.updateSnackData(updatedData);
        }
    }

    const updateLunchData = (data) => { 
        let lunchData = {
            ...data,
            foodType: "snack",
        };
        const index = props.lunchData.findIndex((e) => e.foodId === lunchData.foodId);
        if (index === -1) {
            props.updateLunchData([...props.lunchData, lunchData]);
        } else {
            const updatedData = [...props.lunchData];
            updatedData[index] = lunchData;
            props.updateLunchData(updatedData);
        }
    }
    
    const updateDinnerData = (data) => { 
        let dinnerData = {
            ...data,
            foodType: "snack",
        };
        const index = props.dinnerData.findIndex((e) => e.foodId === dinnerData.foodId);
        if (index === -1) {
            props.updateDinnerData([...props.dinnerData, dinnerData]);
        } else {
            const updatedData = [...props.dinnerData];
            updatedData[index] = dinnerData;
            props.updateDinnerData(updatedData);
        }
    }


    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });
      
      const [Bcomponents, setBComponents] = useState([breakfastComponent]);   
      function addSearchBreakfast() { 
        setBComponents([...Bcomponents, breakfastComponent]) 
      } 
  
      const [Scomponents, setSComponents] = useState([snackComponent]);
      function addSearchSnack() { 
        setSComponents([...Scomponents, snackComponent])  
      } 

      const [Lcomponents, setLComponents] = useState([lunchComponent]); 
      function addSearchLunch() { 
        setLComponents([...Lcomponents, lunchComponent])  
      } 
  
      const [Dcomponents, setDComponents] = useState([dinnerComponent]);
      function addSearchDinner() { 
        setDComponents([...Dcomponents, dinnerComponent])  
      } 

      useEffect(() => {
        if(!props.nutritionsLoading) {
            // if(props.breakfastData.length > 0) {
                setBComponents([...props.breakfastData, breakfastComponent]);
            // }
            // if(props.snackData.length > 0) {
                setSComponents([...props.snackData, snackComponent]); 
            // }
            // if(props.lunchData.length > 0) {
                setLComponents([...props.lunchData, lunchComponent]);
            // }
            // if(props.dinnerData.length > 0) {
                setDComponents([...props.dinnerData, dinnerComponent]);
            // }
        }
    }, [props.nutritionsLoading]);
    
      //saved modal
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => { 
            setOpen(true);
            props.foodSave({
                breakfastData: props.breakfastData, 
                snackData: props.snackData, 
                lunchData: props.lunchData, 
                dinnerData: props.dinnerData, 
                caloriesData: props.caloriesData, 
                carbsData: props.carbsData, 
                fatsData: props.fatsData,
                proteinsData: props.proteinsData,
                selectedDate: props.selectedDate
            });
        };
      const handleClose = () => setOpen(false);

      useEffect(() => {
        if (!props.adding && open) {
            history.push('/nutrition')
            setOpen(false)
        }
      }, [props.adding]);

    return (
        <>
        <Sidebar/>
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="entry-container">
            <div className="nutrition-title">Nutrition</div>
            <div className="progress-breakdown">
                <div className="breakdown-current">
                    <span style={{marginBottom: '10px'}}>Current</span>
                    <div className="breakdown-box">
                        Calories<br/>
                        {props.caloriesData}<br/>
                        kcal
                    </div>
                    <div className="breakdown-box">
                        Carbs<br/>
                        {props.carbsData}<br/>
                        gr
                    </div>
                    <div className="breakdown-box">
                        Fats<br/>
                        {props.fatsData}<br/>
                        gr
                    </div>
                    <div className="breakdown-box">
                        Proteins<br/>
                        {props.proteinsData}<br/>
                        gr
                    </div>
                </div>
                <div className="breakdown-target">
                    <span style={{marginBottom: '10px'}}>Target</span>
                    <div className="breakdown-box">
                        Calories<br/>
                        #<br/>
                        cal
                    </div>
                    <div className="breakdown-box">
                        Carbs<br/>
                        #<br/>
                        gr
                    </div>
                    <div className="breakdown-box">
                        Fats<br/>
                        #<br/>
                        gr
                    </div>
                    <div className="breakdown-box">
                        Proteins<br/>
                        #<br/>
                        gr
                    </div>
                </div>
            </div>
            <div className="entry-title">Enter Your Meal</div>
            <div className="mini-calendar">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={value}
                        onChange={(e) => updateSelectedDate(e) }
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="macro-title">Macronutrients</div>
            <div className="nutrition-save">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" 
                    color="neutral" 
                    style={{marginBotton: '5%', minWidth: '150px', fontSize: '20px'}}
                    onClick={handleOpen}>
                    Save
                    </Button>
                </ThemeProvider>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <div style={{textAlign: 'center'}}><CheckIcon style={{fontSize: '50px'}}/></div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: 'center'}}>
                    Saved!
                    </Typography>
                </Box>
                </Modal>
            </div>
            <div className="meal-entry">
                <div>
                    <div className="meal-row">
                        <div className="meal-input">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Breakfast</span>
                                <ThemeProvider theme={theme}>
                                <Button variant="text" color="neutral" onClick={addSearchBreakfast}>
                                +
                                </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="meal-count">
                            
                        </div>
                        <div className="meal-stats">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Calories</span>
                                <span className="meal-text">Carbs</span>
                                <span className="meal-text">Fats</span>
                                <span className="meal-text">Proteins</span>
                            </div>
                        </div>
                    </div>
                    {Bcomponents.map((item, i) => ( <NutritionBar key={item.foodId} passNutritionBarData={(data) => updateBreakfastData(data)} itemData={item}  />))} 
                </div> 
                <div>
                    <div className="meal-row">
                        <div className="meal-input">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Snack</span>
                                <ThemeProvider theme={theme}>
                                <Button variant="text" color="neutral" onClick={addSearchSnack}>
                                +
                                </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="meal-count">
                            
                        </div>
                        <div className="meal-stats">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Calories</span>
                                <span className="meal-text">Carbs</span>
                                <span className="meal-text">Fats</span>
                                <span className="meal-text">Proteins</span>
                            </div>
                        </div>
                    </div>
                    {Scomponents.map((item, i) => ( <NutritionBar key={item.foodId} passNutritionBarData={(data) => updateSnackData(data)} itemData={item} />))} 
                </div> 
                <div>
                    <div className="meal-row">
                        <div className="meal-input">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Lunch</span>
                                <ThemeProvider theme={theme}>
                                <Button variant="text" color="neutral" onClick={addSearchLunch}>
                                +
                                </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="meal-count">
                            
                        </div>
                        <div className="meal-stats">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Calories</span>
                                <span className="meal-text">Carbs</span>
                                <span className="meal-text">Fats</span>
                                <span className="meal-text">Proteins</span>
                            </div>
                        </div>
                    </div>
                    {Lcomponents.map((item, i) => ( <NutritionBar key={item.foodId} passNutritionBarData={(data) => updateLunchData(data)} itemData={item} />))} 
                </div>  
                <div>
                    <div className="meal-row">
                        <div className="meal-input">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Dinner</span>
                                <ThemeProvider theme={theme}>
                                <Button variant="text" color="neutral" onClick={addSearchDinner}>
                                +
                                </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="meal-count">
                            
                        </div>
                        <div className="meal-stats">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                                <span className="meal-text">Calories</span>
                                <span className="meal-text">Carbs</span>
                                <span className="meal-text">Fats</span>
                                <span className="meal-text">Proteins</span>
                            </div>
                        </div>
                    </div>
                    {Dcomponents.map((item, i) => ( <NutritionBar key={item.foodId} passNutritionBarData={(data) => updateDinnerData(data)} itemData={item} />))} 
                </div>  
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        adding: state.fatSecret.adding,
        nutritionsLoading: state.fatSecret.nutritionsLoading,
        breakfastData: state.fatSecret.breakfastData,
        snackData: state.fatSecret.snackData,
        lunchData: state.fatSecret.lunchData,
        dinnerData: state.fatSecret.dinnerData,
        caloriesData: state.fatSecret.caloriesData,
        carbsData: state.fatSecret.carbsData,
        fatsData: state.fatSecret.fatsData,
        proteinsData: state.fatSecret.proteinsData,
        selectedDate: state.fatSecret.selectedDate,
    };
};
export default connect(mapStateToProps,{load_token, foodSave, fetchFood, updateBreakfast, updateSnackData, updateLunchData, updateDinnerData, updateMacroNutrients}) (Entry); 
