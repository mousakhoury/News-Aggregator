<?php

namespace App\Classes;

use App\Interfaces\ArticleInterface;
use Carbon\Carbon;

class NewYorkArticle implements ArticleInterface
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
        $this->description = $Article['abstract'];
        $this->article_image = $Article['media'][0]['media-metadata'][2]['url'] ?? "/images/no-image.jpg";
        $this->category = $Article['subsection'] ?? 'General';
        $this->date = Carbon::createFromTimestamp(strtotime($Article['published_date']))->format('Y/m/d H:i');
        $this->author = str_replace('By ', '', $Article['byline'] ?? 'Unknown');
        $this->source = 'New York Times';
    }

    public static function getArticle($article)
    {
        return new NewYorkArticle($article);
    }
}
