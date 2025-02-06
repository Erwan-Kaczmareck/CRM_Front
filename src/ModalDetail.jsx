import './ModalAjout.css'
import {useState} from "react";

const ModalDetail = ({prospect, isOpen, closeModal}) => {
    if (!isOpen || !prospect) return null;

    const [formData] = useState(prospect || {});

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Détail du prospect</h2>
                <div className="modal-content">
                    <form className="form-grid">
                        <div className="form-group">
                            <label>Type</label>
                            <input type="text" name="type" value={formData.type || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Origine du Lead</label>
                            <input type="text" name="origineLead" value={formData.origineLead || ""}
                                   readOnly/>
                        </div>

                        <div className="form-group">
                            <label>Mois</label>
                            <input type="text" name="type" value={formData.mois || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Année</label>
                            <input type="number" name="annee" value={formData.annee || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="nom" value={formData.nom || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" name="prenom" value={formData.prenom || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Téléphone</label>
                            <input type="text" name="telephone" value={formData.telephone || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="mail" value={formData.mail || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Code Postal</label>
                            <input type="text" name="codePostale" value={formData.codePostale || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Ville</label>
                            <input type="text" name="ville" value={formData.ville || ""} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Etablissement Actuel</label>
                            <input type="text" name="etablissement" value={formData.etablissement || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Diplome Préparé</label>
                            <input type="text" name="diplomePrepare" value={formData.diplomePrepare || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Cursus</label>
                            <input type="text" name="specialite" value={formData.specialite || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Niveau d&#39;Etude</label>
                            <input type="text" name="niveauActuel" value={formData.niveauActuel || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Année de Recrutement</label>
                            <input type="number" name="anneeRecrutement" value={formData.anneeRecrutement || ""}
                                   readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Entrée en</label>
                            <input type="text" name="entreProchaineAnnee" value={formData.entreProchaineAnnee || ""}
                                   readOnly/>
                        </div>

                        <div className="form-group">
                            <label>Statut</label>
                            <input type="text" name="type" value={formData.statut || ""} readOnly/>
                        </div>
                        <div className="form-group wide">
                            <label>Commentaire</label>
                            <textarea name="commentaire" value={formData.commentaire || ""}
                                      readOnly></textarea>
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="close-btn" onClick={closeModal}>Fermer</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ModalDetail;
