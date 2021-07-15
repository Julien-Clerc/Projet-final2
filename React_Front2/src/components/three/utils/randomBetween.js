import getRandomInt from './getRandomInt'

function randomBetween(x){
    let numb = getRandomInt(x)
    if ( numb > 13 || numb < -13 ){
      return numb
    }
    else {
      randomBetween(x)
    }
}

export default randomBetween