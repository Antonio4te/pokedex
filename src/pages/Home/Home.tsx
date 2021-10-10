import { Icon, Input, Menu, Button, Image, List, Loader, Header } from 'semantic-ui-react';
import { fetchAllPokemon } from '../../store/actions';
import { connect, ConnectedProps } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import notCatchedIcon from '../../assets/img/pokeball-outline.png';
import pokedex from '../../assets/img/pokedex.png';
import catchedIcon from '../../assets/img/pokeball.png';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { changeCatchedPokemon } from '../../store/actions/pokemon';

const mapStateToProps = (state: RootState) => ({
    pokemonList: state.pokemon.pokemonList,
    isLoading: state.pokemon.isLoading,
    catched: state.pokemon.catched
})

const mapDispatchToProps = {
    onFetchAllPokemon: () => fetchAllPokemon(),
    onCatchPokemon: (catched: string[]) => changeCatchedPokemon(catched)
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {

}

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px 20px 20px;
    
    display: flex;
    flex-direction: column;
`;

const ListContainer = styled.div`
    flex: 1 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PokemonList = styled(List)`
    width: 100%;
    flex: 1 1;
    max-height: 100%;
    overflow: auto;
    align-self: start;
`;


const Home = ({ pokemonList, isLoading, catched, onFetchAllPokemon, onCatchPokemon }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredPokemon, setFilteredPokemon] = useState<any[] | null>(null);
    const [filter, setFilter] = useState<'all' | 'catched' | 'not-catched'>('all');

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (localStorage.getItem('catched')) {
            onCatchPokemon([...JSON.parse(localStorage.getItem('catched')!)]);
        }

    }, [])

    useEffect(() => {
        if (!pokemonList) {
            onFetchAllPokemon();
        } else {
            setFilteredPokemon([...pokemonList])
        }
    }, [pokemonList]);

    useEffect(() => {
        if (pokemonList) {
            setLoading(true);
            timeoutRef.current = setTimeout(() => {
                setFilteredPokemon(pokemonList?.filter(pokemon => {
                    return filter === 'catched'
                        ? catched.includes(pokemon.name)
                        : filter === 'not-catched'
                            ? !catched.includes(pokemon.name) : true;
                }).filter(pokemon => pokemon.name.includes(searchText.toLowerCase())));
                setLoading(false);
            }, 50);
        }

        return () => {
            clearTimeout(timeoutRef.current!);
        }
    }, [filter, searchText]);

    return (
        <HomeContainer>
            <Menu stackable>
                <Menu.Item>
                    <Input
                        icon={<Icon name='search' />}
                        loading={loading}
                        type="search"
                        placeholder="Search by name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item
                        active={filter === 'all'}
                        onClick={() => setFilter('all')}>
                        <Image
                            size="mini"
                            style={{ margin: 'auto' }}
                            src={pokedex} />
                    </Menu.Item>
                    <Menu.Item
                        active={filter === 'catched'}
                        onClick={() => setFilter('catched')}>
                        <Image
                            size="mini"
                            style={{ margin: 'auto' }}
                            src={catchedIcon} />
                    </Menu.Item>
                    <Menu.Item
                        active={filter === 'not-catched'}
                        onClick={() => setFilter('not-catched')}>
                        <Image
                            size="mini"
                            style={{ margin: 'auto' }}
                            src={notCatchedIcon} />

                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <ListContainer>
                {(isLoading || loading) ? <Loader active /> :
                    (filteredPokemon && filteredPokemon.length > 0) ? (
                        <PokemonList size="large" divided verticalAlign="middle">
                            {filteredPokemon.map(pokemon => (
                                <List.Item key={pokemon.name} >
                                    <Image avatar src={catched.includes(pokemon.name) ? catchedIcon : notCatchedIcon} />
                                    <List.Content>
                                        <List.Header>
                                            {_.capitalize(pokemon.name)}
                                        </List.Header>
                                    </List.Content>
                                    <List.Content floated="right">
                                        <Button
                                            color="blue"
                                            size="tiny"
                                            as={NavLink} to={`/${pokemon.name}`}>
                                            Detail
                                        </Button>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </PokemonList>
                    ) : <Header>No Results</Header>}
            </ListContainer>
        </HomeContainer >
    );
}

export default connector(Home);