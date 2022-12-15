const Menu = require('../models/Menu');
const menu = require('../data.json');


const jsonToDb = async (req, res, next) => {
  const menu1 = JSON.parse(JSON.stringify(menu)).menu
  const menu2 = JSON.parse(JSON.stringify(menu)).menu2
 const  menu3 = menu1.concat(menu2)

  menu3.forEach(async (el) => {
    const menuItem = new Menu()
    menuItem.name = el.name
    menuItem.price = el.price
    menuItem.description = el.description
    menuItem.image = el.image
    menuItem.category = el.category

    //await menuItem.save()
    // return menu3
  })
  return res.json(menu3)
}

module.exports = jsonToDb