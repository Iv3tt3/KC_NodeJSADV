'use strict';

const {Responder} = require('cote');
const scaleImage = require('./scaleConfig');

const responder = new Responder({name: 'thumbnail service'})

responder.on('create-thumb', async (req, done) => {
    try{
        const {filename} = req;
        const thumb = await scaleImage(filename)
        done('Thumb created')
    }catch(error){
        done(error)
    }

})

