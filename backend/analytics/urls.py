from django.urls import path
from .views import PublicStatsView, WardScoresView, WasteHotspotsView

urlpatterns = [
    path('stats/', PublicStatsView.as_view(), name='analytics_stats'),
    path('wards/', WardScoresView.as_view(), name='analytics_wards'),
    path('hotspots/', WasteHotspotsView.as_view(), name='analytics_hotspots'),
]
