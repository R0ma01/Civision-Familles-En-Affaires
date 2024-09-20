import React from 'react';
import Dropdown from '@/components/component/drop-down-menu/drop-down-menu';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import GraphBox from '../graph-box/graph-box';
import { TrashSVG } from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { ChartSize } from '@/components/enums/chart-size-enum';
import GraphBoxContent from '@/components/interface/graph-box-content';
import {
    AlbumDataFields,
    DataBaseOrigin,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
function options(tabType: DataBaseOrigin) {
    switch (tabType) {
        case DataBaseOrigin.ALBUM_FAMILLE: {
            return Object.values(AlbumDataFields);
        }
        case DataBaseOrigin.INDEX_VOLETA: {
            return Object.values(IndexeDataFieldsA);
        }
        case DataBaseOrigin.INDEX_VOLETB: {
            return Object.values(IndexeDataFieldsB);
        }
    }
    return [];
}

interface GraphCardProps {
    graph: GraphBoxContent;
    graphIndex: number;
    cardIndex: number;
    tabType: DataBaseOrigin;
    handleGraphDataChange: (
        cardIndex: number,
        graphIndex: number,
        field: string,
        value: any,
        yValue?: boolean,
    ) => void;
    handleGraphDelete: (e: any, cardIndex: number, graphIndex: number) => void;
}

const EditGraphCard: React.FC<GraphCardProps> = ({
    graph,
    graphIndex,
    cardIndex,
    tabType,
    handleGraphDataChange,
    handleGraphDelete,
}) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md relative w-fit h-[200px]">
            <p className="text-sm font-normal text-gray-800 dark:text-white mb-1">
                Graph {graphIndex + 1}
            </p>
            <Button
                buttonType={ButtonType.ICON}
                onClick={(e: any) =>
                    handleGraphDelete(e, cardIndex, graphIndex)
                }
                className="absolute right-1 top-1 hover:scale-125"
            >
                <TrashSVG className="fill-red-600" />
            </Button>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-center space-x-2">
                <div className="flex flex-col w-full space-y-4 justify-center items-center">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Type de Graphique
                        </label>
                        <Dropdown
                            inputValue={graph.graphType}
                            options={Object.values(GraphBoxType)}
                            onChange={(value: any) =>
                                handleGraphDataChange(
                                    cardIndex,
                                    graphIndex,
                                    'graphType',
                                    value,
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Données Affichées
                        </label>

                        <Dropdown
                            inputValue={graph.donnes[0]}
                            options={options(tabType)}
                            onChange={(value: any) =>
                                handleGraphDataChange(
                                    cardIndex,
                                    graphIndex,
                                    'donnes',
                                    value,
                                )
                            }
                        />
                        {graph.donnes.length > 1 && (
                            <Dropdown
                                inputValue={graph.donnes[1]}
                                options={options(tabType)}
                                onChange={(value: any) =>
                                    handleGraphDataChange(
                                        cardIndex,
                                        graphIndex,
                                        'donnes',
                                        value,
                                        true,
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <GraphBox content={graph} chartSize={ChartSize.SMALL} />
                </div>
            </div>
        </div>
    );
};

export default EditGraphCard;
