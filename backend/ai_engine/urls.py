from django.urls import path
from . import views

urlpatterns = [
    path('hotspots/', views.get_hotspots_view, name='ai-hotspots'),
    path('recommendations/', views.get_recommendations_view, name='ai-recommendations'),
    path('report/', views.get_weekly_report_view, name='ai-report'),
    path('predict-category/', views.predict_category_view, name='ai-predict-category'),
    path('predict-priority/', views.predict_priority_view, name='ai-predict-priority'),
    path('check-duplicate/', views.check_duplicate_view, name='ai-check-duplicate'),
    path('cleanliness-score/', views.get_cleanliness_score_view, name='ai-cleanliness-score'),
    path('trends/', views.get_trends_view, name='ai-trends'),
    path('analyze-image/', views.analyze_image_view, name='ai-analyze-image'),
    path('chat/', views.chat_assistant_view, name='ai-chat'),
    path('recommend-worker/', views.recommend_worker_view, name='ai-recommend-worker'),
    path('route-optimization/', views.route_optimization_view, name='ai-route-optimization'),
]
