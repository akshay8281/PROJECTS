from django.shortcuts import render, redirect
from accounts.models import Profile
from appointments.models import Appointment

def admin_dash(request):
    students = Profile.objects.filter(role='student',approved=False)
    return render(request,'admin_dashboard.html',{'students':students})

def approve_student(request,id):
    p = Profile.objects.get(id=id)
    p.approved=True
    p.save()
    return redirect('admin_dash')

def teacher_dash(request):
    appts = Appointment.objects.filter(teacher=request.user)
    return render(request,'teacher_dashboard.html',{'appointments':appts})

def student_dash(request):
    appts = Appointment.objects.filter(student=request.user)
    return render(request,'student_dashboard.html',{'appointments':appts})