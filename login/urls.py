from django.contrib import admin
from django.urls import path, include

from . import views   

urlpatterns = [
    path('login/',views.login),
    path('login-submit',views.logging_in),
    path('signup',views.signup),
    path('signup_submit',views.signup_submit),
    path('logout',views.logout)
]