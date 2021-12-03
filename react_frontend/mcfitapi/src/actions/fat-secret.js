import axios from "axios";
import {
  FAT_SECRET_TOKEN_SUCCESS,
  FAT_SECRET_TOKEN_FAILED,
  FAT_SECRET_FOOD_SEARCH_SUCCESS,
  FAT_SECRET_FOOD_SEARCH_FAILED,
  FAT_SECRET_FOOD_SEARCH_LOADING,
  FAT_SECRET_FOOD_DATA_ADDING,
  FAT_SECRET_FOOD_DATA_SUCCESS,
  FAT_SECRET_FOOD_DATA_FAILED,
  NUTRITIONS_DATA_LOADING,
  NUTRITIONS_DATA_SUCCESS,
  NUTRITIONS_DATA_FAILED,
  NUTRITIONS_BREAKFAST_DATA_UPDATE,
  NUTRITIONS_SNACK_DATA_UPDATE,
  NUTRITIONS_LUNCH_DATA_UPDATE,
  NUTRITIONS_DINNER_DATA_UPDATE,
  MACRO_NUTRITIONS_DATA_UPDATE,
} from "./types";

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = expirationTime;
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const formatDataToDB = (data) => {
  let finalData = [];
  let breakfast = data.breakfastData.map((data) => ({
    ...data,
    foodType: "breakfast",
  }));
  let dinner = data.dinnerData.map((data) => ({
    ...data,
    foodType: "dinner",
  }));
  let lunch = data.lunchData.map((data) => ({
    ...data,
    foodType: "lunch",
  }));
  let snack = data.snackData.map((data) => ({
    ...data,
    foodType: "snack",
  }));
  finalData = [...breakfast, ...dinner, ...lunch, ...snack];
  return finalData;
};

const fetchCaloriesData = (data) => {
  let totalCalories = data.reduce(
    (partialSum, data) => partialSum + Number(data.calories),
    0
  );
  return totalCalories.toFixed(2);
};

const fetchCarbsData = (data) => {
  let totalCarbs = data.reduce(
    (partialSum, data) => partialSum + Number(data.carbs),
    0
  );

  return totalCarbs.toFixed(2);
};

const fetchFatsData = (data) => {
  let totalFats = data.reduce(
    (partialSum, data) => partialSum + Number(data.fats),
    0
  );

  return totalFats.toFixed(2);
};

const fetchProteinsData = (data) => {
  let totalProteins = data.reduce(
    (partialSum, data) => partialSum + Number(data.proteins),
    0
  );

  return totalProteins.toFixed(2);
};

const formatDataToAppData = (data) => {
  let updatedData = data.map((data) => {
    return {
      calories: data.calories,
      carbs: data.carbs,
      count: data.count,
      fats: data.fats,
      foodId: data.food_id,
      input: data.food_name,
      foodType: data.food_type,
      proteins: data.calories,
    };
  });
  return {
    breakfastData: updatedData.filter((data) => data.foodType == "breakfast"),
    snackData: updatedData.filter((data) => data.foodType == "snack"),
    lunchData: updatedData.filter((data) => data.foodType == "lunch"),
    dinnerData: updatedData.filter((data) => data.foodType == "dinner"),
    caloriesData: fetchCaloriesData(updatedData),
    carbsData: fetchCarbsData(updatedData),
    fatsData: fetchFatsData(updatedData),
    proteinsData: fetchProteinsData(updatedData),
  };
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("mcfit_fatsecret_token");
  const storedExpirationDate = localStorage.getItem(
    "mcfit_fatsecret_expirationTime"
  );
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (
    storedToken &&
    storedExpirationDate &&
    storedToken != "undefined" &&
    storedExpirationDate != "undefined"
  ) {
    if (remainingTime <= 0) {
      localStorage.removeItem("mcfit_fatsecret_token");
      localStorage.removeItem("mcfit_fatsecret_expirationTime");
      return null;
    }
    return {
      token: storedToken,
    };
  }

  return null;
};

export const load_token = () => async (dispatch) => {
  const tokenData = retrieveStoredToken();
  if (!tokenData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_API_URL}/fatsecret/token`,
        `http://localhost:8000/api/fatsecret/token`,
        config
      );
      if (response.data.status == "success") {
        dispatch({
          type: FAT_SECRET_TOKEN_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: FAT_SECRET_TOKEN_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: FAT_SECRET_TOKEN_FAILED,
      });
    }
  }
};

export const foodSearch = (searchTerm) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `JWT ${localStorage.getItem("access")}`,
    },
    params: {
      "fat-secret-token": localStorage.getItem("mcfit_fatsecret_token"),
    },
  };
  try {
    dispatch({
      type: FAT_SECRET_FOOD_SEARCH_LOADING,
    });
    const response = await axios.get(
      // `${process.env.REACT_APP_API_URL}/fatsecret/food/search` + searchTerm,
      "http://localhost:8000/api/fatsecret/food/search/" + searchTerm,
      config
    );
    if (response.data.status == "success") {
      dispatch({
        type: FAT_SECRET_FOOD_SEARCH_SUCCESS,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: FAT_SECRET_FOOD_SEARCH_FAILED,
      });
    }
  } catch (err) {
    dispatch({
      type: FAT_SECRET_FOOD_SEARCH_FAILED,
    });
  }
};

export const foodSave = (data) => async (dispatch) => {
  try {
    dispatch({
      type: FAT_SECRET_FOOD_DATA_ADDING,
    });
    let formattedData = formatDataToDB(data);
    const response = await axios.post(
      // `${process.env.REACT_APP_API_URL}/nutritions/add`,
      "http://localhost:8000/api/nutritions/add",
      {
        user_id: 5,
        nutritions: formattedData,
      }
    );
    console.log(response);
    dispatch({
      type: FAT_SECRET_FOOD_DATA_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FAT_SECRET_FOOD_DATA_FAILED,
    });
  }
};

export const fetchFood = () => async (dispatch) => {
  try {
    dispatch({
      type: NUTRITIONS_DATA_LOADING,
    });
    const response = await axios.get(
      // `${process.env.REACT_APP_API_URL}/nutritions/2`,
      "http://localhost:8000/api/nutritions/5"
    );
    dispatch({
      type: NUTRITIONS_DATA_SUCCESS,
      payload: formatDataToAppData(response.data),
    });
  } catch (err) {
    dispatch({
      type: NUTRITIONS_DATA_FAILED,
    });
  }
};

export const updateBreakfast = (data) => async (dispatch) => {
  dispatch({
    type: NUTRITIONS_BREAKFAST_DATA_UPDATE,
    payload: data,
  });
};

export const updateSnackData = (data) => async (dispatch) => {
  dispatch({
    type: NUTRITIONS_SNACK_DATA_UPDATE,
    payload: data,
  });
};

export const updateLunchData = (data) => async (dispatch) => {
  dispatch({
    type: NUTRITIONS_LUNCH_DATA_UPDATE,
    payload: data,
  });
};

export const updateDinnerData = (data) => async (dispatch) => {
  dispatch({
    type: NUTRITIONS_DINNER_DATA_UPDATE,
    payload: data,
  });
};

export const updateMacroNutrients = (data) => async (dispatch) => {
  dispatch({
    type: MACRO_NUTRITIONS_DATA_UPDATE,
    payload: {
      caloriesData: fetchCaloriesData(data),
      carbsData: fetchCarbsData(data),
      fatsData: fetchFatsData(data),
      proteinsData: fetchProteinsData(data),
    },
  });
};
