export default function AddButton() {
    const openPhoto = () => {
        const input = document.getElementById("photo");
        input?.click();
    }
    return (
        <div className="fixed bottom-10 right-10">
            <button onClick={openPhoto}>
                Add
            </button>
            <input className="hidden" type="file" name="photo" id="photo"/>
        </div>
    )
}