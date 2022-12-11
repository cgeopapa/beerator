import {NextApiRequest, NextApiResponse} from "next";
import db from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    const bid: string = Array.isArray(id) ? id[0] : id;
    switch (req.method) {
        case 'DELETE':
            await deleteBeer(bid, req, res);
            break;
    }
}

async function deleteBeer(id: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        await db.collection('beers').doc(id).delete();
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}