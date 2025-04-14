from rest_framework.views import APIView
from rest_framework.response import Response
from books.models import Book
from books.serializers import BookSerializer

class BookListAPIView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
