import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import ArticleCard from "./ArticleCard";
import PaginationButtons from "./PaginationButtons";

export default function NewsList(props) {
    const articlesPerPage = 9; // Number of articles per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTitle, setSearchTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [visiblePages, setVisiblePages] = useState([]);

    const categories = props.news.map((category) => category.category);
    const uniqueCategories = [...new Set(categories)].sort();

    const authors = props.news.map((author) => author.author);
    const uniqueAuthors = [...new Set(authors)].sort();

    // Function to limit the length of description text
    const limitDescription = (text, limit) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + " ...";
        }
        return text;
    };

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Filter articles based on searchTitle, selectedDate, selectedCategories, and selectedAuthors
    const filterArticles = (news) => {
        return news.filter((article) => {
            const titleMatch = article.title
                .toLowerCase()
                .includes(searchTitle.toLowerCase());

            // Convert selectedDate to the new format: yyyy/mm/dd
            const formattedSelectedDate = selectedDate
                ? selectedDate.split(" ")[0].replaceAll("-", "/")
                : null;

            const dateMatch =
                !formattedSelectedDate ||
                article.date.startsWith(formattedSelectedDate);
            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(article.category);
            const authorMatch =
                selectedAuthors.length === 0 ||
                selectedAuthors.includes(article.author);

            return titleMatch && dateMatch && categoryMatch && authorMatch;
        });
    };

    // Update filtered articles and pagination whenever searchTitle, selectedDate, currentPage, selectedCategories, or selectedAuthors changes
    useEffect(() => {
        const filtered = filterArticles(props.news);
        setFilteredArticles(filtered);

        // Calculate total pages based on filtered articles
        const newTotalPages = Math.ceil(filtered.length / articlesPerPage);
        setTotalPages(newTotalPages);

        // Calculate visible page numbers based on totalPages
        const visible = [];
        for (
            let i = Math.max(currentPage - 2, 1);
            i <= Math.min(currentPage + 2, totalPages);
            i++
        ) {
            visible.push(i);
        }
        setVisiblePages(visible);
    }, [
        searchTitle,
        selectedDate,
        currentPage,
        selectedCategories,
        selectedAuthors,
        props.news,
        articlesPerPage,
        totalPages,
    ]);

    // Calculate the start and end index for articles on the current page
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    return (
        <>
            <FilterSection
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                uniqueCategories={uniqueCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                uniqueAuthors={uniqueAuthors}
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
            />

            <div>
                {/* Display the list of filtered articles */}
                <div className="grid repeat(auto-fill,minmax(190px,1fr)) sm:grid-cols-[repeat(auto-fill,minmax(368px,1fr))] gap-x-12  gap-y-9 justify-items-center md:justify-items-start py-12">
                    {filteredArticles
                        .slice(startIndex, endIndex)
                        .map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                limitDescription={limitDescription}
                            />
                        ))}
                </div>

                {/* Pagination controls */}
                <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    visiblePages={visiblePages}
                />
            </div>
        </>
    );
}
