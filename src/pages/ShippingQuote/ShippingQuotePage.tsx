import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function ShippingQuotePage() {
    return (
        <div style={{height: "100vh", width: "100%", padding: 0, margin: 0}}>
            <MapContainer
                center={[-27.3621, -55.8913]}
                zoom={15}
                style={{ height: "100vh", width: "100%", zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>Ubicación de prueba</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
