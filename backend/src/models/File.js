const mongose = require('mongoose');

const File = new mongose.Schema({
    title:{
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

File.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:8080';
    return `${url}/files/${encodeURIComponent(this.path)}`
});

module.exports = mongose.model('File', File);