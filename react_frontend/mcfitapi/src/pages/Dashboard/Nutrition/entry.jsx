import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NutritionBar from '../../../components/NutritionBar';
import Sidebar from '../../../components/Sidebar';
import { Box, Modal, Typography, TextField } from '@mui/material/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
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

export default function Entry() {
    const [value, setValue] = React.useState(null);
    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });

      const [Bcomponents, setBComponents] = useState(["Breakfast Component"]);  
      function addSearchBreakfast() { 
        setBComponents([...Bcomponents, "Breakfast Component"])  
      } 
  
      const [Scomponents, setSComponents] = useState(["Snack Component"]);
      function addSearchSnack() { 
        setSComponents([...Dcomponents, "Snack Component"])  
      } 

      const [Lcomponents, setLComponents] = useState(["Lunch Component"]); 
      function addSearchLunch() { 
        setLComponents([...Lcomponents, "Lunch Component"])  
      } 
  
      const [Dcomponents, setDComponents] = useState(["Dinner Component"]);
      function addSearchDinner() { 
        setDComponents([...Dcomponents, "Dinner Component"])  
      } 

      //saved modal
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

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
                        Protiens<br/>
                        #<br/>
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
                        Protiens<br/>
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
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
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
                                <span className="meal-text">Protiens</span>
                            </div>
                        </div>
                    </div>
                    {Bcomponents.map((item, i) => ( <NutritionBar/>))} 
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
                                <span className="meal-text">Protiens</span>
                            </div>
                        </div>
                    </div>
                    {Scomponents.map((item, i) => ( <NutritionBar/>))} 
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
                                <span className="meal-text">Protiens</span>
                            </div>
                        </div>
                    </div>
                    {Lcomponents.map((item, i) => ( <NutritionBar/>))} 
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
                                <span className="meal-text">Protiens</span>
                            </div>
                        </div>
                    </div>
                    {Dcomponents.map((item, i) => ( <NutritionBar/>))} 
                </div>  
            </div>
        </div>
        </>
    )
}
