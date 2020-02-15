from rest_framework import serializers
from .models import Card
import os
from django.conf import settings
class CardListSerializer(serializers.ModelSerializer):
	image_url = serializers.SerializerMethodField(read_only = True)
	class Meta:
		model = Card
		fields=[
			'title',
			'type_num',
			'class_num',
			'post_date',
			'image_url',
		]
	def get_image_url(self,obj):
		return(obj.image.path)