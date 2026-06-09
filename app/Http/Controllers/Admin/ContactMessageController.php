<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('message', 'like', "%{$request->search}%");
            });
        }

        $messages = $query
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $messages,
            'filters' => $request->only(['search']),
        ]);
    }

    // ---------------- SHOW MESSAGE ----------------
    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);

        // mark as read automatically
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('Admin/ContactMessages/Show', [
            'message' => $message,
        ]);
    }

    // ---------------- DELETE ----------------
    public function destroy($id)
    {
      $message = ContactMessage::findOrFail($id);

    $message->delete();

        return redirect()->route('contact-messages.index')->with('success', 'تم حذف الرسالة بنجاح');
    }


}
