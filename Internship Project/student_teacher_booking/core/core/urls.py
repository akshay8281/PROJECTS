from django.contrib import admin
from django.urls import path
from accounts import views as acc
from dashboard import views as dash
from appointments import views as app


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", acc.login_view, name="login"),
    path("register/", acc.register),
    path("logout/", acc.logout_view),
    path("dashboard/", acc.dashboard, name="dashboard"),
    path("admin-dashboard/", dash.admin_dash, name="admin_dash"),
    path("approve-student/<int:id>/", dash.approve_student),
    path("teacher-dashboard/", dash.teacher_dash, name="teacher_dash"),
    path("student-dashboard/", dash.student_dash, name="student_dash"),
    path("approve-appointment/<int:id>/", app.approve_appointment),
    path("teachers/", app.teacher_list),
    path("book/<int:teacher_id>/", app.book_appointment),
]
