import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import { fetchNews } from '../utils/api'; 
import { translations, MAX_REQUESTS } from '../utils/constants'; 
import '../styles/index.css'; 
import '../styles/App.css'; 
import LanguageToggle from './LanguageToggle'; 
import ErrorDisplay from '../utils/ErrorDisplay'; 
import Loader from './Loader'; 

const NewsApp = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState("es");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requestCount, setRequestCount] = useState(0);
    const INITIAL_LIMIT = 10; 
    const [showError, setShowError] = useState(false); 
    const centralContentRef = useRef(null);
    const scrollPositionRef = useRef(0);

    const getData = async (limit = INITIAL_LIMIT) => {
        if (requestCount >= MAX_REQUESTS) {
            setError(translations[language].requestLimitReached);
            setShowError(true);
            return;
        }

        setLoading(true);
        setError(null);
        setShowError(false); 

        try {
            const data = await fetchNews(search, page, language);
            if (data.length === 0 && search) {
                setError(translations[language].noResultsMessage);
                setShowError(true);
            } else {
                setNewsData((prevData) => [...prevData, ...data]);
                setRequestCount(prevCount => prevCount + 1);
                setShowError(false);
            }
        } catch (error) {
            console.error("Error al obtener noticias:", error);
            setError(translations[language].noResultsMessage);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(); 
    }, [page, search, language]);

    useEffect(() => {
        const handleScroll = () => {
            const centralContent = centralContentRef.current;
            if (centralContent.scrollTop + centralContent.clientHeight >= centralContent.scrollHeight - 1 && !loading) {
                if (requestCount < MAX_REQUESTS) {
                    scrollPositionRef.current = centralContent.scrollTop;
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        const centralContent = centralContentRef.current;
        if (centralContent) {
            centralContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (centralContent) {
                centralContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, requestCount]);

    useEffect(() => {
        if (centralContentRef.current) {
            centralContentRef.current.scrollTop = scrollPositionRef.current;
        }
    }, [newsData]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        setNewsData([]);
        setRequestCount(0);
        getData(); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
        setNewsData([]); 
        setPage(1); 
        setError(null); 
        setRequestCount(0); 
    };

    return (
        <div className="App">
            <header className="header">
                <h1>{translations[language].title}</h1>
            </header>
            <div className="mainContent">
                <main className="centralContent" ref={centralContentRef}>
                    <p className='head'>{translations[language].header}</p>
                    <div>
                        {loading ? (
                            <Loader />
                        ) : showError && error ? (
                            <ErrorDisplay error={error} />
                        ) : newsData.length > 0 ? (
                            <Card data={newsData} />
                        ) : (
                            <p>{translations[language].noInputMessage}</p>
                        )}
                    </div>
                </main>
                <aside className="sidebar rightSidebar">
                    <div className='searchBar'>
                        <input
                            type='text'
                            placeholder={translations[language].placeholder}
                            value={search}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearch}>{translations[language].searchButton}</button>
                    </div>
                    <div className="buttonContainer">
                        <LanguageToggle toggleLanguage={toggleLanguage} currentLanguage={language} />
                    </div>
                </aside>
            </div>
            <footer className="footer">
                <p>Isaac Barco</p>
            </footer>
        </div>
    );
};

export default NewsApp;