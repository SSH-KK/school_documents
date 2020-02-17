from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
	path('login',obtain_auth_token, name = 'UserLogin'),
	path('cards', views.CardsListAPI.as_view(),name = 'CardList'),
	path('card/<slug>/delete',views.DeleteCardAPIVIew, name = 'DeleteCard'),
	path('card/create',views.CreateCardAPIView, name = 'CreateCard'),
]