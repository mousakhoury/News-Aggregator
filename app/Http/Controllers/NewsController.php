<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Classes\NewsArticle;
use App\Classes\NewYorkArticle;
use App\Classes\GuardianArticle;
use App\Models\News;
use App\Models\Settings;

class NewsController extends Controller
{
    // Fetch news articles from different sources and save to database
    public function fetchNews()
    {
        $news = array();

        // Fetch data from NewsAPI
        $newsAPIResponse = Http::get('https://newsapi.org/v2/everything', [
            'q' => 'bbc',
            'apiKey' => 'de89fc31bd5d4a80a0365c8493523a13',
        ]);
        $newsAPIData = $newsAPIResponse->json();

        // Process and store NewsAPI data
        foreach ($newsAPIData['articles'] as $article) {
            array_push($news, NewsArticle::getArticle($article));
        }

        // Fetch data from The Guardian API
        $guardianAPIResponse = Http::get('https://content.guardianapis.com/search', [
            'api-key' => '458103d2-0d71-454f-98dc-7d3369bc3fa0',
        ]);
        $guardianAPIData = $guardianAPIResponse->json();

        // Process and store The Guardian API data
        foreach ($guardianAPIData['response']['results'] as $article) {
            array_push($news, GuardianArticle::getArticle($article));
        }

        // Fetch data from New York Times API
        $nyTimesAPIResponse = Http::get('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json', [
            'api-key' => 'mfC0gD2rCsdVtDrzts5dKUVOSslxTsGt',
        ]);
        $nyTimesAPIData = $nyTimesAPIResponse->json();

        // Process and store New York Times API data
        foreach ($nyTimesAPIData['results'] as $article) {
            array_push($news, NewYorkArticle::getArticle($article));
        }

        // Sort the combined news array by date
        usort($news, function ($a, $b) {
            return strtotime($b->date) - strtotime($a->date);
        });

        // Store unique news articles in the database
        foreach ($news as $article) {
            if (News::where('title', $article->title)->count() < 1) {
                $newsModel = new News();
                $newsModel->title = $article->title;
                $newsModel->description = $article->description;
                $newsModel->article_image = $article->article_image;
                $newsModel->category = $article->category;
                $newsModel->date = $article->date;
                $newsModel->author = $article->author;
                $newsModel->source = $article->source;
                $newsModel->save();
            }
        }
    }

    // Get filtered news based on user preferences
    public function getNews()
    {
        $user = auth()->user();
        $filters = Settings::firstOrNew(['user_id' => $user->id]);
        $filteredSources = json_decode($filters['sources']);
        $filteredCategories = json_decode($filters['categories']);
        $filteredAuthors = json_decode($filters['authors']);

        $newsQuery = News::query();

        // Apply filters for authors, categories, and sources
        foreach ($filteredAuthors as $author) {
            $newsQuery->orWhere('author', $author);
        }

        foreach ($filteredCategories as $category) {
            $newsQuery->orWhere('category', $category);
        }

        foreach ($filteredSources as $source) {
            $newsQuery->orWhere('source', $source);
        }

        // Retrieve and render filtered news articles
        $news = $newsQuery->get();

        return Inertia::render('Dashboard', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'news' => $news,
        ]);
    }
}
