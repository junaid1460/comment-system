"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import router, loggedIn, login
from rest_framework import routers
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth', loggedIn)
]
r = routers.DefaultRouter()
for route in router:
    rn = routers.SimpleRouter()
    rn.register(route.name, route)
    r.registry.extend(rn.registry)
urlpatterns += [path('api/', include(r.urls))]