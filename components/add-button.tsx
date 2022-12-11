export default function AddButton() {
    const openPhoto = () => {
        const input = document.getElementById("photo");
        input?.click();
    }

    const finishPhoto = (e: any) => {
        const photo = e.target.files[0];
    }

    return (
        <div className="fixed bottom-4 left-4">
            <button onClick={openPhoto} className="rounded-full bg-purple-500 p-2">
                Add
            </button>
            <input className="hidden" type="file" name="photo" id="photo" onInput={finishPhoto}/>
        </div>
    )
}
