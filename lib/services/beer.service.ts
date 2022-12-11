import db from "../firebase";
import {BeerModel} from "../model/beer.model";

export class BeerService {
    private collection = db.collection('beers');

    public async getBeers(): Promise<BeerModel[]> {
        const snapshot = await this.collection.get();
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
        return beers;
    }

    public async deleteBeer(id: string) {
        return await this.collection.doc(id).delete();
    }
}
