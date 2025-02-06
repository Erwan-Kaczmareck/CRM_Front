import {useState, useEffect} from 'react';
import axios from 'axios';
import './Tabs.css';
import ModalAjout from "./ModalAjout.jsx";
import ModalModification from "./ModalModification.jsx";
import ModalDetail from './ModalDetail';

function Tabs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [prospects, setProspects] = useState([]);
    const [selectedProspect, setSelectedProspect] = useState(null); // Stocke le prospect sélectionné pour la modification
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);


    // Utiliser useEffect pour récupérer les prospects au montage du composant
    const getProspects = () => {
        axios.get('http://localhost:8080/api/prospects')
            .then((response) => {
                setProspects(response.data); // Mettre à jour l'état avec les données reçues
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des prospects:", error);
            });
    };

    useEffect(() => {
        getProspects(); // On récupère les prospects dès que le composant est monté
    }, []);

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter the rows based on the search query
    const filteredRows = prospects.filter((row) =>
        Object.values(row).some((val) =>
            val && val.toString().toLowerCase().includes(searchQuery)
        )
    );


    //Supprimer un prospect
    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce prospect ?")) {
            console.log(id);
            axios.delete(`http://localhost:8080/api/prospects/${id}`)
                .then(() => {
                    getProspects(); // Actualiser la liste après suppression
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression :", error);
                });
        }
    };

    const handleEdit = (prospect) => {
        setSelectedProspect(prospect); // Stocker le prospect sélectionné
        setIsEditModalOpen(true); // Ouvrir le modal
    };

    // Ouvrir le modal de détails


    const handleDetail = (prospect) => {
        setSelectedProspect(prospect);
        setIsDetailModalOpen(true);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher un prospect"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>

            <ModalAjout getProspects={getProspects}/>


            {/* Modal pour modifier un prospect */}
            {isEditModalOpen && (
                <ModalModification
                    prospect={selectedProspect} // Passer le prospect sélectionné
                    getProspects={getProspects} // Rafraîchir la liste après modification
                    onClose={() => setIsEditModalOpen(false)} // Fermer le modal
                />
            )}

            {isDetailModalOpen && (
                <ModalDetail
                    prospect={selectedProspect}
                    isOpen={isDetailModalOpen}
                    closeModal={() => setIsDetailModalOpen(false)}
                />
            )}

            <div className="table-container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Statut</th>
                            <th>Origine du lead</th>
                            <th>Mois</th>
                            <th>Annee(du contact)</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Tel</th>
                            <th>Mail</th>
                            <th>Niveau actuel</th>
                            <th>Diplôme préparé</th>
                            <th>Spécialité</th>
                            <th>Etablissement</th>
                            <th>CP</th>
                            <th>Ville</th>
                            <th>Année de recrutement</th>
                            <th>Entre en</th>
                            <th>Commentaire</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRows.map((row) => (
                            <tr key={row.idProspect}>
                                <td>{row.type}</td>
                                <td>{row.statut?.nomStatut}</td>
                                <td>{row.origineLead}</td>
                                <td>{row.mois}</td>
                                <td>{row.annee}</td>
                                <td>{row.nom}</td>
                                <td>{row.prenom}</td>
                                <td>{row.telephone}</td>
                                <td>{row.mail}</td>
                                <td>{row.niveauActuel}</td>
                                <td>{row.diplomePrepare}</td>
                                <td>{row.specialite}</td>
                                <td>{row.etablissement}</td>
                                <td>{row.codePostale}</td>
                                <td>{row.ville}</td>
                                <td>{row.anneeRecrutement}</td>
                                <td>{row.entreProchaineAnnee}</td>
                                <td>{row.commentaire}</td>
                                <td>
                                    <button className="btn-detail" onClick={() => handleDetail(row)}>Détails
                                    </button>

                                    <button className="btn-edit" onClick={() => handleEdit(row)}>Modifier
                                    </button>
                                    <button className="btn-delete"
                                            onClick={() => handleDelete(row.idProspect)}>Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Tabs;