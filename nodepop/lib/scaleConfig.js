'use strict';

const jimp = require('jimp');
const path = require('node:path');


const scaleImage = async function (imageName) {
    const image = await jimp.read(path.join(__dirname, '..', 'public', 'images', imageName));
    image.cover(100, 100, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE, jimp.RESIZE_BEZIER);

    //Save image to db
    const newName = `thumb-${imageName}`
    await image.writeAsync(path.join(__dirname, '..', 'public', 'images', 'thumb', newName))
    
    return newName;
}

module.exports = scaleImage;