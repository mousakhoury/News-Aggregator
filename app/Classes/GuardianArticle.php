<?php

namespace App\Classes;

use App\Interfaces\ArticleInterface;
use Carbon\Carbon;

class GuardianArticle implements ArticleInterface
{
    public $id;

    public $title;

    public $description;

    public $article_image;

    public $category;

    public $date;

    public $author;

    public $source;

    public function __construct($Article)
    {
        $this->id = rand();
        $this->title = $Article['webTitle'];
        $this->description = $Article['webTitle'];
        $this->article_image = $Article['image'] ?? "/images/no-image.jpg";
        $this->category = $Article['sectionName'] ?? 'General';
        $this->date = Carbon::createFromTimestamp(strtotime($Article['webPublicationDate']))->format('Y/m/d H:i');
        $this->author = $Article['author'] ?? 'Unknown';
        $this->source = $Article['source']['name'] ?? 'The Guardian';
    }

    public static function getArticle($article)
    {
        return new GuardianArticle($article);
    }
}
