import { MapType } from '@/components/enums/map-type-enum';
import {
    EntreprisePointData,
    MapClusterPointData,
} from '@/components/interface/point-data';
import { create } from 'zustand';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';

interface GlobalMapStoreProps {
    map: any;
    setMap: (map: any) => void;
    mapType: MapType;
    setMapStyle: (type: MapType) => void;
    point: any;
    setMapPoint: (point: MapClusterPointData) => void;
}

const useMapStore = create<GlobalMapStoreProps>((set) => ({
    // this state stores the map reference
    map: null,
    setMap: (map: any) => {
        set({ map });
    },
    mapType: MapType.PAGE_INFORMATION,
    setMapStyle: (type: MapType) => {
        set({ mapType: type });
    },
    point: null,
    setMapPoint: async (simplePoint: MapClusterPointData) => {
        const point: EntreprisePointData =
            await GraphDataHttpRequestService.getEntrepriseInformation(
                simplePoint._id,
            );

        if (!point) {
            return;
        }
        console.log(point);
        const newJSONPoint = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: point.coords,
            },
            properties: {
                weight: 0.5,
                nom: point.nom,
                secteur_activite: point.secteur_activite,
                taille_entreprise: point.taille_entreprise,
                adresse: point.adresse,
            },
        };

        set({ point: newJSONPoint });
    },
}));

export default useMapStore;
