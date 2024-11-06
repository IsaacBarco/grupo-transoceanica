const API_KEY_MAIN = "204581e92e2d46e49abe98c288f0989c"; 
const API_KEY_ALTERNATIVE = "deafbf7d5bc7485cb8d7761f2e0b379d"; 

// Función para consultar la API principal
export const fetchNews = async (searchQuery, page, language) => {
    try {
        
        const data = await fetchFromAPI(searchQuery, page, language, API_KEY_MAIN, "https://newsapi.org/v2/everything");
        return data;
    } catch (error) {
        console.error("Error en la API principal:", error.message);

        //Función para consultar a la API alternativa
        try {
            console.log("Intentando con la API alternativa...");
            const dataAlternative = await fetchFromAPI(searchQuery, page, language, API_KEY_ALTERNATIVE, "https://api-alternativa.com/v2/everything");
            return dataAlternative;
        } catch (errorAlt) {
            console.error("Error en la API alternativa:", errorAlt.message);
            throw new Error("No se pudieron obtener noticias de ninguna fuente. Intenta más tarde.");
        }
    }
};

//Función para consultar una API ya sea principal o alternativa
const fetchFromAPI = async (searchQuery, page, language, apiKey, baseUrl) => {
    const response = await fetch(`${baseUrl}?q=${searchQuery}&apiKey=${apiKey}&page=${page}&pageSize=10&language=${language}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener noticias");
    }

    const data = await response.json();
    return data.articles;
};
