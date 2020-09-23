from rest_framework import serializers
from .models import Card
import os
from django.conf import settings
class CardListSerializer(serializers.ModelSerializer):
	image = serializers.SerializerMethodField()
	slug = serializers.SerializerMethodField(read_only = True)
	class Meta:
		model = Card
		fields=[
			'title',
			'type_num',
			'class_num',
			'post_date',
			'predmet_type',
			'teacher',
			'image',
			'slug',
			'card_id'
		]
	def get_image(self,instance):
		return(instance.image.path)
	def get_slug(self,instance):
		return(f'card-{instance.card_id}-{instance.class_num}-{instance.post_date}')

class CardCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Card
		fields = [
			'title',
			'type_num',
			'class_num',
			'teacher',
			'predmet_type',
			'image',
			'user',
		]
