import React from 'react'
import TopHeaders from './components/TopHeaders'
import LeftHeaders from './components/LeftHeaders'


const App = () => {
    return (
        <table>
            <thead>
                <TopHeaders />
            </thead>
            <tbody>
                <LeftHeaders />
            </tbody>
        </table>
    )
}

export default App
