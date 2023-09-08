from django.http import JsonResponse
from rest_framework.decorators import api_view
from account.models import User
from account.serializers import UserSerializer


@api_view(['POST'])
def search(request):
    data = request.data
    query = data['query']

    users = User.objects.filter(name__icontains=query)
    user_serializer = UserSerializer(users, many=True)

    return JsonResponse(user_serializer.data, safe=False)
