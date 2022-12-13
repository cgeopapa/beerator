import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AddButton from "../components/add-button";
import {GetStaticProps} from "next";
import {BeerModel} from "../lib/model/beer.model";
import Beer from "../components/beer";

interface Props {
    beers: BeerModel[]
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('http://localhost:3000/api/beers');
    const beers: BeerModel[] = res.ok ? await res.json() : [];
    return {
        props: {
            beers
        }
    }
}

export default function Home(props: Props) {
    const {beers} = props;
    const beerCards = beers.map((beer: BeerModel) =>
        <Beer key={beer.id} beer={beer} addNew={false}></Beer>
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
