# Generated by Django 2.2.5 on 2020-02-21 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0011_auto_20200221_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='class_num',
            field=models.CharField(choices=[('81', '81'), ('82', '82'), ('83', '83'), ('84', '84'), ('85', '85'), ('86', '86'), ('91', '91'), ('92', '92'), ('93', '93'), ('94', '94'), ('95', '95'), ('96', '96')], max_length=50),
        ),
    ]
