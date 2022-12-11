import {BeerModel} from "../../../lib/model/beer.model";
import db from '../../../lib/firebase';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BeerModel[]>) {
    try {
        const snapshot = await db.collection('beers').get();
        const beers: BeerModel[] = [];
        snapshot.forEach((beer) => {
            const beerModel: BeerModel = {
                id: beer.id,
                name: beer.data().name,
                description: beer.data().description,
                photoUrl: beer.data().photoUrl
            };
            beers.push(beerModel);
        })
        res.status(200).json(beers);
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}
