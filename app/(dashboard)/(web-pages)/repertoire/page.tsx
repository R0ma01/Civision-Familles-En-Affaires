'use client';
import DataCard from '@/components/component/data-card/data-card';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';
import RepertoirePageTutorial from '@/components/component/tutorials/repertoire-page-tutorial';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { useEffect } from 'react';

function Repertoire() {
    const tour = RepertoirePageTutorial();

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    useEffect(() => {
        if (mapType !== MapType.REPERTOIRE) {
            setMapStyle(MapType.REPERTOIRE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    // async function customComplete() {
    //     const replacement = [true, ...tutorials.splice(1)];
    //     await updateCompletedTutorials(replacement);
    // }
    // if (!tutorials[0]) {
    //     customComplete();
    //     // tour.start();
    // }

    const fetchedData = {
        firstField: {
            type: DataCardType.SIMPLE,
            title: 'Entreprises Familiales',
            description: `$ représente le nombre d'entreprises familiales au Québec en 2023.`,
            graphData: [],
        },
        secondField: {
            type: DataCardType.SIMPLE_GRAPH,
            title: 'Proportion Privé',
            description: `$ des entreprises privées sont des entreprises familiales.`,
            graphData: [
                {
                    graphType: GraphBoxType.DOUGHNUT,
                    donnes: [MainDataFields.DIRIGEANT_AGE],
                },
            ],
        },
        thirdField: {
            type: DataCardType.SEARCH,
            title: 'Rechercher une Entreprise',
            description: ``,
            graphData: [],
        },
    };
    return (
        <PageContentContainer
            filterMenu={true}
            className="overflow-auto pb-10 pl-[30px]"
        >
            <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                Repertoire
            </h1>
            <div className="flex flex-col space-y-4">
                <DataCard content={fetchedData.firstField} />
                <DataCard content={fetchedData.secondField} />
                <DataCard content={fetchedData.thirdField} />
            </div>
        </PageContentContainer>
    );
}

export default Repertoire;
