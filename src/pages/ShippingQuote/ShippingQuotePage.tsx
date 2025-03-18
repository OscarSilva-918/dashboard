import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ position }) {
    return position ? (
        <Marker position={position}>
            <Popup>Estás aquí</Popup>
        </Marker>
    ) : null;
}

export function ShippingQuotePage() {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para el loading
    const mapRef = useRef(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    console.log("Ubicación obtenida:", latlng);
                    setPosition(latlng);
                    setLoading(false); // Desactiva el loading
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                    setLoading(false); // Desactiva el loading aunque haya error
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        }
    }, []);

    // Centra el mapa cuando la posición cambia
    useEffect(() => {
        if (position && mapRef.current) {
            mapRef.current.setView(position, 15);
        }
    }, [position]);

    if (loading) {
        return <div style={{ textAlign: "center", paddingTop: "20%" }}>Cargando ubicación...</div>;
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer
                center={position} // Centra el mapa en la posición obtenida
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} />
            </MapContainer>
        </div>
    );
}
