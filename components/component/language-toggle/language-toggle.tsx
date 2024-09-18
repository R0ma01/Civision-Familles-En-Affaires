'use client';
import { useEffect, useState } from 'react';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

interface LanguageToggleProps {
    className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
    const [language, setLanguage] = useState<Language>(Language.FR);
    const { lang, setLang } = useDataStore((state) => ({
        setLang: state.setLang,
        lang: state.lang,
    }));

    useEffect(() => {
        setLanguage(lang);
    }, [lang]);
    function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedLanguage = e.target.value as Language;
        setLang(selectedLanguage);
    }

    return (
        <div className={`w-fit ${className}`}>
            <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-custom-grey bg-opacity-75 text-icon-gray px-1 py-1 rounded transition cursor-pointer text-xs border-none outline-none"
            >
                {Object.keys(Language).map((item, index) => {
                    return (
                        <option
                            key={index}
                            value={item}
                            className="text-xs hover:bg-gray-800 text-icon-gray bg-custom-grey bg-opacity-75"
                        >
                            {item}
                        </option>
                    );
                })}
                {/* <option value={Language.FR}>Français</option>
                <option value={Language.EN}>English</option> */}
            </select>
        </div>
    );
}
