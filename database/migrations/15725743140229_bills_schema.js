'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BillsSchema extends Schema {
  up () {
    this.create('bills', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('categories').unsigned().references('id').inTable('categories')
      table.string('description')
      table.decimal('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bills')
  }
}

module.exports = BillsSchema
