"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getTokenFromClient } from "@/lib/getTokenFromCilent";
import { useRouter } from "next/navigation";

const DeleteMyBookDialog = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDeleteAddBook = async () => {
        const token = await getTokenFromClient()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addbook/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            router.push("/my-books");
        }
    };

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={<button

                    className="flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-amber-900  font-semibold text-white transition hover:bg-red-700"
                >
                    🗑️ Delete
                </button>}>
                    Show Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAddBook} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default DeleteMyBookDialog;