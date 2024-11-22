export const initialState = {
  // Trip details
  destination: "",
  startDate: "",
  endDate: "",
  totalDays: 0,
  dates: [],

  // Activities
  activities: {},

  // Map data
  mapCenter: null,
  markers: [],

  // UI States
  isLoading: false,
  error: null,
};

export default function tripReducer(state, action) {
  switch (action.type) {
    case "SET_TRIP_DETAILS": {
      const { destination, startDate, endDate } = action.payload;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      // Generate array of dates
      const dates = [];
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        dates.push(new Date(currentDate));
      }

      return {
        ...state,
        destination,
        startDate,
        endDate,
        totalDays,
        dates,
        mapCenter: null,
        activities: {},
      };
    }

    case "SET_SELECTED_DATE": {
      return {
        ...state,
        selectedDate: action.payload,
      };
    }

    case "ADD_ACTIVITY": {
      const { date, activity } = action.payload;
      return {
        ...state,
        activities: {
          ...state.activities,
          [date]: [
            ...(state.activities[date] || []),
            { ...activity, id: Date.now() },
          ],
        },
      };
    }

    case "REMOVE_ACTIVITY": {
      const { dateToRemove, activityId } = action.payload;
      return {
        ...state,
        activities: {
          ...state.activities,
          [dateToRemove]: state.activities[dateToRemove].filter(
            (act) => act.id !== activityId
          ),
        },
      };
    }

    case "UPDATE_ACTIVITY": {
      const { dateToUpdate, updatedActivity } = action.payload;
      return {
        ...state,
        activities: {
          ...state.activities,
          [dateToUpdate]: state.activities[dateToUpdate].map((act) =>
            act.id === updatedActivity.id ? updatedActivity : act
          ),
        },
      };
    }
    case "SET_MAP_CENTER":
      return { ...state, mapCenter: action.payload };
    case "UPDATE_MARKERS":
      return { ...state, markers: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_TRIP":
      return initialState;
    default:
      return state;
  }
}
