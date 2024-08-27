'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PagePaths } from '@/components/enums/page-paths-enum';
import { useState } from 'react';
import { UserType } from '@/components/enums/user-type-enum';
import DisconnectDialog from '@/components/component/dialogs/disconnect-confirmation-dialog';
import SideBarItem from './SidebarItem';
import fullLogoFAE from '@/public/images/fea-full-logo.png';
import logoFAE from '@/public/images/simple-logo-fae.png';

import {
    AdminSVG,
    LoginSVG,
    LogoutSVG,
    HomeSVG,
    StatsSVG,
    InfoSVG,
    ChercheurSVG,
    FournisseurSVG,
} from '@/components/component/svg-icons/svg-icons';

import { useUser } from '@/context/user-context'; // Adjust the path as necessary

enum hoverColor {
    green = 'green',
    red = 'red',
    blue = 'blue',
    none = 'none',
}

const Sidebar: React.FC = () => {
    const { user, setUser } = useUser();
    const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);

    const openDisconnectDialog = (e: any) => {
        e.preventDefault();
        setIsDisconnectDialogOpen(true);
    };
    const closeDisconnectDialog = () => {
        setUser(UserType.VISITOR);
        setIsDisconnectDialogOpen(false);
    };

    return (
        <>
            <div
                id="side-bar"
                className={`overflow-hidden group bg-gradient-to-b from-custom-grey to-white justify-between
        flex-col flex h-full flex-shrink-0 z-50 transition-all ease-in-out duration-500 transform absolute w-10 hover:w-56 hover:shadow-r`}
            >
                <Link
                    href={PagePaths.HOME}
                    className={`flex ease-in-out duration-500 absolute top-[10px]`}
                >
                    <Image
                        src={logoFAE}
                        alt="Logo Familles en Affaires"
                        className={`max-w-[87px] min-w-[87px] -left-[23px] absolute top-[10px] cursor-pointer`}
                        width={87}
                        height={80}
                    />

                    <Image
                        src={fullLogoFAE}
                        alt="Logo Familles en Affaires"
                        className={`min-w-[224px] absolute top-2 cursor-pointer transition-all ease-in-out duration-300 opacity-0 group-hover:opacity-100`}
                        width={220}
                        height={80}
                    />
                </Link>

                <ul className="space-y-6 absolute top-[35vh]">
                    <SideBarItem
                        pagePath={PagePaths.REPERTOIRE}
                        hoverColor={hoverColor.green}
                        active={user !== UserType.VISITOR}
                    >
                        <HomeSVG className="w-6 h-6" />
                        <span className="ml-5 hidden group-hover:block ease-in-out duration-300 transition-all">
                            Répertoire
                        </span>
                    </SideBarItem>

                    <SideBarItem
                        pagePath={PagePaths.FOURNISSEURS}
                        hoverColor={hoverColor.green}
                    >
                        <FournisseurSVG className="w-6 h-6 fill-black" />
                        <span className="ml-5 hidden group-hover:block ease-in-out duration-300 transition-all">
                            Fournisseurs
                        </span>
                    </SideBarItem>

                    <SideBarItem
                        pagePath={PagePaths.THEMATIQUES}
                        hoverColor={hoverColor.green}
                    >
                        <StatsSVG className="w-6 h-6" />
                        <span className="ml-5 hidden group-hover:block ease-in-out duration-300 transition-all">
                            Thématiques
                        </span>
                    </SideBarItem>

                    <SideBarItem
                        pagePath={PagePaths.RECHERCHE_ACADEMIQUE}
                        hoverColor={hoverColor.green}
                        active={user !== UserType.VISITOR}
                    >
                        <ChercheurSVG className="w-6 h-6" />
                        <span className="ml-5 hidden group-hover:block ease-in-out duration-300 transition-all">
                            Recherche Aca...
                        </span>
                    </SideBarItem>

                    {user === UserType.ADMIN && (
                        <SideBarItem
                            pagePath={PagePaths.ADMIN}
                            hoverColor={hoverColor.green}
                            active={user === UserType.ADMIN}
                        >
                            <AdminSVG className="w-6 h-6" />
                            <span className="ml-5 hidden group-hover:block duration-300 transition-all">
                                Admin
                            </span>
                        </SideBarItem>
                    )}
                </ul>
                <ul className="space-y-4 mb-2 absolute bottom-[10px]">
                    <SideBarItem
                        pagePath={PagePaths.A_PROPOS}
                        hoverColor={hoverColor.green}
                    >
                        <InfoSVG className="w-6 h-6" />
                        <span className="ml-5 hidden group-hover:block duration-300 transition-all">
                            À Propos
                        </span>
                    </SideBarItem>

                    {user === UserType.VISITOR && (
                        <SideBarItem
                            pagePath={PagePaths.LOGIN}
                            hoverColor={hoverColor.blue}
                        >
                            <LoginSVG className="w-6 h-6" />
                            <span className="ml-5 hidden group-hover:block duration-300 transition-all">
                                Se Connecter
                            </span>
                        </SideBarItem>
                    )}
                    {user !== UserType.VISITOR && (
                        <SideBarItem
                            pagePath={PagePaths.NONE}
                            hoverColor={hoverColor.red}
                            onClick={openDisconnectDialog}
                        >
                            <LogoutSVG className="w-6 h-6" />
                            <span className="ml-5 hidden group-hover:block duration-300 transition-all">
                                Se Déconnecter
                            </span>
                        </SideBarItem>
                    )}
                </ul>
            </div>
            {isDisconnectDialogOpen && (
                <DisconnectDialog closeDialog={closeDisconnectDialog} />
            )}{' '}
        </>
    );
};

export default Sidebar;
