import {BeerModel} from "../lib/model/beer.model";
import Image from "next/image";

interface Props {
    beer: BeerModel
}
export default function Beer(props: Props) {
    const {beer} = props;
    return (
        <div className="shadow-md shadow-indigo-900 m-5 p-0 pb-4 rounded-md overflow-hidden">
            <Image src={beer.photoUrl} alt="beer" width={400} height={400}/>
            <div className="text-3xl font-light mt-2 px-4">{beer.name}</div>
            <div className="text-base mt-5 px-4">{beer.description}</div>

        </div>
    )
}