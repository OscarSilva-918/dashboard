import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

function LocationMarker({ position }) {
    return position ? (
        <Marker position={position}>
            <Popup>Estás aquí</Popup>
        </Marker>
    ) : null;
}

export function ShippingQuotePage() {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [destination, setDestination] = useState(""); // Estado para el destino
    const [destinationCoords, setDestinationCoords] = useState(null); // Coordenadas del destino
    const mapRef = useRef(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    console.log("Ubicación obtenida:", latlng);
                    setPosition(latlng);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 25000, maximumAge: 0 }
            );
        }
    }, []);

    useEffect(() => {
        if (position && mapRef.current) {
            mapRef.current.setView(position, 15);
        }
    }, [position]);

    // Función para buscar el destino usando la API de Nominatim
    const handleSearchDestination = async () => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
        );
        const data = await response.json();
        console.log("Ubicacion de destino", data)
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            const destinationLatLng = { lat: parseFloat(lat), lng: parseFloat(lon) };
            console.log("destinationLatLng: ", destinationLatLng)
            setDestinationCoords(destinationLatLng);

            // Verificar que las coordenadas de origen y destino estén disponibles
            if (position && destinationLatLng) {
                if (mapRef.current) {
                    // Limpiar el mapa antes de agregar una nueva ruta
                    mapRef.current.eachLayer((layer) => {
                        if (layer instanceof L.Routing.Control) {
                            mapRef.current.removeLayer(layer);
                        }
                    });

                    // Calcular la ruta entre la ubicación actual y el destino
                    const routeControl = L.Routing.control({
                        waypoints: [
                            L.latLng(position.lat, position.lng),
                            L.latLng(destinationLatLng.lat, destinationLatLng.lng),
                        ],
                        routeWhileDragging: true,
                    }).addTo(mapRef.current);
                }
            }
        } else {
            alert("No se pudo encontrar el destino.");
        }
    };

    if (loading) {
        return <div style={{ textAlign: "center", paddingTop: "20%" }}>Cargando ubicación...</div>;
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer
                center={position}
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

            {/* Formulario para buscar destino */}
            <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)} // Actualiza el estado 'destination'
                    placeholder="Ingresa un destino"
                    style={{ padding: "10px", fontSize: "16px", width: "300px" }}
                />
                <button
                    onClick={handleSearchDestination}
                    style={{
                        padding: "10px",
                        marginLeft: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Buscar Ruta
                </button>
            </div>
        </div>
    );
}
