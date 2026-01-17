from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from .models import Appointment


@login_required
def book_appointment(request, teacher_id):
    if request.method == "POST":
        Appointment.objects.create(
            student=request.user,
            teacher_id=teacher_id,
            date=request.POST["date"],
            time=request.POST["time"],
            message=request.POST["message"],
        )
        return redirect("student_dash")


@login_required
def approve_appointment(request, id):
    a = Appointment.objects.get(id=id)
    a.status = "approved"
    a.save()
    return redirect("teacher_dash")


from accounts.models import Profile


@login_required
def teacher_list(request):
    teachers = Profile.objects.filter(role="teacher", approved=True)
    return render(request, "teacher_list.html", {"teachers": teachers})
