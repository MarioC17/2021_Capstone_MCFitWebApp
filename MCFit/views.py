from django.contrib import auth
from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
# Create your views here.
from .forms import CreateUserForm

def index(request):
    return render(request,'MCFit/index.html')

def login(request):
    if request.user.is_authenticated:
        return redirect('index')
    else:
        if request.method == 'post':
            username = request.post.get('username')
            password = request.post.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                messages.info(request, "Username or Password is incorrect")

    return render(request, 'MCFit/account/login.html')

def logoutUser(request):
    logout(request)
    return redirect('login')

def register(request):
    form = CreateUserForm()
    context = {'form':form}

    if request.user.is_authenticated:
        return redirect('index')
    else:
        if request.method == 'POST':
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user = form.cleaned_data.get('username')
                messages.success(request, "Account " + user + " created successfully")

    return render(request, 'MCFit/account/register.html', context)

def exercise(request):
    return render(request, 'MCFit/exercise.html')

def forms(request):
    return render(request, 'MCFit/forms.html')