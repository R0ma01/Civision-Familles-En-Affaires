'use client';
import React, { useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalPageStore from '@/stores/global-page-store';
import PageContent from '@/components/interface/page-content';
import constants from '@/constants/constants';
import useMapStore from '@/stores/global-map-store';

export default function Thematiques() {
    const { pagesData, pageLoading, pageError } = useGlobalPageStore();
    const [pages, setPages] = useState<PageContent[]>([]);

    const setMapStyle = useMapStore((state) => state.setMapStyle);

    setMapStyle(true);

    useEffect(() => {
        if (pages.length === 0 && pagesData) {
            setPages(pagesData);
        }
    }, [pages, pagesData]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                Thématiques
            </h1>
            <div className="justify-center flex flex-wrap w-[80%]">
                {pages.length > 0 ? (
                    pages.map((card, index) => (
                        <>
                            {card.visible ? (
                                <ThemeCard
                                    index={
                                        constants.theme_card_id +
                                        index.toString()
                                    }
                                    key={index}
                                    page={card}
                                />
                            ) : (
                                ''
                            )}
                        </>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </PageContentContainer>
    );
}
