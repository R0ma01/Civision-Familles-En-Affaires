import Link from 'next/link';
import {
    EditSVG,
    InvisibleSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import { TabContent } from '@/components/interface/tab-content';
import { tabColors } from '@/constants/color-palet';
import useDataStore from '@/reducer/dataStore';
import { TableauxTraductionsTabs } from '@/services/translations';
import { Language } from '@/components/enums/language';

interface ThemeCardProps {
    index: string;
    page: PageTabContent;
    admin?: boolean;
    onClickEdit?: (e: any) => void;
    onClickDelete?: (e: any) => void;
    onClickVisible?: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
    index,
    page,
    admin = false,
    onClickEdit = (e: any) => {},
    onClickDelete = (e: any) => {},
    onClickVisible = () => {},
}) => {
    const adminArticleCss = admin ? '' : 'cursor-pointer';
    const reference = admin
        ? ''
        : `/thematiques/page-information?_id=${page._id}`;

    return (
        <Link href={reference}>
            <article
                className={`inline-block m-2 w-[245px] xl:w-[300px] rounded-xl shadow-xl bg-cover bg-center transform 
                    duration-500 hover:-translate-y-2 ${adminArticleCss} group`}
                style={{
                    backgroundImage: `url('${page.backgroundImage}')`,
                }}
            >
                <div
                    className="bg-gradient-to-b from-transparent to-black justify-end inset-0 rounded-xl px-6 flex 
                flex-wrap flex-col h-[350px] xl:h-[410px] hover:bg-black hover:bg-opacity-60 transform duration-300"
                >
                    <div
                        key={index}
                        className="group-hover:overflow-y-auto max-h-[250px] top-0"
                    >
                        <TabNotches
                            tabs={page.tabs}
                            className="absolute top-3 right-0"
                        />

                        <h2 className="text-white text-2xl xl:text-3xl mb-7">
                            {page.title}
                        </h2>
                        <p className="hidden mb-5 text-white text-sm xl:text-medium group-hover:block">
                            {page.description}
                        </p>
                    </div>
                    <div className="flex-row justify-evenly mb-4 hidden group-hover:flex">
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickEdit}
                            >
                                <EditSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></EditSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickDelete}
                            >
                                <TrashSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></TrashSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickVisible}
                            >
                                {page.visible ? (
                                    <VisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></VisibleSVG>
                                ) : (
                                    <InvisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></InvisibleSVG>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ThemeCard;

interface TabNotchesProps {
    className?: string;
    tabs: TabContent[];
}
function TabNotches({ className, tabs }: TabNotchesProps) {
    const lang: Language = useDataStore((state) => state.lang);
    return (
        <div className={`${className} flex flex-col space-y-1`}>
            {tabs.map((tab, index) => {
                const tabTitle = TableauxTraductionsTabs.get(tab.tabType);
                const title = tabTitle
                    ? tabTitle.titre[lang] || 'No title'
                    : 'No title';
                const acronym = tabTitle
                    ? tabTitle.acronym[lang] || '??'
                    : '??';
                const color = tabColors[tab.tabType];
                return (
                    <>
                        <div
                            key={index}
                            style={{
                                backgroundColor: color + 'AA',
                            }}
                            className={`p-2 flex items-center bg-opacity-40 border-none rounded-l-full text-white w-9 h-7 overflow-hidden`}
                            title={title}
                        >
                            <p className="text-xs">{acronym}</p>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
