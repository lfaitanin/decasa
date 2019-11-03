'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bill extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    categories () {
        return this.hasOne('App/Model/Category')
    }
}

module.exports = Bill
