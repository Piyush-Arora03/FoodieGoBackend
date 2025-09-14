import axios from "axios";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import logger from "../config/logger.config";
import { GOOGLE_MAP_API_KEY } from "../config/dotenv.config";


export interface Coordinates {
    lat: number;
    lng: number;
}

class GeoService {
    private apiKey: string | null;

    constructor() {
        this.apiKey = GOOGLE_MAP_API_KEY;
        if (!this.apiKey) {
            logger.error('GOOGLE_MAP_API_KEY is not defined in .env');
            throw new Error('GOOGLE_MAP_API_KEY is not defined');
        }
    }
    async getCoordinates(address: string): Promise<Coordinates> {
        try {
            logger.info(`Geocoding address: ${address}`);
            const encodedAddress = encodeURIComponent(address);
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.apiKey}`);

            if (response.data.status === "ZERO_RESULTS") {
                throw new AppError("No coordinates found for the given address", STATUS_CODE.NOT_FOUND);
            }

            const coordinates: Coordinates = response.data.results[0].geometry.location;
            logger.info(`Geocoding successful for: ${address}`, { coordinates });
            return coordinates;
        } catch (error: any) {
            logger.error(`Error in geo service: ${error.message}`);
            throw new AppError("Error while fetching coordinates", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new GeoService();