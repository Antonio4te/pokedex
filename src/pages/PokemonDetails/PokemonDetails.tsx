import _ from "lodash";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Grid, Header, Icon, Label, Loader, Menu, Segment } from "semantic-ui-react";
import styled from "styled-components";
import TypeChip from "../../components/UI/TypeChip/TypeChip";
import { fetchPokemon } from "../../store/actions";

const mapStateToProps = (state: RootState) => ({
    pokemon: state.pokemon.pokemon,
    isLoading: state.pokemon.isLoading
})

const mapDispatchToProps = {
    onFetchPokemon: (id: string) => fetchPokemon(id)
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
    overflow-y: auto;
    overflow-x: hidden;
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


const PokemonDetails = ({ pokemon, isLoading, onFetchPokemon }: Props) => {

    const params: { id: string } = useParams();

    useEffect(() => {
        onFetchPokemon(params.id);
    }, []);

    console.log(pokemon);

    return (
        <DetailsPageContainer>
            <Menu>
                <Menu.Item as={NavLink} to="/">
                    <Icon size="large" name="arrow left" />
                </Menu.Item>
            </Menu>
            <DetailsContainer>
                {(!isLoading && pokemon) ? (
                    <>
                        <Header>
                            {_.capitalize(pokemon.name)}
                        </Header>
                        <Grid stackable >
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