from django.http import JsonResponse
from rest_framework.decorators import api_view
from account.models import User
from account.serializers import UserSerializer
from .models import Post
from .forms import PostForm
from .serializers import PostSerializer


@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def post_create(request):
    form = PostForm(request.POST)

    if form.is_valid():
        post = form.save(commit=False)
        user = request.user
        post.created_by = user
        post.save()

        serializer = PostSerializer(post)

        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Something went wrong!'})
