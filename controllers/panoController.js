const connection = require('../connections/connection')
const date = require('date-and-time');

const stringList = [
    "id",
    "firmaAdi",
    "panoAdi",
    "verenIsim",
    "yapanIsim",
    "imalatDurum",
    "panoTip",
    "panoAdet",
    "panoOlcu",
    "baslamaTarih",
    "bitisTarih",
    "teslimTarih",
    "microNo",
    "cizimMek",
    "cizimElk",
    "siparisMek",
    "siparisElk",
    "malzemeMek",
    "malzemeElk",
    "montajMek",
    "montajElk",
    "sevkDurum"
]

const getAllPanos = (req, res) => {


    connection.execute('SELECT * FROM Panoimalat')
        .then((result) => {

            try {
                const comingData = result[0];

                const panoModel = [];

                for (let index = 0; index < comingData.length; index++) {
                    // Model

                    if (!(comingData[index].baslamaTarih === null)) {
                        comingData[index].baslamaTarih = date.format(comingData[index].baslamaTarih, 'DD-MM-YYYY');

                    }
                    if (!(comingData[index].bitisTarih === null)) {
                        comingData[index].bitisTarih = date.format(comingData[index].bitisTarih, 'DD-MM-YYYY');
                    }
                    if (!(comingData[index].teslimTarih === null)) {
                        comingData[index].teslimTarih = date.format(comingData[index].teslimTarih, 'DD-MM-YYYY');
                    }

                    panoModel.push({
                        "id": comingData[index].id,
                        "firmaAdi": comingData[index].firmaAdi,
                        "panoAdi": comingData[index].panoAdi,
                        "verenIsim": comingData[index].verenIsim,
                        "yapanIsim": comingData[index].yapanIsim,
                        "imalatDurum": comingData[index].imalatDurum,
                        "panoTip": comingData[index].panoTip,
                        "panoAdet": comingData[index].panoAdet,
                        "panoOlcu": comingData[index].panoOlcu,
                        "baslamaTarih": comingData[index].baslamaTarih,
                        "bitisTarih": comingData[index].bitisTarih,
                        "teslimTarih": comingData[index].teslimTarih,
                        "microNo": comingData[index].microNo,
                        "cizimMek": Boolean(comingData[index].cizimMek.readInt8()),
                        "cizimElk": Boolean(comingData[index].cizimElk.readInt8()),
                        "siparisMek": Boolean(comingData[index].siparisMek.readInt8()),
                        "siparisElk": Boolean(comingData[index].siparisElk.readInt8()),
                        "malzemeMek": Boolean(comingData[index].malzemeMek.readInt8()),
                        "malzemeElk": Boolean(comingData[index].malzemeElk.readInt8()),
                        "montajMek": Boolean(comingData[index].montajMek.readInt8()),
                        "montajElk": Boolean(comingData[index].montajElk.readInt8()),
                        "sevkDurum": Boolean(comingData[index].sevkDurum.readInt8())
                    })


                }
                console.log(panoModel);
                res.send(panoModel);
            } catch (e) {
                console.log(e);
                res.send(e);
            }



        }).catch((err) => {
            console.log(err);
            res.send(err);
        });

}

