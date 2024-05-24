'use strict'

// import library to add a security question
const readline = require('node:readline');
//connect to db
const connection = require('./lib/connectMongoose');
//import Advert
const Advert = require('./models/Advert');

const exadverts = require('./ex-adverts.json')


async function main() {

    //to wait until we are connected to db
    await new Promise((resolve) => connection.once('open', resolve) )

    //ask question to add security on delete all db
    const deletedb = await question(`WARNING! You are going to delete all content\nThis action cannot be undone\nAre you sure you want to delete all database content?\nPress ENTER to cancel or YES to confirm: `)
   
    if (!deletedb) {
        process.exit();
    }
    await initAdverts();

    connection.close();

}

async function initAdverts() {

    //delete all data
    const deleted = await Advert.deleteMany();
    console.log(`Deleted ${deleted.deletedCount} adverts.`);

    //create example adverts
    const inserted = await Advert.insertMany(exadverts)
    console.log(`Created ${inserted.length} adverts.`)

}

function question(text) {
    return new Promise((resolve, reject) => {
        //connect readline
        const rl = readline.createInterface({
            input: process.stdin, 
            output: process.stdout,
        });
        rl.question(text, resp => {
            rl.close();
            resolve(resp.toLowerCase() === 'yes');
        })
    });
}


// call function main and handle error in case promise return error
main().catch(err => console.log('Error:', err));