import { CompanyInfo } from '@/components/interface/company';
import { MapClusterPointData } from '@/components/interface/point-data';
import { RepertoireData } from '@/components/interface/repertoire-data';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    devtools(
        persist(
            (set, get) => ({
                studyCompanyData: [],
                studyFilteredData: [],
                repertoireCompanyData: [],
                repertoireFilteredData: [],
                loading: false,
                error: null,
                studyDataFetched: false,
                repertoireDataFetched: false,
                setStudyFilteredData: (fData: CompanyInfo[]) =>
                    set({ studyFilteredData: fData }),
                setRepertoireFilteredData: (fData: MapClusterPointData[]) =>
                    set({ repertoirefilteredData: fData }),
                fetchStudyData: async () => {
                    if ((get() as any).studyDataFetched) return;

                    set({ loading: true, error: null });
                    try {
                        const responseStudy =
                            await GraphDataHttpRequestService.getAllStudyData();

                        set({
                            studyCompanyData: responseStudy,
                            studyFilteredData: responseStudy,
                            loading: false,
                            studyDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },
                fetchRepertoireData: async () => {
                    if ((get() as any).repertoireDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const responseRepertoire =
                            await GraphDataHttpRequestService.getAllRepertoireData();

                        set({
                            repertoireCompanyData: responseRepertoire,
                            repertoireFilteredData: responseRepertoire,
                            loading: false,
                            repertoireDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
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
