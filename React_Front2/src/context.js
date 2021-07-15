// store/UserProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const ThreeContext = createContext({
  newRadioUrl: "",
  setOnoff: () => {}
})

/* la classe UserProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class Context extends Component {
    constructor(props){
        super(props)
        this.state = {
            radio: "off", // une valeur de départ
            setOnoff: radio => this.setState({ radio: radio }) // nouvelle propriété de mutation
        };
    }
    render() {
        return (
          // Ici, rien ne change !
          <ThreeContext.Provider value={this.state}>
            {this.props.children}
          </ThreeContext.Provider>
        );
    }
}

export default Context

