import Link from "next/link";

export default function AddButton() {
    return (
        <div className="fixed bottom-4 left-4">
            <Link href="/add">
                <button className="rounded-full bg-purple-500 p-2">
                    Add
                </button>
            </Link>
        </div>
    )
}
