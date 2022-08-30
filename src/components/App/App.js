import React, { Component } from 'react';
import Form from '../Form/Form';
import Definition from '../Definition/Definition';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentWord: '',
            currentWordDefinition: '',
            errorMessage: ''
        }
    }

    updateCurrentWord = (word) => {
        this.setState({ currentWord: word });
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
         .then(response => {
            console.log(response);
            return response.json()
         })
         .then(data => {
            console.log(data);
            if(data.message) {
                throw(data.message)
            }
            this.setState({
                ...this.state,
                currentWordDefinition: data[0],
                errorMessage: ''
            })
         })
         .catch(error => {
            this.setState({
                ...this.state,
                currentWordDefinition: '',
                errorMessage: error
            })
         })
    }

    render() {
        return (
            <main>
                <Form submitWord={this.updateCurrentWord} />
                {this.state.errorMessage || <p>{this.state.errorMessage}</p>}
                {
                    this.state.currentWordDefinition &&
                    <Definition 
                        currentWordDefinition={this.state.currentWordDefinition} 
                    />
                }
            </main>
        )
    }
}

export default App;