import {useState, useEffect} from "react";
import "./ModalAjout.css";

function ModalAjout({getProspects}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statuts, setStatuts] = useState([]);

    const [formData, setFormData] = useState({
        type: "",
        origineLead: "",
        mois: "",
        annee: "",
        nom: "",
        prenom: "",
        telephone: "",
        mail: "",
        niveauActuel: "",
        diplomePrepare: "",
        specialite: "",
        etablissement: "",
        codePostale: "",
        ville: "",
        anneeRecrutement: "",
        entreProchaineAnnee: "",
        commentaire: "",
        statut: ""
    });

    useEffect(() => {
        const fetchStatuts = async () => {
            try {

                const response = await fetch("http://localhost:8080/api/statuts");
                if (!response.ok) throw new Error("Erreur lors du chargement des statuts");

                const data = await response.json();
                console.log("Statuts récupérés :", data);

                setStatuts(data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        };

        fetchStatuts();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "statut"
                ? statuts.find((s) => s.idStatut === parseInt(value, 10)) || prev.statut
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await fetch("http://localhost:8080/api/prospects", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Erreur lors de l'envoi");

            console.log("Prospect ajouté avec succès !");
            alert("Prospect ajouté avec succès !");

            setFormData({
                type: "",
                origineLead: "",
                mois: "",
                annee: "",
                nom: "",
                prenom: "",
                telephone: "",
                mail: "",
                niveauActuel: "",
                diplomePrepare: "",
                specialite: "",
                etablissement: "",
                codePostale: "",
                ville: "",
                anneeRecrutement: "",
                entreProchaineAnnee: "",
                commentaire: "",
                statut: ""
            });

            // Appeler la fonction getProspects pour récupérer la liste mise à jour
            getProspects();

            setIsModalOpen(false);
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    const moisOptions = [
        {valeur: "Janvier", label: "Janvier"},
        {valeur: "Février", label: "Février"},
        {valeur: "Mars", label: "Mars"},
        {valeur: "Avril", label: "Avril"},
        {valeur: "Mai", label: "Mai"},
        {valeur: "Juin", label: "Juin"},
        {valeur: "Juillet", label: "Juillet"},
        {valeur: "Août", label: "Août"},
        {valeur: "Septembre", label: "Septembre"},
        {valeur: "Octobre", label: "Octobre"},
        {valeur: "Novembre", label: "Novembre"},
        {valeur: "Décembre", label: "Décembre"},
    ];

    return (
        <div>
            <div className="div-buttonAjouter">
                <button className="buttonAjouter" onClick={() => setIsModalOpen(true)}>Ajouter un prospect</button>
            </div>


            {isModalOpen && (
                <div className="form-overlay">
                    <div className="form-container">
                        <h2>Ajouter un Prospect</h2>
                        <div className="modal-content">
                            <form onSubmit={handleSubmit} className="form-grid">
                                <div className="form-group">
                                    <label>Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Origine du Lead</label>
                                    <input
                                        type="text"
                                        name="origineLead"
                                        value={formData.origineLead}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mois</label>
                                    <select
                                        name="mois"
                                        value={formData.mois || ""}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner un mois</option>
                                        {moisOptions.map(({valeur, label}) => (
                                            <option key={valeur} value={valeur}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Année</label>
                                    <input
                                        type="number"
                                        name="annee"
                                        value={formData.annee}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Téléphone</label>
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="mail"
                                        value={formData.mail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Code Postal</label>
                                    <input
                                        type="text"
                                        name="codePostale"
                                        value={formData.codePostale}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ville</label>
                                    <input
                                        type="text"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Etablissement Actuel</label>
                                    <input
                                        type="text"
                                        name="etablissement"
                                        value={formData.etablissement}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Diplome Prepare</label>
                                    <input
                                        type="text"
                                        name="diplomePrepare"
                                        value={formData.diplomePrepare}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cursus</label>
                                    <input
                                        type="text"
                                        name="specialite"
                                        value={formData.specialite}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Niveau d&#39;Étude</label>
                                    <input
                                        type="text"
                                        name="niveauActuel"
                                        value={formData.niveauActuel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Année de Recrutement</label>
                                    <input
                                        type="number"
                                        name="anneeRecrutement"
                                        value={formData.anneeRecrutement}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Entrée en</label>
                                    <input
                                        type="text"
                                        name="entreProchaineAnnee"
                                        value={formData.entreProchaineAnnee}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Sélection du statut */}
                                <div className="form-group">
                                    <label>Statut</label>
                                    <select name="statut" value={formData.statut?.idStatut || ""}
                                            onChange={handleChange}
                                            required>
                                        <option value="">Sélectionner un statut</option>
                                        {statuts.map((statut) => (
                                            <option key={statut.idStatut} value={statut.idStatut}>
                                                {statut.nomStatut}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group wide">
                                    <label>Commentaire</label>
                                    <textarea
                                        name="commentaire"
                                        value={formData.commentaire}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="form-buttons">
                                    <button type="submit" className="submit-btn">
                                        Enregistrer
                                    </button>
                                    <button
                                        type="button"
                                        className="close-btn"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalAjout;
