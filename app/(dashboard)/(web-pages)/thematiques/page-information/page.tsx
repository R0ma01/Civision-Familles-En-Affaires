'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import DataCard from '@/components/component/data-card/data-card';
import useGlobalPageStore from '@/stores/global-page-store';
import PageContent from '@/components/interface/page-content';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFilterStore from '@/stores/global-filter-store';

function PageContentComponent() {
    const [page, setPage] = useState<PageContent | undefined>(undefined);
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

    const { filterData } = useGlobalFilterStore((state: any) => ({
        filterData: state.filterData,
    }));

    const { mapType, setMapStyle } = useMapStore((state) => {
        return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    });
    const { studyCompanyData, fetchStudyData, loading, error } =
        useGlobalDataStore((state: any) => ({
            studyCompanyData: state.studyCompanyData,
            fetchStudyData: state.fetchStudyData,
            loading: state.loading,
            error: state.error,
        }));

    useEffect(() => {
        async function fetchData() {
            console.log('iam called');
            await fetchStudyData(filterData);
        }
        if (studyCompanyData.length === 0 && !loading) {
            fetchData();
        }
    }, [studyCompanyData, loading, filterData]);

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION) {
            setMapStyle(MapType.PAGE_INFORMATION);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    useEffect(() => {
        if (!page && pagesData) {
            setPage(pagesData.find((page: PageContent) => page._id === _id));
        }
    }, [page, pagesData, _id]);

    if (pageLoading || loading) return <div>Loading...</div>;
    if (pageError || error) return <div>Error: {pageError}</div>;

    return (
        <>
            <PageContentContainer
                className="overflow-auto pb-10 pl-[30px]"
                filterMenu={true}
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    {page?.title}
                </h1>

                {page ? (
                    <div className="flex flex-col space-y-4 dark:text-white">
                        <p className="z-10 text-xs">{page?.description}</p>
                        {page.cards.map((card) => (
                            <DataCard key={card.title} content={card} />
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </PageContentContainer>
        </>
    );
}

export default function PageInformation() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContentComponent />
        </Suspense>
    );
}
