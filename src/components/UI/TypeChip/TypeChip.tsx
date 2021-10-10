import _ from "lodash";
import { Label } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

interface Props {
    type: string
}

const TypeChip = ({ type }: Props) => {

    let color: SemanticCOLORS = "grey";

    switch (type) {
        case "normal":
            color = "grey";
            break;
        case "fighting":
            color = "yellow";
            break;
        case "flying":
            color = "yellow";
            break;
        case "poison":
            color = "violet";
            break;
        case "ground":
            color = "brown";
            break;
        case "rock":
            color = "grey";
            break;
        case "ghost":
            color = "black";
            break;
        case "steel":
            color = "grey";
            break;
        case "fire":
            color = "red";
            break;
        case "water":
            color = "blue";
            break;
        case "grass":
            color = "green";
            break;
        case "electric":
            color = "yellow";
            break;
        case "psychic":
            color = "pink";
            break;
        case "ice":
            color = "blue";
            break;
        case "dragon":
            color = "grey";
            break;
        case "dark":
            color = "black";
            break;
        case "fairy":
            color = "pink";
            break;
        case "unknown":
            color = "grey";
            break;
        case "shadow":
            color = "black";
            break;
        default:
            break;
    }

    return (
        <Label color={color}>
            {_.capitalize(type)}
        </Label>
    );
}

export default TypeChip;