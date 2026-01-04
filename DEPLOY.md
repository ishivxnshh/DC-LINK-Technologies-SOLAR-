# Deployment Guide

This project is structured as a generic **Static Site**, making it incredibly easy to host anywhere. It does not require Node.js, Vite, or any build process on the server.

## 1. Hosting on XAMPP (Windows)

Since you have installed XAMPP, this is the easiest way to run the site locally.

1.  **Locate htdocs**: Go to your XAMPP installation folder, usually `C:\xampp\htdocs\`.
2.  **Copy Project**: Copy your entire project folder `DC-LINK Technologies(SOLAR)` and paste it inside `htdocs`.
3.  **Start Apache**: Open "XAMPP Control Panel" and click **Start** next to Apache.
4.  **View Site**: Open your browser and go to:
    [http://localhost/DC-LINK%20Technologies(SOLAR)/](http://localhost/DC-LINK%20Technologies(SOLAR)/)

*(Note: If you renamed the folder inside htdocs to just `solar`, the URL would be `http://localhost/solar/`)*

## 2. Hosting on Live Server (cPanel, Apache, Nginx)

1.  **Prepare:** Zip the entire project folder.
2.  **Upload:** Upload the contents to your server's `public_html` directory.
3.  **Done:** Navigate to your website URL.

## 3. Integrating with Laravel (Future)

When you are ready to port this to Laravel:

| Current File | Destination in Laravel | Action |
| :--- | :--- | :--- |
| `*.html` (Pages) | `resources/views/*.blade.php` | Rename to `.blade.php`. Replace explicit links (`about.html`) with route helpers (`{{ route('about') }}`). |
| `components/*.html` | `resources/views/partials/` | Use standard Laravel `@include('partials.navbar')`. |
| `css/` | `public/css/` | Move folder directly. |
| `js/` | `public/js/` | Move folder directly. Delete `loader.js`. |
| `images/` | `public/images/` | Move folder directly. |
