from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Card
from .serializers import CardListSerializer
from rest_framework.filters import OrderingFilter
# Create your views here.
class CardsListAPI(generics.ListAPIView):
	queryset = Card.objects.all()
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	serializer_class = CardListSerializer
	filter_backends = [OrderingFilter]