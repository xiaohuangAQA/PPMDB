# Generated by Django 3.2.5 on 2024-04-07 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ppm', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compound',
            name='pchembl_value',
            field=models.CharField(default='-', max_length=5, verbose_name='value'),
        ),
        migrations.AlterField(
            model_name='compound',
            name='standard_value',
            field=models.CharField(default='-', max_length=5, verbose_name='value'),
        ),
    ]