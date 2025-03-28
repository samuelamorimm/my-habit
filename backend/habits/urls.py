from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitViewSet, CheckInViewSet, register_view
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'habits', HabitViewSet, basename='habit')
router.register(r'checkins', CheckInViewSet, basename='checkin')


urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', register_view, name='register'),
    path('login/', obtain_auth_token, name='api_token_auth'),
]
