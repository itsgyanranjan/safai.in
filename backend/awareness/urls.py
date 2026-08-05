from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CampaignViewSet,
    EducationalPosterViewSet,
    EnvironmentalTipViewSet,
    QuizQuestionViewSet,
    ArticleViewSet,
    SubmitQuizView
)

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')
router.register(r'posters', EducationalPosterViewSet, basename='poster')
router.register(r'tips', EnvironmentalTipViewSet, basename='tip')
router.register(r'quiz', QuizQuestionViewSet, basename='quiz')
router.register(r'articles', ArticleViewSet, basename='article')

urlpatterns = [
    path('', include(router.urls)),
    path('submit-quiz/', SubmitQuizView.as_view(), name='submit-quiz'),
]
