import {BeerModel} from "../lib/model/beer.model";
import Image from "next/image";
import {useState} from "react";
import imagePlaceholder from '../public/img-placeholder.png'

interface Props {
    beer: BeerModel,
    addNew: boolean
}

export default function Beer(props: Props) {
    const {addNew} = props;
    const [edit, setEdit] = useState(addNew);
    const [beer, setBeer] = useState(props.beer);

    const startEdit = () => {
        setEdit(true);
    }

    const cancelEdit = () => {
        setEdit(false);
    }

    const openPhoto = () => {
        const input = document.getElementById("photoUrl");
        input?.click();
    }

    const finishPhoto = (e: any) => {
        const photo = e.target.files[0];
        const url = URL.createObjectURL(photo);
        setBeer({
            ...beer,
            photoUrl: url
        })
    }

    const submit = async (e: any) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", e.target.name.value);
        data.append("description", e.target.description.value);
        data.append("photoUrl", e.target.photoUrl.files[0]);

        const response = await fetch("api/beers", {
            method: "POST",
            body: data
        })
        const result = await response.json()
        console.log(result);
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
                    <input type="submit" value="Save" className="w-28 outline outline-2 hover:bg-slate-700"/>
                    {!addNew &&
                        <button className="w-28 outline outline-2 hover:bg-slate-700" onClick={cancelEdit}>Cancel</button>
                    }
                </div>
            )
        }
    }

    return (
        <div className="shadow-md shadow-indigo-900 m-5 p-0 pb-4 rounded-md overflow-hidden max-w-xs">
            <form onSubmit={submit}>
                <div className="relative">
                    <Image src={beer.photoUrl === ""? imagePlaceholder : beer.photoUrl} alt="beer image" width={400} height={400}/>
                    {edit &&
                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-40">
                            <button className="outline outline-2 p-2" onClick={openPhoto}>Take photo</button>
                            <input className="opacity-0 w-0" type="file" name="photoUrl" id="photoUrl" accept="image/*"
                                   onInput={finishPhoto} required/>
                        </div>
                    }
                </div>
                <input className="text-3xl font-light mt-2 px-4 bg-transparent border-none block w-full"
                    name="name" id="name"
                    type="text" placeholder="name" defaultValue={beer.name} required readOnly={!edit}/>
                <input className="text-base mt-5 px-4 bg-transparent border-none block w-full"
                    name="description" id="description"
                    type="text" placeholder="description" defaultValue={beer.description} required readOnly={!edit}/>
                {footer(edit)}
            </form>
        </div>
    )
}