const getSinglePano = (req, res) => {


    connection.execute(`SELECT * FROM Panoimalat WHERE microNo = "${req.params["microNo"]}"`)
        .then((result) => {
            var comingData = result[0];
            try {
                // Model
                const panoModel = {
                    "id": comingData[0].id,
                    "firmaAdi": comingData[0].firmaAdi,
                    "panoAdi": comingData[0].panoAdi,
                    "verenIsim": comingData[0].verenIsim,
                    "yapanIsim": comingData[0].yapanIsim,
                    "imalatDurum": comingData[0].imalatDurum,
                    "panoTip": comingData[0].panoTip,
                    "panoAdet": comingData[0].panoAdet,
                    "panoOlcu": comingData[0].panoOlcu,
                    "baslamaTarih": date.format(comingData[0].baslamaTarih, 'DD-MM-YYYY'),
                    "bitisTarih": date.format(comingData[0].bitisTarih, 'DD-MM-YYYY'),
                    "teslimTarih": date.format(comingData[0].teslimTarih, 'DD-MM-YYYY'),
                    "microNo": comingData[0].microNo,
                    "cizimMek": Boolean(comingData[0].cizimMek.readInt8()),
                    "cizimElk": Boolean(comingData[0].cizimElk.readInt8()),
                    "siparisMek": Boolean(comingData[0].siparisMek.readInt8()),
                    "siparisElk": Boolean(comingData[0].siparisElk.readInt8()),
                    "malzemeMek": Boolean(comingData[0].malzemeMek.readInt8()),
                    "malzemeElk": Boolean(comingData[0].malzemeElk.readInt8()),
                    "montajMek": Boolean(comingData[0].montajMek.readInt8()),
                    "montajElk": Boolean(comingData[0].montajElk.readInt8()),
                    "sevkDurum": Boolean(comingData[0].sevkDurum.readInt8())
                }
                console.log(panoModel)
                res.send(panoModel);
            } catch (e) {
                console.log(e);
                res.send(e);
            }



        }).catch((err) => {
            console.log(err);
            res.send(err);
        });

}

const getSinglePanoByFilterAndValue = (req, res) => {


    const filterName = req.params["filterName"]
    const filterValue = req.params["filterValue"]

    const obje = {
        "filterName": filterName,
        "filterValue": filterValue
    }

    console.log(obje)


    // connection.execute(`SELECT * FROM Panoimalat WHERE "${filterName}" = "${filterValue}"`)
    // connection.execute(`SELECT * FROM Panoimalat WHERE firmaAdi = "${filterValue}"`)
    connection.execute("SELECT * FROM Panoimalat WHERE " + filterName + " = " + '"' + filterValue + '"')
        .then(result => {
            var comingData = result[0];
            console.log(comingData);
            const panoModel = [];

            for (let index = 0; index < comingData.length; index++) {
                // Model
                panoModel.push(helperForDate(comingData, index))

            }
            res.send(panoModel);
        })
        .catch(err => {
            res.send(err);
        })



    // res.send(obje)
}

const getFirmaNames = (req, res) => {
    connection.execute(`SELECT firmaAdi FROM Panoimalat`)
        .then(result => {
            res.send(result[0]);
        })
        .catch(err => {
            res.send(err);
        })
}

const getSinglePanoById = (req, res) => {

    const id = req.params["id"];

    connection.execute(`SELECT * FROM Panoimalat WHERE id = "${id}"`)
        .then((result) => {
            var comingData = result[0];
            try {
                res.send(helperForDate(comingData, 0));
            } catch (e) {
                console.log(e);
                res.send(e);
            }



        }).catch((err) => {
            console.log(err);
            res.send(err);
        });

}

