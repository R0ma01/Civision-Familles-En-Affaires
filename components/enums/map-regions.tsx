import { MapType } from './map-type-enum';
import { SecteursGeographiques } from './fournisseur-filter-enum';

export const MapRegions = new Map<MapType, Map<string | number, string>>([
    [
        MapType.PAGE_INFORMATION_INDEX_VOLETA,
        new Map<number, string>([
            [1, 'Bas-Saint-Laurent'],
            [2, 'Saguenay-Lac-Saint-Jean'],
            [3, 'Capitale-Nationale'],
            [4, 'Mauricie'],
            [5, 'Estrie'],
            [6, 'Montreal'],
            [7, 'Outaouais'],
            [8, 'Abitibi-Temiscamingue'],
            [9, 'Cote-Nord'],
            [10, 'Gaspesie-Îles-de-la-Madeleine'],
            [11, 'Nord-du-Quebec'],
            [12, 'Chaudiere-Appalaches'],
            [13, 'Laval'],
            [14, 'Lanaudiere'],
            [15, 'Laurentides'],
            [16, 'Monteregie'],
            [17, 'Centre-du-Quebec'],
        ]),
    ],
    [
        MapType.PAGE_INFORMATION_ALBUM,
        new Map<string, string>([
            ['Abitibi-Temiscamingue', 'Abitibi-Temiscamingue'],
            ['Bas-Saint-Laurent', 'Bas-Saint-Laurent'],
            ['Saguenay--Lac-Saint-Jean', 'Saguenay-Lac-Saint-Jean'],
            ['Capitale-Nationale', 'Capitale-Nationale'],
            ['Mauricie', 'Mauricie'],
            ['Estrie', 'Estrie'],
            ['Montreal', 'Montreal'],
            ['Outaouais', 'Outaouais'],
            ['Cote-Nord', 'Cote-Nord'],
            ['Nord-du-Quebec', 'Nord-du-Quebec'],
            ['Gaspesie--Îles-de-la-Madeleine', 'Gaspesie-Îles-de-la-Madeleine'],
            ['Chaudiere-Appalaches', 'Chaudiere-Appalaches'],
            ['Laval', 'Laval'],
            ['Lanaudiere', 'Lanaudiere'],
            ['Laurentides', 'Laurentides'],
            ['Monteregie', 'Monteregie'],
            ['Centre-du-Quebec', 'Centre-du-Quebec'],
        ]),
    ],
    [
        MapType.FOURNISSEURS,
        new Map<string, string>([
            [SecteursGeographiques.ABITIBI, 'Abitibi-Temiscamingue'],
            [SecteursGeographiques.BAS_ST_LAURENT, 'Bas-Saint-Laurent'],
            [SecteursGeographiques.SAGUENEY, 'Saguenay–Lac-Saint-Jean'],
            [SecteursGeographiques.CAPITALE_NATIONALE, 'Capitale-Nationale'],
            [SecteursGeographiques.MAURICIE, 'Mauricie'],
            [SecteursGeographiques.ESTRIE, 'Estrie'],
            [SecteursGeographiques.MONTREAL, 'Montreal'],
            [SecteursGeographiques.OUTAOUAIS, 'Outaouais'],
            [SecteursGeographiques.COTE_NORD, 'Cote-Nord'],
            [SecteursGeographiques.NORD_QUEBEC, 'Nord-du-Quebec'],
            [SecteursGeographiques.GASPESIE, 'Gaspesie-Îles-de-la-Madeleine'],
            [SecteursGeographiques.CHAUDIERE_APALACHE, 'Chaudiere-Appalaches'],
            [SecteursGeographiques.LAVAL, 'Laval'],
            [SecteursGeographiques.LANAUDIERE, 'Lanaudiere'],
            [SecteursGeographiques.LAURENTIDES, 'Laurentides'],
            [SecteursGeographiques.MONTEREGIE, 'Monteregie'],
            [SecteursGeographiques.CENTRE_QUEBEC, 'Centre-du-Quebec'],
        ]),
    ],
    [
        MapType.REPERTOIRE,
        new Map<string | number, string>([]), // Empty for now
    ],
    [
        MapType.PAGE_INFORMATION_INDEX_VOLETB,
        new Map<number, string>([
            [1, 'Bas-Saint-Laurent'],
            [2, 'Saguenay-Lac-Saint-Jean'],
            [3, 'Capitale-Nationale'],
            [4, 'Mauricie'],
            [5, 'Estrie'],
            [6, 'Montreal'],
            [7, 'Outaouais'],
            [8, 'Abitibi-Temiscamingue'],
            [9, 'Cote-Nord'],
            [10, 'Gaspesie-Îles-de-la-Madeleine'],
            [11, 'Nord-du-Quebec'],
            [12, 'Chaudiere-Appalaches'],
            [13, 'Laval'],
            [14, 'Lanaudiere'],
            [15, 'Laurentides'],
            [16, 'Monteregie'],
            [17, 'Centre-du-Quebec'],
        ]),
    ],
]);
