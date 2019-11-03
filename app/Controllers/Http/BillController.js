'use strict'

const Bill = use('App/Models/Bill')
const Category = use('App/Models/Category')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bills
 */
class BillController {
  /**
   * Show a list of all bills.
   * GET bills
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    
    const bills = Bill.all()
    if(!bills){
      return false;
    }
    return bills;
  }

  /**
   * Create/save a new bill.
   * POST bills
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'user_id',
      'categories',
      'description',
      'price'
    ])
   
      const bills = await Bill.create({...data, user_id: id})
      return bills;
  }

  async showCategories(bills)
  {
    let jacare = await Database.from('bills as a')
      .innerJoin('categories as b', 'a.categories', 'b.id')
      .where('a.id', bills.id)
      .where('b.id', bills.$attributes.categories)
      .distinct()
      console.log(jacare)
      return jacare
  }

  /**
   * Display a single bill.
   * GET bills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request}) {

    const bills = await Bill.find(params.id)
      if(!bills){
        return response.status(404).send({ error: 'Nenhum dado foi encontrado'})
      }
    
      return bills;

  }

  async allCountMounth ({request})
  {
    let data = request.only(['mounth', 'categoria']);
    if(data.categoria){
      return await Database.from('bills').sum('price').where('mes', data.mounth).where('categories', data.categoria)
    }
     return await Database.from('bills').sum('price').where('mes', data.mounth)
  }


  /**
   * Update bill details.
   * PUT or PATCH bills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const bills = await Bill.findOrFail(params.id)

    const data = request.only([
      'user_id',
      'categories' ,
      'description',
      'price'
      ])  

      bills.merge(data)

      await bills.save()
      return bills
    }


  /**
   * Delete a bill with id.
   * DELETE bills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const bills = await Bill.findOrFail(params.id)
    
    if(bills.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Nao foi autorizado'})
    }
    return bills.delete()
  }
}

module.exports = BillController
