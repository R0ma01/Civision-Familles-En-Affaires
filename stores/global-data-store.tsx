import { CompanyInfo } from '@/components/interface/company';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { FournisseursHttpRequestService } from '@/services/fournisseur-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    devtools(
        persist(
            (set, get) => ({
                studyData: [],
                indexeAData: [],
                indexeBData: [],
                repertoireData: [],
                fournisseurData: [],

                studyDataFetched: false,
                indexeADataFetched: false,
                indexeBDataFetched: false,
                repertoireDataFetched: false,
                fournisseurDataFetched: false,

                loading: false,
                error: false,

                fetchStudyData: async (filters: CompanyInfo) => {
                    console.log('fetch study data');
                    if ((get() as any).studyDataFetched) return;

                    set({ loading: true, error: null });
                    try {
                        const responseStudy =
                            await GraphDataHttpRequestService.getAllStudyData(
                                filters,
                            );

                        set({
                            studyData: responseStudy,
                            loading: false,
                            studyDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                fetchRepertoireData: async (
                    matchStage: Record<string, any>,
                ) => {
                    if ((get() as any).repertoireDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const responseRepertoire =
                            await GraphDataHttpRequestService.getAllRepertoireData(
                                matchStage,
                            );

                        set({
                            repertoireData: responseRepertoire,
                            loading: false,
                            repertoireDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                fetchFournisseurData: async (filters: Record<string, any>) => {
                    if ((get() as any).fournisseurDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const responseFournisseur =
                            await FournisseursHttpRequestService.getAll(
                                filters,
                            );

                        set({
                            fournisseurData: responseFournisseur,
                            loading: false,
                            fournisseurDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                fetchIndexeAData: async (matchStage: Record<string, any>) => {
                    if ((get() as any).indexeADataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        console.log('Indexe A');
                        const responseIndexe =
                            await GraphDataHttpRequestService.getAllIndexVoletAData(
                                matchStage,
                            );
                        console.log(responseIndexe);
                        set({
                            indexeAData: responseIndexe,
                            loading: false,
                            indexeADataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                fetchIndexeBData: async (matchStage: Record<string, any>) => {
                    if ((get() as any).indexeBDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        console.log('Indexe B');
                        const responseIndexe =
                            await GraphDataHttpRequestService.getAllIndexVoletBData(
                                matchStage,
                            );
                        console.log(responseIndexe);
                        set({
                            indexeBData: responseIndexe,
                            loading: false,
                            indexeBDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                filterStudyData: () => {
                    if ((get() as any).studyDataFetched) {
                        set({ studyDataFetched: false });
                    }
                },

                filterRepertoireData: () => {
                    if ((get() as any).repertoireDataFetched) {
                        set({ repertoireDataFetched: false });
                    }
                },

                filterFournisseurData: () => {
                    if ((get() as any).fournisseurDataFetched) {
                        set({ fournisseurDataFetched: false });
                    }
                },

                filterIndexeAData: () => {
                    if ((get() as any).indexeDataFetched) {
                        set({ indexeADataFetched: false });
                    }
                },
                filterIndexeBData: () => {
                    if ((get() as any).indexeDataFetched) {
                        set({ indexeBDataFetched: false });
                    }
                },
            }),
            {
                name: 'global-data-store', // unique name for local storage
            },
        ),
    ),
);

export default useGlobalDataStore;
