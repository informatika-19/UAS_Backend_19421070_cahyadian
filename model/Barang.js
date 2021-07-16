const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarangSchema = new Schema({
    namaBarang: {
        type: String
    },
    harga: {
        type: Number
    },    
    warna: {
        type: String
    },
    typeBarang: {
        type: String
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Barang', BarangSchema)