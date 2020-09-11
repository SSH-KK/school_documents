from django.db import models
from django.conf import settings
import os
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_delete, post_save, pre_save
from django.contrib.auth import get_user_model

def get_img_path(instance, filename):
	return('card_img/{0} {1}'.format((f'{instance.title} {instance.type_num} {instance.class_num} {instance.post_date}').encode('utf-8'),filename))

class Card(models.Model):
	type_choices = [
	('Семинары','seminars'),
	('Семестровки','semestrovki'),
	('Потоковые','potocovye')
	]
	class_choices = [
		('10','10'),
		('11','11'),
	]
	predmet_choices = [
		('Математика','Математика'),
		('Физика','Физика'),
		('Информатика','Информатика')
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
	type_num = models.CharField(max_length = 50, choices = type_choices, null = True)
	class_num = models.CharField(max_length = 50, choices = class_choices, null = True)
	teacher = models.CharField(max_length = 50, choices = teacher_choices, null = True)
	predmet_type = models.CharField(max_length = 50, choices = predmet_choices, null = True)
	post_date = models.DateField(auto_now = True)
	image = models.ImageField(upload_to = get_img_path, blank = False, null = False)
	user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,blank = True, null = True)

	def __str__(self):
		return(f'{self.title}_{self.type_num}_{self.class_num}_{self.teacher}_{self.post_date}')

@receiver(post_delete, sender = Card)
def delete_card_img(sender, instance, **kwargs):
	os.remove(instance.image.path)



