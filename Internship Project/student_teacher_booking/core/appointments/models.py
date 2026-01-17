from django.db import models
from django.contrib.auth.models import User


class Appointment(models.Model):
    STATUS = (('pending','Pending'),('approved','Approved'),('cancelled','Cancelled'))
    student = models.ForeignKey(User,related_name='student_appt',on_delete=models.CASCADE)
    teacher = models.ForeignKey(User,related_name='teacher_appt',on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    message = models.TextField()
    status = models.CharField(max_length=20,choices=STATUS,default='pending')
    created_at = models.DateTimeField(auto_now_add=True)