import {
  FAT_SECRET_FOOD_DATA_ADDING, FAT_SECRET_FOOD_DATA_FAILED, FAT_SECRET_FOOD_DATA_SUCCESS, FAT_SECRET_FOOD_SEARCH_FAILED,
  FAT_SECRET_FOOD_SEARCH_LOADING, FAT_SECRET_FOOD_SEARCH_SUCCESS, FAT_SECRET_TOKEN_FAILED, FAT_SECRET_TOKEN_SUCCESS, MACRO_NUTRITIONS_DATA_UPDATE, NUTRITIONS_BREAKFAST_DATA_UPDATE, NUTRITIONS_DATA_FAILED, NUTRITIONS_DATA_LOADING,
  NUTRITIONS_DATA_SUCCESS, NUTRITIONS_DINNER_DATA_UPDATE, NUTRITIONS_LUNCH_DATA_UPDATE, NUTRITIONS_SNACK_DATA_UPDATE
} from "../actions/types";

const initialState = {
  // fat secret token
  token: localStorage.getItem("mcfit_fatsecret_token"),
  time: localStorage.getItem("mcfit_fatsecret_expirationTime"),
  // fat secret search
  searchResult: null,
  loading: false,
  // fat secret data
  adding: false,
  breakfastData: [],
  snackData: [],
  lunchData: [],
  dinnerData: [],
  caloriesData: 0,
  carbsData: 0,
  fatsData: 0,
  proteinsData: 0,
  selectedDate: new Date().toISOString().split("T")[0],
  // nutritions data
  nutritionsLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FAT_SECRET_TOKEN_SUCCESS:
      let expirationTime = new Date(
        new Date().getTime() + payload.expires_in * 1000
      ).getTime();
      localStorage.setItem("mcfit_fatsecret_token", payload.access_token);
      localStorage.setItem("mcfit_fatsecret_expirationTime", expirationTime);
      return {
        ...state,
        token: payload.access_token,
        time: expirationTime,
      };
    case FAT_SECRET_TOKEN_FAILED:
      localStorage.removeItem("mcfit_fatsecret_token");
      localStorage.removeItem("mcfit_fatsecret_expirationTime");
      return {
        ...state,
        token: null,
        time: null,
      };
    case FAT_SECRET_FOOD_SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: payload.foods,
        loading: false,
      };
    case FAT_SECRET_FOOD_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FAT_SECRET_FOOD_SEARCH_FAILED:
      return {
        ...state,
        searchResult: null,
        loading: false,
      };
    case FAT_SECRET_FOOD_DATA_ADDING:
      return {
        ...state,
        adding: true,
      };
    case FAT_SECRET_FOOD_DATA_SUCCESS:
      return {
        ...state,
        breakfastData: payload.breakfastData,
        snackData: payload.snackData,
        lunchData: payload.lunchData,
        dinnerData: payload.dinnerData,
        caloriesData: payload.caloriesData,
        carbsData: payload.carbsData,
        fatsData: payload.fatsData,
        proteinsData: payload.proteinsData,
        selectedDate: payload.selectedDate,
        adding: false,
      };
    case FAT_SECRET_FOOD_DATA_FAILED:
      return {
        ...state,
        adding: false,
      };
    case NUTRITIONS_DATA_LOADING:
      return {
        ...state,
        nutritionsLoading: true,
        selectedDate: payload,
      };
    case NUTRITIONS_DATA_SUCCESS:
      return {
        ...state,
        breakfastData: payload.breakfastData,
        snackData: payload.snackData,
        lunchData: payload.lunchData,
        dinnerData: payload.dinnerData,
        caloriesData: payload.caloriesData,
        carbsData: payload.carbsData,
        fatsData: payload.fatsData,
        proteinsData: payload.proteinsData,
        nutritionsLoading: false,
      };
    case NUTRITIONS_DATA_FAILED:
      return {
        ...state,
        nutritionsLoading: false,
      };
    case NUTRITIONS_BREAKFAST_DATA_UPDATE:
      return {
        ...state,
        breakfastData: payload,
      };
    case NUTRITIONS_SNACK_DATA_UPDATE:
      return {
        ...state,
        snackData: payload,
      };
    case NUTRITIONS_LUNCH_DATA_UPDATE:
      return {
        ...state,
        lunchData: payload,
      };
    case NUTRITIONS_DINNER_DATA_UPDATE:
      return {
        ...state,
        dinnerData: payload,
      };
    case MACRO_NUTRITIONS_DATA_UPDATE:
      return {
        ...state,
        caloriesData: payload.caloriesData,
        carbsData: payload.carbsData,
        fatsData: payload.fatsData,
        proteinsData: payload.proteinsData,
      };
    default:
      return state;
  }
}
