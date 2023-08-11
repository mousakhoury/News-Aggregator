<?php

namespace App\Classes;

use App\Interfaces\ArticleInterface;
use Carbon\Carbon;

class NewsArticle implements ArticleInterface
{
    public $id;

    public $title;

    public $description;

    public $article_image;

    public $category;

    public $date;

    public $author;

    public $source;

    private function __construct($Article)
    {
        $this->id = rand();
        $this->title = $Article['title'];
        $this->description = $Article['description'];
        $this->article_image = $Article['urlToImage'] ?? "/images/no-image.jpg";
        $this->category = $Article['category'] ?? 'General';
        $this->date = Carbon::createFromTimestamp(strtotime($Article['publishedAt']))->format('Y/m/d H:i');
        $this->author = str_replace('https://www.facebook.com/bbcnews', 'BBC News', $Article['author'] ?? 'Unknown');
        $this->source = $Article['source']['name'] ?? '';
    }

    public static function getArticle($article)
    {
        return new NewsArticle($article);
    }
}
