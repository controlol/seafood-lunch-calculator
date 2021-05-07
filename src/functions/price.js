/**
 * create a proper price string with a dot for every thousand and , for cents
 * @param {Number} price price in cents
 */
const createPriceString = price => {
  let priceString = '€ '

  price = (String)(price).replace(/\D/g,'')
  if (price.length === 0) price = "000"
  if (price.length === 1) price = "00" + price
  if (price.length === 2) price = "0" + price

  for (let i = 0; i < price.length; i++) {
    if (i === price.length - 2) priceString += ","
    if ((price.length - (i - 1)) % 3 === 0 && i !== price.length - 2 && i !== 0) priceString += "."
    priceString += price.substring(i, i + 1)
  }

  return priceString
}

export default createPriceString