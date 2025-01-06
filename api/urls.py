from django.urls import path, include
from . import views
from api.views import BookList

urlpatterns = [
    path('',views.API),
    path('books/',BookList.as_view())
]