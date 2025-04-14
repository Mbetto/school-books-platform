from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserCreateView, UserDetailView
from .serializers import MyTokenObtainPairSerializer

urlpatterns = [
    path('auth/register/', UserCreateView.as_view(), name='user-register'),
    path('auth/me/', UserDetailView.as_view(), name='user-detail'),
    path('auth/token/', TokenObtainPairView.as_view(
        serializer_class=MyTokenObtainPairSerializer
    ), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]