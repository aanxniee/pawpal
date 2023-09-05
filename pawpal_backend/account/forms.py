from django.contrib.auth.forms import UserCreationForm
from django import forms

from .models import User


class SignupForm(UserCreationForm):
    class Meta:
        model = User
        # when signing up, user inputs email, name, password and confirm password
        fields = ('email', 'name', 'password1', 'password2')
