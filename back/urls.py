from django.urls import path
from . import views
urlpatterns = [
	path('cards', views.CardsListAPI.as_view(),name = 'CardList'),
]