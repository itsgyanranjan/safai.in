from django.contrib import admin
from .models import Hotspot, Recommendation, AIReport, PredictionHistory

@admin.register(Hotspot)
class HotspotAdmin(admin.ModelAdmin):
    list_display = ('ward', 'area', 'risk_level', 'complaint_count', 'primary_category', 'last_updated')
    list_filter = ('risk_level', 'ward')
    search_fields = ('ward', 'area', 'reason')

@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('title', 'ward', 'priority', 'is_acknowledged', 'created_at')
    list_filter = ('priority', 'is_acknowledged')

@admin.register(AIReport)
class AIReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'period_start', 'period_end', 'total_complaints', 'resolved_count', 'highest_risk_ward', 'created_at')

@admin.register(PredictionHistory)
class PredictionHistoryAdmin(admin.ModelAdmin):
    list_display = ('input_text', 'predicted_category', 'predicted_priority', 'confidence_score', 'created_at')
