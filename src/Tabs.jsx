import {useState, useEffect} from 'react';
import axios from 'axios';
import './Tabs.css';
import ModalAjout from "./ModalAjout.jsx";

function Tabs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [prospects, setProspects] = useState([]); // Ajouter un état pour les prospects

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

    // Fonction pour ouvrir le modal

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
                        {filteredRows.map((row, index) => (
                            <tr key={index}>
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
                                <td></td>
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