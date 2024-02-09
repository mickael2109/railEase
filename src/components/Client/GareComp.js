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
    const [idGareEnd, setIdGareEnd] = useState('')

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
            setIdGareEnd(selectedOption)
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
                    <div className="text-gare">
                      <span>{`Gare ${dataGare}`}</span>
                    </div>
                    <div className="image">
                      <img src={`../../media/gare/${dataGare}.jpg`} alt='logo'/>
                    </div>
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
                                                <th>Nom</th>
                                                <th>Matricule</th>
                                                <th>Date</th>
                                                <th>Heure</th>
                                                <th>Place Disponible</th>
                                                <th>Réserver</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {dataTrain.map((trainItem, index) => {
                                              // Déclaration des constantes pour chaque itération de la carte
                                            const dateStr = trainItem.date;
                                            const dateObj = new Date(dateStr);
                                            const formattedDate = dateObj.toLocaleDateString();
                                            const formattedTime = dateObj.toLocaleTimeString();

                                            return (
                                              <tr key={index}>
                                                <td>{trainItem.train.nom}</td>
                                                <td>{trainItem.train.matricule}</td>
                                                <td>{formattedDate}</td>
                                                <td>{formattedTime}</td>
                                                <td>{trainItem.placeDispo}</td>
                                                <td onClick={openModal}><button type="submit" className="btn btn-reserver">Réservation</button></td>
                                                <Reservation
                                                    key={index}
                                                    showModal={showModal}
                                                    closeModal={closeModal}
                                                    nombreFormualire={nombreFormualire}
                                                    startGare={trainItem.gareId}
                                                    endGare={idGareEnd}
                                                    idTrain={trainItem.train.id}
                                                    dateReservation={trainItem.date}
                                                />
                                              </tr>
                                            );
                                          })}
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


export const Reservation = ({ showModal, closeModal, nombreFormualire, startGare, endGare, idTrain, dateReservation }) => {
    const [numberOfForms, setNumberOfForms] = useState(nombreFormualire);
    const tokens = localStorage.getItem('token');
    const [formData, setFormData] = useState({
      token: tokens,
      start: startGare,
      end: endGare,
      numP: nombreFormualire,
      trainId: idTrain,
      dateRes: dateReservation,
      personne: Array.from({ length: nombreFormualire }, () => ({}))
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
      e.preventDefault()
      console.log(formData)
      try {
        await axios.put('http://localhost:5000/reservation/addReservation', 
        {
          "date": formData.dateRes,
          "token": formData.token,
          "start": formData.start,
          "end": formData.end,
          "numP": formData.numP,
          "trainId": formData.trainId,
          "personne": formData.personne
        }).then(res=>{
              Utils.sucess("Votre réservation a été bien enregistrée!")
              // window.location.href='/client'
        })
        .catch((error) => {
          Utils.errorPage(error.response.data.message)
        })
    } catch (error) {
        Utils.errorPage('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.')
    }
    };
  
    useEffect(() => {
      setNumberOfForms(nombreFormualire);
      handleNumberChange(nombreFormualire);
      setFormData(prevFormData => ({
        ...prevFormData,
        start: startGare,
        end: endGare,
        trainId: idTrain,
        dateRes: dateReservation,
        numP: nombreFormualire
      }));
    }, [nombreFormualire, startGare, endGare, idTrain, dateReservation]);
  
 
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