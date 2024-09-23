interface Traductions {
    FR: string;
    EN: string;
}

type PromptsTranslations = {
    [key: string]: Traductions;
};

export const SharedPromptsTranslations: PromptsTranslations = {
    loading: {
        FR: 'Chargement ...',
        EN: 'Loading ...',
    },
    error: {
        FR: 'Erreur: ',
        EN: 'Error: ',
    },
    search: {
        FR: 'Rechercher',
        EN: 'Search',
    },
    save: {
        FR: 'Enregistrer',
        EN: 'Save',
    },
    cancel: {
        FR: 'Annuler',
        EN: 'Cancel',
    },
    filters: { FR: 'Filtres', EN: 'Filters' },
    general_filters: { FR: 'Général', EN: 'General' },
    advanced_filters: { FR: 'Avancé', EN: 'Advanced' },
};

export const AdminPromptsTranslations: PromptsTranslations = {
    new_page_title: {
        FR: 'Votre titre ICI',
        EN: 'Your title HERE',
    },
    new_page_description: {
        FR: 'Votre description ICI',
        EN: 'Your description HERE',
    },
    page_title: {
        FR: 'Page Administrative',
        EN: 'Admin Page',
    },
    unavailable: {
        FR: 'Pages indisponibles',
        EN: 'No pages available',
    },
};

export const ThematiquePromptsTranslations: PromptsTranslations = {
    page_title: {
        FR: 'Thématiques',
        EN: 'Themes',
    },
};

export const RecherchePromptsTranslations: PromptsTranslations = {
    page_title: {
        FR: 'Recherche Académique',
        EN: 'Academic Search',
    },
};

export const RepertoirePromptsTranslations: PromptsTranslations = {
    search_box_title: {
        FR: 'Liste des entreprises familiales recensées au Québec',
        EN: 'List of all the family companies in Quebec',
    },
    page_title: {
        FR: 'Répertoire',
        EN: 'Repertory',
    },
    data_card1_title: {
        FR: 'Entreprises Familiales',
        EN: 'Family Companies',
    },
    data_card1_description: {
        FR: "représente le nombre d'entreprises familiales au Québec en 2023.",
        EN: 'represents the number of family owned companies in Quebec in 2023.',
    },
    data_card2_title: {
        FR: 'Proportion Privé',
        EN: 'Private Proportion',
    },
    data_card2_description: {
        FR: 'des entreprises privées sont des entreprises familiales.',
        EN: 'of the private companies are family owned.',
    },
    data_card3_title: {
        FR: 'Rechercher une Entreprise',
        EN: 'Search for a company',
    },
};

export const FournisseurPromptsTranslations: PromptsTranslations = {
    fournisseur_box_title: {
        FR: 'Liste et profils des fournisseurs',
        EN: 'List and profiles of all suppliers',
    },

    region: {
        FR: 'Régions',
        EN: 'Regions',
    },

    service: {
        FR: 'Services Offerts',
        EN: 'Offered Services',
    },

    page_title: {
        FR: 'Fournisseurs',
        EN: 'Suppliers',
    },
};

export const SideBarPromptsTranslations: PromptsTranslations = {
    repertoire: {
        FR: 'Répertoire',
        EN: 'Repertory',
    },
    suppliers: {
        FR: 'Fournisseurs',
        EN: 'Suppliers',
    },
    thematiques: {
        FR: 'Thématiques',
        EN: 'Themes',
    },
    acad_search: {
        FR: 'Recherche Académique',
        EN: 'Academic Research',
    },
    a_propos: {
        FR: 'À Propos',
        EN: 'About',
    },
    admin: {
        FR: 'Admin',
        EN: 'Admin',
    },
    connexion: {
        FR: 'Se Connecter',
        EN: 'Connect',
    },
    deconnexion: {
        FR: 'Se Déconnecter',
        EN: 'Disconnect',
    },
};
