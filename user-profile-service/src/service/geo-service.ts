import axios from 'axios'
import { GeoAddress } from '../utils/payload'
import { GOOGLE_MAPS_API_KEY } from '../config/dotenv.config'
import { AppError } from '../utils/app-error'
import { STATUS_CODE } from '../config/status-code.config'

class GeoService {
    private apiKey: string;
    constructor() {
        this.apiKey = GOOGLE_MAPS_API_KEY
        if (!this.apiKey) {
            throw new AppError("GOOGLE_MAPS_API_KEY is not defined in .env", STATUS_CODE.NOT_FOUND)
        }
    }

    async reverseGeocode(lat: number, lon: number): Promise<GeoAddress> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${this.apiKey}`;

        try {
            console.log(url);
            const response = await axios.get(url);
            console.log(response);
            const data = response.data;

            if (data.status !== 'OK' || !data.results || data.results.length === 0) {
                throw new AppError('Could not geocode coordinates', STATUS_CODE.BAD_REQUEST);
            }

            // The first result is usually the most accurate
            const components = data.results[0].address_components;

            // Helper function to extract address parts
            const getComponent = (type: string) => components.find((c: any) => c.types.includes(type))?.long_name || '';

            const streetNumber = getComponent('street_number');
            const route = getComponent('route');

            const address: GeoAddress = {
                street: `${streetNumber} ${route}`.trim(),
                city: getComponent('locality'),
                state: getComponent('administrative_area_level_1'),
                postalCode: getComponent('postal_code'),
            };

            return address;

        } catch (error) {
            console.error("Error with Google Geocoding API:", error);
            if (error instanceof AppError) throw error;
            throw new AppError('Failed to fetch address data', STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

}

export default new GeoService();
