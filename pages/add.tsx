import Beer from "../components/beer";
import {BeerModel} from "../lib/model/beer.model";

export default function AddBeer() {
    const beer: BeerModel = {
        id: "",
        name: "",
        photoUrl: "",
        description: ""
    }
    return (
        <Beer beer={beer} addNew={true}></Beer>
    )
}