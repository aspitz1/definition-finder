const Definition = ({ currentWordDefinition }) => {
    const definitions = currentWordDefinition.meanings.reduce((allMeanings, meaning, i) => {
        const allDefinitions = meaning.definitions.map((definition, i) => <li key={i}>{ definition.definition }</li>)
        return [
                ...allMeanings, 
                <article key={i}>
                    <h3>{meaning.partOfSpeech}</h3>
                    <ul>
                        {allDefinitions}
                    </ul>
                </article>
            ]
    }, [])

    return (
        <section>
            <h1>{currentWordDefinition.word}</h1>
            <p>Pronunciation: {currentWordDefinition.phonetic}</p>
            <h2>Definitions</h2>
            <div>
                {definitions}
            </div>
        </section>
    )
}

export default Definition;
