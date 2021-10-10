import { Icon, Input, Menu, Button, Image, List, Loader, Dimmer, Header } from 'semantic-ui-react';
import { fetchAllPokemon } from '../../store/actions';
import { connect, ConnectedProps } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import notCatchedIcon from '../../assets/img/pokeball-outline.png';
import pokedex from '../../assets/img/pokedex.png';
import catchedIcon from '../../assets/img/pokeball.png';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

const mapStateToProps = (state: RootState) => ({
    pokemonList: state.pokemon.pokemonList,
    isLoading: state.pokemon.isLoading
})

const mapDispatchToProps = {
    onFetchAllPokemon: () => fetchAllPokemon()
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
`;

const PokemonList = styled(List)`
    max-height: 100%;
    overflow: auto;
`;


const Home = ({ pokemonList, isLoading, onFetchAllPokemon }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredPokemon, setFilteredPokemon] = useState<any[] | null>(null);
    const [filter, setFilter] = useState<'all' | 'catched' | 'not-catched'>('all');

    const timeoutRef = useRef<NodeJS.Timeout>();

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
                    return filter === 'all' ? pokemon : pokemon
                }).filter(pokemon => pokemon.name.includes(searchText.toLowerCase())));
                setLoading(false);
            }, 200);
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
                {(!isLoading && filteredPokemon && !loading) ? (
                    <PokemonList divided verticalAlign="middle">
                        {filteredPokemon.map(pokemon => (
                            <List.Item key={pokemon.name} >
                                <Image avatar src={catchedIcon} />
                                <List.Content>
                                    <List.Header>
                                        {_.capitalize(pokemon.name)}
                                    </List.Header>
                                </List.Content>
                                <List.Content floated="right">
                                    <Button color="blue" as={NavLink} to={`/${pokemon.name}`}>
                                        Detail
                                    </Button>
                                </List.Content>
                            </List.Item>
                        ))}
                    </PokemonList>
                ) : (

                    <Loader active />

                )}
            </ListContainer>
        </HomeContainer >
    );
}

export default connector(Home);