const setSinglePano = (req, res) => {

    const panoModel = {}

    for (let index = 1; index < stringList.length; index++) {
        panoModel[stringList[index]] = req.body[stringList[index]]

    }

    // console.log(panoModel)


    // Tarih formatları herbiri için değişkenler oluştur içerik varsa tırnak ekle yok ise null değer ata !!!
    // fakat listeleme kısmında bunun kontrolunu yapman gerekecek !!!

    var stringBaslamaTarih;
    var stringBitisTarih;
    var stringTeslimTarih;


    if (panoModel["baslamaTarih"] === null) {
        stringBaslamaTarih = panoModel.baslamaTarih
    } else {
        stringBaslamaTarih = '"' + panoModel.baslamaTarih + '"'
    }

    if (panoModel["bitisTarih"] === null) {
        stringBitisTarih = panoModel.bitisTarih
    } else {
        stringBitisTarih = '"' + panoModel.bitisTarih + '"'
    }

    if (panoModel["teslimTarih"] === null) {
        stringTeslimTarih = panoModel.teslimTarih
    } else {
        stringTeslimTarih = '"' + panoModel.teslimTarih + '"'
    }

    var sqlQuery = "INSERT INTO Panoimalat \
    (   firmaAdi, \
        panoAdi, \
        verenIsim, \
        yapanIsim,  \
        panoTip, \
        panoOlcu, \
        microNo, \
        baslamaTarih, \
        bitisTarih, \
        teslimTarih, \
        panoAdet, \
        imalatDurum, \
        cizimMek, \
        cizimElk, \
        siparisMek, \
        siparisElk, \
        malzemeMek, \
        malzemeElk, \
        montajMek, \
        montajElk, \
        sevkDurum) \
    VALUES \
    ( " +
        '"' + panoModel.firmaAdi + '"' + "," +
        '"' + panoModel.panoAdi + '"' + "," +
        '"' + panoModel.verenIsim + '"' + "," +
        '"' + panoModel.yapanIsim + '"' + "," +
        '"' + panoModel.panoTip + '"' + "," +
        '"' + panoModel.panoOlcu + '"' + "," +
        '"' + panoModel.microNo + '"' + "," +
        stringBaslamaTarih + "," +
        stringBitisTarih + "," +
        stringTeslimTarih + "," +
        panoModel.panoAdet + "," +
        '"' + panoModel.imalatDurum + '"' + "," +
        panoModel.cizimMek + "," +
        panoModel.cizimElk + "," +
        panoModel.siparisMek + "," +
        panoModel.siparisElk + "," +
        panoModel.malzemeMek + "," +
        panoModel.malzemeElk + "," +
        panoModel.montajMek + "," +
        panoModel.montajElk + "," +
        panoModel.sevkDurum + ")"

    console.log(sqlQuery)
        // res.send(sqlQuery)

    const controlQuery = "SELECT * FROM Panoimalat WHERE microNo = " + '"' + panoModel.microNo + '"'

    connection.execute(controlQuery)
        .then(result => {
            const comingData = result[0]

            if (comingData[0] === undefined) {
                connection.execute(sqlQuery)
                    .then((result) => {
                        try {
                            console.log(result);

                            const successMessage = {
                                "statusOk": 1,
                                "message": "Pano başarıyla eklendi."
                            }

                            res.send(successMessage);
                        } catch (e) {
                            console.log(e);
                            res.send(e);
                        }

                    }).catch((err) => {
                        console.log(err);
                        res.send(err);
                    });
            } else {
                const sendingObject = {
                    "statusOk": 0,
                    "message": "Eklemeye Çalıştığınız Pano Zaten Var."
                }

                console.log(sendingObject)
                res.send(sendingObject)
            }
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })




}

const updatePano = (req, res) => {

    const panoModel = {}

    for (let index = 0; index < stringList.length; index++) {
        panoModel[stringList[index]] = req.body[stringList[index]]

    }

    var sqlQuery = "UPDATE Panoimalat \
    SET \
        firmaAdi = " + '"' + panoModel.firmaAdi + '"' + ", \
        panoAdi = " + '"' + panoModel.panoAdi + '"' + ", \
        verenIsim = " + '"' + panoModel.verenIsim + '"' + ", \
        yapanIsim = " + '"' + panoModel.yapanIsim + '"' + ", \
        panoTip = " + '"' + panoModel.panoTip + '"' + ", \
        panoOlcu = " + '"' + panoModel.panoOlcu + '"' + ", \
        baslamaTarih = " + '"' + panoModel.baslamaTarih + '"' + ", \
        bitisTarih = " + '"' + panoModel.bitisTarih + '"' + ", \
        teslimTarih = " + '"' + panoModel.teslimTarih + '"' + ", \
        microNo = " + '"' + panoModel.microNo + '"' + ", \
        panoAdet = " + panoModel.panoAdet + ", \
        imalatDurum = " + panoModel.imalatDurum + ", \
        cizimMek = " + panoModel.cizimMek + ", \
        cizimElk = " + panoModel.cizimElk + ", \
        siparisMek = " + panoModel.siparisMek + ", \
        siparisElk = " + panoModel.siparisElk + ", \
        malzemeMek = " + panoModel.malzemeMek + ", \
        malzemeElk = " + panoModel.malzemeElk + ", \
        montajMek = " + panoModel.montajMek + ", \
        montajElk = " + panoModel.montajElk + ", \
        sevkDurum = " + panoModel.sevkDurum + " \
    WHERE \ " +
        "id = " + panoModel.id

    connection.execute(sqlQuery)
        .then(result => {

            console.log(result[0])

            const successMessage = {
                "statusOk": 1,
                "message": "Pano güncellendi."
            }

            res.send(successMessage)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })

}

