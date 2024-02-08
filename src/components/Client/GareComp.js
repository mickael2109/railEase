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
import axios from "axios"

export const TrainGare = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true);
    const [dataGare, setDataGare] = useState('')
    const [dataTrain, setDataTrain] = useState([])     
    const [showModal, setShowModal] = useState(false);
    const [nombreFormualire, setNombreFormulaire ] = useState(1)
    const options = [1, 2, 3, 4, 5];
    const [gareListe, setGareListe] = useState([])

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

    const getAllGare = async () => {
      try {
          setLoading(true);
          gareService.getGareAll()
              .then((res) => {
                setGareListe(res.data.gares);
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
            getAllGare()
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
          const { value: selectedOption } = await Swal.fire({
            title: 'Select a station',
            input: 'select',
            inputOptions: gareListe.reduce((acc, gare) => {
              acc[gare.id] = gare.nom; // Utiliser le nom de la gare comme option
              return acc;
            }, {}),
            inputPlaceholder: 'Select a station',
            showCancelButton: true,
          });
        
          if (selectedOption) {
            setShowModal(true)
            setNombreFormulaire(selectedNumber)
            console.log(selectedOption)
          } else {
            Utils.errorPage("Aucune option sélectionnée")
          }
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
          setFormData({...formData, personne: newFormData});
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
     
      try {
        await axios.put('http://localhost:5000/reservation/addReservation', 
        {
          "token": token,
          // "start": start,
          // "end": end,
          "numP": formData.numP,
          // "trainId": trainId,
          "personne": formData.personne
        }).then(res=>{
              Utils.sucess("Votre compte est bien enregistrée!")
              window.location.href='/'
        })
        .catch((error) => {
          Utils.errorPage(error.response.data.message)
        })
    } catch (error) {
        Utils.errorPage('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.')
    }
    };
  
    useEffect(() => {
      handleNumberChange(nombreFormualire);
      setFormData({...formData, numPlace: nombreFormualire})
      setFormData({...formData, token: nombreFormualire})
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
                        <input type="text" className='input' id={`nom`} name={`nom`} onChange={(e) => handleInputChange(index, e)} placeholder={`Nom du voyageur n°0${index+1}`}/>
                        <input type="text" className='input' id={`cin`} name={`cin`} onChange={(e) => handleInputChange(index, e)} placeholder={`CIN du voyageur n°0${index+1}`}/>
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
  

export const GareMap = ({ filteredLocations }) => {
  const map = useMap();

  useEffect(() => {
    // Efface tous les marqueurs de la carte
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Ajoute les nouveaux marqueurs pour les emplacements filtrés
    if (filteredLocations.length > 0) {
      filteredLocations.forEach(location => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(location.gare); // Affiche le nom du lieu dans la popup
      });
    }
  }, [filteredLocations, map]); // Déclenche l'effet à chaque changement de filteredLocations ou map

  return null;
}