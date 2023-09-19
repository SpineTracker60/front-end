import Routing from './route/routing';
import {BrowserRouter as Router} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';

function App(){
    
    return(
        <Router>
            <AnimatePresence>
                <Routing/>
            </AnimatePresence>
        </Router>
    )
}

export default App;