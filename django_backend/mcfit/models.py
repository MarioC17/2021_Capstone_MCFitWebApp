from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date
from dateutil.relativedelta import relativedelta

#User accounts

class UserAccountManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,phone_number,emergency_contact,dob,password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email,first_name=first_name,last_name=last_name,phone_number=phone_number,emergency_contact=emergency_contact,dob=dob)

        user.set_password(password)
        user.save()

        return user
class UserAccount(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=255,unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    phone_number = PhoneNumberField(null=False, blank=False)
    emergency_contact = PhoneNumberField(null=False, blank=False)
    fitness_goal = models.CharField(max_length=254, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    body_type = models.CharField(max_length=100, blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    dob = models.DateField(blank=True, null=False)
    height = models.IntegerField(blank=True, null=True)
    physical_activity = models.CharField(max_length=100, blank=True, null=True)
    diet = models.CharField(max_length=100, blank=True, null=True)
    objects = UserAccountManager()


    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = ['first_name','last_name','phone_number','emergency_contact','dob']

    def get_full_name(self):
        return (self.first_name + ' ' + self.last_name)

    def get_short_name(self):
        return (self.first_name + ' ' + self.last_name)

    @property
    def get_age(self):
        return relativedelta(self.dob.days, date.now()).years
     


    def __str__(self):
        return self.email

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

