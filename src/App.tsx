import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './pages/Home/Home';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Route path="/:id" component={PokemonDetails} />
                <Route path="/" exact component={Home} />
            </BrowserRouter>
        </Layout>
    );
}

export default App;