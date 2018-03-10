from django.db import models
from django.contrib.auth import models as u

# Create your models here.
class Post(models.Model):
    by = models.ForeignKey(to=u.User, on_delete = models.CASCADE)
    title = models.TextField(default = "**None**")
    content = models.TextField(default="**No content**")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.content) + '...'

class Comment(models.Model):
    post = models.ForeignKey(to= Post, on_delete = models.CASCADE)
    by = models.ForeignKey(to=u.User, on_delete = models.CASCADE)
    content = models.TextField(default="**No content**")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.content) + '...'

class Reply(models.Model):
    comment = models.ForeignKey(to= Comment, on_delete = models.CASCADE)
    by = models.ForeignKey(to=u.User, on_delete = models.CASCADE)
    content = models.TextField(default="**No content**")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.content) + '...'
    