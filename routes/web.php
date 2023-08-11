<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Default route for the authenticated user dashboard
Route::get('/', [NewsController::class, 'getNews'])->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes with middleware
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); // Edit profile page
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); // Update profile
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); // Delete profile
});

// Preference routes with middleware
Route::middleware('auth')->group(function () {
    Route::get('/preference', [PreferenceController::class, 'showPreference'])->name('preference.preference'); // Show preference settings
    Route::patch('/preference', [PreferenceController::class, 'updatePreference'])->name('preference.update'); // Update preference settings
});

// Include authentication routes
require __DIR__ . '/auth.php';
