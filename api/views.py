from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def API(request):
    return HttpResponse('<h1>Welcome to the endPoint</h1>')