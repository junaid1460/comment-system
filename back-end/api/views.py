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
# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "users"





def getSerializers(dname, dmodel, dfields, pred):
    class MySerializer(serializers.ModelSerializer):
        username = serializers.SerializerMethodField()
        owner = serializers.SerializerMethodField()
        class Meta:
            model = dmodel
            fields = dfields + ('username','owner')
        def get_username(self, obj):
            return obj.by.username
        def get_owner(self, obj):
            print(get_user(self.context['request']))
            return obj.by == self.context['request'].user

    # ViewSets define the view behavior.

    class MyListView(viewsets.ModelViewSet):
        serializer_class = MySerializer
        parser_classes = (FormParser, MultiPartParser)
        queryset = dmodel.objects.all()
        model = dmodel
        name = dname
        def perform_destroy(self, obj):
            if obj.by == self.request.user:
                obj.delete()
        def perform_create(self, serializer):
            # print(self.request.POST)
            serializer.save(by = self.request.user)
            
        def get_queryset(self):
            # return documents of current user
            return self.model.objects.all()
    return MyListView

# Routers provide an easy way of automatically determining the URL conf.
replies = getSerializers(dname = "replies", 
    dmodel = Reply,
    dfields = ('id','comment', 'by', 'content', 'created_at', 'modified_at'), 
    pred = lambda x: Reply(
                            by = User.objects.get(id = x['by']),
                            comment = Comment.objects.get(id = x['comment']), 
                            content = x['content'] 
                            )
                        )
posts = getSerializers(dname = "posts", 
    dmodel = Post,
    dfields = ('id', 'by', 'content','title', 'created_at', 'modified_at'), 
    pred = lambda x: Post(
                            by = User.objects.get(id = x['by']),
                            content = x['content'] 
                            )
                        )
comments = getSerializers(dname = "comments", 
    dmodel = Comment,
    dfields = ('id','post', 'by', 'content', 'created_at', 'modified_at'), 
    pred = lambda x: Comment(
                            by = User.objects.get(id = x['by']),
                            post = Post.objects.get(id = x['post']), 
                            content = x['content'] 
                            )
                        )
router =  [replies, comments, posts]


def loggedIn(req):
    # print(req.user.)
    if req.user.is_authenticated:
        return JsonResponse({ 'auth' : True , 'token' : get_token(req), 'user' : str(req.user)})
    return JsonResponse({ 'auth' : False, 'token' : get_token(req), 'user' : str(req.user)})

import json


def ret(req, user):
    try:
        signin(req, user)
        return JsonResponse({'auth' : True})
    except BaseException as e:
        return JsonResponse({'auth' : False, 'message' : ['something went wrong!.']})

def login(req):
    if req.method != 'POST':
        return Http404()
    data = json.loads(req.body.decode('utf-8'))
    print("hello")
    username = data.get('username')
    password = data.get('password')
    print(username, password)
    user = authenticate(username = username, password = password)
    if user is None:
        try:
            user = User.objects.get(username = username)
        except:
            pass
        if user is None:
            message = []
            if len(username) < 4:
                message += ["new username must be at least 4 letters long."]
            if len(password) < 8:
                message += ["password must have least 8 characters."]
            if len(message) > 0:
                return JsonResponse({'auth' : False, 'message': message})
            user = User.objects.create_user(username = username,email =None, password= password)
            user.save()
            return ret(req, user)
            
            
        return JsonResponse({'auth' : False, 'message': ['invalid username/password.']})
    return ret(req, user)

def addcomment(req):
    # print(req.user.)
    if not req.user.is_authenticated:
        return Http404()
    data = req.body.decode('utf8')
    data = json.loads(data)
    post = data.get('post')
    content = data.get('content')
    comment = Comment(by = req.user, post = Post.objects.get(id=post), content = content)
    comment.save()
    return JsonResponse({'status' : True})

def addreply(req):
    # print(req.user.)
    if not req.user.is_authenticated:
        return Http404()
    data = req.body.decode('utf8')
    data = json.loads(data)
    print(data)
    comment = data.get('comment')
    content = data.get('content')
    reply = Reply(by = req.user, comment = Comment.objects.get(id=comment), content = content)
    reply.save()
    print(reply)
    return JsonResponse({'status' : True})

def addpost(req):
    # print(req.user.)
    if not req.user.is_authenticated:
        return Http404()
    data = req.body.decode('utf8')
    data = json.loads(data)
    title = data.get('title')
    content = data.get('content')
    reply = Post(by = req.user, title = title, content = content)
    reply.save()
    return JsonResponse({'status' : True})