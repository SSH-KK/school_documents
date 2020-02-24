# Generated by Django 2.2.5 on 2020-02-21 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0010_auto_20200219_2222'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='teacher',
            field=models.CharField(choices=[('Попов Д.А', 'Попов Д.А'), ('Ильин А.Б', 'Ильин А.Б')], default=('Попов Д.А', 'Попов Д.А'), max_length=100),
        ),
        migrations.AlterField(
            model_name='card',
            name='class_num',
            field=models.CharField(choices=[('81', '81'), ('82', '82'), ('83', '83'), ('84', '84'), ('85', '85'), ('86', '86'), ('87', '87'), ('88', '88'), ('89', '89'), ('90', '90'), ('91', '91'), ('92', '92'), ('93', '93'), ('94', '94'), ('95', '95'), ('96', '96')], max_length=50),
        ),
        migrations.AlterField(
            model_name='card',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='type_num',
            field=models.CharField(choices=[('Семинары', 'seminars'), ('Семистровки', 'semistrovki'), ('Потоковые', 'potocovye')], max_length=50),
        ),
    ]
