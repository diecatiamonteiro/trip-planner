//  Formats a Date object to a short string format: Sun, Nov 10
export function formatDateShort(date) {
  if (!(date instanceof Date) || isNaN(date)) return "";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Formats an ISO date string to a long string format: Sunday, November 10
// ISO adheres to an international standard (ISO 8601) that sets the format for dates and times
export function formatDateLong(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) return "";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Formats a date input (Date object or ISO string) to a long string format: Sunday, November 10
// Use this function when the source of the date is unknown (string or object)
export function formatDateForDisplay(dateInput) {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date)) return "";
    
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

// Handles Firebase Timestamp conversion
export function convertFirebaseDate(date) {
  return date?.toDate ? date.toDate() : new Date(date);
}

// For saved trips display format: Nov 10, 2023
export function formatTripDate(dateString) {
  try {
    const date = dateString?.toDate ? dateString.toDate() : new Date(dateString);
    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}
