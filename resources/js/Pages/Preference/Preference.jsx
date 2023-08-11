import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PreferenceSelect from "./PreferenceSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function Preference({ auth, settings, selected }) {
    // Extract unique categories from settings
    const categories = settings.map((category) => category.category);
    const uniqueCategories = [...new Set(categories)].sort();

    // Extract unique authors from settings
    const authors = settings.map((author) => author.author);
    const uniqueAuthors = [...new Set(authors)].sort();

    // Extract unique sources from settings
    const sources = settings.map((sources) => sources.source);
    const uniqueSources = [...new Set(sources)].sort();

    // Find selected preferences for the current user
    const selectedObject = selected.find(
        (item) => item.user_id === auth.user.id
    );

    // Initialize form data and form handling
    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        preferences: {
            sources: JSON.parse(selectedObject.sources) || [],
            categories: JSON.parse(selectedObject.categories) || [],
            authors: JSON.parse(selectedObject.authors) || [],
        },
    });

    // Store selected preferences in local storage
    useEffect(() => {
        localStorage.setItem(
            "selectedSources",
            JSON.stringify(data.preferences.sources)
        );
        localStorage.setItem(
            "selectedCategories",
            JSON.stringify(data.preferences.categories)
        );
        localStorage.setItem(
            "selectedAuthors",
            JSON.stringify(data.preferences.authors)
        );
    }, [data.preferences]);

    // Handle form submission
    const preferenceSubmitHandler = (e) => {
        e.preventDefault();

        // Update preferences using API patch request
        patch(route("preference.update"), {
            preferences: data.preferences,
        });
    };

    // Handle changes in select inputs
    const handleSelectChange = (key, selectedValues) => {
        setData("preferences", {
            ...data.preferences,
            [key]: selectedValues,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Preference" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={preferenceSubmitHandler}>
                            <h1 className="text-xl font-bold">Preference</h1>

                            {/* Render PreferenceSelect components for different preferences */}
                            <PreferenceSelect
                                title="Sources"
                                items={uniqueSources}
                                selectedValues={data.preferences.sources || []}
                                onChange={(values) =>
                                    handleSelectChange("sources", values)
                                }
                            />

                            <PreferenceSelect
                                title="Categories"
                                items={uniqueCategories}
                                selectedValues={
                                    data.preferences.categories || []
                                }
                                onChange={(values) =>
                                    handleSelectChange("categories", values)
                                }
                            />

                            <PreferenceSelect
                                title="Authors"
                                items={uniqueAuthors}
                                selectedValues={data.preferences.authors || []}
                                onChange={(values) =>
                                    handleSelectChange("authors", values)
                                }
                            />

                            {/* Display Save button and success message */}
                            <div className="flex items-center gap-4 pt-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>

                                {/* Show success message when preferences are saved */}
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
