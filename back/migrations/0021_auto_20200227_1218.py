# Generated by Django 2.2.5 on 2020-02-27 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0020_card_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='type_num',
            field=models.CharField(choices=[('Семинары', 'seminars'), ('Семестровки', 'semestrovki'), ('Потоковые', 'potocovye')], max_length=50),
        ),
    ]