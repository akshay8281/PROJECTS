from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLE = (('admin','Admin'),('teacher','Teacher'),('student','Student'))
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=20,choices=ROLE)
    department = models.CharField(max_length=100,blank=True)
    subject = models.CharField(max_length=100,blank=True)
    approved = models.BooleanField(default=False)


def __str__(self): return self.user.username