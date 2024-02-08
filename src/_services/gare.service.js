import Axios from "./Axios"


// Service gare
let getGareAll = () => {
    return Axios.get(`/gare/allGare`)
}

let getTrainGare = (id) => {
    return Axios.get(`/train/getTrainGare/${id}`)
}

export const gareService = {
    getGareAll, getTrainGare
}