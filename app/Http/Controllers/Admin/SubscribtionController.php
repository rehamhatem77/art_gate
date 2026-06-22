<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class SubscribtionController extends Controller
{
    //
  public function index()
    {
        $subscribers = NewsletterSubscriber::latest()->get();

        return inertia('Admin/Newsletter/Index', [
            'subscribers' => $subscribers,
        ]);
    }

    public function destroy($id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->delete();

        return back()->with('success', 'تم حذف المشترك بنجاح');
    }
  public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        try {
            NewsletterSubscriber::create([
                'email' => $request->email,
            ]);

            return back()->with('success', 'تم الاشتراك بنجاح!');
        } catch (\Exception $e) {

            return back()->with('error', 'حدث خطأ أثناء الاشتراك، حاول مرة أخرى.');
        }
    }
}
