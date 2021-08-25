import { useState, useMemo } from 'react'
import Select from 'react-select'
import List from './common/list'
import ModelCard from './modelCard'


function Models({ models, tickers }) {
    console.log('Models render')

    const [selectedTickers, setSelectedTickers] = useState([])
    const options = tickers.map(ticker => ({ value: ticker.symbol, label: ticker.symbol }))

    const handleSelectChange = options => {
        const selected = options.map(option => option.value)
        setSelectedTickers(selected)
    }


    const filteredModels = useMemo(() => {
        return selectedTickers.length > 0 ? models.filter(model => selectedTickers.includes(model.ticker)) : models
    }, [selectedTickers, models])

    // sort models based on the order in which tickes were selected in Select component
    filteredModels.sort((a, b) => selectedTickers.indexOf(a.ticker) - selectedTickers.indexOf(b.ticker))


    return (
        <div className='models'>
            <Select
                options={options}
                placeholder='Select ticker'
                autoFocus
                isClearable
                isMulti
                onChange={handleSelectChange} />

            <List>
                {filteredModels.length < 1 ?
                    <div>No models found</div>
                    :
                    filteredModels.map(model =>
                        <ModelCard
                            key={model.ticker}
                            model={model} />
                    )}
            </List>
        </div>
    )
}

export default Models