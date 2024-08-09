
CREATE TABLE IF NOT EXISTS comptebancaires 
( 

    idcompte  INTEGER   PRIMARY KEY NOT NULL,
            
    nom_banque  VARCHAR  NOT NULL,
            
    iban  VARCHAR  NOT NULL,
            
    rib  VARCHAR  NOT NULL,
            
    swift  VARCHAR  NOT NULL,
            
    iduser  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS depenses 
( 

    idtype_depense  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS documents 
( 

    iddoc  INTEGER   PRIMARY KEY NOT NULL,
            
    code  VARCHAR  NOT NULL,
            
    reference  VARCHAR  NOT NULL,
            
    revision  VARCHAR  NOT NULL,
            
    audit  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_creation  VARCHAR  NOT NULL,
            
    url  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    setting_for  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS emballages 
( 

    idemballage  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    poid  VARCHAR  NOT NULL,
            
    type_emb  VARCHAR  NOT NULL,
            
    composition  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS entreprises 
( 

    identreprise  INTEGER   PRIMARY KEY NOT NULL,
            
    nom_entreprise  VARCHAR  NOT NULL,
            
    adresse  VARCHAR  NOT NULL,
            
    tel  VARCHAR  NOT NULL,
            
    fax  VARCHAR  NOT NULL,
            
    mail  VARCHAR  NOT NULL,
            
    matricule  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS equipements 
( 

    idequip  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    periode_revision  INTEGER  NOT NULL,
            
    statut  VARCHAR  NOT NULL,
            
    idbon  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_mise_en_service  VARCHAR  NOT NULL,
            
    date_control  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS factures 
( 

    idfact  INTEGER   PRIMARY KEY NOT NULL,
            
    numero  INTEGER  NOT NULL,
            
    iddoc  INTEGER  NOT NULL,
            
    idclient  INTEGER  NOT NULL,
            
    type_fact  VARCHAR  NOT NULL,
            
    date_facture  VARCHAR  NOT NULL,
            
    op1  INTEGER  NOT NULL,
            
    op2  INTEGER  NOT NULL,
            
    op3  INTEGER  NOT NULL,
            
    op4  INTEGER  NOT NULL,
            
    op5  INTEGER  NOT NULL,
            
    op6  INTEGER  NOT NULL,
            
    op7  INTEGER  NOT NULL,
            
    op8  INTEGER  NOT NULL,
            
    op9  INTEGER  NOT NULL,
            
    op10  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    idbon_rec  INTEGER  NOT NULL,
            
    numero_bon_rec  INTEGER  NOT NULL,
            
    idbon_com  INTEGER  NOT NULL,
            
    numero_bon_com  INTEGER  NOT NULL,
            
    idbon_con  INTEGER  NOT NULL,
            
    numero_bon_con  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    identreprise  INTEGER  NOT NULL,
            
    liste_idopps  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS factureexports 
( 

    idfact  INTEGER   PRIMARY KEY NOT NULL,
            
    numero  VARCHAR  NOT NULL,
            
    iddoc  INTEGER  NOT NULL,
            
    idclient  INTEGER  NOT NULL,
            
    type_fact  VARCHAR  NOT NULL,
            
    date_facture_export  VARCHAR  NOT NULL,
            
    op1  INTEGER  NOT NULL,
            
    op2  INTEGER  NOT NULL,
            
    op3  INTEGER  NOT NULL,
            
    op4  INTEGER  NOT NULL,
            
    op5  INTEGER  NOT NULL,
            
    op6  INTEGER  NOT NULL,
            
    op7  INTEGER  NOT NULL,
            
    op8  INTEGER  NOT NULL,
            
    op9  INTEGER  NOT NULL,
            
    op10  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    idbon_rec  INTEGER  NOT NULL,
            
    numero_bon_rec  INTEGER  NOT NULL,
            
    idbon_com  INTEGER  NOT NULL,
            
    numero_bon_com  INTEGER  NOT NULL,
            
    idbon_con  INTEGER  NOT NULL,
            
    numero_bon_con  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    identreprise  INTEGER  NOT NULL,
            
    modepaiement  INTEGER  NOT NULL,
            
    mode_livraison  VARCHAR  NOT NULL,
            
    banque  INTEGER  NOT NULL,
            
    iban_rib  VARCHAR  NOT NULL,
            
    liste_idopps  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS fournisseurs 
( 

    idfournisseur_prod  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    adresse  VARCHAR  NOT NULL,
            
    tel_mob  VARCHAR  NOT NULL,
            
    tel_fix  VARCHAR  NOT NULL,
            
    mail  VARCHAR  NOT NULL,
            
    fax  VARCHAR  NOT NULL,
            
    specialite  VARCHAR  NOT NULL,
            
    note  VARCHAR  NOT NULL,
            
    rib  VARCHAR  NOT NULL,
            
    matricule  VARCHAR  NOT NULL,
            
    date_creation  VARCHAR  NOT NULL,
            
    ajouter_par  INTEGER  NOT NULL,
            
    statut  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    type_fornisseur  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS lieustockages 
( 

    idlieu_stockage  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS lieutravails 
( 

    idlieu_travail  INTEGER   PRIMARY KEY NOT NULL,
            
    nom_lieu  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS locals 
( 

    idlocal  INTEGER   PRIMARY KEY NOT NULL,
            
    section  VARCHAR  NOT NULL,
            
    adresse  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS paiements 
( 

    idpaiement  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    description  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS personnels 
( 

    idpersonnel  INTEGER   PRIMARY KEY NOT NULL,
            
    nom_prenom  VARCHAR  NOT NULL,
            
    cin  VARCHAR  NOT NULL,
            
    date_naissance  VARCHAR  NOT NULL,
            
    sexe  VARCHAR  NOT NULL,
            
    adresse  VARCHAR  NOT NULL,
            
    tel  VARCHAR  NOT NULL,
            
    date_recrutement  VARCHAR  NOT NULL,
            
    statut  VARCHAR  NOT NULL,
            
    titre  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    prix_h  INTEGER  NOT NULL,
            
    prix_j  INTEGER  NOT NULL,
            
    prix_u  INTEGER  NOT NULL,
            
    idcv  INTEGER  NOT NULL,
            
    idcontrat  INTEGER  NOT NULL,
            
    iddocument  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS produits 
( 

    idproduit  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    idtype_prod  INTEGER  NOT NULL,
            
    nom_type_prod  VARCHAR  NOT NULL,
            
    commentaire  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS saisons 
( 

    idsaison  INTEGER   PRIMARY KEY NOT NULL,
            
    annee  VARCHAR  NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS sessions 
( 

    idsession  INTEGER PRIMARY KEY NOT NULL,
            
    expires  INTEGER  NOT NULL,
            
    data  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS settings 
( 

    id  INTEGER   PRIMARY KEY NOT NULL,
            
    iddoc_normal  INTEGER  NOT NULL,
            
    iddoc_impexp  INTEGER  NOT NULL,
            
    iddoc_avoir  INTEGER  NOT NULL,
            
    iddoc_normal_vente  INTEGER  NOT NULL,
            
    iddoc_impexpvente  INTEGER  NOT NULL,
            
    iddoc_avoir_vente  INTEGER  NOT NULL,
            
    identreprise  INTEGER  NOT NULL,
            
    idcompte  INTEGER  NOT NULL,
            
    iddoc_devis  INTEGER  NOT NULL,
            
    iddoc_proformat  INTEGER  NOT NULL,
            
    liste_ids_doc_to_print  VARCHAR  NOT NULL,
            
    iddoc_rapport  INTEGER  NOT NULL,
            
    iddoc_scann  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tableachats 
( 

    idachat  INTEGER   PRIMARY KEY NOT NULL,
            
    idfournisseur  INTEGER  NOT NULL,
            
    type_caisse  INTEGER  NOT NULL,
            
    nbr_caisse  INTEGER  NOT NULL,
            
    nbr_cs  INTEGER  NOT NULL,
            
    nbr_cn  INTEGER  NOT NULL,
            
    nbr_ca  INTEGER  NOT NULL,
            
    matriel1  INTEGER  NOT NULL,
            
    nbr_m1  INTEGER  NOT NULL,
            
    matriel2  INTEGER  NOT NULL,
            
    nbr_m2  INTEGER  NOT NULL,
            
    emballage  INTEGER  NOT NULL,
            
    nbr_emballage  INTEGER  NOT NULL,
            
    nbr_cov  INTEGER  NOT NULL,
            
    nbr_fon  INTEGER  NOT NULL,
            
    matiere_principale  INTEGER  NOT NULL,
            
    qte_brut  INTEGER  NOT NULL,
            
    qte_net  INTEGER  NOT NULL,
            
    prix_unit  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    date_achat  VARCHAR  NOT NULL,
            
    observation  VARCHAR  NOT NULL,
            
    num_fact  INTEGER  NOT NULL,
            
    idbon_reclam  INTEGER  NOT NULL,
            
    idbon_recp  INTEGER  NOT NULL,
            
    idbon_entree  INTEGER  NOT NULL,
            
    idcateg  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    type_produit  INTEGER  NOT NULL,
            
    lieu_stock  INTEGER  NOT NULL,
            
    selected  VARCHAR  NOT NULL,
            
    num_lot  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tablearchivedocs 
( 

    idarch_doc  INTEGER   PRIMARY KEY NOT NULL,
            
    iddocument  INTEGER  NOT NULL,
            
    url  VARCHAR  NOT NULL,
            
    fichier  VARCHAR  NOT NULL,
            
    datecreation  VARCHAR  NOT NULL,
            
    commentaire  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tabledepenses 
( 

    iddepense  INTEGER   PRIMARY KEY NOT NULL,
            
    idtype_depense  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    idcateg  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_depense  VARCHAR  NOT NULL,
            
    document  INTEGER  NOT NULL,
            
    numero  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tabledocdocs 
( 

    iddoc_doc  INTEGER   PRIMARY KEY NOT NULL,
            
    numero  INTEGER  NOT NULL,
            
    reference  VARCHAR  NOT NULL,
            
    iddoc  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tablefactureavoirs 
( 

    idfact_avoir  INTEGER   PRIMARY KEY NOT NULL,
            
    idfact  INTEGER  NOT NULL,
            
    idclient  INTEGER  NOT NULL,
            
    type_produit  VARCHAR  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    reference_doc  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    date_facture_avoir  VARCHAR  NOT NULL,
            
    idcateg  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tablepointages 
( 

    idpointage  INTEGER   PRIMARY KEY NOT NULL,
            
    liste_pointage  VARCHAR  NOT NULL,
            
    date_pointage  VARCHAR  NOT NULL,
            
    nbr_personnel  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    avance  INTEGER  NOT NULL,
            
    lieutravail  VARCHAR  NOT NULL,
            
    idcateg  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tableressourceachats 
( 

    idres_achat  INTEGER   PRIMARY KEY NOT NULL,
            
    idfornisseur  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    type_paiement  INTEGER  NOT NULL,
            
    nbr_cs  INTEGER  NOT NULL,
            
    nbr_cn  INTEGER  NOT NULL,
            
    nbr_ca  INTEGER  NOT NULL,
            
    type_caisse  INTEGER  NOT NULL,
            
    nbr_matriel  INTEGER  NOT NULL,
            
    type_matriel  INTEGER  NOT NULL,
            
    emballage  INTEGER  NOT NULL,
            
    nbr_emb  INTEGER  NOT NULL,
            
    nbr_cov  INTEGER  NOT NULL,
            
    nbr_fon  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_ressource_achat  VARCHAR  NOT NULL,
            
    lieu_stock  INTEGER  NOT NULL,
            
    iddoc  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tableressourceventes 
( 

    idres_vente  INTEGER   PRIMARY KEY NOT NULL,
            
    idclient  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    type_paiement  INTEGER  NOT NULL,
            
    type_caisse  INTEGER  NOT NULL,
            
    nbr_cs  INTEGER  NOT NULL,
            
    nbr_cn  INTEGER  NOT NULL,
            
    nbr_ca  INTEGER  NOT NULL,
            
    nbr_matriel  INTEGER  NOT NULL,
            
    type_matriel  INTEGER  NOT NULL,
            
    emballage  INTEGER  NOT NULL,
            
    nbr_emb  INTEGER  NOT NULL,
            
    nbr_cov  INTEGER  NOT NULL,
            
    nbr_fon  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_ressource_vente  VARCHAR  NOT NULL,
            
    lieu_stock  INTEGER  NOT NULL,
            
    iddoc  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS tabletransferts 
( 

    idtransfert  INTEGER   PRIMARY KEY NOT NULL,
            
    de  INTEGER  NOT NULL,
            
    a  INTEGER  NOT NULL,
            
    nbr_caisse  INTEGER  NOT NULL,
            
    type_caisse  INTEGER  NOT NULL,
            
    nbr_cn  INTEGER  NOT NULL,
            
    nbr_cs  INTEGER  NOT NULL,
            
    nbr_ca  INTEGER  NOT NULL,
            
    qte_net  INTEGER  NOT NULL,
            
    produit  INTEGER  NOT NULL,
            
    nbr_matriel  INTEGER  NOT NULL,
            
    matriel  INTEGER  NOT NULL,
            
    idemballage  INTEGER  NOT NULL,
            
    nbr_emb  INTEGER  NOT NULL,
            
    nbr_cov  INTEGER  NOT NULL,
            
    nbr_fond  INTEGER  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    date_transfer  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
        
);

CREATE TABLE IF NOT EXISTS tableventes 
( 

    idvente  INTEGER   PRIMARY KEY NOT NULL,
            
    idclient  INTEGER  NOT NULL,
            
    type_caisse  INTEGER  NOT NULL,
            
    nbr_caisse  INTEGER  NOT NULL,
            
    nbr_cs  INTEGER  NOT NULL,
            
    nbr_cn  INTEGER  NOT NULL,
            
    nbr_ca  INTEGER  NOT NULL,
            
    matriel1  INTEGER  NOT NULL,
            
    nbr_m1  INTEGER  NOT NULL,
            
    matriel2  INTEGER  NOT NULL,
            
    nbr_m2  INTEGER  NOT NULL,
            
    emballage  INTEGER  NOT NULL,
            
    nbr_emballage  INTEGER  NOT NULL,
            
    nbr_cov  INTEGER  NOT NULL,
            
    nbr_fon  INTEGER  NOT NULL,
            
    matiere_principale  INTEGER  NOT NULL,
            
    qte_brut  INTEGER  NOT NULL,
            
    qte_net  INTEGER  NOT NULL,
            
    prix_unit  INTEGER  NOT NULL,
            
    montant  INTEGER  NOT NULL,
            
    date_vente  VARCHAR  NOT NULL,
            
    observation  VARCHAR  NOT NULL,
            
    num_fact  INTEGER  NOT NULL,
            
    idbon_reclam  INTEGER  NOT NULL,
            
    idbon_recp  INTEGER  NOT NULL,
            
    idbon_entree  INTEGER  NOT NULL,
            
    idcateg  INTEGER  NOT NULL,
            
    iduser  INTEGER  NOT NULL,
            
    type_produit  INTEGER  NOT NULL,
            
    lieu_stock  INTEGER  NOT NULL,
            
    selected  VARCHAR  NOT NULL,
            
    num_lot  VARCHAR  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS typeproduits 
( 

    idtype_prod  INTEGER   PRIMARY KEY NOT NULL,
            
    nom  VARCHAR  NOT NULL,
            
    information  VARCHAR  NOT NULL,
            
    iduser  INTEGER  NOT NULL
            
);

CREATE TABLE IF NOT EXISTS users 
( 

    iduser  INTEGER   PRIMARY KEY NOT NULL,
            
    login  VARCHAR  NOT NULL,
            
    password  VARCHAR  NOT NULL,
            
    role  VARCHAR  NOT NULL,
            
    date_creation  VARCHAR  NOT NULL,
            
    last_login  VARCHAR  NOT NULL,
            
    is_connected  INTEGER  NOT NULL,
            
    locked  INTEGER  NOT NULL,
            
    nbr_attempts  INTEGER  NOT NULL,
            
    allowed_module  VARCHAR  NOT NULL,
            
    deleted  INTEGER  NOT NULL,
            
    created_by  INTEGER  NOT NULL,
            
    theme  VARCHAR  NOT NULL,
            
    user_agent  VARCHAR  NOT NULL
            
);
