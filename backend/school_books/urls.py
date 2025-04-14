# school_books/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.views.generic import RedirectView

def home_view(request):
    return HttpResponse("""
        <h1>Welcome to School Books Platform</h1>
        <h3>Available Endpoints:</h3>
        <ul>
            <li><a href="/api/books/">/api/books/</a> - Books API</li>
            <li><a href="/admin/">/admin/</a> - Admin Panel</li>
        </ul>
    """)

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/books/', include('books.urls')),
    path('api/users/', include('users.urls')),
]