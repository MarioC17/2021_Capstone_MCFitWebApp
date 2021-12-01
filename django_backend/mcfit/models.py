from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField

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


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class Profiles(models.Model):
    profile_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    address = models.TextField(blank=True, null=True)
    emergency_contact = models.TextField(blank=True, null=True)
    fitness_goal = models.TextField(blank=True, null=True)
    phone_num = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    physical_activity = models.TextField(blank=True, null=True)
    diet = models.TextField(blank=True, null=True)
    photo = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'profiles'

class Workouts(models.Model):
    workout_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=False)
    exercise = models.ForeignKey(Exercisetable, models.DO_NOTHING, blank=True, null=False)
    reps = models.IntegerField(blank=True, null=True)
    sets = models.IntegerField(blank=True, null=True)
    rest = models.TextField(blank=True, null=True)
    rir = models.IntegerField(blank=True, null=True)
    load = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'workouts'

class SocialaccountSocialaccount(models.Model):
    provider = models.CharField(max_length=30)
    uid = models.CharField(max_length=191)
    last_login = models.DateTimeField()
    date_joined = models.DateTimeField()
    extra_data = models.TextField()
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialaccount'
        unique_together = (('provider', 'uid'),)