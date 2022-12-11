import {BeerModel} from "../lib/model/beer.model";
import Image from "next/image";
import {useState} from "react";

interface Props {
    beer: BeerModel,
}

export default function Beer(props: Props) {
    const {beer} = props;
    const [edit, setEdit] = useState(false);

    const startEdit = () => {
        setEdit(true);
    }

    const cancelEdit = () => {
        setEdit(false);
    }

    const footer = (edit: boolean) => {
        if(!edit) {
            return (
                <div className="flex justify-evenly mt-5">
                    <button className="w-28 outline outline-2 hover:bg-slate-700" onClick={startEdit}>Edit</button>
                    <button className="w-28 outline outline-2 hover:bg-slate-700">Delete</button>
                </div>
            )
        } else {
            return (
                <div className="flex justify-evenly mt-5">
                    <button className="w-28 outline outline-2 hover:bg-slate-700">Save</button>
                    <button className="w-28 outline outline-2 hover:bg-slate-700" onClick={cancelEdit}>Cancel</button>
                </div>
            )
        }
    }

    return (
        <div className="shadow-md shadow-indigo-900 m-5 p-0 pb-4 rounded-md overflow-hidden max-w-xs">
            <form>
                <div className="relative">
                    <Image src={beer.photoUrl} alt="beer" width={400} height={400}/>
                    {edit &&
                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-40">
                            <button className="outline outline-2 rounded-lg p-2">Change</button>
                        </div>
                    }
                </div>
                <input className="text-3xl font-light mt-2 px-4 bg-transparent border-none block w-full"
                    type="text" placeholder="name" defaultValue={beer.name} required readOnly={!edit}/>
                <input className="text-base mt-5 px-4 bg-transparent border-none block w-full"
                    type="text" placeholder="name" defaultValue={beer.description} required readOnly={!edit}/>
                {/*<div className="text-base mt-5 px-4">{}</div>*/}
            </form>
            {footer(edit)}
        </div>
    )
}