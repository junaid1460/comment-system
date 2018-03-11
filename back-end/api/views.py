from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser
# Create your views here.
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, generics
from database.models import Post, Comment, Reply
from django.contrib.auth.middleware import get_user
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
    dfields = ('comment', 'by', 'content', 'created_at', 'modified_at'), 
    pred = lambda x: Reply(
                            by = User.objects.get(id = x['by']),
                            comment = Comment.objects.get(id = x['comment']), 
                            content = x['content'] 
                            )
                        )
posts = getSerializers(dname = "posts", 
    dmodel = Post,
    dfields = ('by', 'content','title', 'created_at', 'modified_at'), 
    pred = lambda x: Post(
                            by = User.objects.get(id = x['by']),
                            content = x['content'] 
                            )
                        )
comments = getSerializers(dname = "comments", 
    dmodel = Comment,
    dfields = ('post', 'by', 'content', 'created_at', 'modified_at'), 
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
        return JsonResponse({ 'auth' : True , 'token' : get_token(req)})
    return JsonResponse({ 'auth' : False, 'token' : get_token(req)})

