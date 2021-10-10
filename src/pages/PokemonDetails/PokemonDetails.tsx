import _ from "lodash";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Grid, Header, Icon, Image, Label, Loader, Menu, Segment } from "semantic-ui-react";
import styled from "styled-components";
import TypeChip from "../../components/UI/TypeChip/TypeChip";
import { fetchPokemon } from "../../store/actions";
import notCatchedIcon from '../../assets/img/pokeball-outline.png';
import catchedIcon from '../../assets/img/pokeball.png';
import { changeCatchedPokemon } from "../../store/actions/pokemon";

const mapStateToProps = (state: RootState) => ({
    pokemon: state.pokemon.pokemon,
    isLoading: state.pokemon.isLoading,
    catched: state.pokemon.catched
})

const mapDispatchToProps = {
    onFetchPokemon: (id: string) => fetchPokemon(id),
    onCatchPokemon: (catched: string[]) => changeCatchedPokemon(catched)
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {

}


const DetailsPageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px 20px 10px;
`;

const DetailsContainer = styled(Segment)`
    flex: 1 1;
    margin-top: 0 !important;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
`;

const DetailsHead = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const DetailsText = styled.p`
    color: #000;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
`;

const StatLabel = styled(Label)`
    margin-right: 0 !important;
`;


const PokemonDetails = ({ pokemon, catched, isLoading, onFetchPokemon, onCatchPokemon }: Props) => {

    const params: { id: string } = useParams();

    useEffect(() => {
        onFetchPokemon(params.id);
    }, []);

    return (
        <DetailsPageContainer>
            <Menu>
                <Menu.Item as={NavLink} to="/">
                    <Icon size="large" name="arrow left" />
                </Menu.Item>
                {pokemon && <Menu.Menu position="right">
                    <Menu.Item
                        active={catched.includes(pokemon.name)}
                        disabled={catched.includes(pokemon.name)}
                        onClick={() => onCatchPokemon([...catched, pokemon.name])}>
                        <Image
                            size="mini"
                            style={{ margin: 'auto' }}
                            src={catchedIcon} />
                    </Menu.Item>
                    <Menu.Item
                        active={!catched.includes(pokemon.name)}
                        disabled={!catched.includes(pokemon.name)}
                        onClick={() => onCatchPokemon(catched.filter(p => p !== pokemon.name))}>
                        <Image
                            size="mini"
                            style={{ margin: 'auto' }}
                            src={notCatchedIcon} />
                    </Menu.Item>
                </Menu.Menu>}
            </Menu>
            <DetailsContainer>
                {(!isLoading && pokemon) ? (
                    <>
                        <DetailsHead>
                            <Label style={{ marginRight: '10px' }}>
                                <Header>{_.capitalize(pokemon.name)}</Header>
                            </Label>
                            <Image src={catched.includes(pokemon.name) ? catchedIcon : notCatchedIcon} size="mini" />
                        </DetailsHead>
                        <Grid stackable style={{ padding: '0 !important' }} >
                            <Grid.Row columns="2">
                                <Grid.Column textAlign="center">
                                    <img width="180" height="auto" src={pokemon.sprites.front_default} alt="" />
                                </Grid.Column>
                                <Grid.Column textAlign="center">
                                    <img width="180" height="auto" src={pokemon.sprites.back_default} alt="" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    {pokemon.types.map((type: any) => (
                                        <TypeChip key={type.type.name} type={type.type.name} />
                                    ))}
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment color="blue" inverted>
                                        <Grid>
                                            <Grid.Row columns="2">
                                                <Grid.Column className="no-padding">
                                                    <Header textAlign="center" inverted>Height</Header>
                                                    <DetailsText>{pokemon.height / 10} m</DetailsText>
                                                    <Header textAlign="center" inverted>Weight</Header>
                                                    <DetailsText>{pokemon.weight / 10} kg</DetailsText>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Header textAlign="center" inverted>Abilities</Header>
                                                    {pokemon.abilities.map((ability: any) => (
                                                        <DetailsText key={ability.ability.name}>
                                                            {ability.ability.name.split('-').map((word: string) => _.capitalize(word)).join(' ')}
                                                        </DetailsText>
                                                    ))}
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns="1">
                                <Grid.Column>
                                    <Segment textAlign="center">
                                        <Header>Stats</Header>
                                        <Grid columns="6" stackable>
                                            <Grid.Column textAlign="center">
                                                <StatLabel>
                                                    HP
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[0].base_stat}</DetailsText>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <StatLabel color="red">
                                                    A
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[1].base_stat}</DetailsText>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <StatLabel color="blue">
                                                    D
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[2].base_stat}</DetailsText>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <StatLabel color="red">
                                                    SA
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[3].base_stat}</DetailsText>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <StatLabel color="blue">
                                                    SD
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[4].base_stat}</DetailsText>
                                            </Grid.Column>
                                            <Grid.Column textAlign="center">
                                                <StatLabel>
                                                    S
                                                </StatLabel>
                                                <DetailsText>{pokemon.stats[5].base_stat}</DetailsText>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </>
                ) : (
                    <Loader active />
                )}
            </DetailsContainer>
        </DetailsPageContainer>
    );
}

export default connector(PokemonDetails);