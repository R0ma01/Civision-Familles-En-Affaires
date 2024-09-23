'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useGlobalPageStore from '@/stores/global-page-store';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { TabContainer } from '@/components/component/tab/tab-container';
import PageTabContent from '@/components/interface/page-tabs-content';
import { Language } from '@/components/enums/language';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { DataBaseOrigin } from '@/components/enums/data-types-enum';

function PageContentComponent() {
    const { resetFilters } = useGlobalFilterStore((state) => ({
        resetFilters: state.resetFilters,
    }));

    useEffect(() => {
        resetFilters();
    }, [resetFilters]); // Empty dependency array ensures this runs only on mount

    const lang: Language = useDataStore((state) => state.lang);

    const [page, setPage] = useState<PageTabContent | undefined>(undefined);
    const searchParams = useSearchParams();
    const _id = searchParams.get('_id');
    const { pagesData, pageLoading, pageError } = useGlobalPageStore(
        (state: any) => {
            return {
                pagesData: state.pagesData,
                pageLoading: state.pageLoading,
                pageError: state.pageError,
            };
        },
    );

    const { setMapStyle } = useMapStore((state) => {
        return { setMapStyle: state.setMapStyle };
    });

    useEffect(() => {
        if (!page && pagesData) {
            setPage(pagesData.find((page: PageTabContent) => page._id === _id));
        }
    }, [page, pagesData, _id]);

    function setMap(dataOrigin: DataBaseOrigin) {
        switch (dataOrigin) {
            case DataBaseOrigin.INDEX_VOLETA:
                setMapStyle(MapType.PAGE_INFORMATION_INDEX_VOLETA);
                break;
            case DataBaseOrigin.INDEX_VOLETB:
                setMapStyle(MapType.PAGE_INFORMATION_INDEX_VOLETB);
                break;

            default:
                setMapStyle(MapType.PAGE_INFORMATION_ALBUM);
        }
    }

    if (pageLoading)
        return <div>{SharedPromptsTranslations.loading[lang]}</div>;
    if (pageError)
        return (
            <div>
                {SharedPromptsTranslations.error[lang]}
                {pageError}
            </div>
        );

    return (
        <>
            <PageContentContainer
                className="overflow-auto pb-10 pl-[30px]"
                filterMenu={true}
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    {page?.title}
                </h1>

                {page && (
                    <TabContainer
                        tabs={page?.tabs ?? []}
                        setMap={setMap}
                    ></TabContainer>
                )}
            </PageContentContainer>
        </>
    );
}

export default function PageInformation() {
    const lang: Language = useDataStore((state) => state.lang);

    return (
        <Suspense
            fallback={<div>{SharedPromptsTranslations.loading[lang]}</div>}
        >
            <PageContentComponent />
        </Suspense>
    );
}
