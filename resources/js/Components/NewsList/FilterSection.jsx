import React from "react";
import Select from "react-dropdown-select";

function FilterSection({
    searchTitle,
    setSearchTitle,
    selectedDate,
    setSelectedDate,
    uniqueCategories,
    selectedCategories,
    setSelectedCategories,
    uniqueAuthors,
    selectedAuthors,
    setSelectedAuthors,
}) {
    return (
        <div className="flex items-center space-x-4 mb-4 pt-10 flex-wrap gap-4">
            <div className="flex-grow">
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Search News
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>
            <div className="flex-1 w-40 !m-0">
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Date
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div className="flex-1 w-40 !m-0">
                <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                >
                    Categories
                </label>
                <Select
                    multi
                    options={uniqueCategories.map((category) => ({
                        label: category,
                        value: category,
                    }))}
                    values={selectedCategories.map((category) => ({
                        label: category,
                        value: category,
                    }))}
                    onChange={(values) =>
                        setSelectedCategories(values.map((v) => v.value))
                    }
                    className="mt-1 bg-white"
                />
            </div>
            <div className="flex-1 w-40 !m-0">
                <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                >
                    Authors
                </label>
                <Select
                    multi
                    options={uniqueAuthors.map((author) => ({
                        label: author,
                        value: author,
                    }))}
                    values={selectedAuthors.map((author) => ({
                        label: author,
                        value: author,
                    }))}
                    onChange={(values) =>
                        setSelectedAuthors(values.map((v) => v.value))
                    }
                    className="mt-1 bg-white"
                />
            </div>
        </div>
    );
}

export default FilterSection;
