from rest_framework import serializers
from .models import Card
import os
from django.conf import settings
class CardListSerializer(serializers.ModelSerializer):
	image = serializers.SerializerMethodField()
	slug = serializers.SlugField(read_only = True)
	class Meta:
		model = Card
		fields=[
			'title',
			'type_num',
			'class_num',
			'post_date',
			'image',
			'slug',
		]
	def get_image(self,instance):
		return(instance.image.path)

class CardCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Card
		fields = [
			'title',
			'type_num',
			'class_num',
			'image',
		]