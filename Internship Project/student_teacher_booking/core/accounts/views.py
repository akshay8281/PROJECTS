from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from accounts.models import Profile
import logging

logger = logging.getLogger(__name__)


def register(request):
    if request.method == "POST":
        user = User.objects.create_user(
            username=request.POST["username"], password=request.POST["password"]
        )
        Profile.objects.create(user=user, role="student")
        logger.info(f"Student registered: {user.username}")
        return redirect("login")
    return render(request, "register.html")


def login_view(request):
    if request.method == "POST":
        user = authenticate(
            username=request.POST["username"], password=request.POST["password"]
        )
        if user:
            login(request, user)
            return redirect("dashboard")
    return render(request, "login.html")


def logout_view(request):
    logout(request)
    return redirect("login")


@login_required
def dashboard(request):
    profile, created = Profile.objects.get_or_create(
        user=request.user, defaults={"role": "student"}
    )

    if profile.role == "admin":
        return redirect("admin_dash")
    elif profile.role == "teacher":
        return redirect("teacher_dash")
    else:
        return redirect("student_dash")
