import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Form } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// This component listens for clicks on the map
const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
};

const LocationPicker = ({ onLocationChange }) => {
    // Default center — Nairobi, Kenya
    const defaultCenter = [-1.286389, 36.817223];

    const [markerPosition, setMarkerPosition] = useState(null);
    const [manualLocation, setManualLocation] = useState('');

    const handleMapClick = (latlng) => {
        setMarkerPosition(latlng);
        const locationString = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
        setManualLocation(locationString);
        onLocationChange(locationString);
    };

    const handleManualInput = (e) => {
        setManualLocation(e.target.value);
        onLocationChange(e.target.value);
    };

    return (
        <div>
            <Form.Label>Business Location</Form.Label>

            {/* Manual text input — still useful for named locations */}
            <Form.Control
                type="text"
                placeholder="e.g. Thika Town, or click map to pin"
                value={manualLocation}
                onChange={handleManualInput}
                className="mb-2"
            />
            <Form.Text muted>
                Type a location name or click directly on the map to pin.
            </Form.Text>

            {/* Map */}
            <div className="mt-2" style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                <MapContainer
                    center={defaultCenter}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={handleMapClick} />
                    {markerPosition && <Marker position={markerPosition} />}
                </MapContainer>
            </div>

            {markerPosition && (
                <Form.Text className="text-success">
                    📍 Pinned: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
                </Form.Text>
            )}
        </div>
    );
};

export default LocationPicker;