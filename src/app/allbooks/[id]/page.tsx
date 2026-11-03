import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookDetailsPage from "./BookDetailsPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Check logged-in user
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If user is not logged in
    if (!session) {
        redirect("/login");
    }

    const { id } = await params;

    return <BookDetailsPage id={id} />;
};

export default Page;