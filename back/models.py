from django.db import models
from django.conf import settings
import os
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_delete, post_save, pre_save
from django.contrib.auth.models import User

def get_img_path(instance, filename):
	return('card_img/{0} {1}'.format(f'{instance.title} {instance.type_num} {instance.group_num} {instance.post_date}',filename))

class Card(models.Model):
	type_choices = [
	('Семинары','seminars'),
	('Семестровки','semestrovki'),
	('Потоковые','potocovye')
	]
	class_choices = [
		('81','81'),
		('82','82'),
		('83','83'),
		('84','84'),
		('85','85'),
		('86','86'),
		('91','91'),
		('92','92'),
		('93','93'),
		('94','94'),
		('95','95'),
		('96','96'),
	]
	teacher_choices = [
		('Попов Д.А','Попов Д.А'),
		('Ильин А.Б','Ильин А.Б'),
		('Пачин И.М','Пачин И.М'),
		('Николаева Л.Н','Николаева Л.Н'),
		('Ню В.В','Ню В.В'),
		('Вишневская Е.А','Вишневская Е.А'),
		('Некрасов М.В','Некрасов М.В'),
		('Попова Н.А','Попова Н.А'),
		('Пачин М.Ф','Пачин М.Ф'),
		('Керамов Н.Д','Керамов Н.Д'),
		('Новожилова В.И','Новожилова В.И'),
		('Шпехт А.Ю','Шпехт А.Ю'),
		('Конкина Н.В','Конкина Н.В')
	]
	card_id = models.AutoField(primary_key=True)
	title = models.CharField(max_length = 25, unique = True)
	type_num = models.CharField(max_length = 50, choices = type_choices)
	group_num = models.CharField(max_length = 50, choices = class_choices)
	teacher = models.CharField(max_length = 100, choices = teacher_choices, default = teacher_choices[0] )
	post_date = models.DateField(auto_now = True)
	image = models.ImageField(upload_to = get_img_path, blank = False, null = False)
	poster = models.ForeignKey(User, on_delete=models.CASCADE, blank = True, null = True)

	def __str__(self):
		return self.title.encode('utf-8')

@receiver(post_delete, sender = Card)
def delete_card_img(sender, instance, **kwargs):
	os.remove(instance.image.path)



