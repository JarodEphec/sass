const sql = require("./db");
const bibliotheques = function () {
  this.id = bibliotheques.id
};

bibliotheques.findBibliotheques = (email, result) => {
  sql.query(`SELECT * from tb_UsersBiblio WHERE emailUser="${email}";`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("donnees :", res);
    result(null, res);
  })
},

  bibliotheques.findAllBibliotheques = (result) => {
    sql.query(`SELECT * from tb_UsersBiblio `, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.findAllObjets = (result) => {
    sql.query(`SELECT tb_Bibliotheque.biblioId, tb_Objets.idObjet,  tb_Objets.prix, tb_Objets.nom, tb_Objets.description, tb_Objets.dateAcquisition, tb_Objets.etat, tb_Objets.edition from tb_Bibliotheque JOIN tb_Objets on tb_Bibliotheque.idObjet = tb_Objets.idObjet`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.findBiblioCollection = (biblioId, result) => {
    sql.query(`SELECT tb_Bibliotheque.biblioId, tb_Objets.idObjet,  tb_Objets.prix, tb_Objets.nom, tb_Objets.description, tb_Objets.dateAcquisition, tb_Objets.etat, tb_Objets.edition, tb_Objets.image from tb_Bibliotheque JOIN tb_Objets on tb_Bibliotheque.idObjet = tb_Objets.idObjet
    WHERE tb_Bibliotheque.biblioId = "${biblioId}";`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.findAllBiblioCollection = (result) => {
    sql.query(`SELECT MAX(idObjet) as max from tb_Bibliotheque`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.creationBibliotheque = (bibliotheque, result) => {
    var requete = "INSERT INTO tb_UsersBiblio (emailUser, nomBibli, biblioDateCre) VALUES ? ";
    var values = [[bibliotheque.emailUser, bibliotheque.nomBibli, bibliotheque.biblioDateCre]];
    sql.query(requete, [values],
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("Marche");
        result(null, res);
      })
  },

  bibliotheques.creationObjetTbBiblio = (objet, result) => {
    var requete = "INSERT INTO tb_Bibliotheque (biblioId) VALUES ? ";
    var values = [[objet.biblioId]];
    sql.query(requete, [values],
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("Marche");
        result(null, res);
      })
  },

  bibliotheques.creationObjetTbObjets = (objet, result) => {
    var requete = "INSERT INTO tb_Objets (idObjet,prix,nom,description,dateAcquisition,etat,edition, image, perso1) VALUES ? ";
    var values = [[objet.objetId, objet.prix, objet.nom, objet.description, objet.dateAcquisition, objet.etat, objet.edition, objet.image, objet.perso1]];
    sql.query(requete, [values],
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("Marche");
        result(null, res);
      })
  },

  bibliotheques.findCollectionInfos = (biblioId, result) => {
    sql.query(`SELECT SUM(tb_Objets.prix) as valeur, COUNT(tb_Objets.idObjet) as nombre from tb_Objets join tb_Bibliotheque ON tb_Objets.idObjet = tb_Bibliotheque.idObjet WHERE tb_Bibliotheque.biblioId = "${biblioId}";  ;`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.findBibliothequesDateCrea = (biblioId, result) => {
    sql.query(`SELECT * from tb_UsersBiblio WHERE biblioId = "${biblioId}";  ;`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("donnees :", res);
      result(null, res);
    })
  },

  bibliotheques.supprimerObjet = (idObjet, result) => {
    sql.query(`DELETE from tb_Bibliotheque where idObjet="${idObjet}";`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("contacts :", res);
      result(null, res);
    });

  };


bibliotheques.supprimerBiblio = (idBiblio, result) => {
  sql.query(`DELETE from tb_UsersBiblio where biblioId="${idBiblio}";`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("contacts :", res);
    result(null, res);
  });
};
/*bibliotheques.creationObjet=(objet, result) => {
  var requete1 = "INSERT INTO tb_Bibliotheque (biblioId) VALUES ? ";
  var values1 = [[objet.biblioId]];
  var requete2 = "INSERT INTO tb_Objets (idObjet,prix,nom,description,dateAcquisition,etat,edition) VALUES ? ";
  var values2 = [[objet.objetId,objet.prix, objet.nom, objet.description, objet.dateAcquisition, objet.etat, objet.edition]];
  sql.query(requete1, [values1],
      (err, res) => {
          if (err) {
              console.log("error : ", err);
              result(null, err);
              return;
          }
          console.log("Marche");
          result(null, res);
        })

  sql.query(requete2, [values2],
    (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Marche");
        result(null, res);
      })
},
*/



module.exports = bibliotheques;
