// @generated automatically by Diesel CLI.

diesel::table! {
    caisses (id) {
        id -> Integer,
        name -> Text,
        weight -> Integer,
    }
}

diesel::table! {
    comptebancaires (idcompte) {
        idcompte -> Integer,
        nom_banque -> Text,
        iban -> Text,
        rib -> Text,
        swift -> Text,
        iduser -> Text,
    }
}

diesel::table! {
    depenses (idtype_depense) {
        idtype_depense -> Integer,
        nom -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    documents (iddoc) {
        iddoc -> Integer,
        code -> Text,
        reference -> Text,
        revision -> Text,
        audit -> Text,
        information -> Text,
        date_creation -> Text,
        url -> Text,
        iduser -> Integer,
        setting_for -> Text,
    }
}

diesel::table! {
    emballages (idemballage) {
        idemballage -> Integer,
        nom -> Text,
        poid -> Text,
        type_emb -> Text,
        composition -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    entreprises (identreprise) {
        identreprise -> Integer,
        nom_entreprise -> Text,
        adresse -> Text,
        tel -> Text,
        fax -> Text,
        mail -> Text,
        matricule -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    equipements (idequip) {
        idequip -> Integer,
        nom -> Text,
        periode_revision -> Integer,
        statut -> Text,
        idbon -> Integer,
        information -> Text,
        date_mise_en_service -> Text,
        date_control -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    factureexports (idfact) {
        idfact -> Integer,
        numero -> Text,
        iddoc -> Integer,
        idclient -> Integer,
        type_fact -> Text,
        date_facture_export -> Text,
        op1 -> Integer,
        op2 -> Integer,
        op3 -> Integer,
        op4 -> Integer,
        op5 -> Integer,
        op6 -> Integer,
        op7 -> Integer,
        op8 -> Integer,
        op9 -> Integer,
        op10 -> Integer,
        information -> Text,
        idbon_rec -> Integer,
        numero_bon_rec -> Integer,
        idbon_com -> Integer,
        numero_bon_com -> Integer,
        idbon_con -> Integer,
        numero_bon_con -> Text,
        iduser -> Integer,
        identreprise -> Integer,
        modepaiement -> Integer,
        mode_livraison -> Text,
        banque -> Integer,
        iban_rib -> Text,
        liste_idopps -> Text,
    }
}

diesel::table! {
    factures (idfact) {
        idfact -> Integer,
        numero -> Integer,
        iddoc -> Integer,
        idclient -> Integer,
        type_fact -> Text,
        date_facture -> Text,
        op1 -> Integer,
        op2 -> Integer,
        op3 -> Integer,
        op4 -> Integer,
        op5 -> Integer,
        op6 -> Integer,
        op7 -> Integer,
        op8 -> Integer,
        op9 -> Integer,
        op10 -> Integer,
        information -> Text,
        idbon_rec -> Integer,
        numero_bon_rec -> Integer,
        idbon_com -> Integer,
        numero_bon_com -> Integer,
        idbon_con -> Integer,
        numero_bon_con -> Integer,
        iduser -> Integer,
        identreprise -> Integer,
        liste_idopps -> Text,
    }
}

diesel::table! {
    fournisseurs (idfournisseur_prod) {
        idfournisseur_prod -> Integer,
        nom -> Text,
        adresse -> Text,
        tel_mob -> Text,
        tel_fix -> Text,
        mail -> Text,
        fax -> Text,
        specialite -> Text,
        note -> Text,
        rib -> Text,
        matricule -> Text,
        date_creation -> Text,
        ajouter_par -> Integer,
        statut -> Text,
        information -> Text,
        type_fornisseur -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    lieustockages (idlieu_stockage) {
        idlieu_stockage -> Integer,
        nom -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    lieutravails (idlieu_travail) {
        idlieu_travail -> Integer,
        nom_lieu -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    locals (idlocal) {
        idlocal -> Integer,
        section -> Text,
        adresse -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    paiements (idpaiement) {
        idpaiement -> Integer,
        nom -> Text,
        description -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    personnels (idpersonnel) {
        idpersonnel -> Integer,
        nom_prenom -> Text,
        cin -> Text,
        date_naissance -> Text,
        sexe -> Text,
        adresse -> Text,
        tel -> Text,
        date_recrutement -> Text,
        statut -> Text,
        titre -> Text,
        iduser -> Integer,
        prix_h -> Integer,
        prix_j -> Integer,
        prix_u -> Integer,
        idcv -> Integer,
        idcontrat -> Integer,
        iddocument -> Integer,
    }
}

diesel::table! {
    produits (idproduit) {
        idproduit -> Integer,
        nom -> Text,
        idtype_prod -> Integer,
        nom_type_prod -> Text,
        commentaire -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    saisons (idsaison) {
        idsaison -> Integer,
        annee -> Text,
        nom -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    sessions (idsession) {
        idsession -> Integer,
        expires -> Integer,
        data -> Text,
    }
}

diesel::table! {
    settings (id) {
        id -> Integer,
        iddoc_normal -> Integer,
        iddoc_impexp -> Integer,
        iddoc_avoir -> Integer,
        iddoc_normal_vente -> Integer,
        iddoc_impexpvente -> Integer,
        iddoc_avoir_vente -> Integer,
        identreprise -> Integer,
        idcompte -> Integer,
        iddoc_devis -> Integer,
        iddoc_proformat -> Integer,
        liste_ids_doc_to_print -> Text,
        iddoc_rapport -> Integer,
        iddoc_scann -> Integer,
        iduser -> Integer,
    }
}

diesel::table! {
    tableachats (idachat) {
        idachat -> Integer,
        idfournisseur -> Integer,
        type_caisse -> Integer,
        nbr_caisse -> Integer,
        nbr_cs -> Integer,
        nbr_cn -> Integer,
        nbr_ca -> Integer,
        matriel1 -> Integer,
        nbr_m1 -> Integer,
        matriel2 -> Integer,
        nbr_m2 -> Integer,
        emballage -> Integer,
        nbr_emballage -> Integer,
        nbr_cov -> Integer,
        nbr_fon -> Integer,
        matiere_principale -> Integer,
        qte_brut -> Integer,
        qte_net -> Integer,
        prix_unit -> Integer,
        montant -> Integer,
        date_achat -> Text,
        observation -> Text,
        num_fact -> Integer,
        idbon_reclam -> Integer,
        idbon_recp -> Integer,
        idbon_entree -> Integer,
        idcateg -> Integer,
        iduser -> Integer,
        type_produit -> Integer,
        lieu_stock -> Integer,
        selected -> Text,
        num_lot -> Text,
    }
}

diesel::table! {
    tablearchivedocs (idarch_doc) {
        idarch_doc -> Integer,
        iddocument -> Integer,
        url -> Text,
        fichier -> Text,
        datecreation -> Text,
        commentaire -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    tabledepenses (iddepense) {
        iddepense -> Integer,
        idtype_depense -> Integer,
        montant -> Integer,
        idcateg -> Integer,
        information -> Text,
        date_depense -> Text,
        document -> Integer,
        numero -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    tabledocdocs (iddoc_doc) {
        iddoc_doc -> Integer,
        numero -> Integer,
        reference -> Text,
        iddoc -> Integer,
        iduser -> Integer,
    }
}

diesel::table! {
    tablefactureavoirs (idfact_avoir) {
        idfact_avoir -> Integer,
        idfact -> Integer,
        idclient -> Integer,
        type_produit -> Text,
        montant -> Integer,
        reference_doc -> Integer,
        information -> Text,
        iduser -> Integer,
        date_facture_avoir -> Text,
        idcateg -> Integer,
    }
}

diesel::table! {
    tablepointages (idpointage) {
        idpointage -> Integer,
        liste_pointage -> Text,
        date_pointage -> Text,
        nbr_personnel -> Integer,
        montant -> Integer,
        avance -> Integer,
        lieutravail -> Text,
        idcateg -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    tableressourceachats (idres_achat) {
        idres_achat -> Integer,
        idfornisseur -> Integer,
        montant -> Integer,
        type_paiement -> Integer,
        nbr_cs -> Integer,
        nbr_cn -> Integer,
        nbr_ca -> Integer,
        type_caisse -> Integer,
        nbr_matriel -> Integer,
        type_matriel -> Integer,
        emballage -> Integer,
        nbr_emb -> Integer,
        nbr_cov -> Integer,
        nbr_fon -> Integer,
        information -> Text,
        date_ressource_achat -> Text,
        lieu_stock -> Integer,
        iddoc -> Integer,
        iduser -> Integer,
    }
}

diesel::table! {
    tableressourceventes (idres_vente) {
        idres_vente -> Integer,
        idclient -> Integer,
        montant -> Integer,
        type_paiement -> Integer,
        type_caisse -> Integer,
        nbr_cs -> Integer,
        nbr_cn -> Integer,
        nbr_ca -> Integer,
        nbr_matriel -> Integer,
        type_matriel -> Integer,
        emballage -> Integer,
        nbr_emb -> Integer,
        nbr_cov -> Integer,
        nbr_fon -> Integer,
        information -> Text,
        date_ressource_vente -> Text,
        lieu_stock -> Integer,
        iddoc -> Integer,
        iduser -> Integer,
    }
}

diesel::table! {
    tabletransferts (idtransfert) {
        idtransfert -> Integer,
        de -> Integer,
        a -> Integer,
        nbr_caisse -> Integer,
        type_caisse -> Integer,
        nbr_cn -> Integer,
        nbr_cs -> Integer,
        nbr_ca -> Integer,
        qte_net -> Integer,
        produit -> Integer,
        nbr_matriel -> Integer,
        matriel -> Integer,
        idemballage -> Integer,
        nbr_emb -> Integer,
        nbr_cov -> Integer,
        nbr_fond -> Integer,
        information -> Text,
        date_transfer -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    tableventes (idvente) {
        idvente -> Integer,
        idclient -> Integer,
        type_caisse -> Integer,
        nbr_caisse -> Integer,
        nbr_cs -> Integer,
        nbr_cn -> Integer,
        nbr_ca -> Integer,
        matriel1 -> Integer,
        nbr_m1 -> Integer,
        matriel2 -> Integer,
        nbr_m2 -> Integer,
        emballage -> Integer,
        nbr_emballage -> Integer,
        nbr_cov -> Integer,
        nbr_fon -> Integer,
        matiere_principale -> Integer,
        qte_brut -> Integer,
        qte_net -> Integer,
        prix_unit -> Integer,
        montant -> Integer,
        date_vente -> Text,
        observation -> Text,
        num_fact -> Integer,
        idbon_reclam -> Integer,
        idbon_recp -> Integer,
        idbon_entree -> Integer,
        idcateg -> Integer,
        iduser -> Integer,
        type_produit -> Integer,
        lieu_stock -> Integer,
        selected -> Text,
        num_lot -> Text,
    }
}

diesel::table! {
    typeproduits (idtype_prod) {
        idtype_prod -> Integer,
        nom -> Text,
        information -> Text,
        iduser -> Integer,
    }
}

diesel::table! {
    users (iduser) {
        iduser -> Integer,
        login -> Text,
        password -> Text,
        role -> Text,
        date_creation -> Text,
        last_login -> Text,
        is_connected -> Integer,
        locked -> Integer,
        nbr_attempts -> Integer,
        allowed_module -> Text,
        deleted -> Integer,
        created_by -> Integer,
        theme -> Text,
        user_agent -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    caisses,
    comptebancaires,
    depenses,
    documents,
    emballages,
    entreprises,
    equipements,
    factureexports,
    factures,
    fournisseurs,
    lieustockages,
    lieutravails,
    locals,
    paiements,
    personnels,
    produits,
    saisons,
    sessions,
    settings,
    tableachats,
    tablearchivedocs,
    tabledepenses,
    tabledocdocs,
    tablefactureavoirs,
    tablepointages,
    tableressourceachats,
    tableressourceventes,
    tabletransferts,
    tableventes,
    typeproduits,
    users,
);
