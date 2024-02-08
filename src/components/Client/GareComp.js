import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { gareService } from "../../_services/gare.service"
import { Utils } from "../../_utils/utils"
import { FaTimes } from "react-icons/fa"
import Swal from "sweetalert2"
import L from 'leaflet';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from 'react-leaflet';

export const TrainGare = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true);
    const [dataGare, setDataGare] = useState('')
    const [dataTrain, setDataTrain] = useState([])     
    const [showModal, setShowModal] = useState(false);
    const [nombreFormualire, setNombreFormulaire ] = useState(1)
    const options = [1, 2, 3, 4, 5];

    const getTrainGare = async (id) => {
        try {
            setLoading(true);
            gareService.getTrainGare(id)
            .then((res) => {
                setDataGare(res.data.trainGares[0].gare.nom)
                setDataTrain(res.data.trainGares);
            })
        } catch (error) {
            Utils.errorPage(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(id){
            getTrainGare(id);
        }
    }, [id]);

    const openModal = async() => {
        const { value: selectedNumber } = await Swal.fire({
            title: 'Select a number:',
            input: 'select',
            inputOptions: options.reduce((acc, val) => {
              acc[val] = val;
              return acc;
            }, {}),
            inputPlaceholder: 'Select a number',
            showCancelButton: true,
          });
      
          if (selectedNumber) {
            setNombreFormulaire(selectedNumber)
            setShowModal(true);
        }
        
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

    return (
        
        <div>
            <div className='header-page'>
                <div className='titre-page'>
                    <span>{`Gare ${dataGare}`}</span>
                </div>
            </div>
            <div className="train-gare">
                <div className="image-gare">
                    <img src={`../../media/gare/${dataGare}.jpg`} alt='logo'/>
                </div>
                <div className="list-train">
                    {
                        loading ? (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                </div>
                            ) : (
                            <>
                                {Array.isArray(dataTrain) && dataTrain.length > 0 ? (
                                    <table className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nom</th>
                                                <th>Matricule</th>
                                                <th>Adresse</th>
                                                <th>Réserver</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {dataTrain.map((trainItem, index) => (
                                            
                                            <tr key={index}>
                                                <td>{trainItem.train.id}</td>
                                                <td>{trainItem.train.nom}</td>
                                                <td>{trainItem.train.matricule}</td>
                                                <td>{trainItem.date}</td>
                                                <td onClick={openModal}><button type="submit" className="btn btn-reserver">Réservation</button></td> 
                                                <Reservation key={index} showModal={showModal} closeModal={closeModal} nombreFormualire={nombreFormualire}/>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>Aucun train disponible.</div>
                                )}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export const Reservation = ({ showModal, closeModal, nombreFormualire }) => {
    const [numberOfForms, setNumberOfForms] = useState(nombreFormualire);
    const [formData, setFormData] = useState({
      userId: '1',
      start: '2',
      end: '3',
      numPlace: '',
      personne: Array.from({ length: nombreFormualire }, () => ({})) // Initialiser un tableau d'objets vides pour stocker les données du formulaire
    });
  
    const handleNumberChange = (e) => {
      const value = parseInt(e);
      setNumberOfForms(value);
      setFormData({...formData, personne: Array.from({ length: value }, () => ({})) // Mettre à jour le nombre d'objets vides en fonction de la nouvelle valeur
      });
    };
  
    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newFormData = [...formData.personne]; // Copier le tableau de données du formulaire existant
        newFormData[index] = { ...newFormData[index], [name]: value }; // Mettre à jour les données du formulaire pour l'index spécifié
        setFormData({...formData, personne: newFormData // Mettre à jour le tableau de données du formulaire avec les nouvelles données
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData); // Afficher les données du formulaire dans la console
    };
  
    useEffect(() => {
      handleNumberChange(nombreFormualire);
      setFormData({...formData, numPlace: nombreFormualire})
    }, [nombreFormualire]);
  
 
    return (
      <div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
              <div className="">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Information des Voyageurs</h5>
                  <i onClick={closeModal} style={{ cursor: 'pointer', color: 'red' }}><FaTimes /></i>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {[...Array(numberOfForms)].map((_, index) => (
                      <div key={index} >
                        <h3>Voyageur n°0{index + 1}</h3>
                        <input type="text" className='input' id={`nom${index}`} name={`nom${index}`} onChange={(e) => handleInputChange(index, e)} placeholder={`Nom du voyageur n°0${index+1}`}/>
                        <input type="text" className='input' id={`cin${index}`} name={`cin${index}`} onChange={(e) => handleInputChange(index, e)} placeholder={`CIN du voyageur n°0${index+1}`}/>
                      </div>
                    ))}
                    <button type="submit" className="btn btn-valider">Valider</button>
                    <button type='reset'className="btn btn-annuler" onClick={closeModal}>Close</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
  

export const GareMap = () =>{
  const map = useMap();

    let iconBus = L.icon({
        iconUrl: "/bus.png",
        iconSize: [30, 30],
    });

    let myIcon = L.icon({
        iconUrl: "/myIocalisation.png",
        iconSize: [30, 30],
    });

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        var marker1 = L.marker([0, 0], { icon: iconBus }).addTo(map);

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
    
                // map.setView([latitude, longitude], 30, {icon: myIcon})
                // L.marker([latitude, longitude], {icon: myIcon}).addTo(map)
            },(error) => {
                Swal.fire({ icon: 'error', title: 'Erreur', text: `Erreur de la géolocalisation, Veuillez vérifier votre connexion!`, });
            })
        }else{
            Swal.fire({ icon: 'error', title: 'Erreur', text: `La géolocalisation n'est pas prise en charge par ce navigateur`, });
        }

        L.Routing.control({
            waypoints: [
                L.latLng(latitude, longitude),
            ],
            lineOptions: {
                styles: [
                    {
                        color: 'blue',
                        weight: 4,
                        opacity: 0.7,
                    },
                ],
            },
            routerWhileDragging: false,
            geocoder: L.Control.Geocoder.nominatim(),
        })
            .on("routesfound", function (e) {
                console.log("lat : ",latitude, "lng :", longitude)
                let coordinatesArray = [];

                e.routes[0].coordinates.forEach((c, i) => {
                    coordinatesArray.push({ latitude: c.lat, longitude: c.lng });
                    
                    setTimeout(() => {
                        marker1.setLatLng([c.lat, c.lng]);
                    }, 100 * i);
                });

                // Afficher les coordonnées depuis le coordinatesArray
                // coordinatesArray.forEach((coord, index) => {
                //     console.log(`Coordonnée ${index + 1}: Lat ${coord.lat}, Lng ${coord.log}`);
                // });


                
                // Stocker les coordonnées dans le localStorage
                // localStorage.setItem("coordinates", JSON.stringify(coordinatesArray));

            })
            .addTo(map);

    }, [map, iconBus]);

    return null;
}