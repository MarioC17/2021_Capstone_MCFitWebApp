from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Exercisetable(models.Model):

    name = models.TextField(blank=True, null=True)
    muscle = models.TextField(blank=True, null=True)
    equipment = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    benefits = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    video = models.TextField(blank=True, null=True)
    exercise_id = models.AutoField(primary_key=True)
    objects = models.Manager()
    class Meta:
        managed = False
        db_table = 'exerciseTable'

    def __str__(self):
        return self.name