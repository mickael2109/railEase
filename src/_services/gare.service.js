import Axios from "./Axios"


// Service gare
let getGareAll = (currentPage, filterId, filterClasse) => {
    return Axios.get(`/gare/allGare`)
}

export const gareService = {
    getGareAll
}