import React, { Component } from 'react';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            word: '',
            error: ''
        }
    }
    
    updateWord = (event) => {
        this.setState( { word: event.target.value.toLowerCase() } )
    }

    submitWord = (event) => {
        event.preventDefault();
        if(!this.state.word || this.state.word.match(/[\W\d]/g)) {
            this.setState({ ...this.state, error: 'Please enter a valid word.' })
            return
        }
        
        this.setState({ word: '', error: '' })
        this.props.submitWord(this.state.word)
    }

    render() {
        return (
            <section className='form-container'>
                <form
                    className='word-form'
                    onSubmit={this.submitWord}
                    noValidate
                >
                    <label>
                        WORD: 
                        <input 
                            type='text' 
                            name='word' 
                            placeholder='banana'
                            value={this.state.word}
                            onChange={this.updateWord}
                            required
                        /> 
                    </label>
                    <input 
                        type='submit' 
                        value='SUBMIT'
                    />
                </form>
                {this.state.error || <p>{this.state.error}</p>}
            </section>
        )
    }
}

export default Form;
