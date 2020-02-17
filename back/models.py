from django.db import models
from django.conf import settings
import os
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_delete, post_save, pre_save
from django.contrib.auth.models import User

def get_img_path(instance, filename):
	return('card_img/{0} {1}'.format(f'{instance.title} {instance.type_num} {instance.class_num} {instance.post_date}',filename))

class Card(models.Model):
	type_choices = [
	('Семинары','seminars'),
	('Семистровки','semistrovki')
	]
	class_choices=[
	('10А','10А'),
	('10Б','10Б'),
	('10В','10В'),
	('11А','11А'),
	('11Б','11Б'),
	('11В','11В')
	]
	title = models.CharField(max_length = 50, unique = True)
	type_num = models.CharField(max_length = 50, choices = type_choices)
	class_num = models.CharField(max_length = 50, choices = class_choices)
	post_date = models.DateField(auto_now = True)
	image = models.ImageField(upload_to = get_img_path, blank = False, null = False)
	slug = models.SlugField(blank = True, null = True)

	def __str__(self):
		return(f'{self.title}_{self.type_num}_{self.class_num}_{self.post_date}')

@receiver(post_delete, sender = Card)
def delete_card_img(sender, instance, **kwargs):
	os.remove(instance.image.path)

@receiver(pre_save, sender = Card)
def add_slug(sender, instance, **kwargs):
	if not instance.slug:
		instance.slug = instance.title.replace(' ','_')

@receiver(post_save, sender = User)
def create_token(sender, instance, **kwargs):
	Token.objects.create(user = instance)