const deleteSinglePano = (req, res) => {

    const id = req.params["id"]

    const sqlQuery = `DELETE FROM Panoimalat WHERE id = "${id}"`

    connection.execute(sqlQuery)
        .then(result => {
            console.log(result[0])

            const successMessage = {
                "statusOk": 1,
                "message": "Pano Başarıyla Silindi"
            }

            res.send(successMessage)

        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
}

const getMicroNo = (req, res) => {
    connection.execute("SELECT id FROM Panoimalat ORDER BY id DESC LIMIT 1")
        .then(result => {
            const comingData = result[0]
            const panoModel = {
                "id": comingData[0].id
            }

            console.log(panoModel)
            res.send(panoModel)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
}

const helperForDate = (comingData, i) => {

    const panoModel = {
        "id": comingData[i].id,
        "firmaAdi": comingData[i].firmaAdi,
        "panoAdi": comingData[i].panoAdi,
        "verenIsim": comingData[i].verenIsim,
        "yapanIsim": comingData[i].yapanIsim,
        "imalatDurum": comingData[i].imalatDurum,
        "panoTip": comingData[i].panoTip,
        "panoAdet": comingData[i].panoAdet,
        "panoOlcu": comingData[i].panoOlcu,
        "microNo": comingData[i].microNo,
        "cizimMek": Boolean(comingData[i].cizimMek.readInt8()),
        "cizimElk": Boolean(comingData[i].cizimElk.readInt8()),
        "siparisMek": Boolean(comingData[i].siparisMek.readInt8()),
        "siparisElk": Boolean(comingData[i].siparisElk.readInt8()),
        "malzemeMek": Boolean(comingData[i].malzemeMek.readInt8()),
        "malzemeElk": Boolean(comingData[i].malzemeElk.readInt8()),
        "montajMek": Boolean(comingData[i].montajMek.readInt8()),
        "montajElk": Boolean(comingData[i].montajElk.readInt8()),
        "sevkDurum": Boolean(comingData[i].sevkDurum.readInt8())
    }

    if (comingData[i].baslamaTarih != null) {
        panoModel.baslamaTarih = date.format(comingData[i].baslamaTarih, 'DD-MM-YYYY')
        console.log("asdlmasldgnlnglsnelwkenglwkelwknelgkwneg");
    } else {
        panoModel.baslamaTarih = null
    }
    if (comingData[i].bitisTarih != null) {
        panoModel.bitisTarih = date.format(comingData[i].bitisTarih, 'DD-MM-YYYY')
    } else {
        panoModel.bitisTarih = null
    }
    if (comingData[i].teslimTarih != null) {
        panoModel.teslimTarih = date.format(comingData[i].teslimTarih, 'DD-MM-YYYY')
    } else {
        panoModel.teslimTarih = null
    }


    return panoModel
}

module.exports = {
    getAllPanos,
    getSinglePano,
    getSinglePanoByFilterAndValue,
    getFirmaNames,
    getSinglePanoById,
    setSinglePano,
    updatePano,
    deleteSinglePano,
    getMicroNo
}