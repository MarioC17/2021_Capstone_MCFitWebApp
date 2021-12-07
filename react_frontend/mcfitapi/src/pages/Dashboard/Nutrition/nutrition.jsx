import React, { Component, useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../../components/Sidebar';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { connect } from "react-redux";
import { fetchFood } from '../../../actions/fat-secret'; 
import Cookies from 'universal-cookie';

//Stylesheet
import './nutrition.css';
const cookies = new Cookies();

let fGoal = cookies.get('fitness_goal');

const Nutrition = (props) => {
    const [value, setValue] = React.useState(props.location.selectedDate);
    if(value === undefined)
        setValue(props.selectedDate)
    console.log(value)
    console.log(props)
    const updateSelectedDate = (value) => {
        setValue(value);
        props.fetchFood(value.toISOString().split("T")[0]);
    }

    useEffect(() => {
        props.fetchFood(value);
    }, [value]);

    const BreakFastComponent = () => {
        return props.breakfastData.length > 0 ? (
            props.breakfastData.map((mealData, index) => {
                return <div class="breakdown-container" key={mealData.foodId}>
                    <div class="meal-name">{index === 0 ? 'Breakfast' : null}</div>
                    <div class="food-name">{ mealData.input }</div>
                    <div class="food-count">{ mealData.count } counts</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Proteins<br/>
                        </div>
                    </div>
                    <div className="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            { mealData.calories }kcal<br/>
                            { mealData.carbs }g<br/>
                            { mealData.fats }g<br/>
                            { mealData.proteins }g<br/>
                        </div>
                    </div>
                </div>
            })
        ) : (
            <div class="breakdown-container" >
                <div class="meal-name">Breakfast</div>
                <div class="hr"><hr/></div>
            </div>
        )
    }

    const SnackComponent = () => {
        return props.snackData.length > 0 ? (
            props.snackData.map((mealData, index) => {
                return <div class="breakdown-container" key={mealData.foodId}>
                    <div class="meal-name">{index === 0 ? 'Snack' : null}</div>
                    <div class="food-name">{ mealData.input }</div>
                    <div class="food-count">{ mealData.count } counts</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Proteins<br/>
                        </div>
                    </div>
                    <div className="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            { mealData.calories }kcal<br/>
                            { mealData.carbs }g<br/>
                            { mealData.fats }g<br/>
                            { mealData.proteins }g<br/>
                        </div>
                    </div>
                </div>
            })
        ) : (
            <div class="breakdown-container" >
                <div class="meal-name">Snack</div>
                <div class="hr"><hr/></div>
            </div>
        )
    }

    const LunchComponent = () => {
        return props.lunchData.length > 0 ? (
            props.lunchData.map((mealData, index) => {
                return <div class="breakdown-container" key={mealData.foodId}>
                    <div class="meal-name">{index === 0 ? 'Lunch' : null}</div>
                    <div class="food-name">{ mealData.input }</div>
                    <div class="food-count">{ mealData.count } counts</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Proteins<br/>
                        </div>
                    </div>
                    <div className="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            { mealData.calories }kcal<br/>
                            { mealData.carbs }g<br/>
                            { mealData.fats }g<br/>
                            { mealData.proteins }g<br/>
                        </div>
                    </div>
                </div>
            })
        ) : (
            <div class="breakdown-container" >
                <div class="meal-name">Lunch</div>
                <div class="hr"><hr/></div>
            </div>
        )
    }

    const DinnerComponent = () => {
        return props.dinnerData.length > 0 ? (
            props.dinnerData.map((mealData, index) => {
                return <div class="breakdown-container" key={mealData.foodId}>
                    <div class="meal-name">{index === 0 ? 'Dinner' : null}</div>
                    <div class="food-name">{ mealData.input }</div>
                    <div class="food-count">{ mealData.count } counts</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Proteins<br/>
                        </div>
                    </div>
                    <div className="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            { mealData.calories }kcal<br/>
                            { mealData.carbs }g<br/>
                            { mealData.fats }g<br/>
                            { mealData.proteins }g<br/>
                        </div>
                    </div>
                </div>
            })
        ) : (
            <div class="breakdown-container" >
                <div class="meal-name">Dinner</div>
                <div class="hr"><hr/></div>
            </div>
        )
    }

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });
    return (
        <>
        <Sidebar/>
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="nutrition-container">
            <div className="nutrition-title">Nutrition</div>
            <div className="food-entry-button">
                <ThemeProvider theme={theme}>
                    <Link to="/nutrition/entry" style={{color: 'white'}}>
                        <Button variant="contained" color="neutral" style={{padding: '5%'}}>
                        + New Food Entry
                        </Button>
                    </Link>
                </ThemeProvider>
            </div>
            <div className="nutrition-date-navigator"></div>
            <div className="nutrition-date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={value}
                        onChange={(e) => updateSelectedDate(e) }
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="progress-text">Overall Progress</div>
            <div className="meal-breakdown">
                <span className="small-title">Meal Breakdown</span><br/><br/><br/>
                { <BreakFastComponent /> }
                { <SnackComponent /> }
                { <LunchComponent /> }
                { <DinnerComponent /> }
                <div>
                    Calories Consumed:&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{}*out of {}* cal</span>
                </div>
            </div>
            <div className="nutritional-breakdown">
                <span className="small-title">Nutritional Breakdown</span><br/><br/><br/>
                <div className="second-container">
                    <div className="nutrition-breakdown-name">Consumed</div>
                    <div className="hr"><hr/></div>
                    <div className="nutrition-stat-name">
                        Calories<br/>
                        Carbohydrates<br/>
                        Protien<br/>
                        Fats<br/>
                    </div>
                    <div class="nutrition-stat-detail">
                        {props.caloriesData} kcal<br/>
                        {props.carbsData} g / total*cal<br/>
                        {props.proteinsData} g / total*cal<br/>
                        {props.fatsData} g / total*cal<br/>
                    </div>
                </div>

                <div className="second-container">
                    <div className="nutrition-breakdown-name">Target</div>
                    <div className="hr"><hr/></div>
                    <div className="nutrition-stat-name">
                        Calories<br/>
                        Carbohydrates<br/>
                        Protien<br/>
                        Fats<br/>
                    </div>
                    <div className="nutrition-stat-detail">
                        {}*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                    </div>
                </div>
            </div>
            <div className="overall-breakdown">
                <div className="overall-progress-card">
                    <span className='sub-title'>Goals</span><br/><br/>
                    {fGoal}
                </div>
                <div className="overall-progress-card">
                    <span className='sub-title'>Weight</span><br/><br/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>Target {}140lbs</span> 
                        <span>Starting {}190 lbs </span> 
                        <span>Current {}160lbs</span> 
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

const mapStateToProps = (state) => {
    return {
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
export default connect(mapStateToProps, { fetchFood })(Nutrition);