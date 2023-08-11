<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Settings;

class PreferenceController extends Controller
{
    // Show user's preference settings
    public function showPreference()
    {
        // Retrieve all news settings
        $settings = News::all();

        // Retrieve all selected user preferences
        $selected = Settings::all();

        // Render the preference view using Inertia.js
        return Inertia::render('Preference/Preference', [
            'settings' => $settings,
            'selected' => $selected
        ]);
    }

    // Update user's preference settings
    public function updatePreference(Request $request)
    {
        // Get the authenticated user
        $user = auth()->user();

        // Retrieve updated preferences from the request
        $updatedPreferences = $request->input('preferences');

        // Find or create user's preference settings
        $settings = Settings::firstOrNew(['user_id' => $user->id]);

        // Update sources, categories, and authors preferences
        $settings->sources = json_encode($updatedPreferences['sources']);
        $settings->categories = json_encode($updatedPreferences['categories']);
        $settings->authors = json_encode($updatedPreferences['authors']);

        // Save the updated preferences
        $settings->save();

        // Return a response using Inertia.js
        return inertia('YourComponentName', [
            'message' => 'Preferences updated successfully',
        ]);
    }
}
