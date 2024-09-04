import { useEffect, useState } from 'react';
import useMapStore from '@/stores/global-map-store';
import quebec_regions from '@/geojson/quebec_regions.json';
import { choroplethColors } from '@/constants/color-palet';

interface ChloroplethProps {
    data: any[]; // GeoJSON data for regions
    dataField: string; // Field in the GeoJSON properties to base the color on
}

const Chloropleth: React.FC<ChloroplethProps> = ({ data, dataField }) => {
    try {
        const { map } = useMapStore((state: any) => ({
            map: state.map,
        }));

        const [feature, setFeature] = useState<any>(null);

        useEffect(() => {
            if (!map) return;

            const handleMapLoad = () => {
                const newRegionCounts: Record<string, number> = {};
                data.forEach((item: any) => {
                    newRegionCounts[item.region] = item.count;
                });

                const newFeature = createRegionFeatures(
                    newRegionCounts,
                    quebec_regions,
                );
                setFeature(newFeature);
            };

            if (map.isStyleLoaded()) {
                handleMapLoad();
            } else {
                map.on('load', handleMapLoad);
            }

            return () => {
                if (map && handleMapLoad) {
                    map.off('load', handleMapLoad);
                }
            };
        }, [data, map]);

        useEffect(() => {
            if (!map || !feature) return;

            const source = map.getSource('chloropleth-source');
            if (source) {
                if (map.getLayer('chloropleth-layer')) {
                    map.removeLayer('chloropleth-layer');
                }
                if (map.getLayer('chloropleth-outline-layer')) {
                    map.removeLayer('chloropleth-outline-layer');
                }
                map.removeSource('chloropleth-source');
            }

            map.addSource('chloropleth-source', {
                type: 'geojson',
                data: feature,
            });

            // Add the fill layer for the regions
            map.addLayer({
                id: 'chloropleth-layer',
                type: 'fill',
                source: 'chloropleth-source',
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', dataField],
                        ...choroplethColors,
                    ],
                    'fill-opacity': 0.45,
                },
            });

            // Add the outline layer for the regions
            map.addLayer({
                id: 'chloropleth-outline-layer',
                type: 'line',
                source: 'chloropleth-source',
                paint: {
                    'line-color': '#000', // Black outline color
                    'line-width': 0.5, // Width of the outline
                },
            });

            return () => {
                if (map.getSource('chloropleth-source')) {
                    if (map.getLayer('chloropleth-layer')) {
                        map.removeLayer('chloropleth-layer');
                    }
                    if (map.getLayer('chloropleth-outline-layer')) {
                        map.removeLayer('chloropleth-outline-layer');
                    }
                    map.removeSource('chloropleth-source');
                }
            };
        }, [map, feature, dataField]);

        return null;
    } catch (e: any) {
        console.error(e.message);
    }
};

export default Chloropleth;

function createRegionFeatures(
    regionCounts: Record<string, number>,
    regionsGeoJSON: any,
) {
    const features: any[] = [];

    regionsGeoJSON.features.forEach((region: any) => {
        const regionName = region.properties.res_nm_reg;
        const count = regionCounts[regionName] || 0;

        features.push({
            type: 'Feature',
            geometry: region.geometry,
            properties: {
                region: regionName,
                count: count,
            },
        });
    });

    return {
        type: 'FeatureCollection',
        features: features,
    };
}
