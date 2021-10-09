import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './pages/Home/Home';

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Route path="/" component={Home} />
            </BrowserRouter>
        </Layout>
    );
}

export default App;