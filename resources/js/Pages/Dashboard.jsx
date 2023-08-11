import NewsList from "@/Components/NewsList/NewsList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, news }) {
    // console.log(news);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-4xl font-bold text-center ">
                            News
                        </div>
                    </div>
                    <NewsList news={news} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
