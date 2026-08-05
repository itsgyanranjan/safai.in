from django.contrib import admin
from .models import Complaint, Feedback

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('complaint_id', 'category', 'priority', 'status', 'reported_by', 'assigned_team', 'created_at')
    list_filter = ('category', 'priority', 'status', 'created_at')
    search_fields = ('complaint_id', 'address', 'description')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('complaint', 'user', 'rating', 'created_at')
    list_filter = ('rating',)
