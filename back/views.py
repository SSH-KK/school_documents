from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import Card
from .serializers import CardListSerializer, CardCreateSerializer
from rest_framework.filters import OrderingFilter,SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

#НИЧЕГО НЕ НАДО
class CardsListAPI(generics.ListAPIView):
	queryset = Card.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = CardListSerializer
	filter_backends = [SearchFilter,DjangoFilterBackend,OrderingFilter]
	filterset_fields = ['type_num','group_num','teacher']
	search_fields = ['title','type_num','group_num']
	ordering_fields = ['post_date']

# HEADERS:
# Authorization: Token (тут сам токен)
#URL: 
#api/card/<slug>/delete (slug - имя карточки, в модельке есть)
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def DeleteCardAPIVIew(request, slug):
	card = Card.objects.get(card_id = slug.split('-')[1])
	test = card.delete()
	if test:
		return Response(status = status.HTTP_200_OK)
	else:
		return Response(status = status.HTTP_400_BAD_REQUEST)

# HEADERS:
# Authorization: Token (тут сам токен)
#Body:
#title: Название(уникальное)
#type_num: Семистровки/Семинары
#class_num: 10Б...
#teacher: ПОПОВ....
#image: Собственно картинка
#URL:
#api/card/create
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def CreateCardAPIView(request):
	data = request.data
	data['user']=request.user.id
	serializer = CardCreateSerializer(data = data)
	if serializer.is_valid():
		serializer.save()	
		return Response(status = status.HTTP_201_CREATED)
	else:
		return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
# HEADERS:
# Authorization: Token (тут сам токен)
#URL:
#api/card/create
@api_view(['POST'])
def Logout(request):
	Token.objects.get(user = request.user).delete()
	return Response(status = status.HTTP_200_OK)

#Функция LOGIN:
#Body:
#username: ну понятно что
#password: тем более понятно
#URL:
#api/login
