
'use strict';
/* 
 ***************************************************
 *     APLICACIONES Y SERVICIOS EN LA NUBE         *
 *                   ITESO                         *
 *                                                 * 
 *    Actividad 1: Diseño de un WebService         *
 *    Codigo Base: Alvaro Parres (parres@iteso.mx) * 
 *                                                 * 
 *    Alumno: Horst Josef Grenz Meza                *
 *    Exp:                                   *
 *                                                 *
 ***************************************************
 *                                                 *
 * Instrucciones: Complete el codigo basado en     * 
 * las indicaciones descritas en el documento      *
 *                                                 *
 ***************************************************
 */

const Wine = require('../models/wine');

//Phase 1
exports.findAll = function(req, res) {
    
    console.log('All Wines Request');
    //Modified the res.send code to return two JSON Objects 
    /*res.send([
        {"id":"1", "name":"nombre1", "description":"DESCRIPCION1"},
        {"id":"2", "name":"nombre2", "description":"DESCRIPCION2"}
    ]);
    */
    /*
     *Put Phase2 Code here.
     */ 
    Wine.find(function(err,wines){
        if(err)
            res.end(500,err.message);
        console.log('All wines Request');
        res.status(200).send(wines);
    });
};

exports.findById = function(req, res) {

    console.log('ID: '+req.params.id+' Wine Request');
    //Modified the res.send line to send a JSON Object with the requested ID. 
    //res.send({"id":"ID", "name":"nombre", "description":"DESCRIPCION"});    

    /*
     * The next code is for Phase 2.
     * 
     * Modified this method to return one specific wine from collection.
     * You have to use the method findById which has the next syntaxis:
     *      findById(id, callback(err, result))
     *   
     */    
    Wine.findById(req.params.id,function(err,wine){
        if(err)
            res.end(500,err.message);
        console.log('Getting wine from mongo Request');
        console.log(wine);
        res.status(200).send(wine);
    });                        

};

/*
* The next code is for Phase 2.
* 
*  Create the methods:
*    addWine
*    deleteWine
*    updateWine
*    
*  Some hints about this tree method are in HomeWork document.
*/
exports.addWine = function(req, res) {

    console.log('ID: '+req.params.id+' Wine Request update');
    let newWine = new Wine({
        name: req.body.name,
        year: req.body.year,
        grapes: req.body.grapes,
        country: req.body.country,
        description: req.body.description
    })
    newWine.save(function(err,addedElement){
        if(err)return res.status(500).send(err.message);
        res.status(200).send(addedElement);
    });                    
}
exports.deleteWine = function(req,res){
    console.log('Delete ID: '+req.params.id+' Wine Request');
    //Modified the res.send line to send a JSON Object with the requested ID. 
    //res.send({"id":"ID", "name":"nombre", "description":"DESCRIPCION"});    

    /*
     * The next code is for Phase 2.
     * 
     * Modified this method to return one specific wine from collection.
     * You have to use the method findById which has the next syntaxis:
     *      findById(id, callback(err, result))
     *   
     */    
    Wine.findById(req.params.id,function(err,wine){
        if(err)
            res.status(204).end()
        console.log('delete Request');
        console.log(wine);
        wine.remove(function(err){
            if(err)return res.status(500).send(err.message);
            res.status(200).send(wine);
        })
    });               
}
exports.updateWine = function(req,res){
    Wine.findById(req.params.id,function(err,wine){
        if(err)
            res.status(204).end()
        console.log('update Request');
        console.log(wine.toString());
        wine.name = req.body.name;
        wine.year = req.body.year;
        wine.grapes = req.body.grapes;
        wine.country = req.body.country;
        wine.description = req.body.description;

        wine.save(function(err,addedElement){
            if(err)return res.status(500).send(err.message);
            res.status(200).send(addedElement);
        })
    });      

}