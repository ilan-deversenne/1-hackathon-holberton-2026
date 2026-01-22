import Cards from "@/components/admin/dashboard/cards";
import Sidebar from "@/components/admin/sidebar";

export default function Page() {
    return (
        <div className="flex gap-4">
            <Sidebar />

            <div className="mt-3">
                <Cards />
            </div>
        </div>
    )
}
