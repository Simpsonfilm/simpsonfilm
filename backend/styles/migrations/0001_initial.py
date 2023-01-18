

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='style',
            fields=[
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('gender', models.CharField(max_length=36)),
                ('top', models.CharField(max_length=36)),
                ('top_color', models.CharField(max_length=36)),
                ('bottom', models.CharField(max_length=36)),
                ('bottom_color', models.CharField(max_length=36)),
                ('image_id', models.ForeignKey(db_column='image_id', default=1, on_delete=django.db.models.deletion.CASCADE, to='images.image')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
