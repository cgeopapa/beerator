import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {firebaseApp} from "../lib/firebase";
import AddButton from "../components/add-button";
import {GetStaticProps} from "next";
import {BeerModel} from "../lib/model/beer.model";
import Beer from "../components/beer";

interface Props {
    beers: BeerModel[]
}

export const getStaticProps: GetStaticProps = async () => {
    const db = firebaseApp.firestore();
    const snapshot = await db.collection('beers').get();
    const beers: BeerModel[] = [];
    snapshot.forEach((beer) => {
        beers.push(beer.data() as BeerModel);
    })

    return {
        props: {
            beers
        }
    }
}

export default function Home(props: Props) {
    const {beers} = props;
    const beerCards = beers.map((beer: BeerModel) =>
        <Beer beer={beer}></Beer>
    );
    return (
        <div className={styles.container}>
            <Head>
                <title>BeeRator</title>
                <meta name="description" content="Rate that beer"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className="text-5xl">BeeRator</h1>
                <div>
                    {beerCards}
                </div>
                <AddButton/>
            </main>
        </div>
    )
}
