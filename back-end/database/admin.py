from django.contrib import admin

# Register your models here.

from database.models import Comment, Post, Reply

for model in [Comment, Post, Reply]:
    admin.site.register(model)