'use strict'

const Category = use('App/Models/Category')


class CategoryController {
     /**
   * Show a list of all Categorys.
   * GET Categorys
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const categories = Category.all()
    if(!categories){
      return false;
    }
    return categories;
  }

  /**
   * Create/save a new Category.
   * POST Categorys
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = request.only(['descricao',])
    
    const categories = await Category.create(data)
    return categories;
  }
}

module.exports = CategoryController
