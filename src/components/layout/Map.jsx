import { useEffect, useRef } from "react";
import { useTrip } from "../../contexts/TripContext";
import { defaultLayers } from "../../utils/hereMapUtils";
import "../../styles/Map.css";

export default function Map() {
  const { state } = useTrip();
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !window.H) return;

    if (!map.current) {
      map.current = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: state.mapCenter?.zoom || 12,
          center: {
            lat: state.mapCenter?.lat || 52.52,
            lng: state.mapCenter?.lng || 13.405,
          },
        }
      );

      new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map.current)
      );

      window.H.ui.UI.createDefault(map.current, defaultLayers);
    } else {
      map.current.setCenter({
        lat: state.mapCenter?.lat || 52.52,
        lng: state.mapCenter?.lng || 13.405,
      });
      map.current.setZoom(state.mapCenter?.zoom || 12);
    }

    // Clear existing markers
    map.current.removeObjects(map.current.getObjects());

    // Add markers from state with numbers
    if (state.markers && state.markers.length > 0) {
      state.markers.forEach((marker, index) => {
        // Create marker icon with number
        const markerElement = document.createElement("div");
        markerElement.className = "numbered-marker";
        markerElement.innerHTML = `<span>${index + 1}</span>`;

        const icon = new window.H.map.DomIcon(markerElement);
        const markerObject = new window.H.map.DomMarker(
          {
            lat: marker.lat,
            lng: marker.lng,
          },
          { icon }
        );

        map.current.addObject(markerObject);
      });
    }
  }, [state.mapCenter, state.markers]);

  // ******************************************************
  // ******************************************************

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        background: "#eee",
      }}
    />
  );
}
