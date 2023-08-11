import React from "react";

function ArticleCard({ article, limitDescription }) {
    return (
        <div className="max-w-sm bg-white w-full sm:w-[368px] h-[490] aspect-[368/490] shadow-md rounded-lg">
            <img
                src={article.article_image}
                alt=""
                className="rounded-tl-lg rounded-tr-lg object-cover aspect-video"
            />
            <div className="p-4 h-[58%] flex flex-col justify-between">
                <div>
                    <div className="text-sm text-blue-600">
                        <span className="text-gray-600">{article.source}</span>{" "}
                        | {article.category}
                    </div>
                    <h2 className="font-bold text-base py-2 leading-5">
                        {article.title}
                    </h2>
                    <div
                        className="text-sm pt-1"
                        dangerouslySetInnerHTML={{
                            __html: limitDescription(article.description, 20),
                        }}
                    />
                </div>
                <div className="text-xs">
                    <div>By {article.author}</div>
                    <div>{article.date}</div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
