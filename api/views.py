from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Book
from api.serializer import BookSerializer


class BookList(APIView):
    def get(self,request):
        books = Book.objects.all()
        serializer = BookSerializer(books,many=True)
        return  Response(serializer.data)
    
    def post(self,request):
        serializer = BookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
def API(request):
    return HttpResponse('<h1>Welcome to the endPoint</h1>')