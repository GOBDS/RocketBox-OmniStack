const mongose = require('mongoose');

const Box = new mongose.Schema({
    title:{
        type: String,
        required: true,
    },
    files: [{
        type: mongose.Schema.Types.ObjectId,
        ref: 'File'
    }]
},
{
    timestamps: true
});

module.exports = mongose.model('Box', Box);
