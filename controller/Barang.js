const BarangModel = require('../model/Barang')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
const Barang = require('../model/Barang')

exports.insertbarang = (data) =>
  new Promise((resolve, reject) => {
    BarangModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Barang')))
    .catch(() => reject(requestResponse.serverError))
})

exports.getAllbarang = () =>
  new Promise((resolve, reject) => {
    BarangModel.find({})
      .then(Barang => resolve(requestResponse.suksesWithData(Barang)))
      .catch(error => reject(requestResponse.serverError))
  })

exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    BarangModel.findOne({
      _id: objectId(id)
    }).then(Barang => resolve(requestResponse.suksesWithData(Barang)))
    .catch(error => reject(requestResponse.serverError))
  })

  exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
      BarangModel.updateOne({
        _id: objectId(id)
      }, data)
        .then(() => {
          if (changeImage) {
            deleteImage(data.oldImage)
          }
          resolve(requestResponse.sukses('Berhasil Edit Barang'))
        }).catch(() => reject(requestResponse.serverError))
    })

  exports.delete = (id) =>
    new Promise((resolve, reject) => {
      BarangModel.findOne({
        _id: objectId(id)
      }).then(Barang => {
        BarangModel.deleteOne({
          _id: objectId(id)
        }).then(() => {
          deleteImage(Barang.image)
          resolve(requestResponse.sukses('Berhasil Delete Barang'))
        }).catch(()=> reject(requestResponse.serverError))
      })
    })