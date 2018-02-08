from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from functools import reduce
import math

from .models import Movie
from .serializers import *
from .services import *


class SearchByTitle(APIView):
    def get(self,request, title, page, itemsPerPage):
        page = int(page)
        itemsPerPage = int(itemsPerPage)
        '''
        movies = []
        r2 = (math.ceil((page*itemsPerPage)/40) * 2) + 1
        r1 = r2-2
        for page_i in range(r1,r2):
            movies.append(get_movies_by_title(title, page_i))
        movies = reduce(lambda x,y: x+y, movies)

        lastIndex = (page*itemsPerPage) % 40
        firstIndex = lastIndex-itemsPerPage
        movies = movies[firstIndex : lastIndex]
        '''

        movies = get_movies_by_title(title, page)

        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchTotalResults(APIView):
    def get(self,request, title):
        total_results = get_total_results(title)
        return Response(total_results, status=status.HTTP_200_OK)

class PopularMovies(APIView):
    def get(self,request, page, itemsPerPage):
        '''
        movies = []
        for page in range(1,3):
            movies.append(get_popular_movies(page))
        movies = reduce(lambda x,y: x+y, movies)
        '''
        movies = get_popular_movies(page)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
