from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import api

# TokenObtainPairView generates access token when a user logs in
# TokenRefreshView refreshes an access token when it expires without requiring the user to log in again

urlpatterns = [
    path('getuserinfo/', api.getuserinfo, name='getuserinfo'),
    path('signup/', api.signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
