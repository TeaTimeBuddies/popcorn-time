<?php

namespace App\Http\Controllers\api;

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
        // return view('/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Get the emails of the users who are approved
        $approvedUserEmails = $request->input('isApproved', []);

        // Update the isApproved status of all users to false
        User::query()->update(['isApproved' => false]);

        // Update the isApproved status of approved users to true
        User::whereIn('email', $approvedUserEmails)->update([
            'isApproved' => true,
        ]);

        // Redirect back with a success message
        return redirect()
            ->back()
            ->with('message', 'Users updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    // public function login()
    // {
    //     return view('/user/login');
    // }

    public function processLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $userExists = User::where('email', $request->email)->exists();

        if (!$userExists) {
            return back()->withErrors([
                'email' => 'Cannot find the email address.',
            ]);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // Store the user data in the session
            session(['user' => $user]);
            return response()->json(['status' => 'success']);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials.',
            ]);
        }
    }

    public function manageUsers()
    {
        $users = User::all();
        return view('admin.users', ['users' => $users]);
    }

    public function updateUsers(Request $request)
    {
    }

    public function logout()
    {
        Auth::logout();
        session()->forget('user');
        return redirect()->route('login');
    }

    public function signup()
    {
        return view('user.signup');
    }

    public function processSignup(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['message' => 'User successfully registered.'], 201);
    }
}
