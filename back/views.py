from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import Card
from .serializers import CardListSerializer, CardCreateSerializer
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

class CardsListAPI(generics.ListAPIView):
	queryset = Card.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = CardListSerializer
	filter_backends = [OrderingFilter]

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def DeleteCardAPIVIew(request, slug):
	card = Card.objects.get(slug = slug)
	test = card.delete()
	if test:
		return Response(status = status.HTTP_200_OK)
	else:
		return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def CreateCardAPIView(request):
	serializer = CardCreateSerializer(data = request.data)
	if serializer.is_valid():
		serializer.save()	
		return Response(status = status.HTTP_201_CREATED)
	else:
		return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def Logout(request):
	Token.objects.get(user = request.user).delete()
	return Response(status = status.HTTP_200_OK)


