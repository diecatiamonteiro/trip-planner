import { createContext, useContext, useReducer } from "react";
import tripReducer, { initialState } from "../reducers/TripReducer";

export const TripContext = createContext();

export default function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
