
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.middleware.csrf import get_token
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser
# Create your views here.
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, generics
from database.models import Post, Comment, Reply
from django.contrib.auth.middleware import get_user
from django.contrib.auth import authenticate, login as signin
# ViewSets define the view behavior.

class ReplySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    class Meta:
        model = Reply
        fields = ('id', 'comment', 'content', 'by' ,'owner', 'username','created_at')
    def get_username(self, obj):
        return obj.by.username
    def get_owner(self, obj):
        return obj.by == self.context['request'].user

class CommentSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(source = 'reply_set', many = True)
    username = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'post', 'content', 'by','owner', 'username', 'replies', 'created_at')
    def get_username(self, obj):
        return obj.by.username
    def get_owner(self, obj):
        return obj.by == self.context['request'].user

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many = True, source = 'comment_set')
    username = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'comments' , 'content','title', 'owner', 'username', 'by', 'created_at')
    def get_username(self, obj):
        return obj.by.username
    def get_owner(self, obj):
        print(get_user(self.context['request']))
        return obj.by == self.context['request'].user

class PostListView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    name = "allofpost"

